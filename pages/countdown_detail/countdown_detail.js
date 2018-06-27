// countdown_detail.js
const AV = require('../../utils/av-live-query-weapp-min');
Page({


  /**
   * 页面的初始数据
   */
  data: {
    detail_title:'title',
    detail_day:'0',
    detail_info:'info',
    detail_background:'https://oss2.wangyuyang.top/20170950.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#32b4fa',
    })
    var bojid = wx.getStorageSync("objid");
    var str_detail_title = wx.getStorageSync("detail_tilte").split(" ")[1];
    var str_detail_day = wx.getStorageSync("detail_day").replace(/\s+/g, '');
    var str_detail_info = wx.getStorageSync("detail_info").replace(/\s+/g, '');
    var str_detail_tip = wx.getStorageSync("detail_tip").replace(/\s+/g, '');
    var str_detail_background = wx.getStorageSync("detail_background");
    console.log(str_detail_title);
    // 把this赋值给that
    var that = this;
    if (str_detail_background != ""){
    that.setData(
      {
        detail_title: str_detail_title,
        detail_background: str_detail_background,
        detail_info: str_detail_info,
        
      })
    }
    else{
      var a = [
        "http://oss2.wangyuyang.top/234/20180626204855%20(1).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(2).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(3).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(4).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(5).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(6).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(7).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(8).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(9).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(10).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(11).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(12).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(13).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(14).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(15).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(16).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(17).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(18).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(19).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(20).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(21).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(22).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(23).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(24).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(25).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(26).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(27).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(28).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(29).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(30).jpg ",
        "http://oss2.wangyuyang.top/234/20180626204855%20(31).jpg ",
]
      var random = Math.floor(Math.random() * 30); 
      console.log(random);
      that.setData(
        {
          detail_title: str_detail_title,
          detail_background: a[random],
          detail_info: str_detail_info,

        })
    }
    setTimeout(function () {
      //要延时执行的代码
      var a = 2
      if (str_detail_day>1000)
      a = 5
      if (str_detail_day > 2000)
        a = 9
      if (str_detail_day > 4000)
        a = 14
      for (var i = 0; i <= str_detail_day; i += a) {

        that.setData(
          {
            detail_day: i,
          })

      };
      that.setData(
        {
          detail_day: str_detail_day,
        })

    }, 780)



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
    var str_openid = wx.getStorageSync("openid");
    if (str_openid.length < 1) {
      wx.switchTab({
        url: '../index/index',
      })

      return;
    }

    this.OnLog();
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    return {
      title: '倒数日&正数日&纪念日',
      desc: '倒数日&正数日&纪念日&',
      path: '/pages/countdown/countdown'
    }
  },
  onShareAppMessage: function () {


    return {
      title: '倒数日&正数日&纪念日',
      desc: '倒数日&正数日&纪念日&',
      path: '/pages/countdown/countdown'
    }
  
  },
  //事件处理函数
  bindViewTap: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(function (file) {
          file => console.log(file.url())
          var bojid = wx.getStorageSync("objid");
          console.log(bojid);
          var img = AV.Object.createWithoutData('count', bojid);
          // 修改属性
          img.set('url', file.url());
          img.save();
          that.setData(
            {
             
              detail_background: file.url(),
          

            })
        }
          ).catch(console.error);
      }
    });
    console.log("S")

  },
//end of bindViewTap
  bindViewModify : function(){
    wx.navigateTo({
      url: '../countdown_edit/countdown_edit',
    })
  },//end of bindViewModify
  OnDel : function(){

    var strusername = wx.getStorageSync("username")
    var strid = wx.getStorageSync("detail_id");

    // 发送http请求
    


        // 结束-数据返回回来



  }//end of
  ,
  OnLog : function(){

    var strusername = wx.getStorageSync("username");
    var str_detail_title = wx.getStorageSync("detail_tilte");
    var str_detail_day = wx.getStorageSync("detail_day");

    var str_log = strusername +'《'+ str_detail_title  + str_detail_day + "天》";

    // 发送http请求


  }

})