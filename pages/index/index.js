//login.js
//获取应用实例
const AV = require('../../utils/av-live-query-weapp-min');
require('util.js');
const weather = require('weather.js');
const  app = getApp();
Page({
  onShow: function () { // 生命周期函数--监听页面加载
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);

  },
  onLoad: function () { // 生命周期函数--监听页面加载
    
    wx.getUserInfo({
      withCredentials: false,
      success: function (res) {
        app.globalData.userinfo = res.userInfo;
        console.log(app.globalData.userinfo.nickName)
        AV.login
        
        
      }
    })
    this.getUserLocation()
    wx.showShareMenu({ // 转发
      withShareTicket: true
    })
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx08d8f52ad361f6e8&secret=b635b95d8bda0e8dcb8cb9a989bdc4f0',
      success: function (res) {
        console.log(res.data.access_token)
        app.globalData.access_token = res.data.access_token
        console.log(app.globalData.access_token);

      }
    })

    

  },
  onShareAppMessage: function () {
    return {
      title: 'Todo-List',
      desc: '最简单高效的Todo-List',
      path: 'pages/index/index'
    }
  },
  data: {
    conditionCode: {
      100: "./image/100.svg",
      101: "./image/101.svg",
      102: "./image/104.svg",
      103: "./image/103.svg",
      104: "./image/104.svg",
      200: "./image/200.svg",
      201: "./image/200.svg",
      202: "./image/200.svg",
      203: "./image/200.svg",
      204: "./image/200.svg",
      205: "./image/201.svg",
      206: "./image/201.svg",
      207: "./image/201.svg",
      208: "./image/201.svg",
      209: "./image/201.svg",
      210: "./image/201.svg",
      211: "./image/201.svg",
      212: "./image/201.svg",
      213: "./image/201.svg",
      300: "./image/300.svg",
      301: "./image/301.svg",
      302: "./image/302.svg",
      303: "./image/302.svg",
      304: "./image/304.svg",
      305: "./image/305.svg",
      306: "./image/306.svg",
      307: "./image/301.svg",
      308: "./image/308.svg",
      309: "./image/305.svg",
      310: "./image/310.svg",
      311: "./image/310.svg",
      312: "./image/308.svg",
      313: "./image/304.svg",
      400: "./image/400.svg",
      401: "./image/401.svg",
      402: "./image/402.svg",
      403: "./image/402.svg",
      404: "./image/304.svg",
      405: "./image/304.svg",
      406: "./image/306.svg",
      407: "./image/402.svg",
      500: "./image/500.svg",
      501: "./image/501.svg",
      502: "./image/502.svg",
      503: "./image/503.svg",
      504: "./image/503.svg",
      507: "./image/503.svg",
      508: "./image/503.svg",
      900: "./image/900.svg",
      901: "./image/900.svg",
      999: "./image/900.svg",
    },
    location: "Beijing",
    city: "上地",
    summary: "多云",
    localTemperature: "1",
    days: [{
      time: "今天",
      icon: "./image/100.svg",
      detail: "多云",
      minTemperature: "10",
      maxTemperature: "16",
    },],
    suggestion: {
      air: "良", // 空气指数
      comf: "良", // 舒适度指数
      cw: "良", // 洗车指数
      drsg: "良", // 穿衣指数
      flu: "良", // 感冒指数
      sport: "良", // 运动指数
      trav: "良", // 旅游指数
      uv: "良", // 紫外线指数
    },
    suggestionIcon: {
      air: "./image/life/air.svg",
      cw: "./image/life/cw.svg",
      sport: "./image/life/sport.svg",
      drsg: "./image/life/drsg.svg",
      flu: "./image/life/flu.svg",
      uv: "./image/life/uv.svg",
      trav: "./image/life/trav.svg",
      comf: "./image/life/comf.svg",
    },
    detail: {
      windSpeed: "1",
      windy: "1",
      temperature: "1",
      barometer: "1",
      humidity: "1",
    },
    detailIcon: {
      windy: "./image/detail/windy.svg",
      barometer: "./image/detail/barometer.svg",
      temperature: "./image/detail/temperature.svg",
      humidity: "./image/detail/humidity.svg",
    },
    show: true,
    prompt: "Loading ...", // 页面的初始数据
    lodingsrc: "./image/location/umbrella.svg",
    air: {
      aqi: '',
      co: '',
      no2: '',
      o3: '',
      pm10: '',
      pm25: '',
      qlty: '',
      so2: '',
    },
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0
  },
  getUserLocation: function () { // 获取用户当前经纬度
    let self = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        self.decodingGps(res.longitude, res.latitude)
      },
      fail: function (res) {
        self.decodingGps(116.3, 39.9)
      }
    })
  },
  decodingGps: function (x, y) { // 解析经纬度到到地址
    let self = this
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        location: x + "," + y,
        key: '6bcab73e18c29692d1678e027e7be25a',
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data.regeocode.addressComponent.district)
        self.setData({
          location: res.data.regeocode.addressComponent.district
        })
        self.getWeather()
      },
      fail: function () {
        self.add()
      }
    })
  },
  getWeather: function () { // 获取并解析天气
    let self = this
    wx.request({
      url: 'https://free-api.heweather.com/v5/weather',
      data: { city: self.data.location, key: '01a7798b060b468abdad006ea3de4713' },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        // console.log(res)
        let detailTemp = {}
        let moreDaysTemp = {}
        let suggestionTemp = {}
        let moreDaysMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        let airTemp = {}
        airTemp = { // 空气质量
          aqi: res.data.HeWeather5[0].aqi.city.aqi,
          co: res.data.HeWeather5[0].aqi.city.co,
          no2: res.data.HeWeather5[0].aqi.city.no2,
          o3: res.data.HeWeather5[0].aqi.city.o3,
          pm10: res.data.HeWeather5[0].aqi.city.pm10,
          pm25: res.data.HeWeather5[0].aqi.city.pm25,
          qlty: res.data.HeWeather5[0].aqi.city.qlty,
          so2: res.data.HeWeather5[0].aqi.city.so2,
        }
        detailTemp = { // 实况天气
          windSpeed: ((res.data.HeWeather5[0].now.wind.spd * 0.278) / 0.621).toFixed(0),
          windy: res.data.HeWeather5[0].now.wind.dir,
          temperature: res.data.HeWeather5[0].now.fl,
          barometer: res.data.HeWeather5[0].now.pres,
          humidity: res.data.HeWeather5[0].now.hum,
        }
        for (let i = 1; i < res.data.HeWeather5[0].daily_forecast.length - 1; i++) { // 天气预报forecast
          moreDaysTemp[i] = {
            time: moreDaysMap[new Date(res.data.HeWeather5[0].daily_forecast[i].date.split("-").join("/")).getDay()],
            icon: self.data.conditionCode[res.data.HeWeather5[0].daily_forecast[i].cond.code_d],
            detail: res.data.HeWeather5[0].daily_forecast[i].cond.txt_d,
            minTemperature: res.data.HeWeather5[0].daily_forecast[i].tmp.min,
            maxTemperature: res.data.HeWeather5[0].daily_forecast[i].tmp.max
          }
        }
        suggestionTemp = { // 生活指数
          air: res.data.HeWeather5[0].suggestion.air.brf,
          comf: res.data.HeWeather5[0].suggestion.comf.brf,
          cw: res.data.HeWeather5[0].suggestion.cw.brf,
          drsg: res.data.HeWeather5[0].suggestion.drsg.brf,
          flu: res.data.HeWeather5[0].suggestion.flu.brf,
          sport: res.data.HeWeather5[0].suggestion.sport.brf,
          trav: res.data.HeWeather5[0].suggestion.trav.brf,
          uv: res.data.HeWeather5[0].suggestion.uv.brf,
        }
        self.setData({ // 更新数据
          city: res.data.HeWeather5[0].basic.city,
          summary: res.data.HeWeather5[0].now.cond.txt,
          localTemperature: res.data.HeWeather5[0].now.tmp,
          detail: detailTemp,
          suggestion: suggestionTemp,
          days: moreDaysTemp,
          air: airTemp,
          show: false,
        })
      },
    });
  },
  onGotUserInfo: function(res){

    console.log(res.detail.userInfo)
    app.globalData.userinfo = res.detail.userInfo
    app.globalData.userdata = res


  },

  nav: function (res) {
    if (app.globalData.userinfo == null){
      wx.showToast({
        title: '请不要拒绝授权，否则服务器将无法存储数据',
        icon: 'loading',
        duration: 2000
      })
      return 0
    }
    console.log(res)
    const user = AV.User.current();
    this.data.formdata = res
    this.data.formid = res.detail.formId
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);
    new weather({
      user: AV.User.current(),
      username: app.globalData.userinfo.nickName,
      formid: this.data.formid,
      openid: user.attributes.authData.lc_weapp.openid,
      sent: 0,
      formdata: this.data.formdata,
      name: user.attributes.nickName
    }).setACL(acl).save().catch(error => console.error(error.message));
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);
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
    nav_page: function () {
      var _this = this;
      setTimeout(function () {
        _this.setData({
          remind: '加载中'
        });
      }, 1000);

      const user = AV.User.current();
      wx.navigateTo({
        url: '../nav/nav',
      })
      setTimeout(function () {
        _this.setData({
          remind: ''
        });
      }, 100);

    },
  onReady: function () {

    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 100);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function () {
    var _this = this;
    if (app.g_status) {
      app.showErrorModal(app.g_status, '绑定失败');
      return;
    }
    if (!_this.data.userid || !_this.data.passwd) {
      app.showErrorModal('账号及密码不能为空', '提醒');
      return false;
    }
    if (!app._user.openid) {
      app.showErrorModal('未能成功登录', '错误');
      return false;
    }
    app.showLoadToast('绑定中');
    wx.request({
      method: 'POST',
      url: app._server + '/api/users/bind.php',
      data: app.key({
        openid: app._user.openid,
        yktid: _this.data.userid,
        passwd: _this.data.passwd
      }),
      success: function (res) {
        if (res.data && res.data.status === 200) {
          app.showLoadToast('请稍候');
          //清除缓存
          app.cache = {};
          wx.clearStorage();
          app.getUser(function () {
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              duration: 1500
            });
            if (!app._user.teacher) {
              setTimeout(function () {
                wx.showModal({
                  title: '提示',
                  content: '部分功能需要完善信息才能正常使用，是否前往完善信息？',
                  cancelText: '以后再说',
                  confirmText: '完善信息',
                  success: function (res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: 'append'
                      });
                    } else {
                      wx.navigateBack();
                    }
                  }
                });
              }, 1500);
            } else {
              wx.navigateBack();
            }
          });
        } else {
          wx.hideToast();
          app.showErrorModal(res.data.message, '绑定失败');
        }
      },
      fail: function (res) {
        wx.hideToast();
        app.showErrorModal(res.errMsg, '绑定失败');
      }
    });
  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length >= 7) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
});