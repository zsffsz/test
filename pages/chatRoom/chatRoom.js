// pages/afterclass/afterclass.js
var QQMapWX = require('../../map/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'ZCFBZ-OZFCX-7I64J-THWE4-FUHYJ-UCFF4'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      hd: [],
      ks: []
    },
    touched: false,
    stu_id: 17052231
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getMessage();
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

  },
  touch() {
    this.setData({
      touched: true
    });
  },
  untouch() {
    this.setData({
      touched: false
    });
  },
  touchover() {
    wx.navigateTo({
      url: '../chatRoom/chatRoom',
      success: function () {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  },
  hdmessTouch(event) {
    var that = this;
    var index = event.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../messageRoom/messageRoom?tz=hdtz&hd=' + JSON.stringify(that.data.item.hd[index]),
      success: function () {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  },
  ksmessTouch(event) {
    var that = this;
    var index = event.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../messageRoom/messageRoom?tz=kstz&ks=' + JSON.stringify(that.data.item.ks[index]),
      success: function () {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  },
  getMessage() {
    var that = this;
    var hdtz = [];
    var kstz = [];
    console.log(that.data)
    wx.request({
      url: 'http://39.108.13.26:8000/fjmessage',
      method: 'GET',
      success: function (res) {
        var resu = res;
        for (var i = 0; i < res.data.length; i++) {
          switch (res.data[i].type) {
            case 1: {
              kstz.push({
                "ksTitle": res.data[i].title,
                "ksCtx": res.data[i].content.substr(0,50)+'...',
                "ksImg": res.data[i].image_url,
                "ksFullCtx": res.data[i].content
              });
            }; break;
            case 2: {
              hdtz.push({
                "hdTitle": res.data[i].title,
                "hdCtx": res.data[i].content.substr(0,50)+'...',
                "hdImg": res.data[i].image_url,
                "hdFullCtx": res.data[i].content
              });
            }; break;
          }
        }
        that.setData({
          ["item.hd"]: hdtz,
          ["item.ks"]: kstz
        })
      }
    })
  },
  onPullDownRefresh() {
    var that = this;
    that.getMessage();
  }
})