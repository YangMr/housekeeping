// pages/login/login.js
import User from "../../models/user";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  async handleLogin(){
    console.log("123")
    // 1. 获取小程序的用户信息

    // 2. 封装获取token方法

    // 3. 封装login方法 : 获取到token并且将token存储到本地

    try{

      const result = await wx.getUserProfile({
        desc: '完善用户信息',
      })

      // wx.setStorageSync('user-info', result.userInfo)

      wx.showLoading({
        title : '正在授权'
      })
      
      await User.login()
      await User.updateUserInfo(result.userInfo)
  
      wx.hideLoading()

      wx.navigateTo({
        url: '/pages/conversation/conversation',
      })      
    }catch{

    }
   
    
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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