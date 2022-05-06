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
    const res = await wxToPromise("request", {
      url: APIConfig.baseUrl + url,
      method,
      data,
      header
    })

    if (res.statusCode < 400) {
      return res.data.data
    }

    if(res.statusCode === 401){
      // TODO 令牌的过期处理
      return 
    }

    console.log(res)

    Http._showError(res.data.error_code, res.data.message)
    
  }

  static _showError(errorCode, message){
    let title 

    const errorMessage  = exceptionMessage[errorCode]

    title = errorMessage || message || "未知错误"

   

    title = typeof title === "object" ? Object.values(title).join() : title

    wx.showToast({
      title,
      icon : "none",
      duration :3000
    })
  }

}
export default Http

