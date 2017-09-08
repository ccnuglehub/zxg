<template>
    <div id="add_info" class="add_info">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="info_wrap">
            <div class="title">个人信息</div>
            <div class="edit_area">
                <Form class="info_form" label-position="left" :label-width="80">
                    <Form-item label="姓名">
                        <Input v-model="form_data.user_name" class="info_input" type="text"></Input>
                    </Form-item>
                    <!-- <Form-item v-if="is_owner || is_wy || is_worker" label="电话">
                        <Input v-model="form_data.user_tel" class="info_input" type="text"></Input>
                    </Form-item>  -->
                    <Form-item label="地址">
                        <Input v-model="form_data.user_address" class="info_input" type="text"></Input>
                    </Form-item>
                    <Form-item v-if="is_xmjl || is_worker" label="个人简介">
                        <Input v-model="form_data.worker_description" class="info_input" type="textarea"></Input>
                    </Form-item>
                    <div v-tap="{ methods: addInfo }" class="bt">提交</div>
                </Form>
            </div>
            <CNotice v-if="cnotice_flag" :nclick="closeD" :mclick="mFn" :msg="msg"></CNotice>
        </div>
    </div>
</template>

<script>
import CNotice from './common/Notice.vue'
import Chead from './common/Header.vue'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
import { mapActions, mapState } from 'vuex'
import { checkEmpty } from '../util/util.js'

export default {
    name: 'add_info',
    data(){
        return {
            top_title: '完善个人信息',
            msg: '',
            cnotice_flag: false,
            form_data: {
                open_id: '',
                user_name: "",
                user_type: localStorage.user_type,
                user_address: "",
                worker_description: "",
            },
            is_xmjl: false,
            is_worker: false,
            is_wy: false,
            is_owner: false,
            mFn(){
                console.log('请绑定函数！')
            },
        }
    },
    created(){
        //获取用户信息
        localStorage.is_xmjl == 'true' ? this.is_xmjl = true : this.is_xmjl = false
        localStorage.is_worker == 'true' ? this.is_worker = true : this.is_worker = false
        localStorage.is_wy == 'true' ? this.is_wy = true : this.is_wy = false
        localStorage.is_owner == 'true' ? this.is_owner = true : this.is_owner = false
        this.form_data.open_id = localStorage.open_id
    },
    methods: {
        ...mapActions([
            'upDateLocalStorage'
        ]),
        checkEmpty,
        addInfo(){
            for(var key in this.form_data) {
                if(this.checkEmpty(this.form_data[key])) {
                    this.msg = '您有必填项未填写，请填写后重试！'
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                    return
                }
            }
            this.$http.post( API_ROUTER_CONFIG.update_user, 
            this.form_data,
			{emulateJSON: true}).then((response) => {
				if(response.body.status == 1) {
                    //将localstorage的用户信息更新
                    this.upDateLocalStorage(this.form_data)
                    this.$router.go(-1)
                } else {
                    this.msg = response.body.msg
                    this.mFn = this.closeD
                    this.cnotice_flag = true
                }
			}, (response) => {
                      // error callback 
            })
        },
        closeD(){
            this.cnotice_flag = false
        },
    },
    components: {
        Chead,
        CNotice
    }
}
</script>

<style scoped>
.add_info {
    min-height: calc(100vh - 45px);
    width: 100vw;
    background: rgb(239,239,239);
    font-size: 14px;
    color: rgb(16, 16, 16);
    padding-bottom: 20px;
}
.info_wrap {
    width: 94vw;
    background: #fff;
    display: inline-block;
    margin: 15px auto auto auto;
    border-radius: 8px;
    padding-bottom: 9vh;
    border-bottom: 20px solid rgb(249, 249, 249);
}
.title {
    text-align: left;
    line-height: 30px;
    border-radius: 8px;
    background: rgb(249, 249, 249);
}
.edit_area,
.title {
    padding: 0 20px;
}
.info_form {
    padding-top: 8px;
}
.info_form .ivu-form-label-left .ivu-form-item-label {
    padding-right: 20px;
}
.bt {
    background: rgb(134, 210, 198);
    width: 60px;
    height: 30px;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    margin: 0 auto;
}
</style>
