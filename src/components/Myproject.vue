<template>
	<div v-infinite-scroll="onScroll" infinite-scroll-disabled="true" infinite-scroll-distance="22" class="container">
		<Chead :msg="top_title"></Chead>
		<div class="switch">
			<div v-tap="{ methods: getProgressInit }" class="switch_item switch_item_left">进行中</div>
			<div v-tap="{ methods: getFinishedInit }" class="switch_item switch_item_right">已完成</div>
		</div>
		<div class="list_container">
			<div v-for="(item,index) in projects" :key="index" v-tap="{ methods: goDetail, params: item }" class="itemlist">
				<div class="process" v-text='process?"进行中":"已完成"' :style="getStyle(process)"></div>
				<div class="project_abstract">
					<span class="project_name">{{ item.project_name }}</span>
					<span class="project_address">{{ item.project_address }}</span>
				</div>
				<div class="project_meta">
					<span class="project_people">{{ item.project_people }}位工友参与</span>
					<span class="project_time">{{ item.project_time }}</span>
				</div>
			</div>
		</div>
		<Menue></Menue>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
import { mapState } from 'vuex'
export default {
	data() {
		return{
			top_title: "我的项目",
			process: false,
			projects: [],
			page: 0,
			openid: '',
			getDataFn(){
				console.log('这是一个函数！')
			},
			get_data_flag: true
		}
	},
	computed: {
		...mapState([
			'xmjl_info'
		])
	},
	methods:{
		//改变完成字体颜色 
		getStyle(process){
			if(process){
				return{
					color:"rgb(141,212,201)",

				}
			}else{
				return{
					color:"red"
				}
			}
		},
		getProgressInit(){
			this.page = 0
			this.getDataFn = this.getProgress
			this.getProgress()
		},
		getProgress(){
			this.process = true
			this.get_data_flag =false
			this.$http.post( API_ROUTER_CONFIG.project_list,
			{
				account: this.page,
				openid: this.openid,
				project_status: "0"
			},
			{emulateJSON: true}).then((response) => {
				this.projects = this.projects.concat(response.body.data)
				this.get_data_flag = true
				console.log(this.projects)
			}, (response) => {
						// error callback 
			})
		},
		getFinishedInit(){
			this.page = 0
			this.getDataFn = this.getFinished
			this.getFinished()
		},
		getFinished(){
			this.get_data_flag =false
			this.$http.post( API_ROUTER_CONFIG.project_list,
			{
				account: this.page,
				openid: "2adsfad1231",
				project_status: "1"
			}
			,
			{emulateJSON: true}).then((response) => {
				this.process = false
				this.projects = this.projects.concat(response.body.data)
				this.get_data_flag = true
				console.log(response)
			}, (response) => {
						// error callback 
			})
		},
		goDetail(item){
			this.$router.push({ name: 'project_detail', params: { item: item.params }})
		},
		onScroll(){
			if(this.get_data_flag) {
				this.page++ 
				this.getDataFn()
			}
		}
	},
	created(){
		this.openid = this.xmjl_info.openid
		this.getDataFn = this.getProgress
		this.getProgress()
    },
	components: {
		Chead,
		Menue,
	}
}
</script>

<style scoped>
.container{
	overflow: hidden;
	background: rgb(237,237,237);
}
.list_container{
	min-height: 92vh;
	margin:0 2.5vw;
	margin-bottom: 60px;
	overflow-y: scroll;
	padding-top: 47px;
}
.itemlist{
	height: 20.3vh;
	border-radius: 7px;
	margin-top: 2.8vh;
	background: rgb(249,249,249);
	border: 1px solid rgb(250,245,250);
}
.process{
	height: 4.9vh;
	text-align: left;
	padding-left: 4.5vw;
	padding-top: 1vh;
	font-size: 14px;
}
.project_abstract{
	height: 7.2vh;
	font-weight: 600;
	font-size: 14px;
	text-align: left;
	padding-left: 4.5vw;
	padding-top: 2vh;
	background: #fff;
}
.project_name{
	float: left;
	font-size: 16px;
}
.project_address{
	text-align: right;
	font-size: 14px;
	float: right;
	padding-right: 4.5vw;
	color: rgb(125, 124, 125);
}
.project_meta{
	background: #fff;
	font-size: 12px;
	height: 4.7vh;
}
.project_people{
	text-align: left;
	float: left;
	padding-left: 4.5vw;
	font-size: 14px;
	color: rgb(125, 124, 125);
}
.project_time{
	text-align: right;
	float: right;
	padding-right: 4.5vw;
	font-size: 14px;
	color: rgb(125, 124, 125);
}
.switch {
	width: 100%;
	font-size: 0;
	position: fixed;
	top: 45px;
	left: 0;
	padding-bottom: 6px;
	background: rgb(237,237,237);
}
.switch_item {
	font-size: 14px;
	display: inline-block;
	line-height: 30px;
	width: 130px;
	background: #fff;
}
.switch_item {
	margin-top: 15px;
	border: 1px solid rgb(179,179,179);
}
.switch_item_left {
	border-right: 0;
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
}
.switch_item_right {
	border-top-right-radius: 8px;
	border-bottom-right-radius: 8px;
}
</style>