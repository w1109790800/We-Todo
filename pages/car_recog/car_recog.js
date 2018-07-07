// pages/car_recog/car_recog.js
const AV = require('../../utils/av-live-query-weapp-min');
const car_recog = require('../../model/car_recog');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    var _this = this;
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(function (file) {
          file => console.log(file.url())
          var bojid = wx.getStorageSync("objid");
          console.log(bojid);
          var img = AV.Object.createWithoutData('count', bojid);
          // 修改属性
          img.set('url', file.url());
          img.save();
          console.log(file.url())
          that.setData(
            {
              imgurl: file.url(),
            })
          console.log("RE");
          wx.request({
            url: 'https://w1109790800.leanapp.cn/recog_car',
            method: 'POST',
            data: { "url": file.url() }, 
            header: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },   
            success: function (res) {
              console.log(res.data.result)
              _this.setData({ listData: res.data.result });
              
            }
          })

        }
          ).catch(console.error);
      }

    });

  }
})