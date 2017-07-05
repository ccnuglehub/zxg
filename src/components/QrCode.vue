<template>
    <div id="app">
        <!-- <img src="logo.png"> -->
        <h1>{{ msg }}</h1>
        <!--<div v-vue-q-art="config"></div>-->
        <vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
        change qrcode url: <input type="text" v-model="config.value">
    </div>
</template>

<script>
  import VueQArt from './vue-qart.vue'
  export default {
    components: {
      VueQArt
    },
    name: 'app',
    data () {
      return {
        msg: 'the Vue 2.x directive for QArt.js',
        config: {
          value: 'https://www.baidu.com',
          imagePath: '../../static/logo.png',
          // imagePath:'../assets/logo.png',
          filter: 'color',
          size: 500
        },
        downloadButton: false
      }
    }
  }
</script>

<style>
.qr_code {
    font-size: 0;
}
.qr_cont {
    width: 64%;
    height: 64%;
    padding-top: 32vh;
}
</style>