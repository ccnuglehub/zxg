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



Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(iView)
Vue.use(MintUI)
Vue.use(infiniteScroll)
// vue.use(VueQArt)
Vue.use(vueTap)


/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	// components: {VueQArt},
	render: h => h(App),
})