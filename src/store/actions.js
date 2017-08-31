const actions = {
	changeXmjlInfo({ commit }, info) {
		commit('changeXmjlInfo', info)
	},
	setVersion({ commit }, version) {
		commit('setVersion', version)
	},
	upDateLocalStorage({ commit }, obj) {
		commit('upDateLocalStorage', obj)
	},
	getLocalStorage({ commit }, data) {
		commit('getLocalStorage', data)
	},
	setState({ commit }, obj) {
		commit('setState', obj)
	}
}

export default actions