// countdown_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_title:'title',
    detail_day:'0',
    detail_info:'info',
    detail_background:'https://www.wenxingsen.com/image/20170950.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#32b4fa',
    })


    var str_detail_title = wx.getStorageSync("detail_tilte");
    var str_detail_day = wx.getStorageSync("detail_day");
    var str_detail_info = wx.getStorageSync("detail_info");
    var str_detail_tip = wx.getStorageSync("detail_tip");
    var str_detail_background = wx.getStorageSync("detail_background");

    // 把this赋值给that
    var that = this;

    that.setData(
      {
        detail_title: str_detail_tip,
        detail_day: str_detail_day,
        detail_info: str_detail_info,
        detail_background: str_detail_background
      }
    )

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

    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      success: function (res) {
        if (res.confirm) {
          that.OnDel();
        }
        else{
          return;
        }
      }
    })


  },//end of bindViewTap
  bindViewModify : function(){
    wx.navigateTo({
      url: '../countdown_edit/countdown_edit',
    })
  },//end of bindViewModify
  OnDel : function(){

    var strusername = wx.getStorageSync("username")
    var strid = wx.getStorageSync("detail_id");

    // 发送http请求
    wx.request({
      url: 'https://www.wenxingsen.com/json.php',
      data: {
        call: 'weixin',
        type: 'del_countdown',
        username: strusername,
        id: strid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 开始-数据返回回来

        console.log(res.data)

        // 延时一点时间 返回留给数据库一点时间
        setTimeout(function () {
          
          var str_detail_tip = wx.getStorageSync("detail_tip");
          if(str_detail_tip.indexOf("还有")>=0)
          {
            wx.switchTab({
              url: '../countdown/countdown',
            })

            wx.setStorageSync('dsr_refresh', '1');
          }
          else
          {
            wx.switchTab({
              url: '../countdown_plus/countdown_plus',
            })

            wx.setStorageSync('zsr_refresh', '1');
          }

        }
          , 200);


        // 结束-数据返回回来
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })


  }//end of
  ,
  OnLog : function(){

    var strusername = wx.getStorageSync("username");
    var str_detail_title = wx.getStorageSync("detail_tilte");
    var str_detail_day = wx.getStorageSync("detail_day");

    var str_log = strusername +'《'+ str_detail_title  + str_detail_day + "天》";

    // 发送http请求
    wx.request({
      url: 'https://www.wenxingsen.com/json.php',
      data: {
        from: 'weixin',
        type: 'detail',
        username: str_log,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 开始-数据返回回来

        // 结束-数据返回回来
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })


  }

})