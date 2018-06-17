const AV = require('./utils/av-live-query-weapp-min');
var APP_ID = 'xYPeWSujDN3MRiTn04UohQNL-gzGzoHsz';
var APP_KEY = '2fmHSDiKp3xGuj0dQBevzi8R';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
});



//app.js
const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 5
}

App({
  globalData: {
    userInfo: "null"
  },
  onLaunch: function () {
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }
  }
})
