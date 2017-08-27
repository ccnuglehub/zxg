// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import infiniteScroll from 'vue-infinite-scroll'

import iView from 'iview'
import '../static/styles/iview.css'
import '../static/styles/mintui.css'
import vueTap from 'v-tap'

import MintUI from 'mint-ui'

//微信js-sdk
var wx = require('weixin-js-sdk')

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(iView)
Vue.use(MintUI)
Vue.use(infiniteScroll)
// vue.use(VueQArt)
Vue.use(vueTap)

Vue.wx = wx

// main.js
Vue.prototype.SDKRegister = (that, callback) => {
    // 接入微信JSSDK
	// 获取微信JSSDK配置
	// console.log(location.href.split('#')[0])
	that.$http.get('http://dashifan.cn/zxg/index.php?g=Weixin&m=WxApi&a=js_sdk_config',
		{
			params: {
				f_url:encodeURIComponent(location.href.split('#')[0])//当前网页地址
			},
			dataType:"json"
		}
	).then(res => {
        res = res.body.data
        that.wx.config({
			debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.appId, // 必填，公众号的唯一标识
			timestamp: res.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.nonceStr, // 必填，生成签名的随机串
			signature: res.signature, // 必填，签名，见附录1
			jsApiList: ['chooseImage','scanQRCode']
		})
    })
}



/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	// components: {VueQArt},
	render: h => h(App),
})