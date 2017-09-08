<template>
    <div class="wrap">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="focus">
            <div v-tap="{ methods: goWorkerDetail, params: item }" v-for="(item,index) in focus_list" :key="index" class="item_list">
                <div class="type item">{{ changeType(item.user_type) }}</div>
                <div class="name item txt_ell">{{ item.user_name }}</div>
                <div class="free_time item txt_ell">{{  item.worker_accept_time | filterDate }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Chead from './common/Header.vue'
import { changeType } from '../util/util.js'
import { mapState, mapActions } from 'vuex'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
export default {
    data(){
        return {
            top_title: '我的关注',
            focus_list: [],
            open_id: '',
        }
    },
    filters: {
        filterDate: function (value) {
            if (value < 90) {
                return value + '天后可接单'
            } else {
                return '暂不可接单'
            }
        }
    },
    created(){
        this.open_id = localStorage.open_id
        this.$http.post( API_ROUTER_CONFIG.focus_list, {
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
    max-width: 6em;
    margin-right: 1em;
}
.item_list {
    line-height: 55px;
}
</style>
