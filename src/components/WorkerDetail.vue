<template>
	<div v-infinite-scroll="onScroll" infinite-scroll-disabled="true" infinite-scroll-distance="22" class="worker_detail">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="item_list_item">
            <img class="work_photo" :src="workerAvatar(worker_detail.user_avatar)">
            <div class="work_info lb_item">
                <div class="work_info_top">
                    <div class="lb_item worker_type">{{ changeType(worker_detail.user_type) }}</div>
                    <div class="lb_item txt_ell worker_name">{{ worker_detail.user_name }}</div>
                    <Button v-if="worker_detail.focus_status != 1" v-tap="{ methods: focus, worker: worker_detail }" class="login_bt" type="success" short>关注</Button>
                    <Button v-if="worker_detail.focus_status == 1" class="login_bt bt_grey" type="success" short>已关注</Button>
                </div>
                <Rate disabled allow-half v-model="worker_detail.worker_average_rate"></Rate>
                <div class="work_info_middle">
                    <div class="lb_item worker_auth">{{ worker_detail.user_is_identify == 1 ? '已实名认证' : '未实名认证'}}</div>
                    <div class="lb_item">已接单：{{ worker_detail.worker_orders_count }}</div>
                </div>
                <div class="work_info_bottom">
                    <div class="lb_item worker_auth">关注量：{{ worker_detail.focus_count }}</div>
                    <div class="lb_item">{{ worker_detail.worker_accept_day | filterDate }}</div>
                </div>
            </div>
        </div>
        <div class="worker_info">
            <div class="worker_info_item">
                地址：{{ worker_detail.user_address }}
            </div>
            <div class="worker_info_item">
                电话：{{ worker_detail.user_tel }}
            </div>
            <div class="worker_info_item description">
                个人简介：{{ worker_detail.worker_description }}
            </div>
        </div>
         <div v-for="(item, index) in worker_comments" :key="index" class="evaluate_list">
            <h1 class="evaluate_title">客户评价</h1>
            <div class="evaluate_item">
                <div class="evaluate_cont">{{ item.rate_content }}</div>
                <div class="evaluate_etc">
                    <div class="evaluate_etc_top">
                        <div class="evaluate_from fsz">项目经理：{{ item.rate_name }}</div>
                        <div class="evaluate_score fsz">评分：{{ item.rate }}</div>
                    </div>
                    <div class="evaluate_etc_bottom">
                        <div class="evaluate_xm fsz txt_ell">项目名称：{{ item.rate_project_name }}</div>
                        <div class="evaluate_time fsz txt_ell">{{ changeDate(item.rate_time) }}</div>
                    </div>
                </div>
            </div>
        </div> 
        <!-- <div class="evaluate_list">
            <h1 class="evaluate_title">客户评价</h1>
            <div class="evaluate_item">
                <div class="evaluate_cont">设置属性 autoplay 可以自动轮播，同时可以设置属性 autoplay-speed 改变自动播放的速度.</div>
                <div class="evaluate_etc">
                    <div class="evaluate_etc_top">
                        <div class="evaluate_from fsz">项目经理：唐*路</div>
                        <div class="evaluate_score fsz">评分：5</div>
                    </div>
                    <div class="evaluate_etc_bottom">
                        <div class="evaluate_xm fsz txt_ell">项目名称：青青美炉装饰面板，轻质隔墙装修</div>
                        <div class="evaluate_time fsz txt_ell">2017.3.25 15:30</div>
                    </div>
                </div>
            </div>
        </div> -->
	</div>
</template>

<script>
import Chead from './common/Header.vue'
import { changeType, changeDate } from '../util/util.js'
import { API_ROUTER_CONFIG, HOST_CONFIG } from '@/api/config/api_config'

export default {
  	name: 'worker_detail',
  	data () {
    	return {
            top_title: '工人详情',
            worker_detail: {}, 
            worker_comments:[],
            page: 0,
            get_data_flag: true
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
        this.page = 0
        if(this.$route.params.focus_worker) {
            this.worker_detail = this.$route.params.focus_worker
            this.worker_detail.worker_average_rate = parseInt(this.worker_detail.worker_average_rate)
        }
        if(this.$route.params.find_worker) {
            this.worker_detail = this.$route.params.find_worker
            this.worker_detail.worker_average_rate = parseInt(this.worker_detail.worker_average_rate)
        }
        if(this.$route.params.visitor) {
            this.worker_detail = this.$route.params.visitor
            this.worker_detail.worker_average_rate = parseInt(this.worker_detail.worker_average_rate)
        }
        this.getComments(this.worker_detail.open_id)
    },
    methods: {
        changeType,
        changeDate,
        focus(params){
            this.worker_detail.focus_status = 1
            this.$http.post( API_ROUTER_CONFIG.focus_worker,
            {
                focus_user_id: localStorage.open_id,
                focused_user_id: params.worker.worker_id
            },
            {emulateJSON: true}).then((response) => {
                
            }, (response) => {
                        // error callback 
            })
        },
        workerAvatar(url){
            // console.log(url)
            return HOST_CONFIG.imageIp+url;
        },
        getComments(open_id){
            this.get_data_flag = false
            this.$http.post( API_ROUTER_CONFIG.rate_detail,
            {
                account: this.page,
                open_id: open_id
            },
            {emulateJSON: true}).then((response) => {
                console.log(response)
                this.worker_comments = this.worker_comments.concat(response.body.data)
                this.get_data_flag = true
            }, (response) => {
                    // error callback 
            })
        },
        onScroll(){
            if(this.get_data_flag) {
                this.page++
                this.getComments(this.worker_detail.open_id)
            }
        }
    },
    components: {
        Chead,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.worker_detail {
     min-height: calc(100vh - 45px);
     background:#fff;
     padding-top: 1px;
     font-size: 0;
}
.item_list_item {
    padding: 13px 14px;
    background: #fff;
    text-align: left;
    background: rgb(70,90,101);
}
.work_photo {
    width: 26%;
    vertical-align: middle;
}
.work_info {
    width: 74%;
    padding-left: 16px;
    font-size: 14px;
}
.worker_type {
    font-size: 17px;
    margin-right: 12px;
}
.worker_name {
    font-size: 16px;
    max-width: 5em;
}
.worker_name,
.worker_type {
    color: #fff;
    font-weight: 500;
}
.login_bt {
    padding: 2px 8px;
    margin-left: 12px;
    font-size: 14px;
    font-weight: bold;
}
.lb_item {
    vertical-align: middle;
    display: inline-block;
}
.worker_auth {
    margin-right: 28px;
}
.work_info_middle,
.work_info_bottom {
    color: rgb(255,152,0);
}
.worker_info {
    padding: 2.3vh 9vw;
    font-size: 16px;
    text-align: left;
    background: #fff;
    line-height: 30px;
    border-bottom: 12px solid #eee;
}
.evaluate_list {
    background: #fff;
    text-align: left;
}
.evaluate_title {
    font-size: 18px;
    color: rgb(134,210,198);
    line-height: 34px;
    padding: 0 12px;
}
.evaluate_item {
    background: rgb(248,248,248);
    padding: 15px 1vw 5px 3vw;
}
.evaluate_cont {
    font-size: 14px;
}
.evaluate_etc {
    margin-top: 6px;
}
.fsz {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    line-height: 18px;
    color: rgb(126,126,126);
}
.evaluate_from {
    width: 130px;
}
.evaluate_xm {
    width: 70vw;
}
.evaluate_time {
    width: 26vw;
    text-align: right;
    padding-right: 1vw;
}
.evaluate_etc_bottom {
    font-size: 0;
}
.description {
    line-height: 1.2em;
}
.bt_grey {
    background: grey;
    border: 0;
}
.evaluate_list:last-child {
    margin-bottom: 30px;
}
</style>

