<template>
    <div class="header">
        <div v-if="icon" v-tap="{ methods: back }" class="icon_cont">
            <Icon class="icon" type="ios-arrow-back"></Icon>
        </div>
        <div class="title">{{ msg }}</div>
        <img v-tap="{ methods: scanQrcode }" v-if="is_worker && qr" class="qr_logo" src="../../assets/qr_code.png">
        <CNotice v-if="cnotice_flag" :nclick="closeD" :mclick="mFn" :msg="_msg"></CNotice>
    </div>
</template>

<script>
import CNotice from '../common/Notice.vue'
import { mapState } from 'vuex'
var wx = require('weixin-js-sdk')
import { API_ROUTER_CONFIG } from '@/api/config/api_config'

export default {
    data(){
        return {
            is_xmjl: false,
            is_worker: false,
            is_wy: false,
            is_owner: false,
            wx ,
            _msg: '',
            cnotice_flag: false,
            mFn(){
                console.log('请绑定函数！')
            },
        }
    },
    props:['msg','icon','qr'],
    name: 'header',
    methods: {
        back() {
            this.$router.go(-1)
        },
        closeD(){
            this.cnotice_flag = false
        },
        scanQrcode() {
            var self = this
            this.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    // alert(result)
                    self.parseQr(result)
                }
            })
        },
        parseQr(result) {
            var arr = result.split('&')
            var aim = arr[0]
            // alert(aim)
            if(aim == 'worker_enter_project') {
                var project_id = arr[1]
                this.workerEnterPeoject(project_id)
            }
            if(aim == 'worker_enter_xq') {
                var facility_id = arr[1]
                var facility_adress = arr[2]
                this.workerEnterXq(facility_id, facility_adress)
            }
            if(aim == 'worker_enter_fj') {
                var owener_id = arr[1]
                this.workerEnterFj(owener_id)
            }
        },
        workerEnterPeoject(project_id) {
            // alert('项目id为：' + project_id)
            this.$http.post( API_ROUTER_CONFIG.worker_addin_project,
            {
                project_id: project_id,
                open_id: localStorage.open_id
            },
            {emulateJSON: true}).then((response) => {
                if(response.body.status == 1) {
                    this._msg = '您已成功加入项目！'
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                } else {
                    this._msg = response.body.msg
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                }
            }, (response) => {
                        // error callback 
            })
        },
        workerEnterXq(facility_id, facility_adress) {
            // alert('物业经理的id是' + facility_id)
            // alert('物业公司的地址是' + facility_adress)
            this.$http.post( API_ROUTER_CONFIG.facility_visit,
            {
                facility_id: facility_id,
                open_id: this.open_id,
                facility_adress: facility_adress
            },
            {emulateJSON: true}).then((response) => {
                if(response.body.status == 1) {
                    this._msg = '欢迎进入小区!'
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                } else {
                    this._msg = response.body.msg
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                }
            }, (response) => {
                        // error callback 
            })
        },
        workerEnterFj(owener_id) {
            // alert('业主的id是' + owener_id)
            this.$http.post( API_ROUTER_CONFIG.owner_visit,
            {
                owener_id: owener_id,
                open_id: this.open_id,
            },
            {emulateJSON: true}).then((response) => {
                if(response.body.status == 1) {
                    this._msg = '欢迎进入房间!'
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                } else {
                    this._msg = response.body.msg
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                }
            }, (response) => {
                        // error callback 
            })
        }
    },
    created(){
        localStorage.is_xmjl == 'true' ? this.is_xmjl = true : this.is_xmjl = false
        localStorage.is_worker == 'true' ? this.is_worker = true : this.is_worker = false
        localStorage.is_wy == 'true' ? this.is_wy = true : this.is_wy = false
        localStorage.is_owner == 'true' ? this.is_owner = true : this.is_owner = false
        this.open_id = localStorage.open_id
        this.SDKRegister(this, () => {
			
        })
    },
    components: {
        CNotice
    }
}
</script>
<style scoped>
.header {
    width: 100vw;
    font-size: 14px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    background: rgb(247,247,247);
}
.title {
    font-size: 18px;
    color: #101010;
    line-height: 45px;
}
.icon_cont {
    position: absolute;
    top: 50%;
    left: 0;
    padding: 0 19px;
    transform: translateY(-50%);
}
.icon {
    font-size: 24px;
}
.qr_logo {
    width: 24px;
    position: absolute;
    top: 50%;
    right: 3.2vw;
    transform: translateY(-50%);
}
</style>