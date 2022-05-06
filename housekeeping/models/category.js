import Http from "../utils/Http"

class Category{
  /**
   * 获取分类列表
   */
  static getCategoryList(){
    return Http.request({
      url : "/v1/category",
      method : "GET"
    })
  }

  /**
   * 获取全部分类数据
   */
  static async getCategoryListWithAll(){
    const categoryList = await Category.getCategoryList()
    categoryList.unshift({id : 0, name : "全部"})
    return categoryList
  }
}

export default Category