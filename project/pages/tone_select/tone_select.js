var app = getApp();
const audioCtx_violin = wx.createInnerAudioContext();
const audioCtx_piano = wx.createInnerAudioContext();
const audioCtx_harmonica = wx.createInnerAudioContext();
const audioCtx_guitar = wx.createInnerAudioContext();
const audioCtx_electricguitar = wx.createInnerAudioContext();
const audioCtx_trumpet = wx.createInnerAudioContext();
const audioCtx_flute = wx.createInnerAudioContext();
const audioCtx_saxophone = wx.createInnerAudioContext();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        violin_flag:0,
        piano_flag:0,
        harmonica_flag:0,
        flute_flag:0,
        saxophone_flag:0,
        trumpet_flag:0,
        electricguitar_flag:0,
        guitar_flag:0,
        violin_isplay:false,
        violin_currentTime:0,
        violin_duration:0,
        piano_isplay:false,
        piano_currentTime:0,
        piano_duration:0,
        harmonica_isplay:false,
        harmonica_currentTime:0,
        harmonica_duration:0,
        guitar_isplay:false,
        guitar_currentTime:0,
        guitar_duration:0,
        electricguitar_isplay:false,
        electricguitar_currentTime:0,
        electricguitar_duration:0,
        trumpet_isplay:false,
        trumpet_currentTime:0,
        trumpet_duration:0,
        flute_isplay:false,
        flute_currentTime:0,
        flute_duration:0,
        saxophone_isplay:false,
        saxophone_currentTime:0,
        saxophone_duration:0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        /*audioCtx_violin.src='https://musictrans.top/samples/violin';
        audioCtx_piano.src='https://musictrans.top/samples/acoustic piano';
        audioCtx_harmonica.src='https://musictrans.top/samples/harmonica';
        audioCtx_guitar.src='https://musictrans.top/samples/acoustic guitar';
        audioCtx_electricguitar.src='https://musictrans.top/samples/electric guitar';
        audioCtx_trumpet.src='https://musictrans.top/samples/trumpet';
        audioCtx_flute.src='https://musictrans.top/samples/flute';
        audioCtx_saxophone.src='https://musictrans.top/samples/saxophone';*/
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
        audioCtx_violin.onTimeUpdate(()=>{
            this.setData({
               violin_duration:audioCtx_violin.duration,
               violin_currentTime:Math.floor(audioCtx_violin.currentTime),
            })
          })
          audioCtx_piano.onTimeUpdate(()=>{
            this.setData({
               piano_duration:audioCtx_piano.duration,
               piano_currentTime:Math.floor(audioCtx_piano.currentTime),
            })
          })
          audioCtx_harmonica.onTimeUpdate(()=>{
            this.setData({
                harmonica_duration:audioCtx_harmonica.duration,
                harmonica_currentTime:Math.floor(audioCtx_harmonica.currentTime),
            })
          })
          audioCtx_guitar.onTimeUpdate(()=>{
            this.setData({
                guitar_duration:audioCtx_guitar.duration,
                guitar_currentTime:Math.floor(audioCtx_guitar.currentTime),
            })
          })
          audioCtx_electricguitar.onTimeUpdate(()=>{
            this.setData({
                electricguitar_duration:audioCtx_electricguitar.duration,
                electricguitar_currentTime:Math.floor(audioCtx_electricguitar.currentTime),
            })
          })
          audioCtx_trumpet.onTimeUpdate(()=>{
            this.setData({
                trumpet_duration:audioCtx_trumpet.duration,
                trumpet_currentTime:Math.floor(audioCtx_trumpet.currentTime),
            })
          })
          audioCtx_flute.onTimeUpdate(()=>{
            this.setData({
                flute_duration:audioCtx_flute.duration,
                flute_currentTime:Math.floor(audioCtx_flute.currentTime),
            })
          })
          audioCtx_saxophone.onTimeUpdate(()=>{
            this.setData({
                saxophone_duration:audioCtx_saxophone.duration,
                saxophone_currentTime:Math.floor(audioCtx_saxophone.currentTime),
            })
          })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        audioCtx_violin.pause()
        audioCtx_piano.pause()
        audioCtx_harmonica.pause()
        audioCtx_guitar.pause()
        audioCtx_electricguitar.pause()
        audioCtx_trumpet.pause()
        audioCtx_flute.pause()
        audioCtx_saxophone.pause()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
        audioCtx_violin.pause()
        audioCtx_piano.pause()
        audioCtx_harmonica.pause()
        audioCtx_guitar.pause()
        audioCtx_electricguitar.pause()
        audioCtx_trumpet.pause()
        audioCtx_flute.pause()
        audioCtx_saxophone.pause()
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

    piano:function(){
        app.globalData.tone="acoustic_piano",
        wx.redirectTo({
          url: '../upload/upload'
        })
    },
    harmonica:function(){
        app.globalData.tone="harmonica",
        wx.redirectTo({
          url: '../upload/upload'
        })
    },
    guitar:function(){
        app.globalData.tone="acoustic_guitar",
        wx.redirectTo({
          url: '../upload/upload'
        })
    },
    electricguitar:function(){
        app.globalData.tone="electric_guitar",
        wx.redirectTo({
          url: '../upload/upload'
        })
    },
    trumpet:function(){
        app.globalData.tone="trumpet",
        wx.redirectTo({
          url: '../upload/upload'
        })
    },
    flute:function(){
        app.globalData.tone="flute",
        wx.redirectTo({
          url: '../upload/upload'
        })
    },
    saxophone:function(){
        app.globalData.tone="saxophone",
        wx.redirectTo({
          url: '../upload/upload'
        })
    },
    violin:function(){
        app.globalData.tone="violin",
        wx.redirectTo({
          url: '../upload/upload'
        })
    },
    
    violin_audioPlay () {
        if(this.data.violin_flag==0){
            audioCtx_violin.src='https://musictrans.top/samples/violin';
            this.setData({
                violin_flag:1
              })
        }
        console.log(this.data.violin_isplay)
        if(this.data.violin_isplay==false){
        audioCtx_violin.play();    
        this.setData({
          violin_isplay:true
        })
    }
      },
    piano_audioPlay () {
        if(this.data.piano_flag==0){
        audioCtx_piano.src='https://musictrans.top/samples/acoustic_piano';
        this.setData({
            piano_flag:1
          })
    }
        console.log(this.data.piano_isplay)
        if(this.data.piano_isplay==false){
        audioCtx_piano.play();    
        this.setData({
          piano_isplay:true
        })
    }
    },
    harmonica_audioPlay () {
        if(this.data.harmonica_flag==0){
            audioCtx_harmonica.src='https://musictrans.top/samples/harmonica';
            this.setData({
                harmonica_flag:1
              })
        }
        console.log(this.data.harmonica_isplay)
        if(this.data.harmonica_isplay==false){
        audioCtx_harmonica.play();    
        this.setData({
            harmonica_isplay:true
        })
    }
    },
    guitar_audioPlay () {
        if(this.data.guitar_flag==0){
            audioCtx_guitar.src='https://musictrans.top/samples/acoustic_guitar';
            this.setData({
                guitar_flag:1
              })
        }
        console.log(this.data.guitar_isplay)
        if(this.data.guitar_isplay==false){
        audioCtx_guitar.play();    
        this.setData({
            guitar_isplay:true
        })
    }
    },
    electricguitar_audioPlay () {
        if(this.data.electricguitar_flag==0){
            audioCtx_electricguitar.src='https://musictrans.top/samples/electric_guitar';
            this.setData({
                electricguitar_flag:1
              })
        }
        console.log(this.data.electricguitar_isplay)
        if(this.data.electricguitar_isplay==false){
        audioCtx_electricguitar.play();    
        this.setData({
            electricguitar_isplay:true
        })
    }
    },
    trumpet_audioPlay () {
        if(this.data.trumpet_flag==0){
            audioCtx_trumpet.src='https://musictrans.top/samples/trumpet';
            this.setData({
                trumpet_flag:1
              })
        }
        console.log(this.data.trumpet_isplay)
        if(this.data.trumpet_isplay==false){
        audioCtx_trumpet.play();    
        this.setData({
            trumpet_isplay:true
        })
    }
    },
    flute_audioPlay () {
        if(this.data.flute_flag==0){
            audioCtx_flute.src='https://musictrans.top/samples/flute';
            this.setData({
                flute_flag:1
              })
        }
        console.log(this.data.flute_isplay)
        if(this.data.flute_isplay==false){
        audioCtx_flute.play();    
        this.setData({
            flute_isplay:true
        })
    }
    },
    saxophone_audioPlay () {
        if(this.data.saxophone_flag==0){
            audioCtx_saxophone.src='https://musictrans.top/samples/saxophone';
            this.setData({
                saxophone_flag:1
              })
        }
        console.log(this.data.saxophone_isplay)
        if(this.data.saxophone_isplay==false){
        audioCtx_saxophone.play();    
        this.setData({
            saxophone_isplay:true
        })
    }
    },
      // 停止播放
      violin_audioPause () {
          console.log(this.data.violin_isplay)
          if(this.data.violin_isplay==true){
        audioCtx_violin.pause()
        this.setData({
          violin_isplay:false
        })
    }
      },
    piano_audioPause () {
        console.log(this.data.piano_isplay)
        if(this.data.piano_isplay==true){
      audioCtx_piano.pause()
      this.setData({
        piano_isplay:false
      })
     }
    },
    harmonica_audioPause () {
        console.log(this.data.harmonica_isplay)
        if(this.data.harmonica_isplay==true){
      audioCtx_harmonica.pause()
      this.setData({
        harmonica_isplay:false
      })
     }
    },
    guitar_audioPause () {
        console.log(this.data.guitar_isplay)
        if(this.data.guitar_isplay==true){
      audioCtx_guitar.pause()
      this.setData({
        guitar_isplay:false
      })
     }
    },
    electricguitar_audioPause () {
        console.log(this.data.electricguitar_isplay)
        if(this.data.electricguitar_isplay==true){
      audioCtx_electricguitar.pause()
      this.setData({
        electricguitar_isplay:false
      })
     }
    },
    trumpet_audioPause () {
        console.log(this.data.trumpet_isplay)
        if(this.data.trumpet_isplay==true){
      audioCtx_trumpet.pause()
      this.setData({
        trumpet_isplay:false
      })
     }
    },
    flute_audioPause () {
        console.log(this.data.flute_isplay)
        if(this.data.flute_isplay==true){
      audioCtx_flute.pause()
      this.setData({
        flute_isplay:false
      })
     }
    },
    saxophone_audioPause () {
        console.log(this.data.saxophone_isplay)
        if(this.data.saxophone_isplay==true){
      audioCtx_saxophone.pause()
      this.setData({
        saxophone_isplay:false
      })
     }
    },
})