const actions = {
	scrollHandler({ commit }, cb) {
		commit('changePageFlagN', cb)
	},
	changeXmjlInfo({ commit }, info) {
		commit('changeXmjlInfo', info)
	}
}

export default actions