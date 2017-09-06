<template>
    <div class="wrap">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="identification">
            <div class="title">请上传清晰的本人大头照及身份证照</div>
            <img class="preview" :src="img_data_1" />
            <div class="up_box_top">
                <span class="up_title">上传大头照</span>
                <div v-tap="{ methods: choseImage, params: 0 }" class="uploader">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </div>
            <img class="preview" :src="img_data_2" />
            <div class="up_box">
                <span class="up_title">上传身份证</span>
                <div v-tap="{ methods: choseImage, params: 1 }" class="uploader">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </div>
            <div v-tap="{ methods: putImageToServer }" class="bt">确认上传</div>
        </div>
    </div>    
</template>

<script>
import Chead from './common/Header.vue'
// import { mapState, mapActions, mapGetters } from 'vuex'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
var wx = require('weixin-js-sdk')

export default {
    data () {
            return {
                top_title: '实名认证',
                wx,
                img_data_1: "",
                img_data_2: "",
                mediaId: []
            }
        },
        methods: {
            choseImage(item){
                var _index = item.params
                var self = this
                this.wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds.toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        self.getImageData(localIds, _index)
                        self.uploadImage(localIds, _index)
                    }
                })
            },
            getImageData(localIds, index) {
                var self = this
                this.wx.getLocalImgData({
                    localId: localIds,
                    success: function (res) {
                        if(index == 0) {
                             self.img_data_1 = res.localData
                        }
                        if(index == 1) {
                            self.img_data_2 = res.localData
                        }
                    }
                }) 
            },
            uploadImage(localId, index){
                var self = this
                this.wx.uploadImage({
                    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        self.mediaId[index] = res.serverId; // 返回图片的服务器端ID
                    },
                    fail:function(res){
                    }
                })
            },
            putImageToServer(){
                var open_id = localStorage.open_id
                for(let i = 0; i<this.mediaId.length;i++) {
                    this.$http.post( API_ROUTER_CONFIG.identity,
                    {
                        media_id: this.mediaId[i],
                        open_id: open_id
                    },
                    {emulateJSON: true}).then((response) => {
                        if(response.body.status == 1) {
                            alert(response.body.msg)
                        }
                    }, (response) => {
                            // error callback 
                })
                }
            }
        },
        components: {
            Chead,
        },
        created() {
            this.SDKRegister(this, () => {
                
            })
        }
    }
</script>

<style scoped>
.wrap {
    width: 100%;
    padding-bottom: 20vh;
}
.identification {
    min-height: calc(100vh - 45px);
    width: 100vw;
    padding: 0 12px;
}
.title {
    font-size: 17px;
    line-height: 25px;
    padding-top: 30px;
    padding-bottom: 25px;
}
.icon {
    font-size: 22px;
    margin: 5px 6px;
}
.up_box_top {
    margin-bottom: 22px;
}
.bt {
    background: rgb(134, 210, 198);
    width: 100px;
    height: 30px;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    margin: 22px auto;
}
.uploader {
    width: 58px;
    height:58px;
    line-height: 58px;
    margin: 0 auto;
    border: 1px dashed grey;
}
.up_title {
    font-size: 14px;
}
.img_cont {
    text-align: center;
    width: 100%;
}
.preview {
    width: 30%;
    border: 1px dashed grey;
}
</style>
