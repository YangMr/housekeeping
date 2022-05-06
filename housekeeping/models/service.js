import Http from "../utils/Http"

class Service {
  /**
   * 
   * @param {*} page 页码
   * @param {*} count 条数
   * @param {*} category_id 分类id
   * @param {*} type 服务类型 1、在提供；2、正在找；
   */
  static getServiceList(page = 1, count = 5, category_id = null, type = null){
    return Http.request({
      url : "/v1/service/list",
      method : "GET",
      data : {
        page,
        count 
      }
    })
  }
}


export default Service
