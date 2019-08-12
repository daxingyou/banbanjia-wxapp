import {
  base64_encode,
  base64_decode
} from 'base64';
import md5 from 'md5';
var util = {}; //工具包

util.base64_encode = function (str) {
  return base64_encode(str);
}
util.base64_decode = function (str) {
  return base64_decode(str)
};

util.md5 = function (str) {
  return md5(str)
};

/**
	构造微擎地址, 
	@params action 微擎系统中的controller, action, do，格式为 'wxapp/home/navs'
	@params querystring 格式为 {参数名1 : 值1, 参数名2 : 值2}
*/
util.url = function (action, querystring) {
  var app = getApp();
  var ext = app.ext;
  var url = ext.siteInfo.siteroot + '?i=' + ext.siteInfo.uniacid + '&t=' + ext.siteInfo.multiid + '&v=' + ext.siteInfo.version + '&m=' + ext.siteInfo.module + '&c=entry&do=mobile&';
  if (action) {
    //fromurl: "mall/home/index/index",
    //tourl: "&ctrl=mall&ac=home&op=index&ta=index",
    action = action.split('/');
    url += 'ctrl=' + action[0] + '&';
    url += 'ac=' + action[1] + '&';
    url += 'op=' + action[2] + '&';
    url += 'ta=' + action[3] + '&';
  }
  if (querystring && typeof querystring === 'object') {
    for (let param in querystring) {
      if (param && querystring.hasOwnProperty(params) && querystring[param]) {
        url += param + '=' + querystring[param] + '&';
      }
    }
  }
  return url += '&from=wxapp';
}
/*
 * 获取链接某个参数
 * url 链接地址
 * name 参数名称
 */
function getUrlParam(url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = url.split('?')[1].match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
//获取url中的参数
function getQuery(url) {
  var theRequest = [];
  if (url.indexOf("?") != -1) {
    var str = url.split('?')[1];
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      if (strs[i].split("=")[0] && unescape(strs[i].split("=")[1])) {
        theRequest[i] = {
          'name': strs[i].split("=")[0],
          'value': unescape(strs[i].split("=")[1])
        }
      }
    }
  }
  return theRequest;
}

/**
	二次封装微信wx.request函数、增加交互体全、配置缓存、以及配合微擎格式化返回数据

	@params option 弹出参数表，
	{
		url : 同微信,
		data : 同微信,
		header : 同微信,
		method : 同微信,
		success : 同微信,
		fail : 同微信,
		complete : 同微信,

		cachetime : 缓存周期，在此周期内不重复请求http，默认不缓存
	}
*///(去掉初始化授权弹框)
util.request = function (option) {
  // console.log('util.request');
  var option = option ? option : {};
  var sessionid = wx.getStorageSync('userInfo').sessionid;
  var url = option.url;
  if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
    url = util.url(url);
  }
  var state = getUrlParam(url, 'state');
  if (!state && !(option.data && option.data.state) && sessionid) {
    url = url + '&state=we7sid-' + sessionid;
  }
  // if (1 == option.forceOauth || !sessionid) { //没有sessionid或者强制重新授权
  //   util.getUserInfo(function () {
  //     util.request(option);
  //   })
  // } else {
  wx.request({
    'url': url,
    'data': option.data ? option.data : {},
    'header': option.header ? option.header : {},
    'method': option.method ? option.method : 'GET',
    'header': {
      'content-type': 'application/x-www-form-urlencoded'
    },
    'success': function (response) {
      // wx.hideNavigationBarLoading();
      // wx.hideLoading();
      // response.data.message || console.log(response.data.message);
      if (response.data.errno == '-3e3') {
        return response.data.message.message;
      } else if (response.data.errno == '41009') { //生成用户信息
        wx.setStorageSync('userInfo', '');
        util.getUserOpenid(function () {
          util.request(option)
        });
        return;
      } else {
        if (option.success && typeof option.success == 'function') {
          option.success(response);
        }
      }
    },
    'fail': function (response) {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      if (option.fail && typeof option.fail == 'function') {
        option.fail(response);
      }
    },
    'complete': function (response) {
      // wx.hideNavigationBarLoading();
      // wx.hideLoading();
      if (option.complete && typeof option.complete == 'function') {
        option.complete(response);
      }
    }
  });
  // }
}
//获得openid和sessionid
util.getUserOpenid = function (cb) {
  var login = function () {
    var userInfo = {
      'sessionid': '',
    };
    wx.login({
      success: function (res) {
		console.log("已调用wx.login")
        util.request({
          url: 'system/common/session/openid',
          data: {
            code: res.code
          },
          success: function (res1) {
            // console.log('res1: ', res1)
            if (res1.data.errno) {
              wx.showModal({
                content: res1.data.message
              })
            } else {
			userInfo.phone = res1.data.data.member.mobile
            userInfo.sessionid = res1.data.data.sessionid;
            wx.setStorageSync('userInfo', userInfo);
            if (typeof cb == 'function') {
                cb(userInfo);
              }
            }
          },
          fail: function (res) {
            console.log('fail: ', res)
          }
        })
      }
    })
  }
  login();
}

// 获取用户信息
util.getUserInfo = function (cb) {
  var login = function () {
    console.log('start login');
    var userInfo = {
      'sessionid': '',
      'wxInfo': '',
      'memberInfo': '',
    };
    wx.login({
      success: function (res) {
        console.log('wx.login: ', res);
        util.request({
          url: 'system/common/session/openid',
          data: {
            code: res.code
          },
          cachetime: 0,
          success: function (res1) {
            console.log('openid: ', res1);
            if (res1.data.errno) {
              wx.showModal({
                content: res1.data.message
              })
            } else {
              userInfo.sessionid = res1.data.data.sessionid;
              wx.setStorageSync('userInfo', userInfo);
              if (typeof cb == 'function') {
                cb(userInfo);
              }
              wx.getUserInfo({
                success: function (res2) {
                  console.log('成功');
                  console.log(res2);
                  userInfo.wxInfo = res2.userInfo;
                  wx.setStorageSync('userInfo', userInfo);
                  util.request({
                    showLoading: !1,
                    url: 'system/common/session/userinfo',
                    data: {
                      signature: res2.signature,
                      rawData: res2.rawData,
                      iv: res2.iv,
                      encrytedData: res2.encrytedData
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    cachetime: 0,
                    success: function (res3) {
                      if (res3.data.errno) {
                        wx.showModal({
                          content: res3.data.message
                        })
                      } else {
                        userInfo.memberInfo = res3.data.data;
                        wx.setStorageSync('userInfo', userInfo);
                      }
                    }
                  })
                },
                fail: function (res) {
                  console.log('失败');
                  console.log(res);
                  if (res) {
                    if ('getUserInfo:fail scope unauthorized' == res.errMsg) {
                      util.showOauth();
                    } else {
                      if ('getUserInfo:fail auth deny' == res.errMsg) {
                        wx.showModal({
                          title: '授权提示',
                          content: '若需登录平台，平台需要获取您的公开信息（昵称、头像等）',
                          confirmText: '授权',
                          showCancel: !1,
                          success: function (res1) {
                            if (res1.confirm) {
                              wx.openSetting({
                                success: function () { }
                              })
                            } else {
                              res1.cancel;
                            }
                          }
                        })
                      }
                    }
                  }
                }
              })
            }
          },
          fail: function (res) {
            console.log('fail: ', res)
          }
        })
      }
    });
  }
  var user = wx.getStorageSync('userInfo');
  if (user.sessionid) {
    wx.checkSession({
      success: function () {
        'function' == typeof cb && cb(user);
      },
      fail: function () {
        // user.sessionid = '';
        // console.log('relogin');
        // wx.removeStorageSync('userInfo');
        // login();
      }
    })
  } else {
    //调用登录接口
    login();
  }
}
//js事件处理
util.jsEvent = function (e) {
  var eventType = e.currentTarget.dataset.eventType || "jsPost";
  if ("jsPost" == eventType) util.jsPost(e);
  else if ("jsOauth" == eventType) {
    console.log(e);
    var detail = e.detail;
    var member = {};
    if ("getUserInfo:ok" == detail.errMsg) {
      util.request({
        showLoading: !1,
        url: 'system/common/session/userinfo',
        data: {
          signature: detail.signature,
          rawData: detail.rawData,
          iv: detail.iv,
          encrytedData: detail.encrytedData
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        cachetime: 0,
        success: function (response) {

        }
      })
    } else if ('getUserInfo:fail auth deny' == detail.errMsg) {
      wx.showModal({
        title: '授权提示',
        content: "若需登录平台，平台需要获取您的公开信息（昵称、头像等）",
        confirmText: "授权",
        showCancel: !1,
        success: function (response) {
          response.confirm ? wx.openSetting({
            success: function () { }
          }) : response.cancel;
        }
      })
    }
  }
}


module.exports = util;