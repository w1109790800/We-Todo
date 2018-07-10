// pages/up/up.js
const AV = require('../../utils/av-live-query-weapp-min');
const fanka = require('../../model/fanka');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  login: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: '加载中'
      });
    }, 1000);
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
  test: function () {
    console.log("start")


    var _this = this;
    var id = this.data.ID;
    if (id == undefined){
      id = "2016081850"
    }
    console.log(id.split("=")[0]);
    if (id.split("=")[0] == "mmsess") {
      id = this.data.ID;
      wx.request({
        url: 'https://w1109790800.leanapp.cn/cookie',
        method: 'POST',
        data: { "cookie": id },    //参数为键值对字符串
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },})
    }
    else{
    

    console.log("用户名：" + id);
    wx.request({
      url: 'https://w1109790800.leanapp.cn/app2',
      method: 'POST',
      data: {"IdentityID": id},    //参数为键值对字符串
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.ret[0].Sex == 0){
          res.data.ret[0].Sex = "女"
        }
        else{
          res.data.ret[0].Sex = "男"
        }
        _this.setData({
          user: res.data.ret[0]
        });
        var strusername = wx.getStorageSync("username");
        var stropenid = wx.getStorageSync("openid");
        const user = AV.User.current();
        var acl = new AV.ACL();
        acl.setPublicReadAccess(false);
        acl.setPublicWriteAccess(false);
        acl.setReadAccess(AV.User.current(), true);
        acl.setWriteAccess(AV.User.current(), true);
        new fanka({
          id: id,
          data: res.data.ret[0],
          name: res.data.ret[0].Name,
          Sex: res.data.ret[0].Sex,
          CardCode: res.data.ret[0].CardCode,
          Money0: res.data.ret[0].Money0,
          openid: stropenid,
        }).setACL(acl).save().then((todo) => {

        }).catch(error => console.error(error.message));
        console.log(res.data.ret[0])

      }

    })
    }
  },
  ID: function (e) {
    this.setData({
      ID: e.detail.value
    })
  },
  pay: function(){
    wx.request({
      url: 'https://w1109790800.leanapp.cn/app2',
      method: 'POST',
      data: { "agentId": "1000003", "price": 5, "cardCode": "0831533318" },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      success: function (res) {
        console.log(res.data);
        
        var data = res.data.retPay;
        console.log(data);
        wx.requestPayment({
          'appId': data.appId,
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': data.signType,
          'paySign': data.sign,
          'success': function (res) {
            console.log("success");
            console.log(res.data)
          },
          'fail': function (res) {
            console.log("fail");
            console.log(res)
            console.log(res.data);

            
          }
        })

      }
    })
  }

})

