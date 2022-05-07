
class User{
   /**
     * 获取本地存储的用户信息
     * @returns {any}
     */
  static getUserInfoByLocal(){
    return wx.getStorageSync("user-info")
  }
}

export default User