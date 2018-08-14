const util = require('../../utils/util.js');
const AV = require('../../../utils/av-live-query-weapp-min.js');
const time = require('time.js');
const app = getApp()
const defaultLogName = {
  work: '工作',
  rest: '休息'
}
const actionName = {
  stop: '停止',
  start: '开始'
}

const initDeg = {
  left: 45,
  right: -45,
}

Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: "我完成了新的番茄时间",
      path: 'timer-master/pages/index/index'
    }
  },

  data: {
    remainTimeText: 'NUll',
    timerType: 'work',
    log: {},
    formif:null,
    openid:null,
    completed: false,
    remainTimeText: 25 + ':00',
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right
  },
  login: function () {
    const user = AV.User.current();

    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user => user ? user : AV.User.loginWithWeapp()).catch(error => console.error(error.message));



  },
  onReady: function () {
    wx.showModal({
      title: '番茄工作法',
      content: ' 番茄工作法是简单易行的时间管理方法，是由弗朗西斯科·西里洛于1992年创立的一种相对于GTD更微观的时间管理方法。使用番茄工作法，选择一个待完成的任务，将番茄时间设为25分钟，专注工作，中途不允许做任何与该任务无关的事，直到番茄时钟响起，然后在纸上画一个X短暂休息一下（5分钟就行），每4个番茄时段多休息一会儿',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })

  },
  onShow: function () {
    const user = AV.User.current();
    const query = new AV.Query(time)
      .equalTo('user', AV.Object.createWithoutData('User', user.id))
      .descending('createdAt');
    if (this.data.isRuning) return
    let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH')
    let restTime = util.formatTime(wx.getStorageSync('restTime'), 'HH')
    this.setData({
      workTime: workTime,
      restTime: restTime,
      remainTimeText: 25 + ':00'
    })

  },
  copyTBL: function (e) {
    var self = this;
    wx.setClipboardData({
      data: "http://baobaiqiang.oss-cn-beijing.aliyuncs.com/todo.apk",
      success: function (res) {
        // self.setData({copyTip:true}),  
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    });
  },
  setTodos: function (todos) {
    const activeTodos = todos.filter(todo => !todo.done);
    this.setData({
      todos,
      activeTodos,
    });
    return todos;
  },
  startTimer: function (res) {
    console.log(res)
    var e = "rest"
    if(res.type == "submit"){
      e = "start"
    }
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let timerType = e
    let showTime = 25
    let keepTime = showTime * 60 * 1000 
    let logName = this.logName || defaultLogName[timerType]
    console.log(showTime)
    if (!isRuning) {
      this.timer = setInterval((function () {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.stopTimer()
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: timerType,
      remainTimeText: showTime + ':00',
      taskName: logName
    })

    this.data.log = {

      name: logName,
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
      type: timerType
    }

    this.saveLog(this.data.log)
    var value = this.data.log
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);
    const user = AV.User.current();
    this.openid = user.attributes.authData.lc_weapp.openid
    console.log(user.attributes.authData.lc_weapp.openid)
    this.formid = res.detail.formId
    new time({
      done: false,
      log: this.data.log,
      name: this.data.log.name,
      startTime: Date.now(),
      keepTime: this.data.log.keepTime,
      user: AV.User.current(),
      a: this.data.log.keepTime - this.data.log.endTime,
      name: user.attributes.nickName,
      user: AV.User.current(),
      username: app.globalData.userinfo.nickName,
      formid: res.detail.formId,
      openid: user.attributes.authData.lc_weapp.openid,
      sent: 0,
      formdata: this.data.formdata,
      name: user.attributes.nickName
    }).setACL(acl).save().then((time) => {
      this.setTodos([time, ...this.data.log]);
    }).catch(error => console.error(error.message));
    this.setData({
      draft: ''
    });
  },

  startNameAnimation: function () {
    let animation = wx.createAnimation({
      duration: 450
    })
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      nameAnimation: animation.export()
    })
  },

  stopTimer: function () {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })

    // clear timer
    this.timer && clearInterval(this.timer)
  },

  updateTimer: function () {

    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
    let halfTime

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      wx.request({
        url: 'https://w1109790800.leanapp.cn/sentMSG',
        method: 'POST',
        data: { 
          openid: this.openid ,
          formid: this.formid ,
        },    //参数为键值对字符串
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      this.setData({
        completed: true
      })
      wx.showModal({
        title: '番茄工作法',
        content: ' 恭喜您完成了一个新的番茄时间，快点击右上角三个圆点分享吧~',
        success: function (res) {


          console.log('确定')
          var acl = new AV.ACL();
          acl.setPublicReadAccess(false);
          acl.setPublicWriteAccess(false);
          acl.setReadAccess(AV.User.current(), true);
          acl.setWriteAccess(AV.User.current(), true);
          new time({
            done: true,
            startTime: Date.now(),
            user: AV.User.current(),

          }).setACL(acl).save().then((time) => {
            this.setTodos([time, ...this.data]);
          }).catch(error => console.error(error.message));

        }
      })
      this.stopTimer()
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },

  changeLogName: function (e) {
    this.logName = e.detail.value
  },

  saveLog: function (log) {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(log)
    wx.setStorageSync('logs', logs)
  }
})
