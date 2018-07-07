// countdown_send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    get_title:"",
    dateValue: '点击此处进行选择',
    set_type:'dsr',
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
  
    // 没有用户id 去获取用户id
    var str_openid = wx.getStorageSync("openid");
    if (str_openid.length < 1) {
      wx.switchTab({
        url: '../index/index',
      })
      return;
    }

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#32b4fa',
    })


    var str_detail_title = wx.getStorageSync("detail_tilte");
    var str_detail_info = wx.getStorageSync("detail_info");

    var that = this;
    that.setData({
      dateValue: str_detail_info, 
      get_title: str_detail_title
    })

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
  datePickerBindchange: function (e) {
    this.setData({
      dateValue: e.detail.value
    })
  },
 //事件处理函数
  bindViewTap: function () {


    var that = this;
    // 判断输入
    if (this.data.get_title.length < 1) {
      wx.showToast({
        title: '请输入倒数日主题',
        icon: 'loading',
        duration: 1000
      });
      return;
    }

    if (this.data.get_title.length > 7) {
      wx.showToast({
        title: '不建议倒数日过长,7字以内',
        icon: 'loading',
        duration: 1000
      });
      return;
    }


    if (this.data.dateValue == '点击此处进行选择') {
      wx.showToast({
        title: '请选择目标日',
        icon: 'loading',
        duration: 1000
      });
      return;
    }

    wx.showToast({
      title: '正在修改,请稍等...',
      icon: 'loading',
      duration: 1000
    });

    var strusername = wx.getStorageSync("username");
    var stropenid = wx.getStorageSync("openid");
    var strid = wx.getStorageSync("detail_id");

    // 发送http请求
    wx.request({
      url: 'https://www.wenxingsen.com/json.php',
      data: {
        call: '微信小程序',
        type: 'modify_countdown',
        username: strusername,
        title: this.data.get_title,
        info: this.data.dateValue,
        openid: stropenid,
        id: strid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 开始-数据返回回来

        console.log(res.data)

        that.setData(
          {
            set_type:res.data
          }
        )

        
        // 延时一点时间 返回留给数据库一点时间
        setTimeout(function () {
          
          if (that.data.set_type.indexOf('dsr')>0)
          {
            wx.switchTab({
              url: '../countdown/countdown',
            })
          }
          else{

            wx.switchTab({
              url: '../countdown_plus/countdown_plus',
            })
          }

          that.setData(
            {
              dateValue: '点击此处进行选择',
            }
          )
          

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


  },
  //end of 
  input_title: function (e) {
    this.setData({
      get_title: e.detail.value
    })
  },
  //end of 
  bindCancel : function() {
    wx.navigateBack({
      delta: 1,
    })
  }
  //end of bindCancel


})