import wxToPromise from "./wx"
import APIConfig from "../config/api"
import exceptionMessage from "../config/exception-message"
class Http {
  static async request({
    url,
    data,
    method = "GET",
    header = {}
  }) {
    try {
      wx.showLoading()
      const res = await wxToPromise("request", {
        url: APIConfig.baseUrl + url,
        method,
        data,
        header : {
          token : wx.getStorageSync('token'),
          ...header
        }
      })

      if (res.statusCode < 400) {
        wx.hideLoading()
        return res.data.data
      }

      if (res.statusCode === 401) {
        // TODO 令牌的过期处理
        wx.hideLoading()
        return
      }


      wx.hideLoading()
      Http._showError(res.data.error_code, res.data.message)
    }catch(err){
      wx.hideLoading()
      Http._showError("","网络异常")
    }


  }

  static _showError(errorCode, message) {
    let title

    const errorMessage = exceptionMessage[errorCode]

    title = errorMessage || message || "未知错误"



    title = typeof title === "object" ? Object.values(title).join() : title

    wx.showToast({
      title,
      icon: "none",
      duration: 3000
    })
  }

}
export default Http