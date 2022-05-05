// components/tabs/tabs.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs : Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab : 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabChange(event){
      const index = event.currentTarget.dataset.index
      this.setData({currentTab : index})
      this.triggerEvent("change",{index})
    },
    hanleTouchMove(event){
      // 获取滑动的方向 1 前进 -1后台
      let direction = event.direction

      // 获取当前tab的下标
      let currentTabIndex = this.data.currentTab   

      // 获取滑动之后的下标
      let targetTabIndex = currentTabIndex + direction

      // 判断滑动之后的下标如果小于 0  或者 滑动之后的下标如果大于 2  
      if(targetTabIndex < 0 || targetTabIndex > this.data.tabs.length - 1){
        return 
      }

      const customEvent = {
        currentTarget : {
          dataset : {
            index : targetTabIndex
          }
        }
      }

      this.handleTabChange(customEvent)

    }
  }
})
