<template>
	<div class="container">
		<Chead :msg="top_title"></Chead>
		<div class="background">
			<img class="person_bg" src="../assets/personBackground.jpg">
			<img class="person_head" src="../assets/people.png">
		</div>
		<div class="abstract">
			<div class="personal_abstract">个人简介:
				<span class="description txt_ell">{{ person_data.worker_description }}</span>
			</div>
			<div class="personal_detail">
				<span class="type">姓名：{{ person_data.user_name }}</span>
			</div>
			<div class="personal_detail">
				<span class="type">工作类型：{{ person_data.user_type }}</span>
			</div>
			<div class="personal_number">电话：{{ person_data.user_tell }}</div>
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
		<Menue></Menue>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import { mapState, mapActions } from 'vuex'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
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
		goInfo(){
			this.$router.push('add_info')
		},
		goIdent(){
			this.$router.push('identification')
		},
		goFocus(){
			this.$router.push('focus')
		},
		goScanQr(){
			var url
			if(this.is_wy) {
				url = API_ROUTER_CONFIG.facility_get_code
			}
			if(this.is_yz) {
				url = API_ROUTER_CONFIG.owner_get_code
			}
			this.$http.post(url, {
				open_id: ''
			},
			{emulateJSON: true}).then((response) => {
				this.$router.push({ name:'qr_code', params: { data: response.body.data.user_address + '&' + 'open_id' }})
			}, (response) => {
			            // error callback 
			})
		},
	},
	created(){

		localStorage.is_xmjl == 'true' ? this.is_xmjl = true : this.is_xmjl = false
        localStorage.is_worker == 'true' ? this.is_worker = true : this.is_worker = false
        localStorage.is_wy == 'true' ? this.is_wy = true : this.is_wy = false
		localStorage.is_owner == 'true' ? this.is_owner = true : this.is_owner = false
		this.person_data.worker_description = localStorage.worker_description
		this.open_id = localStorage.open_id
		
        // this.$http.post('url', data,
        //     {emulateJSON: true}).then((response) => {
                
        //     }, (response) => {
        //             // error callback 
        // })
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
	height: 14.8vh;
	border-radius: 7.9vh;
	position: absolute;
	top: 4vh;
	left: 50%;
	transform: translateX(-50%);
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
	font-weight: normal;
	font-size: 13px;
}
</style>