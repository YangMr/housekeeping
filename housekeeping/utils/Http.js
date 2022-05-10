import wxToPromise from "./wx"
import APIConfig from "../config/api"
import exceptionMessage from "../config/exception-message"
import { createStoreBindings } from "mobx-miniprogram-bindings";
import {timStore} from "../store/tim"
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

        this.storeBindings = createStoreBindings(this, {
          store : timStore,
          fields: ["sdkReady"],
          actions: {timLogout : "logout"},
        });

        // 处理小程序的token过期处理, 然后退出登录
        if(res.data.error_code === 10001){

          // 处理sdk的退出登录this.sdkReady 如果为true的话表示sdk是登录状态,所以在这里我们需要设置他为未登录
          
          //  if(this.sdkReady){
          //     this.timLogout()
          //  }



            wx.navigateTo({
                url : "/pages/login/login"
            })

            throw new Error("请求未携带令牌")
        }

       
      // if(this.sdkReady){
      //     this.timLogout()
      //  }

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