<template>
    <div class="login">
        <div class="m_box">
			<div class="input mb_input">
				<div class="m_input_box">
					<Input v-model="user_tel" @on-blur="phoneValidate(user_tel)" class="m_input" placeholder="请输入手机号码">
						<span slot="prepend"><Icon type="ios-telephone"></Icon></span>
					</Input>
				</div>
				<Button :disabled="this.time_count < 61" v-tap="{ methods: sendMcode }" class="m_bt" type="success" long>{{ bt_text }}</Button>
			</div>
			<div class="input error"><span v-show="!phone_flag">电话号码格式不正确</span></div>
		</div>
		<div class="input_box">
			<Input v-model="auth_code" @on-blur="emptyValidate(auth_code)" class="input" placeholder="请输入短信验证码">
				<span slot="prepend"><Icon type="locked"></Icon></Icon></span>
			</Input>
			<div class="input error"><span v-show="empty_flag">验证码不能为空</span></div>
		</div> 
        <Button v-tap="{ methods: login }" class="login_bt" type="success" long>登录</Button>
    </div>
</template>
<script>
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
import { checkPhone, checkEmpty } from '../util/util.js'
import { mapActions } from 'vuex'
export default {
    data () {
        return {
            user_tel: '18627029526',
            auth_code: '',
            empty_flag: '',
			phone_flag:true,
			bt_text: '发送验证码',
			time_count: 61,
        }
    },
    methods:{
        checkPhone,
        checkEmpty,
        phoneValidate(val){
			this.phone_flag = this.checkPhone(val)
        },
        emptyValidate(val){
			this.empty_flag = this.checkEmpty(val)
        },
        ...mapActions([
			'changeXmjlInfo',
		]),
        login(){
            if(!this.phone_flag || this.checkEmpty(this.user_tel)) {
				return
			}
            this.$http.post(API_ROUTER_CONFIG.login ,{
                user_tel: this.user_tel
            },
			{emulateJSON: true}).then((response) => {
                this.changeXmjlInfo(response.body.data)
                this.$router.push('home')
			}, (response) => {
					// error callback 
            })
        },
        sendMcodeTimer(){
			var self = this
			if(self.time_count != 61) {
				return
			}
			if(self.time_count == 61){
				self.time_count = 60
				var timer = setInterval(function(){
					if(self.time_count>0) {
						self.time_count--
						self.bt_text = self.time_count + 's后重试'
					} else {
						self.bt_text = '发送验证码'
						self.time_count = 61
						clearInterval(timer)
					}
				}, 1000)
			}
		},
		sendMcode(){
			if(!this.phone_flag) {
				return
			}
			this.$http.post( API_ROUTER_CONFIG.get_auth_code, 
			{
				user_tel: this.user_tel
			},
			{emulateJSON: true}).then((response) => {
				this.sendMcodeTimer()
			}, (response) => {
                      // error callback 
            })
		}
    }
}
</script>
<style scoped>
.login {
	min-height: 100vh;
    padding-top: 24vh;
}
.input,
.login_bt {
	margin: 0 auto;
    width: 66%;
}
.login_bt {
    margin-top: 12px;
}
.m_input {
	width: 100%;
}
.m_bt {
	width: 30%;
	display: inline-block;
	vertical-align: middle;
	margin-left: 4%;
	font-size: 12px;
	padding: 6px 0;
}
.m_input_box {
	display: inline-block;
	width: 65%;
	vertical-align: middle;
	font-size: 12px;
}
.mb_input {
	font-size: 0;
}
.error {
	text-align: left;
	padding-left: 12px;
	color: red;
	height: 20px;
}
</style>

