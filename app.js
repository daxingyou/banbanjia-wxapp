	//app.js
App({
  util: require("static/js/util.js"),
  onLaunch: function() {
    console.log("==================初始化================");
  },
  globalData: { //全局数据
    searchWord: '', //城市
    url: "",
	url_two:"https://banbanjia.useosc.com/attachment/"  // 用户上传图片 前端调用的路径
  },
  goodsData:{	//物品全局数据
	goods:[] ,	//物品
	volume:0,	//计算的体积
	new_array:[]	,//当前选择的数组	
	bedroom_parlour:{
		bedroom:[],
		parlour:[],
		bedroom_index:0,
		parlour_index:0,
		bedroom_name_index:0,
		parlour_name_index:0,
		bedroom_number:0,
		parlour_number:0
	},  //index是尾数 name_index是名称尾数  number 多少个
	
	state:0,
  },
  
  
  
  onShow() {
    console.log("==================启动中================");
    //获取用户信息
    this.util.getUserOpenid()
  },
  ext: { //微擎相关配置
    siteInfo: {
      uniacid: "1",
      acid: "1",
      siteroot: "http://banbanjia.useosc.com/app/index.php",
      sitebase: "http://banbanjia.useosc.com/app",
      module: "hello_banbanjia"
    }
  },
  menu: {
    css: {},
    params: {
      navstyle: 0
    },
    position: {
      bottom: "80px",
      right: "10px",
      left: "inherit"
    },
    data: [{
      link: "pages/home/index",
      icon: "icon-home",
      text: "首页"
    }, {
      link: "pages/order/index",
      icon: "icon-order",
      text: "订单"
    }, {
      link: "pages/member/mine",
      icon: "icon-mine",
      text: "我的"
    }]
  }
})