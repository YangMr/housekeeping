// components/category/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categoryList : {
      type : Array,
      value : []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCategoryChange(event){
      const id = event.currentTarget.dataset.id
      this.triggerEvent("change",{id})
    }
  }
})
