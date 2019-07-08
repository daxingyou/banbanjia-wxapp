// pages/personnel_map/personnel_map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	longitude:"",
	latitude:"",
	markers:[ 
		{id:"1",latitude:23.123309733078815,
		longitude:113.32694986979167,
		iconPath:"http://i1.mifile.cn/a4/xmad_15604257972231_CkADd.jpg",
		width:"15",height:"15",
		callout:{content:'我是小明\n哈哈哈 ',textAlign:"left",fontSize:14,color:'#000000',bgColor: "#ffffff",padding:8,borderRadius:4,boxShadow:'rgba(255, 255, 255, 1)',display:"BYCLICK"}},
		
	],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	console.log(options.who)
	
	wx.getLocation({ 
		type: 'gcj02', 
		success:res=>{ 
			console.log(res)
			this.setData({
				longitude:res.longitude,
				latitude: res.latitude
			}) 
			 
		}
	})
	
	
	
	
	
  },
  click(e){
	  console.log(e)
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