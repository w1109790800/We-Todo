const { User } = require('../../utils/av-live-query-weapp-min');

Page({
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


  copyTBL2: function (e) {
    var self = this;
    wx.setClipboardData({
      data: "http://todo.echo.cool/",
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



  copyTBL3: function (e) {
    var self = this;
    wx.setClipboardData({
      data: "https://w1109790800.leanapp.cn/todos",
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



  data: {
    user: null,
    username: '',
    password: '',
    error: null,
  },
  onLoad: function() {
    this.setData({
      user: User.current(),
    });
  },
  updateUsername: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      username: value
    });
  },
  updatePassword: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      password: value
    });
  },
  save: function () {
    wx.showToast({
      title: '修改中……',
      icon: 'loading'
    });
    this.setData({
      error: null,
    });
    const { username, password } = this.data;
    const user = User.current();
    if (username) user.set({ username });
    if (password) user.set({ password });
    user.save().then(() => {
      wx.showToast({
        title: '更新成功',
        icon: 'success',
      });
    }).catch(error => {
      this.setData({
        error: error.message,
      });
    });
    wx.hideToast();
  }
  
});

