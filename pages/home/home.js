// var amapFile = require('../../utils/amap-wx.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    empower: false, //是否授权
    visible: false,
    city: '选择',
    current: 1,
    imgUrls: [], //轮播
    msgList: [{
        url: "url",
        origin: "广州",
        end: '美国',
        type: "国际搬家",
        time: "12-6"
      },
      {
        url: "url",
        origin: "深圳",
        end: '澳大利亚',
        type: "国际搬家",
        time: "12-6"
      },
      {
        url: "url",
        origin: "河源",
        end: '广州',
        type: "国内搬家	",
        time: "12-6"
      },
    ], //实时订单
    msgList_two: [{
        name: '开玩笑共享搬家成功'
      },
      {
        name: '是固定共享搬家成功'
      },
      {
        name: '啊尬共享搬家成功'
      },
    ], //实时订单
    actions: [{
      name: '确定'
    }],

  },
  currents(e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },
  handleClick() {
    this.setData({
      visible: false
    });
  },
  state(e) {
    this.setData({
      empower: false
    })
  },
  choose_city() { //选择城市页面
    wx.navigateTo({
      url: './location/location'
    })
  },
  estimate() {
    wx.navigateTo({
      url: './estimate/estimate'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.Automatic_positioning() //获取定位




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // wx.login({
    //   success: function(res){
    //     console.log(res);
    //   }
    // })
    //请求首页数据
    // app.util.request({
    //   url: 'mall/home/index/index',
    //   data: '',
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {
    //     console.log(res);
    //   }
    // })
    //轮播图
    app.util.request({
      url: 'mall/home/api/slide',
      success: function(res){
        console.log('res: ',res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var pages = getCurrentPages()
    var url = pages[pages.length - 1].route
    app.globalData.url = url;


    if (app.globalData.searchWord == "") {} else {
      let val = app.globalData.searchWord;
      this.setData({
        city: val
      })
    }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  Automatic_positioning() { //自动定位
    var myAmapFun = new amapFile.AMapWX({
      key: 'd0c3af928708ba936331f1859a312022'
    });
    myAmapFun.getRegeo({
      success: res => {
        console.log(res[0].regeocodeData.addressComponent.city)
        this.setData({
          city: res[0].regeocodeData.addressComponent.city
        })
      },
      fail: info => {
        this.setData({
          visible: true
        })
        console.log(info)
      }
    })
  }
})