var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var Verification = require('../../../utils/evaluationVerification.js');
var qqmapsdk = new QQMapWX({key: 'ZXLBZ-XK5RI-WLJGO-55MKH-P2YKT-TFB5G' ,});// 必填
Page({

  /**
   * 页面的初始数据
   */
  data: {
	rooms:{bedroom:0,parlour:0},
	volume:"",
	current:0,  //估算弹出框的第几张
	estimate:true, //估算弹出框
	mask:false,  //禁用textarea input
	goods_option:null,
	timerTem:"",
	spinShow: true,
	goods:[],
	slide:true,
	carry:1,
	carry_type:1,
	start_location:{place:"",longitude:"",latitude:""},  //起运 
	end_location:{place:"",longitude:"",latitude:""},  //目的地
	service_type:1,//服务类型
	floor:1, //楼层
	stairs:1, // 电梯还是步梯
	array:[],  //楼层数组
	remarks:"", //备注
	international:1,//国际搬家和国际快递的第一个单选
	typeExpress:1, //快递类型
	weight:0, //国际快递 重量
	times_data:"", //时间
	number:0, 
	min:1000,
	max:99999,
	change_goods:"",
	delete_goods:"",
	insurance:0,
	bedroomArray:[0,1,2,3,4,5,6,7,8,9,10],
	items: [
		{id: '1', value: '国内搬家', checked: 'true'},
		{id: '2', value: '国际搬家'},
		{id: '3', value: '国际快递'},
    ],
	items_two:[
		{id: '1', value: '免费搬运', checked: 'true'},
		{id: '2', value: '共享搬运'},
		{id: '3', value: '搬家公司'},
	],
	items_three:[
		{id: '1', value: '室内移动', checked: 'true'},
		{id: '2', value: '搬上楼'},
		{id: '3', value: '搬下楼'},
	],
	items_four:[
		{id: '1', value: '电梯', checked: 'true'},
		{id: '2', value: '步梯'}, 
	],
	items_five:[
		{id: '1', value: '国际快递', checked: 'true'},
		{id: '2', value: '私人物品'},
		{id: '3', value: '特殊物品'},
	],
	items_six:[
		{id: '1', value: '门到门', checked: 'true'},
		{id: '2', value: '集中出运'},
		{id: '3', value: '门到港'},
	],
  },
  order(e){	//免费预约
  	this.setData({
  		times_data:e.detail
  	})
	this.domestic_free()
	
  },
  order_two(e){	 //共享预约
	this.setData({
		times_data:e.detail
	})
	this.domestic_share()
  },
  domestic_free(){  //免费
	let start_location=this.data.start_location.place	//发
	let service_type=this.data.service_type //服务类型
	let floor=this.data.floor	//楼层
	let stairs=this.data.stairs	//电梯 步梯
	let volume = this.data.volume	//体积
	let remarks =this.data.remarks	//备注
	let times_data =this.data.times_data	//时间
	
	const state =Verification.free(start_location,volume)
	if(state){
		console.log(1123)
	}
	
  },
   domestic_share(){  //共享
	let start_location=this.data.start_location.place	//发
	let end_location=this.data.end_location.place	//收
	let service_type=this.data.service_type //服务类型
	let floor=this.data.floor	//楼层
	let stairs=this.data.stairs	//电梯 步梯
	let volume = this.data.volume	//体积
	let remarks =this.data.remarks	//备注
	let insurance = this.data.insurance	//保价
	
	const state =Verification.share(start_location,end_location,volume,insurance)
	if(state){
		console.log(1123)
	}
  	
  },
   domestic_company(){  //公司
  	let start_location=this.data.start_location.place	//发
  	let end_location=this.data.end_location.place	//收
	let service_type=this.data.service_type //服务类型
	let floor=this.data.floor	//楼层
	let stairs=this.data.stairs	//电梯 步梯
	let times_data = this.data.times_data	//时间
	let volume = this.data.volume	//体积
	let remarks =this.data.remarks	//备注
	let insurance = this.data.insurance	//保价
	const state =  Verification.international(start_location,end_location,times_data,volume,insurance)
	if(state){
		console.log(1123)
	}
  },
  
  
  
  
  
  
  international_obtain_price(){  //国际
	let start_location=this.data.start_location.place	//发
	let end_location=this.data.end_location.place	//收
	let international=this.data.international	//门 集中 港
	let floor=this.data.floor	//楼层
	let stairs=this.data.stairs	//电梯 步梯
	let times_data = this.data.times_data	//时间
	let volume = this.data.volume	//体积
	let remarks =this.data.remarks	//备注
	let insurance = this.data.insurance	//保价
	 
	const state =  Verification.international(start_location,end_location,times_data,volume,insurance)
	if(state){
		console.log(1123)
	}
  },
  
  express_obtain_price(){	//国际快递
	let start_location=this.data.start_location.place	//发
	let end_location=this.data.end_location.place	//收
	let type	//快递类型
	let items_five =this.data.items_five 
	let weight =this.data.weight		//重量
	let times_data = this.data.times_data  //时间
	
	for(let i=0;i<items_five.length;i++){
		if(items_five[i].id==this.data.typeExpress){
			type=items_five[i].value 
		}
	}
	const state =  Verification.express(start_location,end_location,weight,times_data);
	if(state){
		console.log(1123)
	}
	
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	if(options.int){
		if(options.int==1){
			this.setData({
				carry:2,
				items: [{id:'1',value:'国内搬家'},{id:'2',value:'国际搬家',checked: 'true'},{id:'3',value:'国际快递'},],
				
			})
		}else{
			this.setData({
				carry:3,
				items: [{id:'1',value:'国内搬家'},{id:'2',value:'国际搬家'},{id:'3',value:'国际快递',checked: 'true'},],
				
			})
		}
	}
	
	this.startReportHeart()  
	var arr1 = new Array(100);
	for(var i=0;i<arr1.length;i++){
		arr1[i] = i+1;
	}
	this.setData({
		array:arr1,
		goods_option:this.selectComponent('#goods')
	 })
	
	wx.request({
		url: "http://api.useosc.com/mock/32/goods",
		method:'GET', 
		success:res=>{
			this.setData({
				goods:res.data,
				spinShow:false
			})
		}
	}) 
  },
  measure(){
	  if(this.data.estimate){
		this.setData({
			estimate:false
		})
	  }else{
		this.setData({
			estimate:true
		})  
	  }
	
  },
  sure(e){
		let index=e.currentTarget.dataset.index
		if(index == 1){
			this.setData({
				current:1
			})
		  
		}else{
			let state =Verification.volume(this.data.volume)
			if(state){
				this.setData({
					volume:this.data.volume,
					estimate:true
				})
			}
		}
  },
  nextStep(){
	wx.navigateTo({
		url:`../measure/measure?bedroom=${this.data.rooms.bedroom}&parlour=${this.data.rooms.parlour}`
	});
	this.setData({
		current:0,
		estimate:true
	})
  },
  
  
  volume(e){ //输入体积框
  let value=e.detail.value
	this.setData({
		volume:value
	})
  },
  
  typeExpress(e){  //快递类型
	  this.setData({
	   	typeExpress:e.detail.value
	  })
  },
  weightEvent(e){
	  this.setData({
	   	weight:e.detail.value
	  })
  },
  typeEvent(e){
	  this.setData({
	   	international:e.detail.value
	  })
  },
  insuranceEvent(e){  //保价
	 this.setData({
	  	insurance:e.detail.value
	 })
  },
  stairsEvent(e){
	  this.setData({
			stairs:e.detail.value
	  })
  },
  remarks_input(e){  //备注
	  this.setData({
		remarks:e.detail.value
	  })
  },
  service_type(e){  //服务类型 
	this.setData({
		service_type:e.detail.value
	})
  },
  prohibit(e){  //禁止输入框和传值
	if(e.detail.stata == "true"){
		this.setData({
			mask:true
		})
	}else{ 
		this.setData({
			weight:e.detail.volume,
			choice_data:e.detail.data,
			mask:false,
			
		})
		
	}
  },
  
  carry(e){//啥搬家 国内 国际 国际快递 c
	var that = this 
	this.setData({
		carry:e.detail.value
		
	})
	 
  },
  types_handling(e){ 
	  this.setData({
	  	carry_type:e.detail.value
	  })
  },
  time_data(e){  //预约时间
		this.setData({
			times_data:e.detail
		})
	 
  },
  member_map(e){ 
	   wx.navigateTo({
	  	url:"../../personnel_map/personnel_map?who="+e.target.dataset.who
	  }) 
  },
  coupon(){ 
	  wx.navigateTo({
	  	url:"../../coupon/coupon"
	  })
  },
  bedroomChange(e){
	  console.log(this.data.bedroomArray[e.detail.value]  )
		this.data.rooms.bedroom=this.data.bedroomArray[e.detail.value]  
		this.setData({
			rooms:this.data.rooms
		})
  },
  parlourChange(e){
	   this.data.rooms.parlour=this.data.bedroomArray[e.detail.value]  
	    this.setData({
	    rooms:this.data.rooms
	  })
	  
  },
  bindPickerChange(e){  //选择楼层
		let num=e.detail.value
		this.setData({
			floor:++num
		})
		
  },
  plus_reduce(e){   //加减
	let name=e.currentTarget.dataset.name
	let index=e.currentTarget.dataset.index
	if(index==1){
		if(name==1&&this.data.hall>0){
			this.setData({
				hall:--this.data.hall
			})
		}else if(name==2&&this.data.hall>=0){
			this.setData({
				hall:++this.data.hall
			})
		}
	}
	if(index==2){
		if(name==1&&this.data.room>0){
			this.setData({
				room:--this.data.room
			})
		}else if(name==2&&this.data.room>=0){
			this.setData({
				room:++this.data.room
			})
		}
	}
	if(index==3){
		if(name==1&&this.data.toilet>0){
			this.setData({
				toilet:--this.data.toilet
			})
		}else if(name==2&&this.data.toilet>=0){
			this.setData({
				toilet:++this.data.toilet
			})
		}
	}
	if(index==4){
		if(name==1&&this.data.balcony>0){
			this.setData({
				balcony:--this.data.balcony
			})
		}else if(name==2&&this.data.balcony>=0){
			this.setData({
				balcony:++this.data.balcony
			})
		}
	}
  },
  
  startReportHeart() {
	 var that=this
     that.data.timerTem = setTimeout(function () {
          that.setData({
			  number:Math.floor(Math.random()*(that.data.max-that.data.min+1)+that.data.min)
		  }) 
         that.startReportHeart()
     }, 400) 
	},
	
	location(){
		var that=this
		wx.chooseLocation({
			success: function (res) {
				 console.log(res)
				 that.data.start_location.place=res.address
				 that.data.start_location.longitude=res.longitude
				 that.data.start_location.latitude=res.latitude  
				that.setData({
					start_location:that.data.start_location
				})
				
			if(that.data.end_location.latitude !=""){ 
				console.log([that.data.end_location.latitude,that.data.end_location.longitude])
				qqmapsdk.calculateDistance({
					from:{latitude:that.data.start_location.latitude,longitude:that.data.start_location.longitude},
					to:[{latitude:that.data.end_location.latitude,longitude:that.data.end_location.longitude}],
					 success:function(res)  {
						  console.log(res);
					},
					  fail: function(error) {
					  console.error(error);
					},
					complete: function(res) {
					  console.log(res);
					}
				})
			}
				
			}
		})
	},
	end_location(){
		var that=this 
		wx.chooseLocation({
			success: function (res) {
				 that.data.end_location.place=res.address
				 that.data.end_location.longitude=res.longitude
				 that.data.end_location.latitude=res.latitude  
				that.setData({
					end_location:that.data.end_location
				})
				
				if(that.data.start_location.latitude !=""){ 
					console.log([that.data.end_location.latitude,that.data.end_location.longitude])
					qqmapsdk.calculateDistance({
						from:{latitude:that.data.start_location.latitude,longitude:that.data.start_location.longitude},
						to:[{latitude:that.data.end_location.latitude,longitude:that.data.end_location.longitude}],
						 success:function(res)  {
							  console.log(res);
						},
						  fail: function(error) {
						  console.error(error);
						},
						complete: function(res) {
						  console.log(res);
						}
					})
				}
			} 
		})
		
		
	},
	get_end(e){  //获取目的地
		
	},
	move:function(){},  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	this.setData({ 
		spinShow:false
	})
	if(wx.getStorageSync("volume")!=""){
		this.setData({
			weight:wx.getStorageSync("volume")
		})
		  wx.removeStorageSync('volume')
		
	}
	
	
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
	 var that=this
	clearTimeout(that.data.timerTem) 
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