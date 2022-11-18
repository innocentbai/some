// pages/piano1/piano1.js
var flag=0
var app = getApp();
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        path:"",
        tone:"",
        mode:"",
        string:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

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

    getpath(){
      this.data.tone=app.globalData.tone,
        this.data.mode=app.globalData.mode,
        this.data.string='https://musictrans.top'+'/uploads/'+app.globalData.username+'/'+this.data.mode+'/'+this.data.tone
        console.log(this.data.string)
       //控制台打印，方便调试*/
        wx.chooseMessageFile({        
            count: 1,
            type: 'file',
            success :(res) =>{
                console.log( res)
                const tempFilePaths =  res.tempFiles[0].path
                wx.showLoading({
                    title: '正在上传...',
                  })
                wx.uploadFile({
                    url: this.data.string,
                    filePath: tempFilePaths,
                    name: 'file',
                   success: (res)=>{
                       console.log(res)
                       if(res.data=="format error"){
                        wx.showToast({
                            title: '文件格式不合法！',
                            icon: 'error',
                            duration: 4000 //持续的时间
                        })  
                       }
                       else{
                        wx.showToast({
                            title: '成功上传！',
                            icon: 'success',
                            duration: 4000 //持续的时间
                        })  
                        app.globalData.midfilename=res.data
                        console.log(app.globalData.midfilename)
                        wx.navigateTo({
                            url: '../finalchoice/finalchoice'
                          })
                       }
                       wx.hideLoading({
                    })  
                    
                    },
                    fail: function(error) {
                        wx.hideLoading({
                        })
                        console.log(error)
                        wx.showToast({
                            title: '上传失败！',
                            icon: 'error',
                            duration: 4000 //持续的时间
                        }) 
                  }
                })
            }
            
          })
        }
})