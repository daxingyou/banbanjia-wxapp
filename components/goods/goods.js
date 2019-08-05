const { $Message } = require('../../dist/base/index'); 
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	data:{
		type:Array,
		value:[]
	},
	
  },

  /**
   * 组件的初始数据
   */
  data: {
	state:false,
	state_list:false,
	new_index:0,  //当前选择的tid
	new_data:[],
	weight:null, //重量
	choice_data:[],
  },
  /**
   * 组件的方法列表
   */
  methods: {
	move:function(){},
	
	godos_list(){ //物品清单
		
		if(this.data.state_list == true){
			this.triggerEvent("myevent", { stata:"false",data:this.data.choice_data,volume:this.data.weight})
			this.setData({
				state_list:false
			})
		}else{
			this.triggerEvent("myevent", { stata:"true"})
			this.setData({
				state_list:true
			})
		} 
		
	}, 
	plus_reduce(e){
		let state=1
		let id=e.currentTarget.dataset.ids   //物品id
		let index=e.currentTarget.dataset.id   //物品下标
		let index_two=e.currentTarget.dataset.index  //1减2加
		let number=e.currentTarget.dataset.number  //当前物品数量
		let volume=e.currentTarget.dataset.volume  //当前物品重量  
		
		if(index_two==1){
			if(number>0){
				this.data.new_data[index].number=this.data.new_data[index].number-1
				for(let b=0;b<this.data.choice_data.length;b++){
					// console.log(this.data.choice_data[b].number)
					if(this.data.choice_data[b].number==0 && this.data.choice_data[b].id==id ){
						this.data.choice_data.splice(b,1)
					} 
				}
				this.setData({
					new_data:this.data.new_data,  //让当前页面显示数字动
					weight:this.data.weight-volume,
					choice_data:this.data.choice_data
				})
				// console.log([this.data.choice_data,this.data.weight])
			} 
		}else{ 
			this.data.new_data[index].tid=this.data.new_index
			
			if(this.data.new_data[index].number ==null){ 
				this.data.new_data[index].number=0 
			} 
			this.data.new_data[index].number=this.data.new_data[index].number+1
			
			this.setData({
				new_data:this.data.new_data,  //让当前页面显示数字动
				weight:this.data.weight+volume,
			})
			
			
			if(this.data.choice_data!=[]){   //判断是否重复
				for(let i=0;i<this.data.choice_data.length;i++){
					if(this.data.choice_data[i].id==id){
						this.data.choice_data[i].number+1;state=2;break;
					}
				}
			}
			if(state==1){ 
				this.data.choice_data.push(this.data.new_data[index])
			}
			this.setData({
				choice_data: this.data.choice_data
			})
		}	
	},
	
	sure(){
		let data=[this.data.choice_data,this.data.weight]
		this.setData({
			state:false
		})
		this.triggerEvent("myevent", { stata:"false",data:this.data.choice_data,volume:this.data.weight})
	  },
	clicks(e){
		this.triggerEvent('myevent', { stata:"true"});  //传父组件
		
		let index =e.currentTarget.dataset.name 
		for(let i=0;i<this.data.data.length;i++){
			if(this.data.data[i].tid==index){ 
				this.setData({
					new_data:this.data.data[i].data
				})
			}
		}
		this.setData({
			new_index:index,
			state:true
		}) 
	},
	
	
	plus_reduce_two(e){  //物品清单加减
		console.log(e)
		console.log(this.data.choice_data)
		
		let id=e.currentTarget.dataset.id   //物品id
		let index=e.currentTarget.dataset.index   //物品下标
		let index_two=e.currentTarget.dataset.jj  //1减2加
		let number=e.currentTarget.dataset.number  //当前物品数量
		let volume=e.currentTarget.dataset.volume  //当前物品重量   
		if(index_two==1 && number==1){
				$Message({content: '至少要有一件哦！',type: 'warning'});
		}else if(index_two==1 && number>1){
			this.data.choice_data[index].number=this.data.choice_data[index].number-1
			this.setData({
				weight:this.data.weight-volume,
				choice_data:this.data.choice_data,
				change_goods:this.data.choice_data[index]
			})
		}else if(index_two==2){ 
			this.data.choice_data[index].number=this.data.choice_data[index].number+1
			this.setData({
				weight:this.data.weight+volume,
				choice_data:this.data.choice_data, 
			}) 
		}	
	},
	
	
	
	delete_goods(e){   //物品清单  删除物品
		let id = e.currentTarget.dataset.id
		let index=e.currentTarget.dataset.index   //物品下标
		let number=e.currentTarget.dataset.number   //当前物品数量
		let volume=e.currentTarget.dataset.volume   //当前物品重量 
		let area=volume*number 
		let   tid =e.currentTarget.dataset.tid
		let datas = this.data.data  
		
		console.log(tid)
		for(let i=0;i<datas.length;i++){
			if(datas[i].tid==tid){
				for(let f=0;f<datas[i].data.length;f++){
					 if(datas[i].data[f].id==id){
						datas[i].data[f].number=0
						this.setData({
							data:datas
						})
					}
				 }
			}
		}
		// this.data.delete_goods=this.data.choice_data[index]
		this.data.choice_data.splice(index,1)
		 
		this.setData({
			weight:this.data.weight-area,
			choice_data:this.data.choice_data
		})
	},
	
	
	
	
	
	member_map(e){ 
		   wx.navigateTo({
		  	url:"../../personnel_map/personnel_map?who="+e.target.dataset.who
		  }) 
	},
  }
})
