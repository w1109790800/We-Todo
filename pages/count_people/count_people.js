// pages/count_people/count_people.js
const AV = require('../../utils/av-live-query-weapp-min');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */

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
          that.setData(
            {
              imgurl: file.url(),
            })
          console.log("RE");
          wx.showLoading({
            title: 'loading',
          })
          wx.request({
            url: 'https://w1109790800.leanapp.cn/count',
            method: 'POST',
            data: { "url": file.url() },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            success: function (res) {
              console.log(res.data)
              _this.setData({ listData: res.data });
              var array = wx.base64ToArrayBuffer(res.data.image);
              var base64 = wx.arrayBufferToBase64(array); 
              _this.setData({ imageData: 'data:image/jpeg;base64,' + base64  });
              wx.hideLoading();
              

            }
          })

        }
          ).catch(console.error);
      }
      
    });

  },
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
  
  }
})