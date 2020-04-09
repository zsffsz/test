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
    item:{
      jw:[],
      kq:[],
      hd:[],
      ks:[],
      unchat: 2,
    },
    touched: false,
    stu_id: 17052231,
    city:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      wx.getLocation({
                        type: 'wgs84',
                        success(res) {
                          const latitude = res.latitude
                          const longitude = res.longitude
                          qqmapsdk.reverseGeocoder({
                            localtion:{
                              latitude:latitude,
                              longitude:longitude
                            },
                            success:function(res){
                              that.setData({city:res.result.address_component.city.substr(0, 2)})
                              that.getMessage();
                            }
                          })
                        }
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              const latitude = res.latitude
              const longitude = res.longitude
              qqmapsdk.reverseGeocoder({
                localtion: {
                  latitude: latitude,
                  longitude: longitude
                },
                success: function (res) {
                  that.setData({ city: res.result.address_component.city.substr(0, 2) })
                  that.getMessage();
                }
              })
            }
          })
        }
        else {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              const latitude = res.latitude
              const longitude = res.longitude
              qqmapsdk.reverseGeocoder({
                localtion: {
                  latitude: latitude,
                  longitude: longitude
                },
                success: function (res) {
                  that.setData({ city: res.result.address_component.city.substr(0, 2) })
                  that.getMessage();
                }
              })
            }
          })
        }
      }
    })
    
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
  touch(){
    this.setData({
      touched:true
    });
  },
  untouch(){
    this.setData({
      touched:false
    });
  },
  touchover(){
    wx.navigateTo({
      url: '../chatRoom/chatRoom',
      success:function(){
        console.log("success")
      },
      fail:function(){
        console.log("fail")
      }
    })
  },
  jwmessTouch(event){
    var that=this;
    var index=event.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../messageRoom/messageRoom?tz=jwtz&jw=' + JSON.stringify(that.data.item.jw[index]),
      success: function () {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  },
  kqmessTouch(event) {
    var that = this;
    var index = event.currentTarget.dataset['index'];
    console.log(that.data.city)
    wx.navigateTo({
      url: '../messageRoom/messageRoom?tz=kqtz&kq=' + JSON.stringify(that.data.item.kq[index])+'&city='+that.data.city,
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
  getMessage(){
    var that=this;
    var jwtz=[];
    var kqtz=[];
    var hdtz=[];
    var kstz=[];
    console.log(that.data)
    wx.request({
      url: 'http://39.108.13.26:8000/message',
      method:'GET',
      success:function(res){
        var resu=res;
        for(var i=0;i<res.data.length;i++){
          switch(res.data[i].type){
            case 0:{
              jwtz.push({
                "jwTitle":res.data[i].title,
                "jwCtx":res.data[i].content.substr(0,50)+'...',
                "jwImg":res.data[i].image_url,
                "jwFullCtx":res.data[i].content
              });
            }; break;
            case 1:{
              kstz.push({
                "ksTitle": res.data[i].title,
                "ksCtx": res.data[i].content,
                "ksImg": res.data[i].image_url
              });
            }; break;
            case 2:{
              hdtz.push({
                "hdTitle": res.data[i].title,
                "hdCtx": res.data[i].content,
                "hdImg": res.data[i].image_url
              });
            }; break;
            case 3: {
              wx.request({
                url: 'http://39.108.13.26:8000/weather/'+that.data.city,
                method: 'GET',
                success: function (response) {
                  var sctx = `天气:${response.data.data.forecast[0].type} 温度:${response.data.data.wendu} 湿度:${response.data.data.shidu} PM2.5:${response.data.data.pm25} 空气指数:${response.data.data.quality} 建议:${response.data.data.ganmao}`
                  kqtz.push({
                    "kqTitle": resu.data[i-1].title,
                    "kqCtx": sctx,
                    "kqImg": resu.data[i-1].image_url,
                    "kqFullCtx": JSON.stringify(response.data.data)
                  });
                  that.setData({
                    ["item.kq"]:kqtz
                  })
                }
              })
            }; break;
          }
        }
        that.setData({
          ["item.jw"]:jwtz,
          ["item.hd"]:hdtz,
          ["item.ks"]:kstz
        })
      }
    })
  },
  onPullDownRefresh() {
    var that=this;
    that.getMessage();
  }
})