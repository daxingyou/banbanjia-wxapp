var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	index:1,
	index_two:0,
	number:4,
	comprehensive:['综合','距离','案例'],
	comment:['评分升序','评分降序'],
	region:['广州','天河区'],
	
	comprehensive_index:"", 
	region_index:"", 
	comment_index:"",
  },
  click(e){   //头部3个选择器
		const index=e.currentTarget.dataset.index
		this.setData({
			index:index,
			index_two:index
		})
  },
	cancel(){
		this.setData({ 
			index_two:0
		}) 
	},
	 
	comprehensive(e){  //综合
    this.setData({
      comprehensive_index: e.detail.value,
			index_two:0
    })
	},
	region(e){  //地区
	console.log(e)
	  this.setData({
	    region_index: e.detail.value,
			index_two:0
	  })
	},
	comment(e){  //评分
	  this.setData({
	    comment_index: e.detail.value,
			index_two:0
	  })
	},
	
	
	
	input(e){
		console.log(e.detail.value)
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