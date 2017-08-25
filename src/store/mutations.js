const mutations = {
    changeXmjlInfo(state, info) {
        if (typeof info == 'object') {
            for (var key in info) {
                state.xmjl_info[key] = info[key]
            }
        } else {
            console.error('changeXmjlInfo方法的参数只能是对象')
        }
    },
    changeUserType(state, type) {
        if (type) {
            state.userType = type
        }
    },
    changePublishWork(state, info) {
        if (info) {
            state.publish_work = info;
        }
    }
}

export default mutations