<template>
	<div class="container">
		<div class="list_container">
		<div class="itemlist">
			<div class="process" v-text='process?"进行中":"已完成"'></div>
			<div class="project_abstract">
				<span class="project_name"></span>
				<span class="project_address"></span>
			</div>
			<div class="project_meta">
				<span class="project_people"></span>
				<span class="project_time"></span>
			</div>
		</div>
	</div>
	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				process:true,
				project_name:"青青美炉石面板",
				project_address:"江岸区",
				project_people:"5",
				project_time:"2017.6.26"
			}
		},
		created(){

		},
		methods:{

		}
	}
</script>

<style scoped>
.container{
	overflow: hidden;
}
.list_container{
	height: 76vh;
	margin:0 2.5vw;
	overflow-y: scroll;

}
.itemlist{
	height: 20.3vh;
	border-radius: 3px;
	margin-top: 2.8vh;
	background:#E9F4F7;
}
.process{
	height: 4.9vh;
	color:rgb(141,212,201);
	text-align: left;
	padding-left: 4.5vw;
	/*background:#E9F4F7;*/
}
.project_abstract{
	height: 7.2vh;
	font-weight: 600;
	font-size: 14px;
	text-align: left;
	padding-left: 4.5vw;
	background: #fff;
}
.project_name{
	float: left;
}
.project_address{
	text-align: right;
	font-weight: 300;
	font-size: 10px;
	float: right;
}
.project_meta{
	background: #fff;
	font-size: 8px;
	font-weight: 300px;
	height: 4.7vh;
}
.project_people{
	text-align: left;
	float: left;
}
.project_time{
	text-align: right;
	float: right;
}

</style>