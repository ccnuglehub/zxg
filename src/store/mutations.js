const mutations = {
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
