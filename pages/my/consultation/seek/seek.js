// pages/my/consultation/seek/seek.js
const { $Message } = require('../../../../dist/base/index');
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';
  msgList = [{
    speaker: 'server',
    contentType: 'text',
    content: '你好，请问您咨询什么',
    images: ''
  },
  {
    speaker: 'customer',
    contentType: 'text',
    content: '我想问一下你们这边是怎么算搬运纸箱',
    images: ''
  }
  ]
  that.setData({
    msgList,
    inputVal
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '90vh',
    inputBottom: 0,
    images: [],
  },
  photo_image() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        msgList.push({
          speaker: 'customer',
          contentType: 'text',
          content: '',
          images: images
        })
        this.setData({
          msgList
        })
      }
    })
  },
  enlarge_image(e) {	//放大图片
    console.log(e.target.dataset.idx)
    wx.previewImage({
      current: msgList[e.target.dataset.idx], // 当前显示图片的http链接
      urls: msgList[e.target.dataset.idx].images // 需要预览的图片http链接列表
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initData(this);
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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value,
      images: ''
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
  },
  /**
  * 退回上一页
  */
  toBackClick: function () {
    wx.navigateBack({})
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})