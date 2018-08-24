// pages/up/up.js
const AV = require('../../utils/av-live-query-weapp-min');

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
    var _this = this;
    var id = this.data.ID;
    if (id == undefined) {
      id = "0"
    }


    const user = AV.User.current();
    const a = JSON.parse(user._hashedJSON.authData);
    var str_openid = a.lc_weapp.openid;
    // 把this赋值给that
    var that = this;
    var str_username = user.attributes.nickName;
    var stropenid = str_openid;
    console.log(str_username, stropenid);
    var _this = this;
    const query = new AV.Query("xhc6").equalTo('bikeNum', id).descending('createdAt')
    console.log(id)


    var _this = this;
    query.find().then(function (results) {
      wx.showModal({
        title: '查询成功',
        content: '密码是：' + results["0"].attributes,password,
      })
      console.log(results["0"].attributes)
      _this.setData({
        data: results["0"].attributes
      })

 
  })


  },
  ID: function (e) {
    this.setData({
      ID: e.detail.value
    })
  },

})

