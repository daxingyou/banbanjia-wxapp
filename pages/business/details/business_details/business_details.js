var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: ['公司介绍','工商注册信息','企业证书'],
    new_choice: 0,
    winHeight: "",
	business:["//i1.mifile.cn/a4/xmad_1562766358464_CwLSR.jpg",'//i1.mifile.cn/a4/xmad_1562766358464_CwLSR.jpg'],//营业执照
	qualifications:["//i1.mifile.cn/a4/xmad_1562766358464_CwLSR.jpg",'//i1.mifile.cn/a4/xmad_1562766358464_CwLSR.jpg'],//资格证书
	honor:["//i1.mifile.cn/a4/xmad_1562766358464_CwLSR.jpg",'//i1.mifile.cn/a4/xmad_1562766358464_CwLSR.jpg']//荣誉证书
  },
  newChoice(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      new_choice: index
    })
  },
  switchTab(e) {
    const index = e.detail.current
    this.setData({
      new_choice: index
    })
  },
  open(e){
	const lists=e.currentTarget.dataset
	console.log(lists.list)
	wx.previewImage({
		current:lists.new, // 当前显示图片的http链接
		urls:lists.list // 需要预览的图片http链接列表
	})
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 67;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
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
    var pages = getCurrentPages()
    var url = pages[pages.length - 1].route
    app.globalData.url = url;
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