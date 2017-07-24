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
		<!-- <div class="input_box">
			<Input v-model="form_data.auth_code" @on-blur="emptyValidate(form_data.auth_code)" class="input" placeholder="请输入短信验证码">
				<span slot="prepend"><Icon type="locked"></Icon></Icon></span>
			</Input>
			<div class="input error"><span v-show="empty_flag">验证码不能为空</span></div>
		</div>  -->
		<div class="select_box">
			<label class="select_lable">请选择身份</label>
			<Select v-model="form_data.user_type" class="select">
				<Option v-for="(item, index) in user_type_list" :value="item.id" :key="index">{{ item.value }}</Option>
			</Select>
		</div>
		<div class="select_box">
			<label class="select_lable"></label>
			<Select v-model="form_data.user_work_type" class="select">
				<Option v-for="(item, index) in user_work_type_list" :value="item.id" :key="index">{{ item.value }}</Option>
			</Select>
		</div>
		<Button v-tap="{ methods: register }" class="register_bt" type="success" long>注册</Button>
	</div>
</template>

<script>
import { checkPhone, checkName, checkEmpty } from '../util/util.js'
import { mapActions, mapState } from 'vuex'
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
				// auth_code: '',
				open_id: '3adf123adaf',
				user_work_type: '',
			},
			bt_text: '发送验证码',
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
					value: '工友'
				}
			],
			user_work_type_list: [
				{
					id: 1,
					value: '油漆工'
				},
				{
					id: 2,
					value: '泥瓦工'
				},
				{
					id: 3,
					value: '水电工'
				},
				{
					id: 4,
					value: '木工'
				}
			]	
		}
	},
	computed: {
		...mapState([
			'xmjl_info'
		])
	},
	created(){
		this.form_data.open_id = this.xmjl_info.open_id
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
		...mapActions([
			'changeXmjlInfo',
		]),
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
			this.$http.post('http://101.201.68.200/zxg/weixin/index?c=register&f=get_auth_code', {
				user_tel: this.user_tel
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
			console.log(this.form_data)
			this.$http.post('http://101.201.68.200/zxg/weixin/index?c=register&f=add_user',
				this.form_data,
			{emulateJSON: true}).then((response) => {
				this.changeXmjlInfo(response.body.data)
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
	min-height: 100vh;
}
.app_logo {
	margin-top: 70px;
	margin-bottom: 56px;
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

