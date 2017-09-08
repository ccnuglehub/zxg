<template>
    <div class="wrap">
        <Chead :msg="top_title" :icon="true"></Chead>
        <img v-if="img_src" class="img_box" :src="img_src" />
        <div class="up_box_top">
            <!-- <span class="up_title">上传大头照</span> -->
            <div v-tap="{ methods: choseImage }" class="uploader">
                <Icon type="camera" size="20"></Icon>
            </div>
        </div>
        <div v-tap="{ methods: putImageToServer }" class="bt">确认上传</div>
    </div>
</template>

<script>
import Chead from './common/Header.vue'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
var wx = require('weixin-js-sdk')

export default {
    data() {
        return {
            img_src: '',
            top_title: '上传头像',
            wx,
            mediaId: ''
        }
    },
    methods: {
        choseImage(){
            var self = this
            this.wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localId = res.localIds.toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    self.getImageData(localId)
                    self.uploadImage(localId)
                }
            })
        },
        getImageData(localId) {
            var self = this
            this.wx.getLocalImgData({
                localId: localId,
                success: function (res) {
                    self.img_src = res.localData
                }
            }) 
        },
        uploadImage(localId){
            var self = this
            this.wx.uploadImage({
                localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    self.mediaId = res.serverId; // 返回图片的服务器端ID
                },
                fail:function(res){
                }
            })
        },
        putImageToServer(){
            var open_id = localStorage.open_id
            this.$http.post( API_ROUTER_CONFIG.upload_user_avatar,
            {
                media_id: this.mediaId,
                open_id: open_id
            },
            {emulateJSON: true}).then((response) => {
                localStorage.user_avatar = response.body.data.user_avatar
            }, (response) => {
                        // error callback 
            })
        }
    },
    components: {
        Chead,
    },
    created() {
        this.img_src = this.$route.params.img_src
        this.SDKRegister(this, () => {
            
        })
    }
}
</script>

<style scoped>
.wrap {
    width: 100vw;
    min-height: 100vh;
}
.img_box {
    padding-top: 30px;
    padding-bottom: 22px;
    width: 50vw;
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
</style>
