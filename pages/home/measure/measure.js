var app = getApp();
var maths = require("../../../utils/calculation.js")
Page({

	data: {
		url: "",
		goods: [],
		curInex: 0,
		curArray: [],
		curtid: 10,
		totalVolume: 0, //总体积
		selectArray: [], //选择的体积
		bedroomNumber: 0,
		officeNumber: 0
	},
	plusReduce(e) { //加减
		var id = Number(e.target.dataset.id)
		var plusreduce = e.target.dataset.plusreduce
		var index = e.target.dataset.index
		var volume = parseFloat(e.target.dataset.volume)
		var curArray = this.data.curArray
		var totalVolume = this.data.totalVolume
		var goods = this.data.goods
		if (plusreduce == 1) { //减
			if (curArray[index].number > 0) {
				curArray[index].number = curArray[index].number - 1
				if (curArray[index].number == 0) { //数量
					for (let i = 0; i < goods.length; i++) {
						if (goods[i].rid == this.data.curtid) {
							goods[i].numbers = goods[i].numbers - 1
						}
					}
				}
				var bumbers = maths.accSub(totalVolume, volume)

				var selectArrays = this.data.selectArray
				for (let s = 0; s < selectArrays.length; s++) {
					if (selectArrays[s].id == id) {
						selectArrays[s].number = selectArrays[s].number - 1
						if (selectArrays[s].number == 0) {
							selectArrays.splice(s, 1);
						}
					}
				}

				this.setData({
					curArray: curArray,
					totalVolume: bumbers,
					goods: goods,
					selectArray: selectArrays
				})
			}
		} else { //加
			curArray[index].number = curArray[index].number + 1
			if (curArray[index].number == 1) {
				for (let i = 0; i < goods.length; i++) { //数量
					if (goods[i].rid == this.data.curtid) {
						goods[i].numbers = goods[i].numbers + 1
					}
				}
			}
			let bumbers = maths.accAdd(totalVolume, volume)

			// selectArrays  选择的数组
			var selectArrays = this.data.selectArray
			if (selectArrays == "") { //奇怪
				// console.log("为空")
				selectArrays.push({
					id: id,
					number: 1
				})
			} else {
				var nullLength = 0
				for (let s = 0; s < selectArrays.length; s++) {
					if (selectArrays[s].id == id) {
						// console.log("重复"+selectArrays[s].id+","+id)
						selectArrays[s].number = selectArrays[s].number + 1
					} else {

						nullLength = nullLength + 1
					}
				}
				if (nullLength == selectArrays.length) {
					selectArrays.push({
						id: id,
						number: 1
					})
				}
			}
			
			this.setData({
				curArray: curArray,
				totalVolume: bumbers,
				goods: goods,
				selectArray: selectArrays
			})
		}
	},


	

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log(app.goodsData.goods)
		const url = app.globalData.url_two
		// options.bedroom = 3
		// options.parlour = 2
		this.setData({
			url: url,
			bedroomNumber: options.bedroom,
			officeNumber: options.parlour
		})
		if (app.goodsData.volume != 0) {
			this.setData({
				selectArray: app.goodsData.new_array,
				totalVolume: app.goodsData.volume
			})

		}
		var number_two=0
		var goods = JSON.parse(JSON.stringify(app.goodsData.goods))
		var bedroomNumber = options.bedroom
		var officeNumber = options.parlour
		
		
		var bedroom_index,bedroom_name_index,parlour_index,parlour_name_index
		
		var bedroom_number=app.goodsData.bedroom_parlour.bedroom_number
		var parlour_number=app.goodsData.bedroom_parlour.parlour_number
		
		for (let i = 0; i < goods.length; i++) {
			if(goods[i].numbers == null){
				goods[i].numbers = 0
			}
			if (goods[i].rid == 10 && app.goodsData.state==0 ) {

				bedroom_index = i + 1
				bedroom_name_index=2
				for (let f = 0; f<bedroomNumber-1; f++) {
					var bedroomf = JSON.parse(JSON.stringify(app.goodsData.bedroom_parlour.bedroom))
					bedroomf.rid = `${bedroom_index+500}` //花里胡哨
					bedroomf.rtitle = `${bedroomf.rtitle}${bedroom_name_index}`
					goods.splice(bedroom_index, 0, bedroomf)
					bedroom_index=bedroom_index+1,
					bedroom_name_index=bedroom_name_index+1
					
				}
			}
			if(goods[i].rid == 10 && bedroomNumber>bedroom_number && app.goodsData.state==1 ){ 

				bedroom_index =    app.goodsData.bedroom_parlour.bedroom_index
				bedroom_name_index=app.goodsData.bedroom_parlour.bedroom_name_index
				number_two = bedroomNumber-bedroom_number

				for(let f = 0;f<number_two;f++) {
					
					var bedroomf = JSON.parse(JSON.stringify(app.goodsData.bedroom_parlour.bedroom))
					bedroomf.rid = `${bedroom_index+500}` //花里胡哨
					bedroomf.rtitle = `${bedroomf.rtitle}${bedroom_name_index}`
					goods.splice(bedroom_index, 0, bedroomf)
					bedroom_index=bedroom_index+1
					bedroom_name_index=bedroom_name_index+1
					
				}
			}
			
			
			if (goods[i].rid == 11 && app.goodsData.state==0 ) {
				parlour_index = i + 1
				parlour_name_index=2
				for (let f = 0; f<officeNumber-1; f++) {
					var officef = JSON.parse(JSON.stringify(app.goodsData.bedroom_parlour.parlour))
					officef.rid = `${goods.length+500}` //花里胡哨
					officef.rtitle = `${officef.rtitle}${parlour_name_index}`
					goods.splice(parlour_index, 0, officef)
					parlour_index=parlour_index+1,
					parlour_name_index=parlour_name_index+1
				}
			}
			if(goods[i].rid == 10 && bedroomNumber>bedroom_number && app.goodsData.state==1 ){ 
			
				bedroom_index =    app.goodsData.bedroom_parlour.bedroom_index
				bedroom_name_index=app.goodsData.bedroom_parlour.bedroom_name_index
				number_two = bedroomNumber-bedroom_number
			
				for(let f = 0;f<number_two;f++) {
					
					var bedroomf = JSON.parse(JSON.stringify(app.goodsData.bedroom_parlour.bedroom))
					bedroomf.rid = `${bedroom_index+500}` //花里胡哨
					bedroomf.rtitle = `${bedroomf.rtitle}${bedroom_name_index}`
					goods.splice(bedroom_index, 0, bedroomf)
					bedroom_index=bedroom_index+1
					bedroom_name_index=bedroom_name_index+1
					
				}
			}
			
			if(goods[i].rid == 11 && officeNumber>parlour_number && app.goodsData.state==1 ){ 
				parlour_index =    app.goodsData.bedroom_parlour.parlour_index+number_two
				parlour_name_index=app.goodsData.bedroom_parlour.parlour_name_index
				let number_three = officeNumber-parlour_number
				for(let f = 0;f<number_three;f++) {
					var parlourf = JSON.parse(JSON.stringify(app.goodsData.bedroom_parlour.parlour))
					parlourf.rid = `${parlour_index+500}` //花里胡哨
					parlourf.rtitle = `${parlourf.rtitle}${parlour_name_index}`
					goods.splice(parlour_index, 0, parlourf)
					parlour_index=parlour_index+1
					parlour_name_index=parlour_name_index+1
				}
			}
			
			
			
			
			
			
			
		}
		let curArray = goods[0].goods
		for (let g = 0; g < curArray.length; g++) {
			if (curArray[g].number == null) {
				curArray[g].number = 0
			}

		}
		
		this.setData({
			goods: goods,
			curArray: curArray
		})
		console.log(goods)
		console.log([parlour_index,parlour_name_index])
		if(bedroom_index !=undefined){
			console.log(213)
			app.goodsData.bedroom_parlour.bedroom_index=bedroom_index
			app.goodsData.bedroom_parlour.bedroom_name_index=bedroom_name_index
		}
		if(parlour_index !=undefined){
			app.goodsData.bedroom_parlour.parlour_index=parlour_index
			app.goodsData.bedroom_parlour.parlour_name_index=parlour_name_index
		}
		
		
	},


	cur(e) { //显示当前的列表 
		let goods = this.data.goods
		let index = e.currentTarget.dataset.index
		let curArray = this.data.goods[index].goods
		let curtid = this.data.goods[index].rid
		for (let g = 0; g < curArray.length; g++) {
			if (curArray[g].number == null) {
				curArray[g].number = 0
			}
		}
		this.setData({
			curInex: index,
			curArray: curArray,
			curtid: curtid

		})
	},
	sure() { //确定
		app.goodsData.bedroom_parlour.bedroom_number=this.data.bedroomNumber,
		app.goodsData.bedroom_parlour.parlour_number=this.data.officeNumber,
		app.goodsData.volume = this.data.totalVolume,
		app.goodsData.new_array = this.data.selectArray,
		app.goodsData.goods = this.data.goods,
		app.goodsData.state = 1
		wx.navigateBack({
			delta: 1
		})
	
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {},

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
