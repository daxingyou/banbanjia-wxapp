// pages/my/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex_list:['女','男'],
    sex_index:0,
    date: '2000-01-01',
    region: ['广东省', '广州市', '天河区'],
    profile:'文字文字文字文字文字文字文字文字',
    phone:'12345678921',
    address:'天河区XXXXXX',
    goods_address:'广东省广州市天河区XXXXXX'
  },
  sexclick:function(e){
    //console.log(e)
    const index = e.detail.value
    this.setData({   
      sex_index: e.detail.value,
    })
  },
  bindDateChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  bindprofile:function (e){
    this.setData({
      profile: e.detail.value
    })
  },
  bindaddress :function (e){
    this.setData({
      address: e.detail.value
    })
  },
  bindgoods_address: function (e) {
    this.setData({
      goods_address: e.detail.value
    })
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

  }
})