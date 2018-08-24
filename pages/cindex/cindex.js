//index.js
//获取应用实例
const AV = require('../../utils/av-live-query-weapp-min');
var app = getApp();
var getcount = 3;
var loginStatus = true;
Page({
  data: {
    motto: '欢迎使用我爱倒数日\nPowered by 森哥云',
    userInfo: {},
    str_openid:"openid",
    str_start_page:"倒数日",
    str_background_type:"标准模式"
  },
  //事件处理函数
  bindViewTap: function() {

    // 页面跳转到主界面
    wx.navigateTo({
      url: '../countdown/countdown'
    })
    // 记录一下 已经类似登录  第二次使用不再展示该页面
    wx.setStorageSync('islogin', '1');

    if(wx.getStorageSync('username').length<1){
    //处理一下拒绝的情况
    wx.setStorageSync('username', '游客');
    }
    
  },
  onShow:function()  {
    const data = AV.User.current();
    console.info(data);  
    wx.setStorageSync("username", data.attributes.nickName);
    console.info(data.attributes.nickName);
    var that = this;
    getcount--;
    if (getcount>0){
      // 获取用户名
      this.getPromission();
    }

    // 获取高级ID
    var str_openid = data._hashedJSON.authData;
    console.info(data.attributes.nickName);

  }
  ,


  // 窗体加载函数
  onLoad: function () {

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#32b4fa',
    })

    wx.getSetting({
      success: (res) => {

        res.authSetting = {
          "scope.userInfo": true,
        }
      }
    })


    // 启动项设置
    var str_get_start_page = wx.getStorageSync("start_page");
    // 判断是否没有用过
    if(str_get_start_page.length<1)
    {
      str_get_start_page = '倒数日';
      wx.setStorageSync('start_page', '倒数日');
    }
    var that = this;
    that.setData(
      {
        str_start_page:str_get_start_page,
      }
    );


    // 倒数日设置
    var str_get_background_type = wx.getStorageSync('background_type');
    if(str_get_background_type.length<1){
      str_get_background_type = '标准模式';
      wx.setStorageSync('background_type', '标准模式');
    }
    that.setData(
      {
        str_background_type:str_get_background_type,
      }
    );

   



  },
  //end of 窗体加载函数

  getPromission: function () {
    var that = this;

    if (!loginStatus) {
      wx.openSetting({
        success: function (data) {
          if (data) {
            if (data.authSetting["scope.userInfo"] == true) {
              loginStatus = true;
              const data = AV.User.current();
              wx.setStorageSync("username", data.userInfo.nickName);  
              console.info(data);                   
            }
          } 
        },
        fail: function () {
          console.info("设置失败返回数据");
        }    });
    } else {
      wx.login({
        success: function (res) {
          if (res.code) {
                      wx.getUserInfo({
              withCredentials: false,
              success: function (data) {
                console.info("1成功获取用户返回数据");
                console.info(data.userInfo);

                that.setData({
                  userInfo: data.userInfo
                })
                wx.setStorageSync("username", data.userInfo.nickName);


              },
              fail: function () {
                console.info("1授权失败返回数据");
                loginStatus = false;
                // 显示提示弹窗
                wx.showModal({
                  title: '非常遗憾',
                  content: '您拒绝授权，获取用户公开信息失败，程序将不能正常运行,获取的信息不会涉及您任何的隐私，请允许允许授权,非常感谢您的理解！',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')

                      that.getPromission();

                    } else if (res.cancel) {
                      wx.openSetting({
                        success: function (data) {
                          if (data) {
                            if (data.authSetting["scope.userInfo"] == true) {
                              loginStatus = true;
                              wx.getUserInfo({
                                withCredentials: false,
                                success: function (data) {
                                  console.info("3成功获取用户返回数据");
                                  console.info(data.userInfo);
                                },
                                fail: function () {
                                  console.info("3授权失败返回数据");
                                }                            });
                            }
                          } 
                        },
                        fail: function () {
                          console.info("设置失败返回数据");
                        }                });
                    }
                  }
                });
              }          });
          }
        },
        fail: function () {
          console.info("登录失败返回数据");
        }  });
    }
  },
  // 获取用户唯一ID
  OnGetOpenId : function()
  {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://www.wenxingsen.com/json.php',
            data: {
              code: res.code,
              type:'get_openid'
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              // 开始-数据返回回来
              console.log(res.data.openid);
              that.setData(
                {
                  str_openid: res.data.openid
                }
              )
              //存储openid
              wx.setStorageSync("openid", res.data.openid);


              that.OnGetConfig();
              

              // 结束-数据返回回来
            },
            fail: function (res) {
              console.log('submit fail');
            },
            complete: function (res) {
              console.log('submit complete');
            }
          }

          
          )
        } else 
        {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }

    });

  },
  //事件处理函数
  bindViewTap: function () {

  console.log("jump");
  wx.navigateTo({
    url: '../leave/leave',
  })

  }// end of bindViewTap
  , 
  OnAbout:function()
  {
    wx.navigateTo({
      url: '../about/about',
    })
    /*
    wx.showToast({
      title: '我爱倒数日3.0\n森哥集团出品\n温兴森制作',
      icon: 'success',
      duration: 3000
    });
    */
  }//end of about
  ,
  OnWelcome: function () {
    wx.showToast({
      title: '欢迎使用\n我爱倒数日',
      icon: 'success',
      duration: 2000
    });
  }
  ,
  OnBackground : function()
  {

    var that = this;

    wx.showModal({
      title: '设置',
      content: '选择倒(正)数日大图背景模式',
      confirmText: '自定义',
      cancelText: '标准模式',
      success: function (res) {
        if (res.confirm) {

          that.setData({
            str_background_type: '自定义'
          });
          wx.setStorageSync('background_type', '自定义');

          that.OnSetConfig();

          wx.navigateTo({
            url: '../send_background/send_background',
          });

        }
        else {

          that.setData({
            str_background_type: '标准模式'
          });
          wx.setStorageSync('background_type', '标准模式');

          that.OnSetConfig();

        }
      }
    })


  


  }
  ,
  OnStart : function()
  {
    var that = this;

    wx.showModal({
      title: '设置',
      content: '请选择您要再次打开小程序默认启动页面？(重启小程序生效)',
      confirmText: '正数日' ,
      cancelText:'倒数日',
      success: function (res) {
        if (res.confirm) {

          that.setData({
            str_start_page:'正数日'
          });
          wx.setStorageSync('start_page', '正数日');

          that.OnSetConfig();

        }
        else {
          
          that.setData({
            str_start_page: '倒数日'
          });
          wx.setStorageSync('start_page', '倒数日');

          that.OnSetConfig();

        }
      }
    })


  }//end of OnStart
  ,
  OnSetConfig:function()
  {

    var str_username = wx.getStorageSync("username");
    var stropenid = wx.getStorageSync("openid");
    var background_type = wx.getStorageSync("background_type");
    var background_image = wx.getStorageSync("background_image");
    var start_page = wx.getStorageSync("start_page");

    // 发送http请求
    wx.request({
      url: 'https://www.wenxingsen.com/json.php',
      data: {
        type: 'set_config',
        username: str_username,
        openid: stropenid,
        background_type: background_type,
        background_image: background_image,
        start_page: start_page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 开始-数据返回回来

        console.log(res.data);


        // 结束-数据返回回来
      },
      fail: function (res) {
        console.log('submit fail');
      },
      complete: function (res) {
        console.log('submit complete');
      }
    })

  }//end of OnSetConfig
  ,
  OnGetConfig : function () {

    var that = this;

    var str_username = wx.getStorageSync("username");
    var stropenid = wx.getStorageSync("openid");

    if(str_username.length<1)
    {
      //用户名没有获取 不加载
      return;
    }

    // 发送http请求
    wx.request({
      url: 'https://www.wenxingsen.com/json.php',
      data: {
        from: 'weixin',
        type: 'get_config',
        username: str_username,
        openid: stropenid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 开始-数据返回回来

        console.log(res.data)

        wx.setStorageSync('background_type',
          res.data.item.background_type);
        wx.setStorageSync('background_image',
          res.data.item.background_image);
        wx.setStorageSync('start_page',
          res.data.item.start_page);

        that.setData({
          str_background_type: res.data.item.background_type,
          str_start_page: res.data.item.start_page
        });
 




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
  //end of OnGetConfig
  ,
  onShareAppMessage: function () {

    return {
      title: '倒数日&正数日&纪念日',
      desc: '倒数日&正数日&纪念日&',
      path: '/pages/countdown/countdown'
    }

  },



})
