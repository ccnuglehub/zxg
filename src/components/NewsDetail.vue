<template>
	<div class="wrap">
		<Chead :msg="top_title" :icon="true"></Chead>
		<div class="news_detail">
			<div class="detail_header">
				<div class="detail_title"> 装修材料怎么选择？挑选装修材料的注意事项有哪些</div>
				<div class="detail_meta">
					<span class="detail_meta_item detail_creator">韩寒</span>
					<span class="detail_meta_item detail_time">2020.07.1</span>
				</div>
			</div>
			<div class="detail_content" v-html="detail"></div>
		</div>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
export default{
	data(){
		return{
			top_title: '详情',
			laoding:"",
			err:"",
			data:"",
			detail:""
		}
	},
	methods:{
		getDetail(){
			this.data = this.$route.params.data;
			this.detail = this.$route.params.detail;
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
}
.detail_meta{
	text-align: right;
	padding-right: 10px;
}
.detail_content{
	overflow-y: scroll;
	padding-bottom: 100px;
}
.detail_creator {
	margin-right: 16px;
}
.detail_meta_item {
	vertical-align: middle;
}
</style>