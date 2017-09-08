<template>
	<div class="container">
		<Chead :msg="top_title"></Chead>
		<div class="background">
			<img class="person_bg" src="../assets/personBackground.jpg">
			<div @click="goAvatorUploader" class="person_head">
				<img class="person_head_img" :src="person_data.user_avator">
			</div>
		</div>
		<div class="abstract">
			<div class="personal_detail">
				<span class="type">姓名：{{ person_data.user_name }}</span>
			</div>
			<div v-if="is_worker"  class="personal_abstract">个人简介:
				<span class="description txt_ell">{{ person_data.worker_description }}</span>
			</div>
			<div class="personal_detail">
				<span class="type">工作类型：{{ person_data.user_type }}</span>
			</div>
			<div class="personal_number">电话：<a :href="'tel:' + person_data.user_tel">{{ person_data.user_tel }}</a></div>
		</div>
		<div v-tap="{ methods: goInfo }" class="item">
			<div class="item_left">
				<Icon class="vertical_item icon_left" type="soup-can" size="16"></Icon>
				<span class="vertical_item">完善个人信息</span>
			</div>
			<div class="icon">
				<Icon type="chevron-right" size="16"></Icon>
			</div>
		</div>
		<div v-tap="{ methods: goIdent }" class="item">
			<div class="item_left">
				<Icon class="vertical_item icon_left" type="card" size="16"></Icon>
				<span class="vertical_item">进行实名认证</span>
			</div>
			<div class="icon">
				<Icon type="chevron-right" size="16"></Icon>
			</div>
		</div>
		<div v-if="!is_worker && !is_xmjl" v-tap="{ methods: goScanQr }" class="item">
			<div class="item_left">
				<Icon class="vertical_item icon_left" type="qr-scanner" size="16"></Icon>
				<span class="vertical_item">生成二维码</span>
			</div>
			<div class="icon">
				<Icon type="chevron-right" size="16"></Icon>
			</div>
		</div>
		<div v-if="is_xmjl || is_worker" v-tap="{ methods: goFocus }" class="item">
			<div class="item_left">
				<Icon class="vertical_item" type="heart" size="16"></Icon>
				<span class="vertical_item">我的关注</span>
			</div>
			<div class="icon">
				<Icon type="chevron-right" size="16"></Icon>
		    </div>
		</div>
		<div v-tap="{ methods: exit }" class="item">
			<div class="item_left">
				<Icon class="vertical_item" type="android-exit" size="16"></Icon>
				<span class="vertical_item">注销账号</span>
			</div>
			<div class="icon">
				<Icon type="chevron-right" size="16"></Icon>
		    </div>
		</div>
		<Menue></Menue>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import { changeType } from '@/util/util'
import { mapState, mapActions } from 'vuex'
import { HOST_CONFIG, API_ROUTER_CONFIG } from '@/api/config/api_config'
// import { mapState, mapActions, mapGetters } from 'vuex'
export default{
	data(){
		return{
			top_title: '个人中心',
			person_data: {},
			is_xmjl: false,
            is_worker: false,
            is_wy: false,
            is_owner: false
		}
	},
	methods:{
		changeType,
		goInfo(){
			this.$router.push('add_info')
		},
		goIdent(){
			this.$router.push('identification')
		},
		goFocus(){
			this.$router.push('focus')
		},
		goAvatorUploader(){
			this.$router.push({ name: 'upload_avator', params: { img_src: this.person_data.user_avator }})
		},
		workerAvatar(url){
            // console.log(url)
            return HOST_CONFIG.imageIp+url;
        },
		exit() {
			this.$http.post( API_ROUTER_CONFIG.delete_user, {
				open_id: localStorage.open_id,
				user_type: localStorage.user_type
			},
			{emulateJSON: true}).then((response) => {
				localStorage.clear()
				alert(response.body.msg)
				if(response.body.status == 1) {
					localStorage.clear()
					this.$router.push('register')
				}
			}, (response) => {
						// error callback 
			})
		},
		goScanQr(){
			var aim, id = localStorage.open_id, facility_adress
			alert(id)
			if(this.is_wy) {
				aim = 'worker_enter_xq'
				this.$http.post( API_ROUTER_CONFIG.facility_get_code, {
					open_id: localStorage.open_id
				},
				{emulateJSON: true}).then((response) => {
					facility_adress = response.body.data.user_address
					alert('物业公司id' + id)
					alert('物业公司地址' + facility_adress)
					this.$router.push({ name:'qr_code', params: { aim: aim, txt: aim + '&' + id + '&' + facility_adress }})
				}, (response) => {
							// error callback 
				})
			}
			if(this.is_owner) {
				alert('业主id' + id)
				aim = 'worker_enter_fj'
				this.$router.push({ name:'qr_code', params: { aim: aim, txt: aim + '&' + id }})
			}
		
		},
	},
	created(){

		localStorage.is_xmjl == 'true' ? this.is_xmjl = true : this.is_xmjl = false
        localStorage.is_worker == 'true' ? this.is_worker = true : this.is_worker = false
        localStorage.is_wy == 'true' ? this.is_wy = true : this.is_wy = false
		localStorage.is_owner == 'true' ? this.is_owner = true : this.is_owner = false
		this.person_data.worker_description = localStorage.worker_description
		this.person_data.user_name = localStorage.user_name
		this.person_data.user_tel = localStorage.user_tel
		this.person_data.user_avator = this.workerAvatar(localStorage.user_avatar)
		this.person_data.user_type = this.changeType(localStorage.user_type)
		this.open_id = localStorage.open_id
    },
	components: {
		Chead,
		Menue,
	}
}
</script>

<style scoped>
.container{
	position: relative;
	background-color: rgb(239,239,239);
	height: calc(100vh - 45px);
	padding-top: 21.8vh;
}
.background{
	position: absolute;
	top: 0;
	height: 21.8vh;
	width: 100vw;
	overflow: hidden;
}
.person_bg {
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	height: 180%;
	width: 100%;
}
.person_head{
	height: 102px;
	width: 102px;
	border: 1px solid grey;
	border-radius: 50%;
	overflow: hidden;
	position: absolute;
	top: 4vh;
	left: 50%;
	transform: translateX(-50%);
}
.person_head_img {
	width: 100%;
}
.abstract{
	background: rgb(134,210,198);
	margin-bottom: 2.5vh;
	color: #fff;
	padding: 5px 0 5px 9.2vw;
	font-size: 14px;
	text-align: left;
}
.personal_abstract,
.personal_number,
.personal_detail {
	font-weight: bold;
	line-height: 28px;
}
.personal_abstract,
.personal_number,
.name{
	padding-right: 13.5vw;
}
.personal_number a {
	color: #fff;
}
.item{
	padding: 2.3vh 9.8vw;
	text-align: left;
	height: 8vh;
	margin-bottom: 2px;
	background: #fff;
	font-size: 14px;
}
.item_left{
	float: left;
	vertical-align: middle;
}
.vertical_item {
	vertical-align: middle;
}
.icon{
	line-height: 28px;
	text-align: right;
	vertical-align: middle;
}
.icon:after{
	content: '';
    display: block;
    clear: both;
}
.icon_left {
	padding-bottom: 1px;
}
.demo-badge{
	height: 3.4vh;
	background: #eee;
	border-radius: 3px;
	display: inline-block;
	size: 10px;
}
.description {
	padding-left: 2px;
	font-size: 13px;
}
</style>