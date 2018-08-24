// pages/nav/nav.js
const AV = require('../../utils/av-live-query-weapp-min');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  nav: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);

    const user = AV.User.current();
    wx.navigateTo({
      url: '../todos/todos',
    })
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);

  },
  nav2: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);

    const user = AV.User.current();
    wx.navigateTo({
      url: '../countdown/countdown',
    })
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);
  },
  nav3: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);

    const user = AV.User.current();
    wx.navigateTo({
      url: '../up/up',
    })
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);

  },
  nav4: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);

    const user = AV.User.current();
    wx.navigateTo({
      url: '../car_recog/car_recog',
    })
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);

  },
  nav_face: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);

    const user = AV.User.current();
    wx.navigateTo({
      url: '../face/face',
    })
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);

  },
  nav_count_people: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);

    const user = AV.User.current();
    wx.navigateTo({
      url: '../count_people/count_people',
    })
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);

  },
  nav_face_plus: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);

    const user = AV.User.current();
    wx.navigateTo({
      url: '../face++/face++',
    })
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);

  },
 Detect_Scene: function() {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);

    const user = AV.User.current();
    wx.navigateTo({
      url: '../Detect_Scene/Detect_Scene',
    })
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);

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
  
  }
})