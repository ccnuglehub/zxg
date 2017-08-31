<template>
    <div>
        <div ref="qart"></div>
        <Button class="download_bt" type="success" @click="convertToImage" v-if="downloadButton">保存到本地</Button>
    </div>
</template>


<script type="application/ecmascript">
import QArt from 'qartjs';
  export default {
    props: ['config', 'downloadButton'],
    name: 'VueQart',
    data () {
      return {
        msg: '',
      }
    },
    watch: {
      'config.value': function (val, oldVal) {
        this.config.vaule = val;
        this.renderQrcode(this.config);
      console.log('new: %s, old: %s', val, oldVal)
      },
    },
    mounted(){
      this.renderQrcode(this.config)
    },
    
    methods: {
      renderQrcode(config){
        this.qart =  new QArt(config);
        this.qart.make(this.$refs.qart)
      },
      convertToImage(){
        const myCanvas = this.$refs.qart.children[0];
        const type = 'image/png';
        let image = myCanvas.toDataURL(type).replace(type, "image/octet-stream");
        window.location.href = image; // it will save locally
      }
    }
  }
</script>

<style scoped>
.download_bt {
  font-size: 14px;
  padding: 4px 6px;
  font-weight: bold;
}
</style>


