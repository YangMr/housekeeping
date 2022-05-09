import TIM from "tim-wx-sdk-ws"
import TIMUploadPlugin from "tim-upload-plugin"
import timConfig from "../config/tim"
import genTestUserSig from "../lib/tim/generate-test-usersig"
class Tim {
  // 初始化一个分页保存续拉消息id的变量
  _nextReqMessageID = null

  // 初始化一个分页保存消息列表变量
  _messageList = []

  // 初始一个化保存是否已经拉完所有消息状态变量
  _isCompleted = false

  // instance保存的是Tim类实例化之后的对象
  static instance = null

   // 初始化一个保存SDK实例对象的变量, 不过这个变量属于私有变量,只能在类内部使用
   _SDKInstance = null

  // 实例话Tim类的时候会触发constructor方法
  constructor() {
    // 接入时需要将0替换为您的即时通信应用的 SDKAppID
    

    // 创建TIM实例对象 SDK 实例通常用 tim 表示, tim SDK的实例对象
    let tim = TIM.create(timConfig.options); 

    // 设置输出日志的级别
    tim.setLogLevel(timConfig.logLevel); // 普通级别，日志量较多，接入时建议使用
    
    // 注册图文上传插件
    tim.registerPlugin({
      'tim-upload-plugin': TIMUploadPlugin
    });

    // this._SDKInstance 这个保存的是sdk的实例对象
    this._SDKInstance = tim
  }

  //  定义一个getSDK, 供外部去调用sdk的实例对象
  getSDK(){
    // 将sdk的实例对象返回给getSDK 方法
    return this._SDKInstance
  }

  // 使用单例模式解决多个页面实例化TIM类产生多次的问题
  static getInstance(){
    // 判断Tim.instance有没有保存实例化Tim类的对象, 如果Tim.instance为null, 说明我们没有实例化Tim类,这个时候我们就需要对Tim类进行实例化
    if(!Tim.instance){
      // 实例化Tim类
      Tim.instance = new Tim()
    }
    // 将Tim类的实例对象返回给getInstance方法
    return Tim.instance
  }


  // 获取会话的消息列表
  async getMessageList(targetUserId,count){
    // 分页处理 this.isCompleted 为 true则表示 会话消息已经获取完成, 这时候就不需要在进行获取, 直接将最终的列表返回出去就可以了
    if(this._isCompleted){
      return this._messageList
    }

    // 调用获取会话消息列表方法
    const res = await this._SDKInstance.getMessageList({
      // 会话id , 这个id指的是要聊天的那个对象的id
      conversationID: `C2C${targetUserId}`,
      // 用户分页续拉消息的id
      nextReqMessageID : this._nextReqMessageID,
      // 分页的数据条数
      count : count || 15
    })

    console.log(res)

    // 保存会话消息列表
    this._messageList = res.data.messageList
    // 保存下次分页续拉消息的id
    this._nextReqMessageID = res.data.nextReqMessageID
    // 保存是否已经拉完所有消息状态
    this._isCompleted = res.data.isCompleted
  }

  // 重置消息会话列表, 解决进入会话页面时第一次数据的加载
  reset(){
     // 保存会话消息列表
     this._messageList = []
     // 保存下次分页续拉消息的id
     this._nextReqMessageID = null
     // 保存是否已经拉完所有消息状态
     this._isCompleted = false
  }

  // sdk的登录方法
  login(){
    // 获取本地存储的用户信息
    const userInfo = wx.getStorageSync('user-info')
    // 获取签名信息
    const testUserSig = genTestUserSig(userInfo.id.toString())
    this._SDKInstance.login({
      // userID 为用户登录之后的id, 由于我们登录之后保存到本地的用户信息id为number类型,而userID的值需要为字符串类型,所以在这里我们需要把用户的id转化成字符串类型
      userID : userInfo.id.toString(),
      // 用户签名, 这个用户签名是由接口或者工具来生成的, 主要是由SDKAppId与以及密钥来生成, 这种签名生成方式主要有两种,第一种是在前端做一个生成, 另一种是通过服务端计算来生成的,在我们这个课程中,我们采用前端这种方式来生成, 不过前端这种生成方式只用是在开发阶段来使用的, 生产环境阶段必须得通过后端来进行返回
      userSig : testUserSig.userSig
    })
  }


}




export default Tim

