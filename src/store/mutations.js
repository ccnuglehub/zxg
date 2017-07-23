const mutations = {
	scrollHandler(state, cb) {
		const scroll_height = document.body.scrollTop
		const doc_height = document.body.scrollHeight
		if (!this.window_height) {
			this.window_height = window.innerHeight
		}
		const height = scroll_height + this.window_height
		if (height == doc_height && this.fetch_flag == true) {
			// doSomething
		}
		if (scroll_height == 0 && this.fetch_flag == true) {
			// doSomething
		}
	},
	changeXmjlInfo(state, info) {
		if(typeof info == 'object') {
			for(var key in info) {
				state.xmjl_info[key] = info[key]
			}
		} else {
			console.error('changeXmjlInfo方法的参数只能是对象')
		}
	}
}

export default mutations
