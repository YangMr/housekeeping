import { observable, action } from "mobx-miniprogram";
import Tim from "../models/tim";
import TIM from "tim-wx-sdk-ws"


export const timStore = observable({
  // 保存sdk的状态
  sdkReady : false,

  // 会话用户的id
  _targetUserId : null,

  // 用户主动发送的消息
  _messageList : [],
    
 
  // 在状态管理里面定义的登录方法 sdk登录
  login : action(function () {
    // 集中管理事件监听的方法
    this._runListener()
    // 调用tim模型类里面的sdk登录
    Tim.getInstance().login()
  }),

  // sdk退出登录
  logout : action(function () {
    // 调用tim模型类里面的sdk退出登录
    Tim.getInstance().logout()
  }),

  // 集中管理事件监听的方法
  _runListener(){
    // 获取到sdk的实例化对象
    const sdk = Tim.getInstance().getSDK()
    // 监听sdk进入ready的时候
    sdk.on(TIM.EVENT.SDK_READY,this._handleSDKReady,this)
    // 监听SDK 进入 not ready 状态时触发
    sdk.on(TIM.EVENT.SDK_NOT_READY, this._handleSDKNotReady,this)
    // 监听用户被踢下线时触发
    sdk.on(TIM.EVENT.KICKED_OUT, this._handleSDKNotReady,this)
    // 监听SDK 收到推送的单聊、群聊、群提示、群系统通知的新消息，接入侧可通过遍历 event.data 获取消息列表数据并渲染到页面, 并且这个消息是任何人给我们发送的消息的时候就会触发
    sdk.on(TIM.EVENT.MESSAGE_RECEIVED,this._handleMessageReceived, this)
  },

  // sdk进入ready状态 会触发这个方法
  _handleSDKReady(){
    // 将sdkReady这个变量值设置为true   保存的是sdk登录的状态
    this.sdkReady = true
  },

   //sdk 未进入 ready状态 会触发这个方法 以及 当用户被踢下线时会触发的方法
  _handleSDKNotReady(){
     // 将sdkReady这个变量值设置为false   保存的是sdk登录的状态
    this.sdkReady = false
  },

  // 当监听到有人给我们发送消息的时候就会触发这个方法
  async _handleMessageReceived(event){
    
    // 如果用户目标id不存在的话则在控制台抛出一个异常
    if(!this._targetUserId){
      return
    }

    // 获取到目标用户发送的消息
    const currentConversationMessage = event.data.filter(item=>item.from === this._targetUserId)
    console.log("!!!",currentConversationMessage)
     // 如果目标用户消息存在的话我们就将用户的聊天记录保存到messageList变量中
     if(currentConversationMessage.length){
      this._messageList = this._messageList.concat(currentConversationMessage)
    }
    // 将会话的消息设置为已读
    await Tim.getInstance().setMessageRead(this._targetUserId)
  },

  // 主动拉取会话列表方法
  getMessageList : action(async function(){
    // 如果用户目标id不存在的话则在控制台抛出一个异常
      if(!this._targetUserId){
        throw new Error("未指定用户目标id")
        return
      }
    
      // 调用获取消息列表方法
      this._messageList = await Tim.getInstance().reset().getMessageList(this._targetUserId)
      console.log("---",this._messageList)
      // 设置消息未已读
      await Tim.getInstance().setMessageRead(this._targetUserId)
    
    
  }),

  // 设置用户目标id方法
  setTargetUserId : action(function(targetUserId){
    this._targetUserId = targetUserId
  })

});