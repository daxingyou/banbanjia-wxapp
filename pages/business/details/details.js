 
 Page({

  /**
   * 页面的初始数据
   */
  data: {
	  ai:1,
	imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
	service_type:["免费测量","免费报价","验收报告","现场参观"],
	 colorArr: ["#EE2C2C", "#ff7070", "#EEC900", "#4876FF", "#ff6100",
      "#7DC67D", "#E17572", "#7898AA", "#C35CFF", "#33BCBA", "#C28F5C",
      "#FF8533", "#6E6E6E", "#428BCA", "#5cb85c", "#FF674F", "#E9967A",
      "#66CDAA", "#00CED1", "#9F79EE", "#CD3333", "#FFC125", "#32CD32",
      "#00BFFF", "#68A2D5", "#FF69B4", "#DB7093", "#CD3278", "#607B8B"], 
    randomColorArr: [],
	
	service:[
		{image:"http://www.lnfhsl.cn/image/icon/celiang.png",title:"上门量房",explain:"详细说明"},
		{image:"http://www.lnfhsl.cn/image/icon/baojia.png",title:"商家报价",explain:"详细说明"},
		{image:"http://www.lnfhsl.cn/image/icon/baogao.png",title:"验收报告",explain:"详细说明"},
		{image:"http://www.lnfhsl.cn/image/icon/tiji.png",title:"体积测量",explain:"详细说明"},
		],
	case_list:[{image:"http://www.lnfhsl.cn/image/image/desert-2969368_1920.jpg",title:"的接口撒大口径"},
		{image:"http://www.lnfhsl.cn/image/image/539e4df0e1b02.jpg",title:"孵化基地发"},
		{image:"http://www.lnfhsl.cn/image/image/0372d195ac1cd55a8012062e3b16810.jpg",title:"阿斯顿1"},
		{image:"http://www.lnfhsl.cn/image/image/poppy-4243860_1920.jpg",title:"撒大声地"},
	]
	
	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let that = this,
        labLen = this.data.service_type.length,
        colorArr = this.data.colorArr,
        colorLen = colorArr.length,
        randomColorArr = []; 
		do{
		  let random = colorArr[Math.floor(Math.random() * colorLen)];
		  randomColorArr.push(random);
		  labLen--;
		} while (labLen > 0)
		
		this.setData({ 
		  randomColorArr: randomColorArr
		});
  },
	
	more(){
		
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