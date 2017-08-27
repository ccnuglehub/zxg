<template>
    <div class="header">
        <div v-if="icon" v-tap="{ methods: back }" class="icon_cont">
            <Icon class="icon" type="ios-arrow-back"></Icon>
        </div>
        <div class="title">{{ msg }}</div>
        <img v-tap="{ methods: scanQrcode }" v-if="versions.is_worker && qr" class="qr_logo" src="../../assets/qr_code.png">
    </div>
</template>
<script>
import { mapState } from 'vuex'
var wx = require('weixin-js-sdk')

export default {
    data(){
        return {
            wx
        }
    },
    props:['msg','icon','qr'],
    name: 'header',
    computed: {
		...mapState([
			'versions'
		])
	},
    methods: {
        back() {
            this.$router.go(-1)
        },
        scanQrcode() {
            this.wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            })
        }
    },
    created(){
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