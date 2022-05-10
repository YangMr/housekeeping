// pages/test/test.js
import TIM from "tim-wx-sdk-ws"
import TimUploadPlugin from "tim-upload-plugin"
import timConfig from "../../config/tim"
import genTestUserSig from "../../lib/tim/generate-test-usersig"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList : [],
    text : "",
    tims : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initSDK()
  },

  initSDK(){
    this.data.tims = TIM.create(timConfig.options)
    const tim = this.data.tims
    tim.setLogLevel(timConfig.logLevel);

    const textUserSig = genTestUserSig("luochenbo")
    console.log(textUserSig)
    tim.login({
      userID: 'luochenbo',
      userSig : textUserSig.userSig
    })

    
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, async function(event){

      const messgeConversationList = event.data.filter(item=>item.from === "yangling")
     
      this.data.messageList = this.data.messageList.concat(messgeConversationList)

      this.setData({
        messageList : this.data.messageList
      })

      await tim.setMessageRead({conversationID: 'C2Cyangling'});

    },this)

    tim.on(TIM.EVENT.SDK_READY,async function () {
      const res = await tim.getMessageList({conversationID: `C2Cyangling`, count : 15})
      console.log(res)
      const messageList = res.data.messageList
      this.setData({messageList})
      await tim.setMessageRead({conversationID: 'C2Cyangling'});
    },this)

    
  },

  handleGetInput(e){
    this.setData({
      text : e.detail.value
    })
  },
 
  async handleSendMessage(e){
    console.log(wx.getStorageSync('user-info').avatar)
    const avatar = wx.getStorageSync('user-info').avatar
    let message = this.data.tims.createTextMessage({
      to : "yangling",
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: this.data.text
      }
    })

    const res = await this.data.tims.sendMessage(message)
    console.log(res)
    this.data.messageList = this.data.messageList.concat(res.data.message)
    this.setData({
      messageList : this.data.messageList,
      text : ""
    })
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