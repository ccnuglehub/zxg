// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import iView from 'iview';
import '../node_modules/.npminstall/iview/2.0.0-rc.17/iview/dist/styles/iview.css';


Vue.config.productionTip = false
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
})