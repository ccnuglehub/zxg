<template>
    <div id="qrcode">
        <Chead :msg="top_title" :icon="true"></Chead>
        <!-- <img src="logo.png"> -->
        <h1 class="qr_desp">{{ msg }}</h1>
        <!--<div v-vue-q-art="config"></div>-->
        <vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
        change qrcode url: <input type="text" v-model="config.value">
    </div>
</template>

<script>
import Chead from './common/Header.vue'
import VueQArt from './vue-qart.vue'
export default {
    components: {
        VueQArt,
        Chead
    },
    name: 'qrcode',
    data () {
        return {
            msg: '请扫码添加工人进项目组',
            top_title: "生成二维码",
            config: {
                value: 'https://sina.com.cn',
                imagePath: '../../static/logo.png',
                // imagePath:'../assets/logo.png',
                // filter: 'color',
                size: 500
            },
            downloadButton: false
        }
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