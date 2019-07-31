//app.js
App({
  onLaunch: function() {
    console.log("==================初始化================");
  },
  globalData: { //全局数据
    searchWord: '', //城市
    url: ""
  },
  onShow() {
    console.log("==================启动中================");
  },
  util: require("static/js/util.js"),
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