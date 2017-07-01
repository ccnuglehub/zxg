<template>
	<div class="worker_detail">
        <Chead :msg="top_title" :icon="true"></Chead>
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
        <div class="worker_info">
            <div class="worker_info_item">
                地址：
            </div>
            <div class="worker_info_item">
                电话：
            </div>
            <div class="worker_info_item">
                个人简介：
            </div>
        </div>
        <div class="evaluate_list">
            <h1 class="evaluate_title">客户评价</h1>
            <div class="evaluate_item">
                <div class="evaluate_cont">设置属性 autoplay 可以自动轮播，同时可以设置属性 autoplay-speed 改变自动播放的速度.</div>
                <div class="evaluate_etc">
                    <div class="evaluate_etc_top">
                        <div class="evaluate_from fsz">项目经理：唐*路</div>
                        <div class="evaluate_score fsz">评分：5</div>
                    </div>
                    <div class="evaluate_etc_bottom">
                        <div class="evaluate_xm fsz">项目名称：青青美炉装饰面板，轻质隔墙装修</div>
                        <div class="evaluate_time fsz">2017.3.25 15:30</div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
export default {
  	name: 'worker_detail',
  	data () {
    	return {
            top_title: '工人详情',
      		valueHalf: 4
		}
  	},
    components: {
        Chead,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.worker_detail {
     height: 100vh;
     background:#fff;
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
.worker_info {

    padding: 2.3vh 9vw;
    font-size: 16px;
    text-align: left;
    background: #fff;
    line-height: 30px;
    border-bottom: 12px solid #eee;
}
.evaluate_list {
    background: #fff;
    text-align: left;
}
.evaluate_title {
    font-size: 18px;
    color: rgb(134,210,198);
    line-height: 34px;
    padding: 0 12px;
}
.evaluate_item {
    background: rgb(248,248,248);
    padding: 15px 1vw 5px 3vw;
}
.evaluate_cont {
    font-size: 14px;
}
.evaluate_etc {
    margin-top: 6px;
}
.fsz {
    font-size: 12px;
    display: inline-block;
    vertical-align: middle;
    line-height: 18px;
    color: rgb(126,126,126);
}
.evaluate_from {
    width: 130px;
}
.evaluate_xm {
    width: 70vw;
}
.evaluate_time {
    width: 26vw;
    text-align: right;
}
.evaluate_etc_bottom {
    font-size: 0;
}
</style>

