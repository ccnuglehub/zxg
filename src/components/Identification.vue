<template>
    <div class="wrap">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="identification">
            <div v-if="user_is_identify == 0" class="title">请上传清晰的本人大头照及身份证照</div>
            <div v-if="user_is_identify == 1" class="title">审核通过</div>
            <div v-if="user_is_identify == 2" class="title">照片已上传，请耐心等待审核</div>
            <div v-if="user_is_identify == 3" class="title">审核未通过，请再次上传清晰的本人大头照及身份证照</div>
            <img v-if="img_data" class="preview" :src="img_data" />
            <div class="up_box_top">
                <!-- <span class="up_title">上传大头照</span> -->
                <div v-tap="{ methods: choseImage }" class="uploader">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </div>
            <div v-tap="{ methods: putImageToServer }" class="bt">确认上传</div>
        </div>
        <CNotice v-if="cnotice_flag" :nclick="closeD" :mclick="mFn" :msg="msg"></CNotice>
    </div>    
</template>

<script>
import CNotice from './common/Notice.vue'
import Chead from './common/Header.vue'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
var wx = require('weixin-js-sdk')
import { checkEmpty } from '../util/util.js'

export default {
    data () {
            return {
                top_title: '实名认证',
                wx,
                img_data: "",
                mediaId: '',
                user_is_identify: localStorage.user_is_identify,
                msg: '',
                cnotice_flag: false,
                mFn(){
                    console.log('请绑定函数！')
                },
            }
        },
        methods: {
            checkEmpty,
            closeD(){
                this.cnotice_flag = false
            },
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
                        self.img_data = res.localData
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
                if(this.checkEmpty(this.mediaId)) {
                    this.msg = '请选择图片后再上传！'
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                }
                var open_id = localStorage.open_id
                this.$http.post( API_ROUTER_CONFIG.identity,
                {
                    media_id: this.mediaId,
                    open_id: open_id
                },
                {emulateJSON: true}).then((response) => {
                    if(response.body.status == 1) {
                        localStorage.user_is_identify = 2
                    } else {
                        this.msg = response.body.msg
                        this.mFn = this.closeD
                        this.cnotice_flag = true
                    }
                }, (response) => {
                            // error callback 
                })
            }
        },
        components: {
            Chead,
            CNotice
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
