<template>
    <div class="wrap">
        <Chead :msg="top_title"></Chead>
        <div class="add_project">
            <div class="edit_cont">
                <div class="edit_box">
                    <div class="edit_box_top">
                        <div v-if="is_xmjl" class="p_name">
                            <label class="p_lable p_lable_top">项目名称</label>
                            <input v-model="form_data.project_name" class="p_input" placeholder="请输入项目名称">
                        </div>
                        <div v-if="is_xmjl" class="p_local">
                            <label class="p_lable p_lable_bottom">项目地点</label>
                            <Select v-model="form_data.project_address_section" style="width:100px">
                                <Option v-for="(item, index) in city_list" :value="item.value" :key="index">{{ item.value }}</Option>
                            </Select>
                            <img v-tap="{ methods: scanQrcode }" class="qr_logo" src="../assets/qr_code.png">
                        </div>
                         <div v-if="is_worker" class="p_local">
                            <label class="p_lable p_lable_bottom">可接单时间</label>
                             <Select @on-change="getTime" v-if="!posted_work" :label-in-value="true" v-model="worker_form_data.worker_accept_time" placeholder="请选择" style="width:100px">
                                <Option v-for="(item, index) in time_list" :value="item.value" :key="index">{{ item.lable }}</Option>
                            </Select>
                        </div> 
                        <textarea v-if="is_xmjl" v-model="form_data.project_description" class="p_txt" placeholder="请输入你的项目简介"></textarea>
                        <div v-if="is_worker" class="p_txt">
                            <div v-if="posted_work" class="add_project_res">已发布{{ worker_accept_time }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="is_worker && !posted_work" class="notice_box">
                <Icon class="icon" type="volume-high"></Icon>
                <div class="notice">温馨提示：您未发布接单，请发布新的接单</div>
            </div> 
            <div v-if="!posted_work" v-tap="{ methods: showNotice }" class="bt_box">发布</div>
            <CNotice v-if="cnotice_flag" :nclick="closeD" :mclick="mFn" :msg="msg"></CNotice>
        </div>
        <Menue></Menue>
    </div>
</template>

<script>
import CNotice from './common/Notice.vue'
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
var wx = require('weixin-js-sdk')
import { mapState, mapActions } from 'vuex'
import { checkEmpty } from '@/util/util'

export default {
  	name: 'add_project',
  	data () {
    	return {
            top_title: '项目发布',
            msg: '您确认发布新的项目？',
            cnotice_flag: false,
            form_data: {
                project_name: "",
                open_id: '',
                project_address_section: "",
                project_address_detail: "华中师范大学珞喻路152号",
                project_description: "",
            },
            worker_form_data: {
                worker_accept_time: ''
            },
            wx,
            posted_work: false,
            mFn(){
                console.log('请绑定函数！')
            },
            worker_accept_time: '',
            is_xmjl: false,
            is_worker: false,
            is_wy: false,
            is_owner: false
		}
    },
    computed: {
        ...mapState([
            'city_list',
            'time_list',
        ])
    },
    created(){
        localStorage.is_xmjl == 'true' ? this.is_xmjl = true : this.is_xmjl = false
        localStorage.is_worker == 'true' ? this.is_worker = true : this.is_worker = false
        localStorage.is_wy == 'true' ? this.is_wy = true : this.is_wy = false
        localStorage.is_owner == 'true' ? this.is_owner = true : this.is_owner = false
        this.form_data.open_id = localStorage.open_id

        this.SDKRegister(this, () => {
			
        })
        
        if(this.is_worker) {
            this.top_title = '接单发布'
            this.msg = '您确定发布新的接单？'
            this.mFn = this.postOrder
        } else {
            this.mFn = this.postProject
        }
    },
	methods: {
        checkEmpty,
		showNotice(){
            this.cnotice_flag = true
        },
        getTime(obj) {
            this.worker_accept_time = obj.label
        },
        postOrder(){
            // 发布接单后的逻辑处理
            this.posted_work = true
            this.$http.post( API_ROUTER_CONFIG.accept_time,
            {
                worker_accept_time: this.worker_form_data.worker_accept_time,
                open_id: this.form_data.open_id
            },
            {emulateJSON: true}).then((response) => {
                if(response.body.status == 1) {
                    this.cnotice_flag = false
                }
            }, (response) => {
                      // error callback 
            })
        },
        postProject(){
            for(var key in this.form_data) {
                alert(this.form_data[key])
            }
            this.$http.post( API_ROUTER_CONFIG.add_project,
            this.form_data,
            {emulateJSON: true}).then((response) => {
                alert(response.body.msg)
                if(response.body.status == 1) {
                    this.cnotice_flag = false
                    var _obj = response.body.data
                    this.$router.push({ name: 'project_detail', params: { obj: _obj }})
                }
            }, (response) => {
                      // error callback 
            })
            // this.cnotice_flag = false
            // this.$router.push({ name: 'project_detail', params: { obj: {} }})
        },
        closeD(){
            this.cnotice_flag = false
        },
        scanQrcode(){
            var self = this
            this.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    var facility_adress
                    var arr = result.split('&')
                    var aim = arr[0]
                    if(aim == 'worker_enter_xq') {
                        facility_adress = arr[2]
                    } else {
                        alert('发布项目只能扫描物业公司二维码！')
                    }
                    self.form_data.project_address_detail = facility_adress
                }
            })
        }
	},
    components: {
        CNotice,
        Chead,
        Menue
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 100%;
    overflow: scroll;
}
.add_project {
    width: 100%;
    min-height: calc(100vh - 60px); 
    background: rgb(239,239,239);
    padding-top: 22px;
    padding-right: 12px;
    padding-left: 12px;
}
.add_project_res {
    padding-top: 4vh;
}
.edit_cont {
    background: rgb(250,250,250);
    padding: 4.8vh 0 3.35vh;
    border-radius: 6px;
}
.p_input {
    outline: none;
    border: 0;
    font-size: 15px;
}
.p_name,
.p_local {
    text-align: left;
    padding-left: 22px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    position: relative;
}
.edit_box {
    background: #fff;
}
.p_lable {
    font-size: 16px;
    line-height: 40px;
    font-weight: 500;
}
.p_lable_top {
    padding-right: 8%;
}
.p_lable_bottom {
    padding-right: 6%;
}
.p_txt {
    width: 100%;
    padding: 3vh 7vw;
    outline: none;
    resize: none;
    font-size: 14px;
    min-height: 36vh;
    box-sizing: border-box;
}
.bt_box {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    font-size: 19px;
    line-height: 70px;
    margin: 4vh auto;
    background: rgb(8,194,165);
    color: #fff;
    font-weight: 800;
    box-shadow: 0px 0px 20px rgb(8,194,165);
}
.qr_logo {
    width: 24px;
    position: absolute;
    top: 50%;
    right: 7.4vw;
    transform: translateY(-50%);
}
.log_cont {
    position: absolute;
    border-radius: 8px;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    background: rgb(241,241,241);
    padding: 0 12px;
}
.log_txt {
    width: 65vw;
    padding: 4vh 0;
    font-size: 16px;
    border-bottom: 1px solid rgb(207,200,207);
}
.notice_box {
    text-align: left;
    margin-top: 18px;
}
.icon {
    font-size: 18px;
    vertical-align: top;
    margin-right: 4px;
}
.notice {
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    margin-bottom: 12px;
}
</style>