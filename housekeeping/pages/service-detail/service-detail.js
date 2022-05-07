// pages/service-detail/service-detail.js
import Service from "../../models/service"
import Rating from "../../models/rating";
const rating = new Rating()
import User from "../../models/user";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceId : "",
    serviceDetail : {},
    // isPublisher 为false 的时候 , 是一个消费者 如果为true 发布者
    isPublisher : false,
    ratingList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const serviceId = options.serviceId
    this.setData({
      serviceId
    })

    await this._getServiceDetail()
    await this._checkRole()
    await this._getServiceRatingList()
  },

  async _getServiceDetail(){
    const serviceId = this.data.serviceId
    const serviceDetail = await Service.getServiceDetail(serviceId)
    this.setData({
      serviceDetail
    })
  },

  async _getServiceRatingList(){
    const serviceId = this.data.serviceId
    const ratingList = await rating.reset().getServiceRatingList(serviceId)
    this.setData({
      ratingList
    })
  },

  /**
   * 检测本地存储的用户id 和  发布者的id是否一致
   */
  _checkRole(){
    const userInfo = User.getUserInfoByLocal()
    const publisherId = this.data.serviceDetail.publisher.id

    if(userInfo && userInfo.id === publisherId){
      this.setData({
        isPublisher : true
      })
    }

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