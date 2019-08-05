//估价页面的表单验证

const { $Toast } = require('../dist/base/index');
    function free(start_location,volume){
		if(start_location==""){
			$Toast({content: '起运地不能为空'});return false;
		}else if(volume==""){
			$Toast({content: '体积不能为空'});return false;
		}else{
			return true
		}
		
	}
	
	 function share(start_location,end_location,volume,insurance){
		if(start_location==""){
			$Toast({content: '起运地不能为空'});return false;
		}else if(end_location==""){
			$Toast({content: '目的地不能为空'});return false;
		}else if(volume==""){
			$Toast({content: '体积不能为空'});return false;
		}else if(insurance==""){ 
			$Toast({content: '保价不能为空'});return false;
		}else{
			return true
		}
		
	}
	
	
	
	
	
	function international(start_location,end_location,times_data,volume,insurance){
		if(start_location==""){
			$Toast({content: '起运地不能为空'});return false;
		}else if(end_location==""){
			$Toast({content: '目的地不能为空'});return false;
		}else if(times_data==""){
			$Toast({content: '时间不能为空'});return false;
		}else if(volume==""){
			$Toast({content: '体积不能为空'});return false;
		}else if(insurance==""){ 
			$Toast({content: '保价不能为空'});return false;
		}else if(!(/^[0-9]*$/.test(insurance))){
				$Toast({content: '保价只能为数字'});return false;
		}else{
			return true
		}
	}
	function express(start_location,end_location,weight,times_data) {   //国际快递
		  if(start_location==""){
				$Toast({content: '起运地不能为空'});return false;
		  }else if(end_location==""){
				$Toast({content: '目的地不能为空'});return false;
		  }else if(weight=="" || weight==0){
				$Toast({content: '重量不能为空'});return false;
		  }else if(!(/^[0-9]*$/.test(weight))){
				$Toast({content: '重量只能为数字'});return false;
		  }else if(times_data==""){
				$Toast({content: '时间不能为空'});return false;
		  }else{
			return true  
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
  volume:volume,
  free:free,
  share:share
}