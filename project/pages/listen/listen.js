
var app = getApp();
const audioCtx = wx.createInnerAudioContext();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        isplay:false,
        currentTime:0,
        duration:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    
          var s='https://musictrans.top/downloads/'+app.globalData.username+'/mid/'+app.globalData.midfilename
          console.log(s)
          audioCtx.src=s
         /* wx.downloadFile({
            url: 'https://musictrans.top/downloads/'+app.globalData.username+'/mid/'+app.globalData.midfilename,
            timeout:300000,//5分钟
            success: function (res) {
                wx.hideLoading({
                })
                wx.showToast({
                  title: '下载完成！',
                })
              console.log("成功获取wav文件网站地址")
              const filePath = res.tempFilePath
              console.log(filePath)
              audioCtx.src=filePath
              },
            fail: function (res) { 
                console.log(res)
                console.log('获取失败')
                wx.hideLoading({
                })
                wx.showToast({
                  title: '获取文件失败！',
                })
              }
          })*/
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        
        console.log(audioCtx.src)
        audioCtx.onTimeUpdate(()=>{
            this.setData({
                duration:audioCtx.duration,
                currentTime:Math.floor(audioCtx.currentTime),
            })
            console.log(this.data.currentTime)
          })
          
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        audioCtx.pause()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        audioCtx.pause()
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    
    goback:function(){
        wx.request({
          url: 'https://musictrans.top/delete/'+app.globalData.username,
          success:(res)=>{
              console.log(res)
          }
        })
        wx.redirectTo({
          url: '../list/list'
        })
    },
    //播放
  audioPlay () {
    audioCtx.play();    
    this.setData({
      isPlay:true
    })
  },
  // 停止播放
  audioPause () {
   audioCtx.pause()
    this.setData({
      isPlay:false
    })
  },
  bindchanging(e){
        
  },

  //拖动滑块结束
  bindchange(e){
    audioCtx.seek(e.detail.value);
    this.data.currentTime=audioCtx.currentTime;
  },

  getpdf(){
    //打开pdf文件
  wx.showLoading({
      title: '加载中...',
    })
    wx.downloadFile({
      url: 'https://musictrans.top/downloads/'+app.globalData.username+'/pdf/'+app.globalData.midfilename,
      success: function (res) {
        console.log("成功获取pdf网站地址")
        const filePath = res.tempFilePath
        console.log(filePath)
        wx.openDocument({
          filePath: filePath,
          showMenu: true,
          success: function (res) {
            console.log(res);
            console.log('打开文档成功')
            wx.hideLoading()
          },
          fail: function (res) { 
            console.log('打开失败');
            wx.hideLoading({
            })
            wx.showToast({
              title: '获取文件失败！',
            })
          },
        })
      },
      fail: function (res) { 
          console.log('获取失败')
          wx.hideLoading({
          })
          wx.showToast({
            title: '获取文件失败！',
          })
        }
    })
  }
})