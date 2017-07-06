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
}

export default mutations
