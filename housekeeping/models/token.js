import Http from "../utils/Http";
import APIConfig from "../config/api";
class Token{
  /**
   * 获取token
   */
  static async getToken(){
    const res = await Http.request({
      url : "/v1/token",
      method : "POST",
      data : {
        i_code : APIConfig.iCode,
        order_no : APIConfig.orderNo
      }
    })

    return res.token
  }
}

export default Token