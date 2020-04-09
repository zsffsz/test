// pages/messageRoom/messageRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    title:'',
    ctx:'',
    tmp:'',
    txt:'',
    city:'',
    sc:'',
    hum:'',
    fl:'',
    fx:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.tz=='jwtz'){
      options.jw = JSON.parse(options.jw);
      this.setData({
        type:"出行建议",
        title:options.jw.jwTitle,
        ctx:options.jw.jwFullCtx
      })
    } else if (options.tz == 'kqtz') {
      options.kq = JSON.parse(options.kq);
      let dt=JSON.parse(options.kq.kqFullCtx);
      this.setData({
        type: "天气预报",
        title: options.kq.kqTitle,
        daily_forecast: dt.forecast,
        city: options.city,
        txt: options.kq.kqCtx,
        fx: dt.forecast[0].fx,
        sc: dt.forecast[0].fl,
        hum: dt.shidu,
        tmp: dt.wendu,
        fl: dt.forecast[0].high
      })
      console.log(dt)
    } else if (options.tz == 'hdtz') {
      options.hd = JSON.parse(options.hd);
      this.setData({
        type: "活动通知",
        title: options.hd.hdTitle,
        ctx: options.hd.hdFullCtx
      })
    } else if (options.tz == 'kstz') {
      options.ks = JSON.parse(options.ks);
      this.setData({
        type: "放假通知",
        title: options.ks.ksTitle,
        ctx: options.ks.ksFullCtx
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})