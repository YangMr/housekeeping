// pages/login/login.js
import User from "../../models/user";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import {timStore} from "../../store/tim"
Page({

   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store : timStore,
      actions: {timLogin : "login"},
    });
  },

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  async handleLogin(){
    // 1. 获取小程序的用户信息

    // 2. 封装获取token方法

    // 3. 封装login方法 : 获取到token并且将token存储到本地
    const result = await wx.getUserProfile({
      desc: '完善用户信息',
    })


    wx.showLoading({
      title : '正在授权'
    })

    try{

      

      // wx.setStorageSync('user-info', result.userInfo)

      
      await User.login()

      await User.updateUserInfo(result.userInfo)
      
      this.timLogin()

      
  
      wx.navigateTo({
        url: '/pages/conversation/conversation',
      })   
      
      
    }catch{

    }
    
    wx.hideLoading()
    
   

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