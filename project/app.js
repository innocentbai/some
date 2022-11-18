// app.js

App({
    globalData: {
        userInfo: null,
        picture_path:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.niupiano.com%2F2020_9_17_9_28_11_%E7%A8%BB%E9%A6%99-C%E8%B0%83%E7%AE%80%E5%8D%95%E7%89%88-%E4%BA%94%E7%BA%BF%E8%B0%B1-C%E8%B0%83-1%E9%A1%B5.jpg&refer=http%3A%2F%2Ffile.niupiano.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668600445&t=0d7ba82bbce98539a8c6397fb58727fd",
        tone:"",
        mode:"",
        midfilename:"",
        username:"0000000"
      },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.globalData.username="123"
    var that=this
    // 登录
    wx.login({
      success: res => {
        that.globalData.username=res.code.slice(4,11)
      }
    })
  },
  onHide() {
      var that=this
      console.log("此时调用app中的调试")
    /*wx.request({
        url: 'https://musictrans.top'+'/delete/'+that.globalData.username,
        method:"GET",
        data:{
            a:that.globalData.username
        },  
        success:res=>{
           console.log(res)
        }
      })*/
},
})
