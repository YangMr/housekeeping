// 将wx.request转化称promise
function wxToPromise(method,options = {}) {
  return new Promise((resolve,reject)=>{
    options.success = resolve
    options.fail = err=>{
      reject(err)
    }
    wx[method](options)
  })
}


export default wxToPromise

