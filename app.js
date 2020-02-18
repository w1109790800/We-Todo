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

  globalData: {
    userdata:null,
    userInfo: null,
    access_token: null,
    user:null

  },

  onLaunch: function () {
    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user;
    }).catch(console.error);
  },
  // 权限询问


  onHide: function () {
  },

})
