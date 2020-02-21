const AV = require('./utils/av-live-query-weapp-min');
var APP_ID = 'xYPeWSujDN3MRiTn04UohQNL-gzGzoHsz';
var APP_KEY = '2fmHSDiKp3xGuj0dQBevzi8R';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURLs:"https://xypewsuj.lc-cn-n1-shared.com"
});


//app.js

App({
  _user: {
    wx:{
    },
    cloud:{
    },
    openid:null,
    access_token:null
  },

  onLaunch: function () {
    var _this = this
    AV.User.loginWithWeapp().then(user => {
      _this._user.openid = user.attributes.authData.lc_weapp.openid;
      _this._user.cloud = user.attributes
    }).catch(console.error);
    wx.getUserInfo({
      success: function (res) {
        _this._user.wx = res.userInfo
      }
    })
  },
  // 权限询问


  onHide: function () {
  },

})
