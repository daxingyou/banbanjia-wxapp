var city = require('../../../utils/city.js');
var amapFile = require('../../../utils/amap-wx.js');
var app = getApp();
Page({
  data: {
		visible:false,
		actions: [{name: '确定'}],
    searchLetter: [],
    showLetter: "",
		city:"点击获取当前城市",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id 
    hotcityList: [{ cityCode: 110000, city: '北京市' }, { cityCode: 310000, city: '上海市' }, { cityCode: 440100, city: '广州市' }, { cityCode: 440300, city: '深圳市' }, { cityCode: 330100, city: '杭州市' }, { cityCode: 320100, city: '南京市' }, { cityCode: 420100, city: '武汉市' }, { cityCode: 410100, city: '郑州市' }, { cityCode: 120000, city: '天津市' }, { cityCode: 610100, city: '西安市' }, { cityCode: 510100, city: '成都市' }, { cityCode: 500000, city: '重庆市' }]
  },
  onLoad: function () { 
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList
    })

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
	obtain(){
		if(this.data.city!="点击获取当前城市"){
				let val =this.data.city;
				app.globalData.searchWord = val;
				  wx.switchTab({
						url:'../home',
				})
		}
		var myAmapFun = new amapFile.AMapWX({key:'d0c3af928708ba936331f1859a312022'});
				myAmapFun.getRegeo({
					success:res=>{
						console.log(res[0].regeocodeData.addressComponent.city)
						this.setData({
							city:res[0].regeocodeData.addressComponent.city
						})
					},
					fail:info=>{
						this.setData({
							visible:true
						})
						console.log(info)
					}
				})
	},
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) { 
    // this.setData({ city: e.currentTarget.dataset.city })
		let val =e.currentTarget.dataset.city;
		app.globalData.searchWord = val;
		  wx.switchTab({
				url:'../home',
		})
		
  },
	handleClick(){
	    this.setData({
	        visible: false
	    });
	},
  //选择热门城市
  bindHotCity: function (e) { 
    // this.setData({ city: e.currentTarget.dataset.city})
		 this.setData({ city: e.currentTarget.dataset.city })
		let val =e.currentTarget.dataset.city;
		app.globalData.searchWord = val;
		  wx.switchTab({
				url:'../home',
		})
  },
  //点击热门城市回到顶部
  hotCity: function () {
    this.setData({
      scrollTop: 0,
    })
  }
})