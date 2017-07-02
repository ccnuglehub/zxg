const actions = {
	scrollHandler({ commit }, cb) {
		commit('changePageFlagN', cb)
	},
}

export default actions