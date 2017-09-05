<template>
    <div id="qrcode">
        <Chead :msg="top_title" :icon="true"></Chead>
        <!-- <img src="logo.png"> -->
        <h1 class="qr_desp">{{ msg }}</h1>
        <vue-qr :text="value" :autoColor='true' height="200"  width="200"></vue-qr>
    </div>
</template>

<script>
import Chead from './common/Header.vue'
import VueQr from 'vue-qr'
export default {
    components: {
        VueQr,
        Chead
    },
    name: 'qrcode',
    data () {
        return {
            msg: '请扫码二维码',
            top_title: "生成二维码",
            value: '',
            src: '../../static/test.png',
        }
    },
    created() {
        // if(this.$route.params.from = 'project_detail') {
            this.value = this.$route.params.txt
        // }
    }
}
</script>

<style>
.qr_desp {
    padding-top: 10vh;
    font-size: 18px;
}
.qr_code {
    font-size: 0;
    background: rgb(238,238,238);
    width: 100%;
    height: 100vh;
}
.qr_cont {
    width: 64%;
    height: 64%;
    padding-top: 32vh;
}
</style>