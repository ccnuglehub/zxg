<template>
    <div class="wrap">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="identification">
            <div class="title">请上传清晰的本人大头照及身份证照</div>
            <div v-for="(item, index) in img_data" :key="index">
                <img class="preview" :src="item" />
            </div>
            <div v-tap="{ methods: choseImage }" class="uploader">
                <Icon type="camera" size="20"></Icon>
            </div>
            <div v-tap="{ methods: uploadImage }" class="bt">确认上传</div>
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
                img_data: [],
                localIds: []
            }
        },
        methods: {
            choseImage(){
                this.img_data = []
                var self = this
                this.wx.chooseImage({
                    count: 2, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        self.localIds = localIds
                        alert(4)
                        localIds.forEach(function(element) {
                             alert(3)
                            self.getImageData(element)
                            alert(2)
                        }, self);
                    }
                })
            },
            getImageData(localId) {
                var self = this
                this.wx.getLocalImgData({
                    localId: localId.toString(),
                    success: function (res) {
                        alert(res.localData)
                        self.img_data.push(res.localData)
                    },
                    fail: function(res) {
                        for(var key in res) {
                            alert(res[key])
                        }
                    }
                }) 
            },
            uploadImage(){
                var localIds = this.localIds
                var self = this
                localIds.forEach(function(element) {
                    this.wx.uploadImage({
                        localId: element.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var mediaId = res.serverId; // 返回图片的服务器端ID
                            self.putImageToServer(mediaId)
                        },
                        fail:function(res){

                        }
                    })
                }, self);
            },
            putImageToServer(mediaId){
                var open_id = this.localStorage[open_id]
                this.$http.post( API_ROUTER_CONFIG.identity,
                {
                    media_id: mediaId,
                    open_id: open_id
                },
                {emulateJSON: true}).then((response) => {
                    if(response.body.status == 1) {
                        
                    }
                }, (response) => {
                        // error callback 
                })
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
.img_cont {
    text-align: center;
    width: 100%;
}
.preview {
    width: 30%;
    border: 1px dashed grey;
}
</style>
