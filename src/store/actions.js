const actions = {
    changeXmjlInfo({ commit }, info) {
        commit('changeXmjlInfo', info)
    },
    changeUserType({ commit }, type) {
        commit('changeUserType', type)
    },
    changePublishWork({ commit }, info) {
        commit("changePublishWork", info)
    },
}

export default actions