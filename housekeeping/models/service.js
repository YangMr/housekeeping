import Http from "../utils/Http"
import Base from "./base";
class Service extends Base{
  


  /**
   * 
   * @param {*} page 页码
   * @param {*} count 条数
   * @param {*} category_id 分类id
   * @param {*} type 服务类型 1、在提供；2、正在找；
   */
  async getServiceList(category_id = null, type = null){
    const serviceList = await Http.request({
      url : "/v1/service/list",
      method : "GET",
      data : {
        page : this.page,
        count : this.count,
        category_id : category_id || "",
        type : type || ""
      }
    })

    // 数据拼接
    this.data =serviceList && serviceList.data && serviceList.data.length> 0 ? this.data.concat(serviceList.data) : []

    // this.hasMoreData 为false的话则表示已经请求到最后一页后
    this.hasMoreData =serviceList ? !(this.page === serviceList.last_page) : true

    // 页码加1
    this.page++ // 2

    // 将所有的数据返回出去
    return this.data

  }


  /**
   * 查询指定服务id的数据
   * @param {*} id 
   */
  static getServiceDetail(id){
    return Http.request({
      url : `/v1/service/${id}`,
      method : "GET"
    })
  }

  

}


export default Service








// 页码 + 1 

  // 当前的页码 等于 最后一页的页码  说明: 滚动到最后一页

  // 这个时候就不需要再次发送请求 

  // 关闭上拉加载