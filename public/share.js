axios.post('http://www.webcodelance.cn/wx/jsSdk', {
    url: location.href
}).then(function (data) {
    var wxData = data.data.data;

    if (wx) {
        console.log(1);
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxData.appId, // 必填，公众号的唯一标识
            timestamp: wxData.timestamp, // 必填，生成签名的时间戳
            nonceStr: wxData.nonceStr, // 必填，生成签名的随机串
            signature: wxData.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
    wx.ready(function () {
        wx.onMenuShareTimeline({
            title: '123', // 分享标题
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://img0.imgtn.bdimg.com/it/u=1999380000,1378130272&fm=214&gp=0.jpg', // 分享图标
            success: function () {
                console.log('ok');
            },
            cancel: function () {
                console.log('cancel');
            }
        });
        wx.onMenuShareAppMessage({
            title: '123', // 分享标题
            link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://img0.imgtn.bdimg.com/it/u=1999380000,1378130272&fm=214&gp=0.jpg', // 分享图标
            success: function () {
                console.log('ok');
            },
            cancel: function () {
                console.log('cancel');
            }
        });

    });
    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log(res)
    })
})
// axios.post('http://192.168.200.190:3000/vote/user', {
//     userName: '1',
//     contact: '1',
//     photoUrl: '1',
//     photoFrame: '1',
// }).then(function (data) {
//     console.log(data);
// })
// axios.post('http://192.168.200.190:3000/vote/laud', {
//     id: '95'
// }).then(function (data) {
//     console.log(data);
// })
