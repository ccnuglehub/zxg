<template>
	<div class="wrap">
		<Chead :msg="top_title" :icon="true"></Chead>
		<div class="news_detail">
			<div class="detail_header">
				<div class="detail_title"> {{title}}</div>
				<div class="detail_meta">
					<span class="detail_meta_item detail_creator">{{auther}}</span>
					<span class="detail_meta_item detail_time">{{time}}</span>
				</div>
			</div>
			<div class="detail_content" v-html="detail"></div>
		</div>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
import { changeDate } from '@/util/util'
export default {
	data(){
		return{
			top_title: '详情',
			laoding:"",
			err:"",
			title:"",
			detail:"",
			auther:"",
			time:""
		}
	},
	methods:{
		getDetail(){
			this.title = this.$route.params.title;
			this.detail = this.$route.params.detail;
			this.auther = this.$route.params.auther;
			this.time = this.$route.params.time && changeDate(this.$route.params.time);
			// console.log(this.$route.params.data)
		}
		
	},
	mounted(){
		this.$nextTick(function(){

		})
	},
	created(){
		this.getDetail()
	},
	components: {
		Chead,
	}
}
</script>

<style scoped>
/*文章标题？？？单独使用标题，自己渲染*/
.news_detail{
	overflow: hidden;
	margin: 1vh 1vw;
	text-align: left;
	text-indent: 2em;
	padding: 5px 10px 0;
}
.detail_header{
	margin-bottom: 2vh;
}
.detail_title{
	font-size: 18px;
	font-weight: bold;
	text-indent: 0;
	text-align: center;
}
.detail_meta{
	text-align: right;
	padding-right: 10px;
	font-size: 14px;
}
.detail_content{
	overflow-y: scroll;
	padding-bottom: 100px;
	font-size: 14px;
}
.detail_creator {
	margin-right: 16px;
}
.detail_meta_item {
	vertical-align: middle;
}
</style>