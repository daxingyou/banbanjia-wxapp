// pages/my/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_list: ['反馈1', '反馈2'],
    category_index: '',
    images: [],
  },
  categoryclick: function (e) {
    //console.log(e)
    const index = e.detail.value
    this.setData({
      category_index: e.detail.value,
    })
  },
  delete_image(e) {   //删除图片
    let array = this.data.images
    array.splice(e.target.dataset.index, 1)
    this.setData({
      images: array
    })
  },
  enlarge_image(e) {	//放大图片
    wx.previewImage({
      current: this.data.images[e.target.dataset.idx], // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  photo_image() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        if (images.length > 9) {
          return $Message({ content: '图片最多添加9张', type: 'warning' });
        }
        this.setData({
          images: images
        })
      }
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