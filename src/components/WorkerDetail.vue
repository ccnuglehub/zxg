<template>
	<div class="worker_detail">
        <div class="item_list_item">
            <img class="work_photo" src="../assets/people.png">
            <div class="work_info lb_item">
                <div class="work_info_top">
                    <div class="lb_item worker_type">油漆工</div>
                    <div class="lb_item worker_name">王凯</div>
                </div>
                <Rate allow-half v-model="valueHalf"></Rate>
                <div class="work_info_bottom">
                    <div class="lb_item worker_auth">已实名认证</div>
                    <div class="lb_item">已接单：149</div>
                </div>
            </div>
        </div>
        <div class="worker_info">jlkjjj</div>
	</div>
</template>

<script>
export default {
  	name: 'worker_detail',
  	data () {
    	return {
      		valueHalf: 4
		}
  	},
	methods: {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.worker_detail {
     height: 100vh;
     background:#eee;
     padding-top: 1px;
     font-size: 0;
}
.item_list_item {
    padding: 13px 14px;
    background: #fff;
    text-align: left;
    background: rgb(70,90,101);
}
.work_photo {
    width: 26%;
    vertical-align: middle;
}
.work_info {
    width: 74%;
    padding-left: 16px;
    font-size: 14px;
}
.worker_type {
    font-size: 17px;
    margin-right: 22px;
}
.worker_name {
    font-size: 16px;
}
.worker_name,
.worker_type {
    color: #fff;
    font-weight: 500;
}
.lb_item {
    vertical-align: middle;
    display: inline-block;
}
.worker_auth {
    margin-right: 28px;
}
.work_info_bottom {
    color: rgb(255,152,0);
}
.worker_info {ß
    padding: 2.3vh 9vw;
    font-size: 16px;
    text-align: left;
}
</style>

