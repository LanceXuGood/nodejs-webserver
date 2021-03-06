
function getQueryString(name) {//根据字段看网址是否拼接&字符串
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}
var from = getQueryString('from');
var appinstall = getQueryString('appinstall');
var isappinstalled = getQueryString('isappinstalled');
var sec = getQueryString('sec');
var timekey = getQueryString('timekey');

if(from || appinstall || sec || timekey || isappinstalled){//假如拼接上了
  window.location.href = window.location.href.replace(/(\&*from\=[^\&\?\=]+)|(\&*isappinstalled\=[^\&\?\=]+)|(\&*isappinstall\=[^\&\?\=]+)|(\&*sec\=[^\&\?\=]+)|(\&*timekey\=[^\&\?\=]+)/i,'').replace('/\?$/i','');
}
axios.post('wx/jsSdk', {
    url: location.href
}).then(function (data) {
    var wxData = data.data.data;

    setShareInfo({
      title:'父爱，在你看不到的地方', // 分享标题
      summary:'父爱如山，感觉不到只因身在此山中', // 分享内容
      pic:'http://www.webcodelance.cn/1.png', // 分享图片
      url:location.href, // 分享链接
      // 微信权限验证配置信息，若不在微信传播，可忽略
      WXconfig: {
        swapTitleInWX: true, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
        appId: wxData.appId, // 公众号的唯一标识
        timestamp: wxData.timestamp, // 生成签名的时间戳
        nonceStr: wxData.nonceStr, // 生成签名的随机串
        signature:  wxData.signature, // 签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','onMenuShareQZone']
      }
    });
    // if (wx) {
    //     console.log(1);
    //     wx.config({
    //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: wxData.appId, // 必填，公众号的唯一标识
    //         timestamp: wxData.timestamp, // 必填，生成签名的时间戳
    //         nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
    //         signature: wxData.signature, // 必填，签名，见附录1
    //         jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //     });
    // }
    // wx.ready(function () {
    //     wx.onMenuShareTimeline({
    //         title: '分享到朋友圈', // 分享标题
    //         link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         imgUrl: 'http://www.webcodelance.cn/1.png', // 分享图标
    //         success: function () {
    //             console.log('ok');
    //         },
    //         cancel: function () {
    //             console.log('cancel');
    //         }
    //     });
    //     wx.onMenuShareAppMessage({
    //         title: '分享给微信好友', // 分享标题
    //         link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         desc: '分享给微信好友测试', // 分享描述
    //         imgUrl: 'http://www.webcodelance.cn/1.png', // 分享图标
    //         success: function () {
    //             console.log('ok');
    //         },
    //         cancel: function () {
    //             console.log('cancel');
    //         }
    //     });
    //     wx.onMenuShareQQ({
    //         title: '分享给QQ好友', // 分享标题
    //         link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         desc: '分享给QQ好友测试', // 分享描述
    //         imgUrl: 'http://www.webcodelance.cn/1.png', // 分享图标
    //         success: function () {
    //             console.log('ok');
    //         },
    //         cancel: function () {
    //             console.log('cancel');
    //         }
    //     });
    //     wx.onMenuShareQZone({
    //         title: '分享到QQ空间', // 分享标题
    //         link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         desc: '分享到QQ空间测试', // 分享描述
    //         imgUrl: 'http://www.webcodelance.cn/1.png', // 分享图标
    //         success: function () {
    //             console.log('ok');
    //         },
    //         cancel: function () {
    //             console.log('cancel');
    //         }
    //     });
    //
    // });
    // wx.error(function (res) {
    //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    //     console.log(res)
    // })
}).catch(function (err) {
  console.log(err)
});

