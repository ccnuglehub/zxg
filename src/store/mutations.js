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
		for(var key in state) {
			if(version[key]) {
				state[key] = version[key]
			} else {
				state[key] = false
			}
		}
	},
	upDateLocalStorage(state, obj) {
		if(typeof obj == 'object') { 
			for(var key in obj) {
				localStorage[key] = obj[key]
			}
		} else {
			console.error('upDateLocalStorage方法的参数只能是对象')
		}
	},
	upDateSessionStorage(state, obj) {
		if(typeof obj == 'object') { 
			for(var key in obj) {
				sessionStorage[key] = obj[key]
			}
		} else {
			console.error('upDateSessionStorage方法的参数只能是对象')
		}
	},
	getLocalStorage(state, data) {
		var obj = {}
		if (Object.prototype.toString.call(data) === '[object String]') {
			obj[data] = localStorage[data]
		} else if (Object.prototype.toString.call(data) === '[object Array]') {
			data.forEach(element => {
				obj[element] = localStorage[element]
			})
		}
		return obj
	},
	setState(state, obj) {
		if (Object.prototype.toString.call(obj) === '[object Object]') {
			if(obj.anchor) {
				state.anchor = {}
				for(var key in obj) {
					if( key != 'anchor'){
						state.anchor[key] = obj[key]
					}
				}
			} else {
				for(var key in obj) {
						state[key] = obj[key]
				}
			}
		} else {
			console.error('setState方法的参数只能是对象')
		}
	}
}

export default mutations
