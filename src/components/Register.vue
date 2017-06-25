<template>
	<div class="register">
		<img class="app_logo" src="../assets/app_logo.png">
		<div class="n_input_box">
			<Input v-model="user_name" @on-blur="nameValidate(user_name)" class="input" placeholder="请输入姓名">
				<span slot="prepend"><Icon type="person"></Icon></span>
			</Input>
			<div class="input error"><span v-show="!name_flag">姓名格式不正确</span></div>
		</div>
		<div class="m_box">
			<div class="input mb_input">
				<div class="m_input_box">
					<Input v-model="user_tel" @on-blur="phoneValidate(user_tel)" class="m_input" placeholder="请输入电话">
						<span slot="prepend"><Icon type="ios-telephone"></Icon></span>
					</Input>
				</div>
				<Button @click="sendMcode" class="m_bt" type="success" long>发送验证码</Button>
			</div>
			<div class="input error"><span v-show="!phone_flag">电话号码格式不正确</span></div>
		</div>
		<div class="input_box">
			<Input v-model="auth_code" @on-blur="emptyValidate(auth_code)" class="input" placeholder="请输入短信验证码">
				<span slot="prepend"><Icon type="locked"></Icon></Icon></span>
			</Input>
			<div class="input error"><span v-show="empty_flag">验证码不能为空</span></div>
		</div>
		<div class="select_box">
			<label class="select_lable">请选择身份</label>
			<Select v-model="user_local" class="select">
				<Option v-for="item in user_type_list" :value="item.value" :key="item">{{ item.value }}</Option>
			</Select>
		</div>
		<div class="select_box">
			<label class="select_lable"></label>
			<Select v-model="user_type" class="select">
				<Option v-for="item in user_local_list" :value="item.value" :key="item">{{ item.value }}</Option>
			</Select>
		</div>
		<Button @click="register" class="register_bt" type="success" long>注册</Button>
	</div>
</template>

<script>
import { checkPhone, checkName, checkEmpty } from '../util/util.js'

export default {
  	name: 'register',
  	data () {
    	return {
      		user_name: '',
			user_tel: '',
			user_type: '',
			auth_code: '',
			user_local: '',
			phone_flag: true,
			name_flag: true,
			empty_flag: false,
			user_type_list: [
				{
					id: 1,
					value: '项目经理'
				},
				{
					id: 2,
					value: '物业公司'
				},
				{
					id: 3,
					value: '业主'
				},
				{
					id: 4,
					value: '油漆工'
				},
				{
					id: 5,
					value: '泥瓦工'
				},
				{
					id: 6,
					value: '水电工'
				},
				{
					id: 7,
					value: '木工'
				}
			],
			user_local_list: []	
		}
  	},
	methods: {
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
		sendMcode(){
			if(!this.phone_flag) {
				return
			}
			this.$http.post('url', data,
                {emulateJSON: true}).then((response) => {
                  
                }, (response) => {
                      // error callback 
            })
		},
		register(){
			if(!this.phone_flag || !this.name_flag || this.empty_flag) {
				return
			}
			if(this.checkEmpty(this.user_name) || this.checkEmpty(this.user_tel)) {
				return
			}
			this.$http.post('url', data,
                {emulateJSON: true}).then((response) => {
                  
                }, (response) => {
                      // error callback 
            })
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app_logo {
	margin-top: 90px;
	margin-bottom: 65px;
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

