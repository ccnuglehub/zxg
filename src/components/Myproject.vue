<template>
	<div class="container">
		<div class="list_container">
		<div class="itemlist">
			<div class="process" v-text='process?"进行中":"已完成"' :style="getStyle(process)"></div>
			<div class="project_abstract">
				<span class="project_name">{{project_name}}</span>
				<span class="project_address">{{project_address}}</span>
			</div>
			<div class="project_meta">
				<span class="project_people">{{project_people}}</span>
				<span class="project_time">{{project_time}}</span>
			</div>
		</div>
	</div>
	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				process:false,
				project_name:"青青美炉石面板",
				project_address:"江岸区",
				project_people:"5",
				project_time:"2017.6.26"
			}
		},
		created(){

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
			}
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
	border-radius: 7px;
	margin-top: 2.8vh;
	background:#E9F4F7;
}
.process{
	height: 4.9vh;
	color:rgb(141,212,201);
	text-align: left;
	padding-left: 4.5vw;
	padding-top: 1vh;
	/*background:#E9F4F7;*/
}
.project_abstract{
	height: 7.2vh;
	font-weight: 600;
	font-size: 14px;
	text-align: left;
	padding-left: 4.5vw;
	padding-top: 2vh;
	background: #efefee;
}
.project_name{
	float: left;
}
.project_address{
	text-align: right;
	font-weight: 300;
	font-size: 12px;
	float: right;
	padding-right: 4.5vw;
}
.project_meta{
	background: #efefee;
	font-size: 12px;
	font-weight: 300px;
	height: 4.7vh;
}
.project_people{
	text-align: left;
	float: left;
	padding-left: 4.5vw;
}
.project_time{
	text-align: right;
	float: right;
	padding-right: 4.5vw;
}

</style>