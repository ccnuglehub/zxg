<template>
    <div class="qr_code">
        <Chead :msg="top_title"></Chead>
        <img class="qr_cont" src="../assets/logo.png">
    </div>
</template>

<script>
import Chead from './common/Header.vue'
export default {
    name: 'qr_code',
    data(){
        return {
            top_title: '请扫二维码',
        }
    },
    components: {
        Chead
    }
}
</script>

<style>
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
