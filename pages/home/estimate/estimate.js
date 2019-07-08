var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({key: 'ZXLBZ-XK5RI-WLJGO-55MKH-P2YKT-TFB5G' ,});// 必填
const { $Message } = require('../../../dist/base/index'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
	hall:0,//厅
	room:0,//房间
	toilet:0,//卫生间
	balcony:0,//阳台
	success_data:[], //物品详情
	volume:"", //体积
	remarks:"", //备注
	international:1,//国际搬家和国际快递的第一个单选
	weight:0, //国际快递 重量
	times_data:"", //时间
	number:0, 
	min:1000,
	max:99999,
	state:false,
	change_goods:"",
	delete_goods:"",
	insurance:0,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.startReportHeart() 
	this.doms = this.selectComponent('#goods');
	var arr1 = new Array(100);
	for(var i=0;i<arr1.length;i++){
		arr1[i] = i+1;
	}
	this.setData({ array:arr1 })
	
	wx.request({
		url: "http://api.useosc.com/mock/32/goods",
		method:'GET', 
		success:res=>{
			this.setData({
				goods:res.data,
				spinShow:false
			})
			
			// console.log(res)
		}
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
  insuranceEvent(e){
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
  
  
  sure(){ 
	this.setData({
		state:false
	})  
  },
  godos_list(){
	this.setData({
		state:true
	})
  },
  goods_data(e){
	// console.log(e.detail)
	this.setData({
		volume:e.detail[1],
		success_data:e.detail[0]
	})
  },
  
  carry(e){//啥搬家 国内 国际 国际快递
	var that = this 
	this.setData({
		carry:e.detail.value,
		carry_type:1,
		service_type:1,
		floor:1, //楼层
		stairs:1,
		success_data:[],
		remarks:'',
		volume:'',
		weight:'',
		times_data:"",
		insurance:0
		
	})
	// this.doms.updata_goods()
  },
  types_handling(e){
	  this.setData({
	  	carry_type:e.detail.value,
		service_type:1,
		floor:1, //楼层
		stairs:1,
		success_data:[],
		remarks:'',
		volume:'',
		times_data:"",
		insurance:0
	  })
	// this.doms.updata_goods()
  },
  time_data(e){
	  times_data:e.detail
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
  bindPickerChange(e){  //选择楼层
		let num=e.detail.value
		this.setData({
			floor:++num
		})
		
  }, 
  choice_time(){  //选择时间
	  
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
	plus_reduce_two(e){  //物品清单加减
		let id=e.currentTarget.dataset.ids   //物品id
		let index=e.currentTarget.dataset.id   //物品下标
		let index_two=e.currentTarget.dataset.index  //1减2加
		let number=e.currentTarget.dataset.number  //当前物品数量
		let volume=e.currentTarget.dataset.volume  //当前物品重量  
		
		if(index_two==1 && number==1){
				$Message({content: '至少要有一件哦！',type: 'warning'});
		}else if(index_two==1 && number>1){
			this.data.success_data[index].number=this.data.success_data[index].number-1
			this.setData({
				volume:this.data.volume-volume,
				success_data:this.data.success_data,
				change_goods:this.data.success_data[index]
			})
			this.doms.change_goods();
			
		}else if(index_two==2){ 
			this.data.success_data[index].number=this.data.success_data[index].number+1
			this.setData({
				volume:this.data.volume+volume,
				success_data:this.data.success_data,
				change_goods:this.data.success_data[index]
			})
			this.doms.change_goods_two();
		}	
	},
	delete_goods(e){   //删除物品
		let index=e.currentTarget.dataset.index   //物品下标
		let number=e.currentTarget.dataset.number   //当前物品数量
		let volume=e.currentTarget.dataset.volume   //当前物品重量 
		let volumes=volume*number
		this.data.delete_goods=this.data.success_data[index]
		this.data.success_data.splice(index,1)
		 
		this.setData({
			delete_goods:this.data.delete_goods,
			volume:this.data.volume-volumes,
			success_data:this.data.success_data
		})
		this.doms.change_goods_three();
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