// countdown.js
//获取应用实例
const AV = require('../../utils/av-live-query-weapp-min');
const count = require('../../model/count');
const Done = require('../../model/done');
const bind = require('../../utils/live-query-binding');
const util = require('../../utils/util.js');

var app = getApp()
var init = 1;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index_title:"哎呀 没有倒数日",
    index_day:'0',
    index_info:'00-0-0'
  },
  login: function () {
    var _this = this;

    const user = AV.User.current();
    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user => user ? user : AV.User.loginWithWeapp()).catch(error => console.error(error.message));

    const a = JSON.parse(user._hashedJSON.authData);
    var str_openid = a.lc_weapp.openid;
    wx.setStorageSync("openid", str_openid);
    wx.setStorageSync("username", user.attributes.nickName);
    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user => user ? user : AV.User.loginWithWeapp()).catch(error => console.error(error.message));

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
  onReady: function () {


  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    // 没有用户id 去获取用户id
    const user = AV.User.current();
    console.log(user);
    const a = JSON.parse(user._hashedJSON.authData);
    var str_openid = a.lc_weapp.openid;
    wx.setStorageSync("openid", str_openid);
    wx.setStorageSync("username", user.attributes.nickName);
    console.log(str_openid);
    var str_dsr_refresh = wx.getStorageSync("dsr_refresh");
    if(str_dsr_refresh == '1')
    {
      var that = this;
      that.setData(
        {
          index_title: "哎呀 没有倒数日",
          index_day: '0',
          index_info: '00-0-0'
        }
      )

      wx.setStorageSync('dsr_refresh', '0');
    }
    
    if (init == 1)
    {
      init = 0;

      var str_get_start_page = wx.getStorageSync("start_page");
      if (str_get_start_page == '正数日') 
      {
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

    return {
      title: '倒数日&正数日&纪念日',
      desc: '倒数日&正数日&纪念日&',
      path: '/pages/countdown/countdown'
    }
  
  },

  OnGetCoundown: function () {
    const user = AV.User.current();
    const a = JSON.parse(user._hashedJSON.authData);
    var str_openid = a.lc_weapp.openid;
    // 把this赋值给that
    var that = this;
    var str_username = user.attributes.nickName;
    var stropenid = str_openid;
    console.log(str_username, stropenid);
        var _this = this;
   // const query = new AV.Query("count")
     // .equalTo('openid', stropenid)
      //.descending('createdAt');
      
        const query = new AV.Query("count").equalTo('openid', stropenid)

        //console.log( query.find().then(result => this.setData({ listData: result })).catch(console.error));
        //console.log(query.find())
        var _this = this;
        query.find().then(function (results) {
          for (var i in results) {
            var start_date = new Date(util.formatTime(new Date()).split(" ")[0].replace(/-/g, "/"));
            var end_date = new Date(results[i].attributes.info.replace(/-/g, "/"));
            var days = end_date.getTime() - start_date.getTime();
            var day = parseInt(days / (1000 * 60 * 60 * 24));
            results[i].attributes.day = day;
            console.log(day)
          };

          _this.setData({ listData: results });
          console.log("in", results);

        }).catch(console.error)


  },// end of onGetLeave

  OnGetCoundownIndex: function () {

    // 把this赋值给that
    var that = this;
    var str_username = wx.getStorageSync("username");
    var stropenid = wx.getStorageSync("openid");
    // 发送http请求
    const user = AV.User.current();
    const a = JSON.parse(user._hashedJSON.authData);
    var str_openid = a.lc_weapp.openid;
    // 把this赋值给that
    var that = this;
    var str_username = user.attributes.nickName;
    var stropenid = str_openid;
    console.log(str_username, stropenid);
    var _this = this;
    // const query = new AV.Query("count")
    // .equalTo('openid', stropenid)
    //.descending('createdAt');

    const query2 = new AV.Query("count").equalTo('openid', stropenid).descending('createdAt')

    //console.log( query.find().then(result => this.setData({ listData: result })).catch(console.error));
    //console.log(query.find())
    var _this = this;
    query2.find().then(function (results) {
        var start_date = new Date(util.formatTime(new Date()).split(" ")[0].replace(/-/g, "/"));
        var end_date = new Date(results[0].attributes.info.replace(/-/g, "/"));
        var days = end_date.getTime() - start_date.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        results[0].attributes.day = day;
        console.log(day)

      console.log("in", results);
      that.setData(
        {
          index_title: results[0].attributes.title,
          index_day:   day,
          index_info:  results[0].attributes.info
        }
      )

    }).catch(console.error)




  },

  //事件处理函数
  bindViewTap: function () {
    console.log('complete');
    // 页面跳转
    wx.navigateTo({
      url: '../countdown_send/countdown_send',
    })


  },
  // 查看倒数日具体
  showDetail: function (e)
  {

    var data = e.currentTarget.dataset;

    wx.setStorageSync("detail_tilte", data.title);
    wx.setStorageSync("detail_info", data.info);
    wx.setStorageSync("detail_day", data.day);
    wx.setStorageSync("detail_id", data.id);
    wx.setStorageSync("detail_tip", data.tip);
    
    wx.setStorageSync("detail_background", data.background);

    console.log(data.background);


    // 页面跳转
    wx.navigateTo({
      url: '../countdown_detail/countdown_detail'
    })
  },
  OnGetConfig :function()
 {
   
 }
})