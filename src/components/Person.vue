<template>
	<div class="container">
		<Chead :msg="top_title"></Chead>
		<div class="background">
			<img class="person_head" src="../assets/people.png">
		</div>
		<div class="abstract">
			<div class="personal_abstract">个人简介:</div>
			<div class="personal_detail">
				<!--<span class="name">商总监</span>-->
				<span class="type">油漆工</span>
			</div>
			<div class="personal_number">13036134446</div>
		</div>
		<div class="item">
			<div class="item_left">
				<span><Icon type="soup-can" size="16px"></Icon></span>
				<span>完善个人信息</span>
			</div>
			<div class="icon">
				<span ><Icon type="chevron-right" size="16px"></Icon></span>
			</div>
		</div>
		<div class="item">
			<div class="item_left">
				<span><Icon type="card" size="16px"></Icon></span>
				<span>进行实名认证</span>
			</div>
			<div class="icon">
				<span ><Icon type="chevron-right" size="16px"></Icon></span>
			</div>
		</div>
		<div class="item">
			<div class="item_left">
				<span><Icon type="heart" size="16px"></Icon></span>
				<span>我的关注</span>
				<span>
					 <!-- <Badge count="3">
				        <a href="#" class="demo-badge"></a>
				    </Badge> -->
				    <Badge dot v-if="dot">
				        <a href="#" class="demo-badge"></a>
				    </Badge>
				</span>
			</div>
			

			<div class="icon"><span><Icon type="chevron-right" size="16px"></Icon></span></div>
		</div>
		<Menue></Menue>
	</div>
</template>
<script>
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
export default{
	data(){
		return{
			top_title: '个人中心',
			dot:true,
		}
	},
	methods:{

	},
	components: {
		Chead,
		Menue,
	}
}
</script>

<style scoped>
.container{
	background-color: rgb(239,239,239);
	height: 100vh;
}
.background{
	background: url(../assets/personBackground.jpg);
	height: 21.8vh;
	width: 100vw;
	background-repeat:no-repeat; 
	background-size: 100% 180%;
}
.person_head{
	height: 14.8vh;
	border-radius: 7.9vh;
	margin-top: 4vh;
}
.abstract{
	height: 15.8vh;
	background: rgb(134,210,198);
	margin-bottom: 2.5vh;
	color: #fff;
	padding: 0 9.8vw;
	font-size: 14px;
	text-align: left;

}
.personal_abstract,
.personal_number,
.personal_detail {
	font-weight: bold;
	line-height: 34px;
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
	/*border:solid gray 1px;*/
}
.icon{
	/*float: right;*/
	text-align: right;
	/*padding: 8.2vh;*/
}
.icon:after{
	content: '';
    display: block;
    clear: both;
}
 .demo-badge{
	height: 3.4vh;
	background: #eee;
	border-radius: 3px;
	display: inline-block;
	size: 10px;
}
</style>