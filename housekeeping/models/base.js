class Base{
  page = 1
  count = 4
  data = []
  // hasMoreData 为false表示已经加载到最后一页
  hasMoreData = true


  reset(){
    this.page = 1
    this.count = 4
    this.data = []
    this.hasMoreData = true
    return this
  }
}

export default Base