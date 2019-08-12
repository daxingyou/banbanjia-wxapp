var app = getApp();
const {$Toast} = require('../../dist/base/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	getPhoneNumber(e) {
		if (e.detail.iv == null && e.detail.encryptedData == null) {
			wx.navigateTo({
				url: "./phone/phone"
			})
		} else {
			const encryptedData = e.detail.encryptedData
			const iv = e.detail.iv
			app.util.request({
				url: 'system/common/session/wxbind',
				data: {
					encryptedData: encryptedData,
					iv: iv
				},
				success: res => {
					if (res.data.errno == -1) {
						$Toast({content: "绑定失败",type: 'warning'});
						
					} else if (res.data.errno == 0) {
						$Toast({content:"绑定成功",type: 'success'});
						
						const phone = res.data.message.phoneNumber
						var userInfo = wx.getStorageSync("userInfo")
						userInfo.phone = phone
						wx.setStorageSync("userInfo", userInfo)
						wx.switchTab({
							url: "/pages/my/my"
						})

					}
				}
			})
		}
	},
	phoneLogon() {
		wx.navigateTo({
			url: "./phone/phone"
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
