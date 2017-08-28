const actions = {
	changeXmjlInfo({ commit }, info) {
		commit('changeXmjlInfo', info)
	},
	setVersion({ commit }, version) {
		commit('setVersion', version)
	}
}

export default actions