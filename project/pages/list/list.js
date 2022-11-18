// pages/list/list.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
    goclassic:function(){
        app.globalData.mode="classic",
        wx.navigateTo({
          url: '../tone_select/tone_select'
        })
    },
    handleShowModal() {
        wx.showModal({
          title: '尚未部署',
          content: '  该功能尚未应用，可线下在本机运行',//提示的内容
          success: function(res) {
            if(res.confirm) {
              console.log('用户点击了确定')
            } else if(res.cancel) {
              console.log('用户点击了取消')
            }
          }
        })
      },
    gopiano2:function(){
        app.globalData.mode="piano2",
        wx.navigateTo({
          url: '../tone_select/tone_select'
        })
    },
    gostream:function(){
        app.globalData.mode="stream",
        wx.redirectTo({
          url: '../tone_select/tone_select'
        })
    }
})