<template>
    <div v-tap="{ methods: nclick }" class="log_cont">
        <Icon class="bt_close" type="close-circled"></Icon>
        <div class="log_txt">{{ msg }}</div>
        <div v-tap="{ methods: mclick }" class="bt_ok">{{ btmsg ? btmsg : '确认'}}</div>
    </div>
</template>
<script>
export default {
    props: ['msg','mclick','nclick', 'btmsg'],
  	name: 'notice',
  	data () {
    	return {

        }
    },
}
</script>
<style scoped>
.log_cont {
    position: fixed;
    border-radius: 8px;
    top: 36%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(241,241,241);
    padding: 0 12px;
    z-index: 100;
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