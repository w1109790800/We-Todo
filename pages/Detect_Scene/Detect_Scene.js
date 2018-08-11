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
          wx.showLoading({
            title: 'loading',
          })
          wx.request({
            url: 'https://api-cn.faceplusplus.com/imagepp/beta/detectsceneandobject',
            method: 'POST',
            data: {
              "api_key": "J8KVbu9ZTqysCqYfyoHkY4xhCN0bXek0",
              "api_secret": "hjhnnnLWcqGyE9UjJQs_iAE0lOjcCYd-",
              "image_url": file.url()
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            success: function (res) {
              console.log(res.data.objects)
              _this.setData({ listData: res.data.objects });
            wx.hideLoading();
            }
          })

        }
          ).catch(console.error);
      }

    });

  },
  //图片点击事件
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  }




})