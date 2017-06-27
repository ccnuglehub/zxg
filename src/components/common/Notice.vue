<template>
    <div @click="nclick" class="log_cont">
        <Icon class="bt_close" type="close-circled"></Icon>
        <div class="log_txt">{{ msg }}</div>
        <div @click="mclick" class="bt_ok">确认</div>
    </div>
</template>
<script>
export default {
    props: ['msg','mclick','nclick'],
  	name: 'notice',
  	data () {
    	return {

        }
    },
}
</script>
<style scoped>
.log_cont {
    position: absolute;
    border-radius: 8px;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    background: rgb(241,241,241);
    padding: 0 12px;
}
.log_txt {
    width: 65vw;
    padding: 4vh 0;
    font-size: 16px;
    border-bottom: 1px solid rgb(207,200,207);
}
.bt_ok {
    display: inline-block;
    width: 26.7vw;
    height: 4.5vh;
    border-radius: 8px;
    background: #08c2a5;
    line-height: 4.5vh;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    margin: 15px auto 12px;
}
.bt_close {
    position: absolute;
    top: -5%;
    right: -4%;
    width: 30px;
    height: 30px;
}
.ivu-icon-close-circled:before {
    font-size: 20px;
}
</style>