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
import { API_ROUTER_CONFIG, API_ASSETS_CONFIG, HOST_CONFIG } from '@/api/config/api_config'
// import wx from "weixin-js-sdk"


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(iView)
Vue.use(MintUI)
Vue.use(infiniteScroll)
    // vue.use(VueQArt)
Vue.use(vueTap)
    // Vue.use(wx)

if (window.localStorage) {
    // alert("localStorage")
    //2adsfad1231 
    localStorage.setItem("openid", "adfa2435245")
        // localStorage.removeItem("openid")
        // localStorage.setItem("one", [1, 2, 3])
        // console.log(localStorage.getItem("one")[0])
}


/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
    mounted: function() {
        if (localStorage.getItem("openid")) {
            this.$http.post(HOST_CONFIG.serverIp + '?c=worker&f=get_user_type', {
                "open_id": localStorage.getItem("openid")
            }, { emulateJSON: true }).then((response) => {
                if (response.status == 200) {
                    if (response.body.data.user_type) {
                        localStorage.setItem("userType", "1")
                    }
                }
            }, (response) => {
                // error callback 
            })
        }

        // this.$http.post(HOST_CONFIG.jssdkIp, {
        //     params: { f_url: encodeURIComponent(location.href.split("#")[0]) }
        // }, { emulateJSON: true }).then((data) => {
        //     let config = data.data.data
        //     console.log(config)
        //     wx.config({
        //         debug: true,
        //         appid: config.appId,
        //         timestamp: config.timestamp,
        //         nonceStr: config.nonceStr,
        //         signature: config.signature,
        //         jsApiList: ['chooseImage', 'scanQRCode']
        //     })

        // }, (response) => {
        //     alert(JSON.stringify(response))
        // })
    },
    methods: {

    }
})