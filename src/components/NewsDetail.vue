<template>
	<div class="container">
		<div class="detail_header">
			<div class="detail_title">{{data.news_title}}</div>
			<div class="detail_meta">
				<span class="detail_time">{{data.news_create_time}}</span>
				<span class="detail_creator">{{data.news_create_person}}</span>
			</div>
		</div>
		<div class="detail_content" v-html="detail"></div>
	</div>
</template>

<script>
export default{
	data(){
		return{
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
	}
}
</script>

<style scoped>
/*文章标题？？？单独使用标题，自己渲染*/

.container{
	overflow: hidden;
	margin: 1vh 1vw;

}
.detail_header{
	text-align: center;
	height: 9.2vh;
	margin-bottom: 3vh;
}
.detail_title{
	text-align: center;
	font-size: 18px;
	font-weight: bold;
}
.detail_meta{
	text-align: center;
	margin-top: 2vh;
	margin-bottom: 5vh;
	padding-bottom: 5vh;
}
.detail_content{
	overflow-y: scroll;
}

</style>