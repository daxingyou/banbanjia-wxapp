//估价页面的表单验证

const { $Toast } = require('../dist/base/index');

	function express(start_location,end_location,weight,times_data) {   //国际快递
		  if(start_location==""){
			return $Toast({content: '起运地不能为空'});
		  }else if(end_location==""){
			return $Toast({content: '目的地不能为空'});
		  }else if(weight=="" || weight==0){
				return $Toast({content: '重量不能为空'});
		  }else if(!(/^[0-9]*$/.test(weight))){
				return $Toast({content: '重量只能为数字'});
		  }else if(times_data==""){
				return $Toast({content: '时间不能为空'});
		  }
	}
	function international(start_location,end_location,times_data,choice_data,insurance){
		if(start_location==""){
					return $Toast({content: '起运地不能为空'});
		}
		else if(end_location==""){
					return $Toast({content: '目的地不能为空'});
		}else if(times_data==""){
				return $Toast({content: '时间不能为空'});
		}
		else if(choice_data==[] || choice_data==''){
				return $Toast({content: '物品至少选一件'});
		}else if(insurance==""){ 
				return $Toast({content: '保价不能为空'});
		}
	}
	
	function volume(volume){
		if(volume == ''){
			  $Toast({content: '输入框不能为空',type: 'warning'});return false;
		}else if(!(/^[0-9]*$/.test(volume))){
			 $Toast({content: '重量只能为数字'});return false;
		}else{
			return true
		}
	}

 

module.exports = { 
  express: express,
  international:international,
  volume:volume
}