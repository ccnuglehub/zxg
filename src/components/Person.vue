<template>
	<div class="container">
		<Chead :msg="top_title"></Chead>
		<div class="background">
			<img class="person_head" src="../assets/people.png">
		</div>
		<div class="abstract">
			<div class="personal_abstract">个人简介:
				<span class="description txt_ell">{{ person_data.worker_description }}</span>
			</div>
			<div class="personal_detail">
				<!--<span class="name">商总监</span>-->
				<span class="type">油漆工</span>
			</div>
			<div class="personal_number">13036134446</div>
		</div>
		<div v-tap="{ methods: goInfo }" class="item">
			<div class="item_left">
				<Icon class="vertical_item" type="soup-can" size="16"></Icon>
				<span class="vertical_item">完善个人信息</span>
			</div>
			<div class="icon">
				<Icon type="chevron-right" size="16"></Icon>
			</div>
		</div>
		<div v-tap="{ methods: goIdent }" class="item">
			<div class="item_left">
				<Icon type="card" class="vertical_item" size="16"></Icon>
				<span class="vertical_item">进行实名认证</span>
			</div>
			<div class="icon">
				<Icon type="chevron-right" size="16"></Icon>
			</div>
		</div>
		<div v-tap="{ methods: goFocus }" class="item">
			<div class="item_left">
				<Icon class="vertical_item" type="heart" size="16"></Icon>
				<span class="vertical_item">我的关注</span>
				<!-- <Badge count="3">
					<a href="#" class="demo-badge"></a>
				</Badge> -->
				<Badge dot v-if="dot">
					<a href="#" class="demo-badge"></a>
				</Badge>
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
import { mapState } from 'vuex'
// import { mapState, mapActions, mapGetters } from 'vuex'
export default{
	data(){
		return{
			top_title: '个人中心',
			dot:true,
			person_data: {}
		}
	},
	computed: {
		...mapState([
			'xmjl_info',
		])
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
	},
	created(){
		if(this.xmjl_info) {
			this.person_data.worker_description = this.xmjl_info.worker_description
		}
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
	/*float: right;*/
	text-align: right;
	vertical-align: middle;
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
.description {
	padding-left: 2px;
	font-weight: normal;
	font-size: 13px;
}
</style>