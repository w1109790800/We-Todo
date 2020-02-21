// countdown.js
//获取应用实例
const AV = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');
const util = require('../../utils/util.js');

var app = getApp()
var init = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index_title: "哎呀 没有纪念日",
    index_day: '0',
    index_info: '00-0-0'
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#32b4fa',
    })
    var time = util.formatTime(new Date());
    console.log(time);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this
    var openid = app._user.openid;
    var nickName = app._user.wx.nickName
    wx.setStorageSync("openid", openid);
    wx.setStorageSync("username", nickName);
    var str_dsr_refresh = wx.getStorageSync("dsr_refresh");
    if (str_dsr_refresh == '1') {
      _this.setData({
        index_title: "哎呀 没有纪念日",
        index_day: '0',
        index_info: '00-0-0'
      })
      wx.setStorageSync('dsr_refresh', '0');
    }

    if (init == 1) {
      init = 0;

      var str_get_start_page = wx.getStorageSync("start_page");
      if (str_get_start_page == '正数日') {
        wx.switchTab({
          url: '../countdown_plus/countdown_plus',
        })
        return;
      }
    }
    this.OnGetCoundown();
    this.OnGetCoundownIndex();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

    return {
      title: '纪念日&正数日&纪念日',
      desc: '纪念日&正数日&纪念日&',
      path: '/pages/countdown/countdown'
    }

  },

  OnGetCoundown: function() {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    var openid = app._user.openid;
    var str_username = app._user.wx.nickName;
    const query = new AV.Query("count").equalTo('openid', openid).descending('createdAt')
    query.find().then(function(results) {
      //console.log(results)
      for (var i in results) {
        var start_date = new Date(util.formatTime(new Date()).split(" ")[0].replace(/-/g, "/"));
        var end_date = new Date(results[i].attributes.info.replace(/-/g, "/"));
        var days = end_date.getTime() - start_date.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        if (day < 0) {
          results[i].attributes.day = "已过去" + "·" + (-day);
          results[i].attributes.call = day;
          results[i].attributes.title = "过去 " + results[i].attributes.title;
        } else {
          results[i].attributes.title = "未来 " + results[i].attributes.title
          results[i].attributes.day = "还有·" + day;
          results[i].attributes.call = day;
        }
      };
      _this.setData({
        listData: results
      });
    }).catch(console.error)
    wx.hideLoading()
  }, // end of onGetLeave

  OnGetCoundownIndex: function() {
    var _this = this;
    var openid = String(app._user.openid);
    var query1 = new AV.Query('count');
    query1.equalTo('openid', openid);
    query1.find().then(function (students) {
      console.log(students)
    });
    var str_username = app._user.wx.nickName;
    
    console.log(openid)
    const query = new AV.Query("count").equalTo('openid', openid).descending('createdAt')
    query.find().then(function(results) {
      console.log(results)
      var start_date = new Date(util.formatTime(new Date()).split(" ")[0].replace(/-/g, "/"));
      var end_date = new Date(results[0].attributes.info.replace(/-/g, "/"));
      var days = end_date.getTime() - start_date.getTime();
      var day = parseInt(days / (1000 * 60 * 60 * 24));
      results[0].attributes.day = day;
      console.log(day)
      if (day < 0) {
        day = -day
      }
      _this.setData({
        index_title: results[0].attributes.title,
        index_info: results[0].attributes.info
      });
      setTimeout(function() {
        //要延时执行的代码
        var a = 2
        if (day > 1000)
          a = 5
        if (day > 2000)
          a = 9
        if (day > 4000)
          a = 14
        for (var i = 0; i <= day; i += a) {

          _this.setData({
            index_day: i,
          })

        };
        _this.setData({
          index_day: day,
        })

      }, 800)
    }).catch(console.error)




  },

  //事件处理函数
  bindViewTap: function() {
    console.log('complete');
    // 页面跳转
    wx.navigateTo({
      url: '../countdown_send/countdown_send',
    })


  },
  // 查看纪念日具体
  showDetail: function(e) {

    var data = e.currentTarget.dataset;
    wx.setStorageSync("objid", data.id);
    wx.setStorageSync("detail_tilte", data.title);
    wx.setStorageSync("detail_info", data.info);
    wx.setStorageSync("detail_day", data.day.split("·")[1]);
    wx.setStorageSync("detail_id", data.id);
    wx.setStorageSync("detail_call", data.call);
    wx.setStorageSync("detail_tip", data.tip);
    console.log(data)
    wx.setStorageSync("detail_background", data.background);



    // 页面跳转
    wx.navigateTo({
      url: '../countdown_detail/countdown_detail'
    })
  },
  OnGetConfig: function() {

  }
})