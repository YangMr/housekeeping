// pages/conversation/conversation.js
import Tim from "../../models/tim"
import TIM from "tim-wx-sdk-ws";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import {timStore} from "../../store/tim"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    this.storeBindings =await createStoreBindings(this, {
      store : timStore,
      fields: ["sdkReady","_messageList"],
      actions: ["getMessageList","setTargetUserId"],
    });

    this.setTargetUserId("yangling")
    Tim.getInstance().getSDK().on(TIM.EVENT.SDK_READY,function () {
       // 调用主动获取消息列表方法
      this.getMessageList()
    },this)
   

   

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     // 页面卸载的时候销毁状态
     this.storeBindings.destoryStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})