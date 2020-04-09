// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    celldata: [{
      imagesrc: "./../../img/arrow_right.png",
      imagename: "科学计算器",
      imgts:"tscalc",
      imgte:"tecalc",
      imgto:"tocalc"
    }, {
        imagesrc: "./../../img/arrow_right.png",
      imagename: "码制过程运算"
    }, {
        imagesrc: "./../../img/arrow_right.png",
      imagename: "扫雷"
    }, {
        imagesrc: "./../../img/arrow_right.png",
      imagename: "还没想好"
    }, {
        imagesrc: "./../../img/arrow_right.png",
      imagename: "还没想好"
    }, {
        imagesrc: "./../../img/arrow_right.png",
        imagename: "还没想好"
    }],
    touched:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  tscalc() {
    this.setData({
      touched: true
    });
  },
  tecalc() {
    this.setData({
      touched: false
    });
  },
  tocalc() {
    wx.navigateTo({
      url: '../calc/calc',
      success: function () {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  }
})