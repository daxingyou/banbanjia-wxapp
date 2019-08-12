var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		start:null,
		image: "http://banbanjia.useosc.com/attachment/images/1/2019/07/f9t939zkK1YD71c3Y88Yck5wBKbCaK.jpg",
		headPortrait:"",
		username:""
	},
	getUserInfo() {
		wx.getUserInfo({
			success: function(e) {
				const encryptedData = e.encryptedData
				const iv = e.iv
				const rawData=e.rawData
				const signature= e.signature
				app.util.request({
					url: 'system/common/session/userinfo',
					method:"POST",
					data: {
						encryptedData:encryptedData,
						iv:iv,
						rawData:rawData,
						signature:signature
					},
					success: res => {
						const data = res.data.data
						const info ={sex:data.sex,image:data.avatar,username:data.nickname}
						wx.setStorage({key:"info",data:info})
						wx.navigateTo({
							url:"../logon/logon"
						})
					},
				})
			},
			fail:res=> {
				wx.navigateTo({
					url:"../logon/logon"
				})
			},
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		var pages = getCurrentPages()
		var url = pages[pages.length - 1].route
		app.globalData.url = url;
		const userinfo= wx.getStorageSync("userInfo")
		if(userinfo.phone==""){
			this.setData({
				start:2
			})
		}else{
			this.setData({
				start:1
			})
		}
		const info= wx.getStorageSync("info")
		if(info){
			this.setData({
				headPortrait:info.image,
				username:info.username
			})
		}else{
			this.setData({
				username:userinfo.phone
			})
		}
		
		
		
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
