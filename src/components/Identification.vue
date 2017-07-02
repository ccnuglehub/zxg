<template>
    <div class="wrap">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="identification">
            <div class="title">请上传清晰的本人大头照及身份证照</div>
            <div class="demo-upload-list" :key="item" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                    <img class="preview_img" :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon class="icon" type="ios-eye-outline" v-tap="{ methods: handleView(item.name) }"></Icon>
                        <Icon class="icon" type="ios-trash-outline" v-tap="{ methods: handleRemove(item) }"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                v-if="flag"
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="//jsonplaceholder.typicode.com/posts/"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="查看图片" v-model="visible">
                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
            </Modal>
            <div class="bt">确认上传</div>
        </div>
    </div>    
</template>

<script>
import Chead from './common/Header.vue'
export default {
    data () {
            return {
                top_title: '实名认证',
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                flag: true
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                            title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 3;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 2 张图片。'
                    });
                } 
                if (this.uploadList.length == 2) {
                    this.flag = false
                } 
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        },
        components: {
            Chead,
        }
    }
</script>

<style scoped>
.wrap {
    width: 100%;
    height: 100%;
}
.identification {
    height: 100vh;
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
.preview_img {
    width: 100px;
    height: 100px;
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
</style>
