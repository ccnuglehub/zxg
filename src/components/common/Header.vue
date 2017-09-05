<template>
    <div class="header">
        <div v-if="icon" v-tap="{ methods: back }" class="icon_cont">
            <Icon class="icon" type="ios-arrow-back"></Icon>
        </div>
        <div class="title">{{ msg }}</div>
        <img v-tap="{ methods: workerEnterPeoject }" v-if="is_worker && qr" class="qr_logo" src="../../assets/qr_code.png">
    </div>
</template>
<script>
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
            wx 
        }
    },
    props:['msg','icon','qr'],
    name: 'header',
    methods: {
        back() {
            this.$router.go(-1)
        },
        scanQrcode() {
            this.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    this.parseQr(result)
                }
            })
        },
        parseQr(result) {
            var arr = result.split('&')
            var aim = arr[0]
            if(aim == 'worker_enter_project') {
                var project_owner_open_id = arr[1]
                var project_id = arr[2]
                this.workerEnterPeoject(project_id, project_owner_open_id)
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
        workerEnterPeoject(project_id, project_owner_open_id) {
            this.$http.post( API_ROUTER_CONFIG.worker_addin_project,
            {
                project_id: '86',
                open_id: 'oqb76v0pqFzPfx1Gz5zbfuTRrlbE'
            },
            {emulateJSON: true}).then((response) => {
                console.log(response.data.result)
            }, (response) => {
                        // error callback 
            })
        },
        workerEnterXq(facility_id, facility_adress) {
            this.$http.post( API_ROUTER_CONFIG.facility_visit,
            {
                facility_id: 'oqb76v4-Ied_vIOvV_-eHduVj2A',
                open_id: this.open_id,
                facility_adress: '哈哈哈哈哈'
            },
            {emulateJSON: true}).then((response) => {
                alert(response.data.result)
            }, (response) => {
                        // error callback 
            })
        },
        workerEnterFj(owener_id) {
            this.$http.post( API_ROUTER_CONFIG.owner_visit,
            {
                owener_id: 'oqb76v_v-Xeyf33TOAO77nlPs5fg',
                open_id: this.open_id,
            },
            {emulateJSON: true}).then((response) => {
                // item.focus_status = 1
                alert(response.data.result)
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