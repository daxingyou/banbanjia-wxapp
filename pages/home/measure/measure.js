// pages/home/measure/measure.js
Page({

  data: {
	goods:[],
	curInex:0,
	curArray:[],
	curtid:1,
	totalVolume:0, //总体积
	bedroomNumber:0,
	officeNumber:0,
	
  },
  sure(){ 
		wx.setStorageSync('volume', this.data.totalVolume);
		wx.navigateBack({
               delta: 1,
          })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.setData({
			bedroomNumber:options.bedroom,
			officeNumber:options.parlour
		})
	
	  
	wx.request({
		url:"http://api.useosc.com/mock/32/goods",
		method:'GET', 
		success:res=>{
			var goods =JSON.parse(JSON.stringify(res.data)) 
			var bedroomNumber = options.bedroom-1;
			var officeNumber = options.parlour-1;
			var bedroom=res.data[0]
			
			// 我需要唯一标识！！！！加一字段判断是否为卧室和客厅，这里
			 for(let i=0;i<goods.length;i++){
				goods[i].numbers=0  
			 	if(goods[i].type=="卧室1"){
					let  index=i+1 
					for(let f=bedroomNumber;f>0;f--){
						bedroom.tid=goods.length+1
						bedroom.type=`卧室${f+1}`
						var bedroomf=JSON.parse(JSON.stringify(bedroom))
						goods.splice(index,0,bedroomf)
					}
				}
				if(goods[i].type=="客厅1"){
					var office=res.data[1]
					let  index=i+1
					for(let f=officeNumber;f>0;f--){
						office.tid=goods.length+1
						office.type=`客厅${f+1}`
						var officef=JSON.parse(JSON.stringify(office))
						goods.splice(index,0,officef)
					}
				}
			 }
			let curArray=goods[0].data
			
			for(let g=0;g<curArray.length;g++){ 
				curArray[g].number=0
				
			}
			
			
			this.setData({
				goods:goods,
				curArray:curArray
			})
		}
	})
  },
  plusReduce(e){	//加减
		let plusreduce=e.target.dataset.plusreduce
		let index=e.target.dataset.index 
		let volume=e.target.dataset.volume
		let curArray=this.data.curArray
		let totalVolume=this.data.totalVolume
		let goods = this.data.goods
		if(plusreduce==1){ //减
			if(curArray[index].number>0){
				curArray[index].number=curArray[index].number-1
				if(curArray[index].number==0){
					for(let i=0;i<goods.length;i++){
						if(goods[i].tid==this.data.curtid){
							goods[i].numbers=goods[i].numbers-1
						}
					}
				}
				this.setData({
					curArray:curArray,
					totalVolume:totalVolume-volume,
					goods:goods
				})
			}
		}else{	//加
			curArray[index].number=curArray[index].number+1
			if(curArray[index].number==1){
				for(let i=0;i<goods.length;i++){
					if(goods[i].tid==this.data.curtid){
						goods[i].numbers=goods[i].numbers+1
					}
				}
				
			}
			this.setData({
				curArray:curArray,
				totalVolume:totalVolume+volume,
				goods:goods
			})
		}
		
		
  },
  
  
  cur(e){	//显示当前的列表
	console.log(this.data.goods)
  
		let goods=this.data.goods
		let index=e.currentTarget.dataset.index
		let curArray=this.data.goods[index].data 
		let curtid=this.data.goods[index].tid 
		for(let g=0;g<curArray.length;g++){
			if(curArray[g].number==null){
				curArray[g].number=0
			}
		}
		this.setData({
			curInex:index,
			curArray:curArray,
			curtid:curtid
			
		})
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