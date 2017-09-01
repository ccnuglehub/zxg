<template>
	<div class="register">
		<img class="app_logo" src="../assets/app_logo.png">
		<div class="n_input_box">
			<Input v-model="form_data.user_name" @on-blur="nameValidate(form_data.user_name)" class="input" placeholder="请输入姓名">
				<span slot="prepend"><Icon type="person"></Icon></span>
			</Input>
			<div class="input error"><span v-show="!name_flag">姓名格式不正确</span></div>
		</div>
		<div class="m_box">
			<div class="input mb_input">
				<div class="m_input_box">
					<Input v-model="form_data.user_tel" @on-blur="phoneValidate(form_data.user_tel)" class="m_input" placeholder="请输入手机号码">
						<span slot="prepend"><Icon type="ios-telephone"></Icon></span>
					</Input>
				</div>
				<Button :disabled="this.time_count < 61" v-tap="{ methods: sendMcode }" class="m_bt" type="success" long>{{ bt_text }}</Button>
			</div>
			<div class="input error"><span v-show="!phone_flag">电话号码格式不正确</span></div>
		</div>
		 <div class="input_box">
			<Input v-model="form_data.auth_code" @on-blur="emptyValidate(form_data.auth_code)" class="input" placeholder="请输入短信验证码">
				<span slot="prepend"><Icon type="locked"></Icon></Icon></span>
			</Input>
			<div class="input error"><span v-show="empty_flag">验证码不能为空</span></div>
		</div>  
		<div class="select_box">
			<label class="select_lable">请选择身份</label>
			<Select @on-change="getUserType" v-model="form_data.user_type" placeholder="请选择" class="select">
				<Option v-for="(item, index) in user_type_list" :value="item.id" :key="index">{{ item.value }}</Option>
			</Select>
		</div>
		<div v-if="is_worker" class="select_box">
			<label class="select_lable"></label>
			<Select v-model="form_data.user_work_type" class="select">
				<Option v-for="(item, index) in user_work_type_list" :value="item.id" :key="index">{{ item.value }}</Option>
			</Select>
		</div>
		 <div v-if="is_worker" class="select_box">
			<label class="select_lable"></label>
			<Select class="select">
				<Option v-for="(item, index) in city_list" :value="item.id" :key="index">{{ item.value }}</Option>
			</Select>
		</div> 
		 <div v-if="is_owner" class="n_input_box">
			<Input class="input" placeholder="请输入房屋地址">
				<span slot="prepend"><Icon type="location"></Icon></span>
			</Input>
			<div class="input error"></div>
		</div>
		 <div v-if="is_wy" class="n_input_box">
			<Input class="input" placeholder="请输入物业公司名称">
				<span slot="prepend"><Icon type="ios-home"></Icon></span>
			</Input>
			<div class="input error"></div>
		</div>
		<div v-if="is_wy" class="n_input_box">
			<Input class="input" placeholder="请输入小区地址">
				<span slot="prepend"><Icon type="location"></Icon></span>
			</Input>
			<div class="input error"></div>
		</div>  
		<Button v-tap="{ methods: register }" class="register_bt" type="success" long>注册</Button>
	</div>
</template>

<script>
import { checkPhone, checkName, checkEmpty } from '../util/util.js'
import { mapActions, mapState } from 'vuex'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
export default {
  	name: 'register',
  	data () {
    	return {
			bt_text: '发送验证码',
			time_count: 61,
      		form_data: {
				user_name: '',
				user_tel: '',
				user_type: '',
				auth_code: '',
				open_id: '3adf123adaf',
				// user_work_type: '',
			},
			bt_text: '发送验证码',
			phone_flag: true,
			name_flag: true,
			empty_flag: false,
			is_xmjl: false,
            is_worker: false,
            is_wy: false,
            is_owner: false
		}
	},
	computed: {
		...mapState([
			'user_type_list',
			'user_work_type_list',
			'city_list',
		])
	},
	created(){
		// var obj = this.upDateLocalStorage(['open_id', 'is_xmjl', 'is_worker', 'is_wy', 'is_owner'])
		// this.is_xmjl = obj.is_xmjl
        // this.is_worker = obj.is_worker
        // this.is_owner = obj.is_owner
        // this.is_wy = obj.is_wy
		// this.form_data.open_id = obj.open_id
	},
	methods: {
		...mapActions([
			'upDateLocalStorage'
		]),
		checkPhone,
		checkName,
		checkEmpty,
		phoneValidate(val){
			this.phone_flag = this.checkPhone(val)
		},
		nameValidate(val){
			this.name_flag = this.checkName(val)
		},
		emptyValidate(val){
			this.empty_flag = this.checkEmpty(val)
		},
		getUserType(value) {
			this.is_xmjl = false
			this.is_worker = false
			this.is_owner = false
			this.is_wy = false
			if(value == 1) {
				// xmjl
				this.is_xmjl = true
			}
			if(value == 2) {
				// wygs
				this.is_wy = true
			}
			if(value == 3) {
				// yz
				this.is_owner = true
			}
			if(value == 4) {
				// gy
				this.is_worker = true
			}
			var obj = {}
			obj.is_xmjl = this.is_xmjl
			obj.is_worker = this.is_worker
			obj.is_owner = this.is_owner
			obj.is_wy = this.is_wy
			this.upDateLocalStorage(obj)
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
				user_tel: this.form_data.user_tel
			},
			{emulateJSON: true}).then((response) => {
				this.sendMcodeTimer()
				console.log(response)
			}, (response) => {
                      // error callback 
            })
		},
		register(){
			if(!this.phone_flag || !this.name_flag || this.empty_flag) {
				return
			}
			if(this.checkEmpty(this.form_data.user_name) || this.checkEmpty(this.form_data.user_tel)) {
				return
			}
			alert(this.form_data.user_name)
			alert(this.form_data.user_tel)
			alert(this.form_data.user_type)
			alert(this.form_data.auth_code)
			this.$http.post(API_ROUTER_CONFIG.add_user,
				this.form_data,
			{emulateJSON: true}).then((response) => {
				var info = response.body.data
				info.openid = info.open_id

				alert(info.openid)

				//将用户信息存储到localstorage
				this.upDateLocalStorage(info)

                this.$router.push('home')
			}, (response) => {
					// error callback 
            })
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
	min-height: calc(100vh - 45px);
	box-sizing: border-box;
}
.app_logo {
	margin-top: 36px;
	margin-bottom: 42px;
	width: 71%;
}
.input {
	margin: 0 auto;
}
.select_box {
	font-size: 0;
	margin-bottom: 20px;
}
.select {
	font-size: 12px;
	width: 42%;
	height: 30px;
}
.m_input {
	width: 100%;
}
.select_lable,
.select {
	vertical-align: middle;
}
.select_lable {
	display: inline-block;
	height: 30px;
	line-height: 30px;
	font-size: 12px;
	width: 24%;
	text-align: left;
}
.input,
.register_bt {
	width: 66%;
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

