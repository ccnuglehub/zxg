<template>
    <div id="qrcode" class="qr_code">
      <Chead :msg="top_title" :icon="true"></Chead>
        <!-- <img src="logo.png"> -->
        <div class="code_part">
          <h1>{{ msg }}</h1>
        <!--<div v-vue-q-art="config"></div>-->
        <vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>
        change qrcode url: <input type="text" v-model="config.value">
        </div>
        
    </div>
</template>

<script>

  import VueQArt from './vue-qart.vue'
  import Chead from './common/Header.vue'
  export default {
    components: {
      VueQArt,Chead
    },
    name: 'qrcode',
    data () {
      return {
        top_title:"扫码",
        msg: '请扫码添加工人进项目组',
        config: {
          value: 'https://sina.com.cn',
          imagePath: '../../static/logo.png',
          // imagePath:'../assets/logo.png',
          // filter: 'color',
          size: 500
        },
        downloadButton: false
      }
    },
    mounted(){
      this.config.value = this.$route.params.url+"&project_id="+this.$route.params.project_id+"&open_id="+this.$route.params.open_id
    }
  }
</script>

<style>
.qr_code {
    font-size: 18;
    background: rgb(238,238,238);
    /* position: absolute; */
    /* padding-top: 30%; */
    width: 100%;
    height: 100%;
}
.code_part{
  padding-top: 30%;
  background: rgb(238,238,238);

  
}
.qr_cont {
    width: 64%;
    height: 64%;
    padding-top: 32vh;
}
</style>