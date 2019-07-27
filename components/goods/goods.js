// components/goods/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	data:{
		type:Array,
		value:[]
	},
	change_goods:{
		type:Object,
		value:""
	},
	delete_goods:{
		type:Object,
		value:""
	},
	updata:{
		type:Array,
		value:[]
	}
	
  },

  /**
   * 组件的初始数据
   */
  data: {
	state:false,
	new_index:0,  //当前选择的tid
	new_data:[],
	weight:0, //重量
	choice_data:[],
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
	move:function(){},
	updata_goods(){
		this.setData({
			choice_data:[],
			data:this.data.updata
		})
	},
	  
	  
	change_goods(){
	    let change_goods=this.data.change_goods
	  let datas=this.data.data
	  
	  for(let i=0;i<datas.length;i++){
	  	if(datas[i].tid==change_goods.tid){
	  		 for(let f=0;f<datas[i].data.length;f++){
	  			 if(datas[i].data[f].id==change_goods.id){
	  				datas[i].data[f].number=change_goods.number
	  				this.setData({
	  					data:datas,
	  						weight:this.data.weight-change_goods.volume
	  				})
	  			 }
	  		 }
	  		
	  	}
	  }
	},
	change_goods_two(){
		let change_goods=this.data.change_goods
		let datas=this.data.data
		
		for(let i=0;i<datas.length;i++){
			if(datas[i].tid==change_goods.tid){
				 for(let f=0;f<datas[i].data.length;f++){
					 if(datas[i].data[f].id==change_goods.id){
						datas[i].data[f].number=change_goods.number
						this.setData({
							data:datas,
								weight:this.data.weight+change_goods.volume
						})
					 }
				 }
				
			}
		}
	},
	change_goods_three(){
		let delete_goods=this.data.delete_goods
		let datas=this.data.data
		
		for(let i=0;i<datas.length;i++){
			if(datas[i].tid==delete_goods.tid){
				 for(let f=0;f<datas[i].data.length;f++){
					 if(datas[i].data[f].id==delete_goods.id){
						 let zong=datas[i].data[f].number*datas[i].data[f].volume
						datas[i].data[f].number=0
						this.setData({
							data:datas,
								weight:this.data.weight-zong
						})
					 }
				 }
				
			}
		}
	},
	  
	  
	plus_reduce(e){
		let state=1
		let id=e.currentTarget.dataset.ids   //物品id
		let index=e.currentTarget.dataset.id   //物品下标
		let index_two=e.currentTarget.dataset.index  //1减2加
		let number=e.currentTarget.dataset.number  //当前物品数量
		let volume=e.currentTarget.dataset.volume  //当前物品重量 
		
		if(index_two==1 && number>0 ){
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
			
			
			
		}else{
			this.data.new_data[index].tid=this.data.new_index
			if(this.data.new_data[index].number ==null){ 
				this.data.new_data[index].number=0
				
			} 
			
			if(this.data.choice_data!=[]){
				for(let i=0;i<this.data.choice_data.length;i++){
					if(this.data.choice_data[i].id==id){
					 state=2;break;
					}
				}
			}
			if(state==1){
				this.setData({
					choice_data:this.data.choice_data.concat(this.data.new_data[index])
				})
			}
			
			this.data.new_data[index].number=this.data.new_data[index].number+1
			this.setData({
				//new_data:this.data.new_data,  //让当前页面显示数字动
				weight:this.data.weight+volume,
			})
			 // console.log([this.data.choice_data,this.data.weight])
		}	
	},
	
	sure(){
		let data=[this.data.choice_data,this.data.weight]
		this.setData({
			state:false
		})
			
		this.triggerEvent("goods_data",data)
	  },
	clicks(e){
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
	}
  }
})
