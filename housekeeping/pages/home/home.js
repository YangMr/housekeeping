// pages/home/home.js
import {throttle} from "../../utils/utils"
Page({

  /**
   * tab切换方法
   */
  handleTabChange : throttle(function (event) {
    console.log(event.detail.index)
  
  },500),

  /**
   * 分类方法
   */
  handleCategoryChange : throttle(function (event){

    console.log(event)
    const id = event.detail.id
  }),

  

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    categoryList: [{
        "id": 1,
        "name": "保洁"
      },
      {
        "id": 2,
        "name": "汽修"
      },
      {
        "id": 3,
        "name": "疏通"
      }
    ],
    currentTab: 0
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