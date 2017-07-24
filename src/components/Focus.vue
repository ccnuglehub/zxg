<template>
    <div class="wrap">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="focus">
            <div v-tap="{ methods: goWorkerDetail, params: item }" v-for="(item,index) in focus_list" :key="index" class="item_list">
                <div class="type item">{{ changeType(item.user_type) }}</div>
                <div class="name item">{{ item.user_name }}</div>
                <div class="free_time item txt_ell">{{  new Date().getMonth() + 1 + '月' + ( parseInt(new Date().getDate()) + parseInt(item.worker_accept_time)) + '日后可接单' }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Chead from './common/Header.vue'
import { changeType } from '../util/util.js'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            top_title: '我的关注',
            focus_list: [],
            open_id: '',
        }
    },
    computed: {
        ...mapState([
            'xmjl_info'
        ])
    },
    created(){
        this.open_id = this.xmjl_info.open_id
        this.$http.post('http://101.201.68.200/zxg/weixin/index?c=focus&f=focus_list', {
	        open_id: this.open_id
        },
        {emulateJSON: true}).then((response) => {
            this.focus_list = response.body.data
        }, (response) => {
                    // error callback 
        })
    },
    components: {
        Chead,
    },
    methods: {
        changeType,
        goWorkerDetail(arg){
            this.$router.push({ name: 'worker_detail', params: { focus_worker: arg.params }})
        }
    }
}
</script>

<style scoped>
.wrap {
    width: 100%;
    height: 100%;
}
.focus {
    height: 100vh;
    width: 100vw;
    font-size: 0;
    text-align: left;
    padding-left: 10vw;
    background-image:
    linear-gradient(rgb(221,221,221) 1px, transparent 0); 
    background-size: 55px 55px;
}
.type {
    color: rgb(8, 194, 165);
}
.item {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
}
.name,
.free_time {
    color: #101010;
}
.type {
    width: 65px;
}
.free_time {
    width: 145px;
}
.name {
    width: 66px;
}
.item_list {
    line-height: 55px;
}
</style>
