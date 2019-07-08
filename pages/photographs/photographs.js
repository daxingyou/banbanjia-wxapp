const { $Message } = require('../../dist/base/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	list:['晒单','搬家记','问答'],
	evaluate_list:[],
	evaluate_list_two:[],
	orders:[{id:1,title:"2019 2 20  广州东浦到广州车陂"},{id:2,title:"2019 2 20  广州天河到美国"},{id:3,title:"2019 2 20  河南到广东"}],
	new_select:0,
	orders_item:null, //订单 id
	fraction:0,  //评分
	evaluate_list_new:[], //好评7*
	images: [],
	title:"",
	text:"",
  },
  delete_image(e){   //删除图片
	let array=this.data.images 
	array.splice(e.target.dataset.index,1) 
	this.setData({
		images:array
	})
  },
  enlarge_image(e){	//放大图片
	console.log(e.target.dataset.idx)
	wx.previewImage({
		current:this.data.images[e.target.dataset.idx]  , // 当前显示图片的http链接
		urls: this.data.images // 需要预览的图片http链接列表
	})  
  },
  orderSelect(e){
	  const index=e.detail.value
	  this.setData({
		  orders_item:this.data.orders[index]
	  })
  },
  
  select_type(e){ 
		const new_index=e.currentTarget.dataset.index 
		if(new_index!=0){
			this.setData({
				orders_item:null,
				fraction:0,
				evaluate_list_new:[],
				evaluate_list:this.data.evaluate_list_two,
				text:""
			})
		}else if(new_index!=1){
			this.setData({
				title:"",
			})
		}if(new_index!=2){
			this.setData({ 
				text:"",
				title:"",
			})
		}
		
		
		this.setData({
		   new_select:new_index
		})
  },
  photo_image(){
	  wx.chooseImage({
		    count:9,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success:res=> {
				const images = this.data.images.concat(res.tempFilePaths)
				if(images.length>9){ 
					return	$Message({content: '图片最多添加9张',type: 'warning'});
				} 
				this.setData({
					images:images
				}) 
			}
	  })
  },
  onChangefraction(e){
	const index = e.detail.index;
        this.setData({
            fraction : index
        })
  },
  select_evaluate(e){
	  let select=e.currentTarget.dataset.select 
	  let index =e.currentTarget.dataset.index 
	  if(select){
			this.data.evaluate_list_new.push(e.currentTarget.dataset.name) 
			this.data.evaluate_list[index].select=false
			this.setData({
		  		evaluate_list:this.data.evaluate_list,
		  		evaluate_list_new:this.data.evaluate_list_new
			})
	  }else{
			for(let i=0;i<this.data.evaluate_list_new.length;i++){
				if(this.data.evaluate_list_new[i]==e.currentTarget.dataset.name){
					this.data.evaluate_list_new.splice(i,1)
				}
			} 
			this.data.evaluate_list[index].select=true
			this.setData({
				evaluate_list:this.data.evaluate_list,
				evaluate_list_new:this.data.evaluate_list_new
			})
	  }
	  
	  
	  
	  
  },
  textinput(e){
	  const val=e.detail.value 
	  this.setData({
		  text:val
	  })
  },
  titleinput(e){
  	  const val=e.detail.value 
  	  this.setData({
  		  title:val
  	  })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  let list =[{"name":"准时达到"},{"name":"耐心细致"},{"name":"经验丰富"},{"name":"小心摆放"},{"name":"性价比高"}]
	  for(let i=0;i<list.length;i++){
		  list[i].select=true 
	  }
	  this.setData({
		  evaluate_list_two:JSON.parse(JSON.stringify(list)),
		  evaluate_list:JSON.parse(JSON.stringify(list)), 
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
	var url =app.globalData.url.replace(/pages/g, '..');
	wx.switchTab({
		url:url
	}) 
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