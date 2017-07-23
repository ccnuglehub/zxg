<template>
    <div style="height:100%">
        <div style="height:40%"></div>
        <Input v-model="user_tel" @on-blur="phoneValidate(user_tel)" placeholder="请输入电话号码" type="text" style="width: 60%;margin:auto;"></Input>
        <Button class="login_bt" type="success" v-tap="{ methods: login }">登录</Button>
        <div class="input error"><span v-show="!phone_flag">姓名格式不正确</span></div>
    </div>
</template>
<script>
import {API_ROUTER_CONFIG} from '@/api/config/api_config'
import { checkPhone, checkEmpty } from '../util/util.js'
export default {
    data () {
        return {
            user_tel: '',
            phone_flag:true
        }
    },
    methods:{
        checkPhone,
        checkEmpty,
        phoneValidate(val){
			this.phone_flag = this.checkPhone(val)
		},
        login(){
            if(!this.phone_flag || this.checkEmpty(this.user_tel)) {
				return
			}
            alert(API_ROUTER_CONFIG.login)
        }
    }
}
</script>
<style scoped>
.error {
	text-align: left;
	padding-left: 40px;
    padding-top: 4px;
	color: red;
	height: 20px;
}
</style>

