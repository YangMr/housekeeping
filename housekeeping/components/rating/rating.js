// components/rating/rating.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 定义星星的数量
    count : {
      type : Number,
      value : 5
    },
    // 定义选中的星星个数
    selected : {
        type : Number,
        value : 0
    },
    // 星星的大小
    size : {
        type : String,
        value : 40
    },
    // 星星的默认颜色
    defaultColor : {
        type : String,
        value : "#888888"
    },
    // 选中星星的颜色
    selectedColor : {
        type : String,
        value : "#f3d066"
    },
    // 图标
    icon : {
        type : String,
        value : 'star'
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

  }
})
