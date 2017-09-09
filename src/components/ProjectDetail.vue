<template>
    <div class="project_detail">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="project_details">
            <div class="project_intro">
                <div class="intro_title">项目简介</div>
                <div class="intro_txt">
                    <!-- <div class="project_title">{{ detail.project_name }}</div> -->
                    <div class="project_cont">{{ detail.project_description }}</div>
                </div>
                <div class="intro_etc">
                    <div class="etc_items">
                        <div class="etc_item">{{ detail.project_address_section }}</div>
                        <div class="etc_item">{{ changeDate(detail.project_start_time) }}</div>
                        <div class="etc_item etc_name"></div>
                    </div>
                    <div class="bt_box">
                        <div v-if="detail.project_status == 0" v-tap="{ methods: showCompleteNotice }" class="bt">完成项目</div>
                        <div v-else class="bt bt_grey">完成项目</div>
                    </div>
                </div>
            </div>
            <div class="project_intro project_intro_bottom">
                <div class="bottom_title">
                    <div class="intro_title intro_title_b">工人信息</div>
                    <div v-if="detail.project_status == 0" v-tap="{ methods: addWorker }" class="b_bt_box">
                        <div class="bt">添加工人</div>
                    </div>
                </div>
                <div v-for="(item, index) in work_list" :key="index" class="etc_items_bottom_box">
                    <div class="etc_items_bottom">
                        <div class="etc_bottom_type">{{ changeType(item.user_type) }}</div>
                        <div class="etc_bottom_name txt_ell">{{ item.user_name }}</div>
                    </div>
                    <div class="bt_box_bottom">
                        <div class="bt_item_bottom">
                            <div v-if="item.p2w_status == 0" v-tap="{ methods: changeStatus, params: item }" class="bt">{{ item.p2w_status | getStatus }}</div>
                            <div v-if="item.p2w_status == 1" v-tap="{ methods: showEnotce }" class="bt">{{ item.p2w_status | getStatus }}</div>
                            <div v-if="item.p2w_status == 2" class="bt bt_grey">{{ item.p2w_status | getStatus }}</div>
                        </div>
                        <div class="bt_item_bottom">
                            <div v-if="item.focus_status == 0" v-tap="{ methods: focus, params: item }" class="bt">关注</div>
                            <div v-if="item.focus_status == 1" class="bt bt_grey">已关注</div>
                        </div>
                        <div class="bt_item_bottom">
                            <div v-tap="{ methods: showDeleteNotice, params: item }" class="bt">移除</div>
                        </div>
                    </div>
                    <div class="evaluate_wrap" v-if="evaluate_flag">
                        <div class="evaluate">
                            <div class="bt_close_box" v-tap="{ methods: closeEnotce }">
                                <Icon class="bt_close" type="close-circled"></Icon>
                            </div>
                            <textarea v-model="form_rate.rate_content" class="e_txt" placeholder="请对工人的工作进行简短的评价"></textarea>
                            <div class="e_title">请对工人的工作进行评分</div>
                            <Rate allow-half v-model="form_rate.rate"></Rate>
                            <div class="e_bt_box">
                                <div v-tap="{ methods: Epost, params: item }" class="bt">确认评价</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CNotice v-if="cnotice_flag" :nclick="closeD" :mclick="mFn" :msg="msg"></CNotice>
         </div>
    </div>
</template>

<script>
import CNotice from './common/Notice.vue'
import Chead from './common/Header.vue'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
import { changeDate, changeType, checkEmpty } from '../util/util.js'
import { mapState, mapActions } from 'vuex'
export default {
  	name: 'project_detail',
  	data () {
    	return {
            from_add_project: false,
            detail: {},
            top_title: '项目详情',
            work_list: [],
            p2w_id: '',
            open_id: '',
            valueHalf: 4.5,
            cnotice_flag: false,
            evaluate_flag: false,
            msg: '您确认完成该项目？',
            mFn: () => {
                console.log('需要一个回调函数')
            },
            form_rate: {
                rated_user_id: "",
                rate_name: localStorage.user_name,
                rate: 0,
                rate_content: "",
                rate_project_name: '',
                p2w_id: ""
            },
            project_id: ''
        }
    },
    filters: {
        getStatus: function(status){
            if(status == 0) {
                return '完成'
            }
            if(status == 1) {
                return '评价'
            }
            if(status == 2) {
                return '已评价'
            }
        }
    },
    components: {
        CNotice,
        Chead,
    },
    created(){
        this.open_id = localStorage.open_id
        
        //如果是项目发布后跳转
        if(this.$route.params.obj) {
            this.detail = this.$route.params.obj
            this.upDateSessionStorage(this.detail)
            this.from_add_project = false
            // this.detail.project_start_time =new Date().getTime()
        }
        //如果是项目列表跳转
        if(this.$route.params.item) {
            this.detail = this.$route.params.item
            console.log(this.detail)
            this.upDateSessionStorage(this.detail)
            this.getWorker(this.detail.project_id)
        } else {
            this.detail.project_description = sessionStorage.project_description
            this.detail.project_address_section = sessionStorage.project_address_section
            this.detail.project_start_time = sessionStorage.project_start_time
            this.detail.project_name = sessionStorage.project_name
            this.detail.project_status = sessionStorage.project_status
            this.detail.project_worker_num = sessionStorage.project_worker_num
            this.detail.project_manager_id = sessionStorage.project_manager_id
        }

    },
    methods: {
        ...mapActions([
            'upDateSessionStorage'
        ]),
        changeDate,
        changeType,
        checkEmpty,
        changeStatus(item) {
            this.$http.post( API_ROUTER_CONFIG.worker_project_status,
            {
                p2w_status: item.params.p2w_status,
                p2w_id: item.params.p2w_id
            },
            {emulateJSON: true}).then((response) => {
                if(response.body.status == 1) {
                    item.params.p2w_status = 1
                } else {
                    this.mFn = this.closeD
                    this.msg = response.body.msg
                    this.cnotice_flag = true
                }
            }, (response) => {
                    // error callback 
            })
        },
        closeD(){
            this.cnotice_flag = false
        },
        completeProject(project_id){
            this.$http.post( API_ROUTER_CONFIG.project_complete,
            {
                project_id: this.detail.project_id
            }
            ,
            {emulateJSON: true}).then((response) => {
                if(response.body.data.status = 1) {
                    this.detail.project_status = 1
                } else {
                    this.mFn = this.closeD
                    this.msg = response.body.msg
                    this.cnotice_flag = true
                }
            }, (response) => {
                    // error callback 
            })
        },
        getWorker(project_id){
            this.$http.post( API_ROUTER_CONFIG.projec_worker_list,
            {
                p2w_project_id: project_id,
                open_id: this.open_id
            }
            ,
            {emulateJSON: true}).then((response) => {
                this.work_list = response.body.data
            }, (response) => {
                    // error callback 
            })
        },
        deleteWorker(){
            var id = this.p2w_id
            this.$http.post( API_ROUTER_CONFIG.delete_worker,
            {
                p2w_id: id
            }
            ,
            {emulateJSON: true}).then((response) => {
                if(response.body.status == 1) {
                    this.$router.push({ name: 'project_detail'})
                } else {
                    this.mFn = this.closeD
                    this.msg = response.body.msg
                    this.cnotice_flag = true
                }
            }, (response) => {
                    // error callback 
            })
        },
        Epost(item){
            this.form_rate.rated_user_id = item.params.open_id
            this.form_rate.p2w_id = item.params.p2w_id
            this.form_rate.rate_project_name = this.detail.project_name
            this.$http.post( API_ROUTER_CONFIG.worker_rate,
            this.form_rate,
            {emulateJSON: true}).then((response) => {
                this.evaluate_flag = false
            }, (response) => {
                    // error callback 
            })
        },
        showCompleteNotice(){
            this.msg = '您确认完成该项目？'
            this.cnotice_flag = true
            this.mFn = this.completeProject
        },
        showDeleteNotice(item){
            this.msg = '您确定移除该工人？'
            this.cnotice_flag = true
            this.p2w_id = item.params.p2w_id
            this.mFn = this.deleteWorker
        },
        showEnotce(){
            this.evaluate_flag = true
        },
        closeEnotce(){
            this.evaluate_flag = false
        },
        addWorker(){
            var txt = 'worker_enter_project&' + this.detail.project_id
            this.$router.push({ name: 'qr_code', params: { from: 'project_detail', txt: txt }})
        },
        focus(item){
            item.params.focus_status = 1
            this.$http.post( API_ROUTER_CONFIG.focus_worker,
            {
                focus_user_id: this.open_id,
                focused_user_id: item.params.p2w_worker_id
            },
            {emulateJSON: true}).then((response) => {
                item.params.focus_status = 1
            }, (response) => {
                        // error callback 
            })
        }
    }
}

</script>

<style scoped>
.project_detail {
    width: 100%;
    height: 100%;
}
.project_details {
    width: 100%;
    height: 100%;
    background: rgb(239,239,239);
    padding: 0 3.2vw;
}
.project_intro {
    margin-top: 3.75vh;
    text-align: left;
    background: rgb(250,250,250);
    display: inline-block;
    border-radius: 8px;
    width: 100%;
}
.intro_title {
    font-size: 16px;
    line-height: 23px;
    font-weight: bold;
    color: rgb(134,210,198);
    padding: 12px 14px;
}
.intro_txt {
    background: #fff;
    /* text-indent: 2em; */
    font-size: 15px;
    line-height: 23px;
    min-height: 23.2vh;
    padding: 12px;
    border-bottom: 1px solid rgb(227,227,227);
}
.intro_etc {
    padding: 12px;
    font-size: 0;
    background: #fff;
    margin-bottom: 16px;
}
.etc_items {
    width: 70%;
}
.etc_item,
.etc_items,
.intro_title_b,
.b_bt_box,
.bt_box,
.etc_bottom_type,
.etc_bottom_name,
.bt_box_bottom,
.etc_items_bottom,
.bt_item_bottom {
    display: inline-block;
    vertical-align: middle;
}
.etc_item {
    font-size: 14px;
    color: #7d7c7d;
    width: 30%;
}
.etc_name {
    text-align: right;
}
.bt_box {
    width: 30%;
    text-align: center;
}
.bt {
    display: inline-block;
    font-size: 14px;
    padding: 5px 11px;
    font-weight: bold;
    border-radius: 8px;
    background-color: rgb(134,210,198);
    color: #fff;
    cursor: pointer;
}
.bt_grey {
    background-color: #d1d6df;
}
.project_intro_bottom {
    margin-top: 20px;
}
.bottom_title {
    font-size: 0;
    padding-right: 12px;
}
.intro_title_b {
    width: 70%;
}
.b_bt_box {
    width: 30%;
    text-align: center;
}
.etc_items_bottom {
    width: 38%;
}
.etc_items_bottom_box {
    width: 100%;
    font-size: 0;
    background: #fff;
    padding: 10px 0;
    border-bottom: 1px solid rgb(227,227,227);
}
.etc_bottom_type {
    width: 5em;
}
.etc_bottom_name {
    width: 3em;
}
.etc_bottom_type {
    font-size: 16px;
    padding-left: 12px;
    font-weight: bold;
}
.etc_bottom_name {
    font-size: 14px;
    text-align: center;
}
.bt_box_bottom {
    width: 62%;
}
.bt_item_bottom {
    width: 33.3%;
    text-align: center;
}
.etc_items_bottom_box:last-child {
    border-bottom: 0;
    padding-bottom: 6vh;
}
.project_intro_bottom {
    padding-bottom: 16px;
    border-radius: 8px;
}
.evaluate {
    width: 69vw;
    font-size: 0;
    padding-top: 15px;
    position: absolute;
    text-align: center;
    top: 28vh;
    left: 50%;
    transform: translateX(-50%);
    background: rgb(241,241,241);
    border-radius: 8px;
}
.e_txt {
    width: 62.6vw;
    font-size: 14px;
    padding: 6px;
    min-height: 10.5vh;
    border-radius: 6px;
    outline: none;
    border: 1px solid rgb(187,187,187);
}
.e_title {
    width: 62.6vw;
    display: inline-block;
    text-align: left;
    padding-left: 10px;
    font-size: 14px;
    padding-top: 8px;
    margin-top: 10px;
    border-top: 1px solid rgb(187,187,187);
}
.e_bt_box {
    width: 100%;
    padding-bottom: 10px;
}
.bt_close_box {
    position: absolute;
    z-index: 900;
    top: -5%;
    right: -4%;
}
.bt_close {
    font-size: 22px;
    width: 30px;
    height: 30px;
}
.evaluate_wrap {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    width: 100vw;
    height: 100vh;
}
</style>
