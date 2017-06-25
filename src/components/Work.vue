<template>
	<div class="work">
		<div class="top_menue">
		    <div class="top_menue_item">
            </div>
            <div class="top_menue_item">
            </div>
            <div class="top_menue_item">
            </div>
            <div class="top_menue_item">
            </div>
		</div>
        <div class="item_list">
            <div class="item_list_item">
                <img class="work_photo" src="../assets/people.png">
                <div class="work_info lb_item">
                    <div class="work_info_top">
                        <div class="lb_item worker_type">油漆工</div>
                        <div class="lb_item worker_name">王凯</div>
                        <div class="lb_item worker_auth authed">已实名认证</div>
                    </div>
                    <Rate allow-half v-model="valueHalf"></Rate>
                    <div class="work_info_bottom">
                        <div class="lb_item worker_region">江汉区</div>
                        <div class="lb_item">已接单：149</div>
                    </div>
                </div>
            </div>
            <div class="item_list_item">
                <img class="work_photo" src="../assets/people.png">
                <div class="work_info lb_item">
                    <div class="work_info_top">
                        <div class="lb_item worker_type">油漆工</div>
                        <div class="lb_item worker_name">王凯</div>
                        <div class="lb_item worker_auth authed">已实名认证</div>
                    </div>
                    <Rate allow-half v-model="valueHalf"></Rate>
                    <div class="work_info_bottom">
                        <div class="lb_item worker_region">江汉区</div>
                        <div class="lb_item">已接单：149</div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  	name: 'work',
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
.top_menue_item {
    display: inline-block;
    background: red;
    height: 100%;
    width: 25%;
}
.top_menue {
    font-size: 0;
    height: 36px;
}
.item_list {
     height: 100vh;
     background:#eee;
     padding-top: 1px;
     font-size: 0;
}
.item_list_item {
    margin: 13px 13px;
    background: #fff;
    padding: 15px;
    text-align: left;
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
    font-size: 16px;
    font-weight: 500;
    margin-right: 22px;
}
.worker_name {
    margin-right: 13%;
}
.worker_auth {
    font-size: 12px;
    padding: 2px 6px;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 5px;
    color: rgb(182,178,182);
}
.lb_item {
    vertical-align: middle;
    display: inline-block;
}
.worker_region {
    margin-right: 28px;
}
.authed {
    color: rgb(255,152,0);
}
</style>