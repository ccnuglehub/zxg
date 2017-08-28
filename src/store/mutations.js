const mutations = {
	changeXmjlInfo(state, info) {
		if(typeof info == 'object') {
			for(var key in info) {
				state.xmjl_info[key] = info[key]
			}
		} else {
			console.error('changeXmjlInfo方法的参数只能是对象')
		}
	},
	setVersion(state, version) {
		for(var key in state.versions) {
			if(version[key]) {
				state.versions[key] = version[key]
			} else {
				state.versions[key] = false
			}
		}
	}
}

export default mutations
