  // 节流
  function throttle(callback, wait = 1000) {
    let lastTime = 0
    return function () {
      let self = this
      let nowTime = new Date().getTime()
      if (nowTime - lastTime > wait) {
        callback.call(self,...arguments)
        lastTime = nowTime
      }
    }
  }


  // 防抖
  function debounce(callback,wait = 1000) {
    let timer = null
    return function () {
      clearTimeout(timer)
      let self = this
      timer = setTimeout(()=>{
        callback.call(self,...arguments)
      },wait)
    }
  }

  export {throttle,debounce}