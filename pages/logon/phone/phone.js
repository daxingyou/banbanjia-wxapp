var app = getApp();
var interval = null //倒计时函数
const {$Toast} = require('../../../dist/base/index');
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		phone: "",
		code:"",
		loading:false,
		state: false,
		time: "获取验证码",
		timeState: 1,
		currentTime:61
	},
	phoneLogon(){  //登录 
		this.setData({
			loading:true
		})
		const phone = this.data.phone
		const code = this.data.code
		app.util.request({
			url: 'system/common/session/phonebind',
			data: {
				mobile:phone,
				code:code
			},
			success: res => {
				if(res.data.data.errno!=0){
					$Toast({content:res.data.data.message,type: 'warning'});
					
					
					
				}else if(res.data.data.errno== 0){
					$Toast({content:res.data.data.message,type: 'success'});
					
					var userInfo=wx.getStorageSync("userInfo")
					userInfo.phone=phone
					wx.setStorageSync("userInfo",userInfo)
					wx.switchTab({
						url:"/pages/my/my"
					})
					
				}
				this.setData({
					loading:false
				})
			}
		})
	},
	
	
	getCode(e){  //验证码
		const code = e.detail.value
		this.setData({
			code:code
		})
	},
	obtain() {
		if (!this.data.state) {
			const phones = this.data.phone
			if (this.data.timeState == 1) { 
				console.log(this.code(phones))
				if (this.code(phones)) {
					this.againCode()
					this.setData({
						timeState: 2
					})
				}
			}


		}
	},
	againCode: function(options) {
		var that = this;
		var currentTime = that.data.currentTime
		interval = setInterval(function() {
			currentTime--;
			that.setData({
				time: currentTime + '秒'
			})
			if (currentTime <= 0) {
				clearInterval(interval)
				that.setData({
					time: '重新发送',
					currentTime: 61,
					timeState: 1
				})
			}
		}, 100)
	},
	getPhone(e) {
		const phone = e.detail.value
		if ((/^1[34578]\d{9}$/.test(phone))) {
			this.setData({
				phone: phone,
				state: false
			})
		} else {
			this.setData({
				state: true
			})
		}
	},
	code(phones) {
		let phone_two=phones
		app.util.request({
			url: 'system/common/code',
			data: {
				mobile:phone_two
			},
			success: res => {
				if(res.data.data.errno==0){
					console.log("进入")
					return "ture";
				}else{
					$Toast({ content: '发送失败',type: 'error'});
				}
			}
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
