
import Http from "../utils/Http";
import Token from "./token";
class User{
   /**
     * 获取本地存储的用户信息
     * @returns {any}
     */
  static getUserInfoByLocal(){
    return wx.getStorageSync("user-info")
  }

  /**
   * 登录方法
   */
  static async login(){
    const token = await Token.getToken()
    console.log(token)
    wx.setStorageSync('token',token)
  }

  /**
   * 更新用户信息
   */
  static async updateUserInfo(userInfo){

    const res = await Http.request({
      url : "/v1/user",
      method : "PUT",
      data : {
        nickname : userInfo.nickName,
        avatar : userInfo.avatarUrl
      }
    })
    console.log("==",res)
    wx.setStorageSync('user-info', res)
   
  }

}

/**
 * 
 * 1. 调用用户登录接口获取到token
 * 
 * 2. 将token存储到本地
 * 
 * 3. 将获取到的用户信息提交给后台 , 调用更新用户信息接口
 * 
 * 4. 
 * 
 */

export default User