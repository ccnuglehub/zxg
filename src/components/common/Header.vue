<template>
    <div class="header">
        <div class="icon_cont">
            <Icon class="icon" type="ios-arrow-back"></Icon>
        </div>
        <div class="title">项目详情</div>
    </div>
</template>
<script>
export default {
    
  	name: 'header',
  	data () {
    	return {
            msg: '项目详情'
        }
    },
}
</script>
<style scoped>
.header {
    width: 100vw;
    font-size: 14px;
    position: relative;
}
.title {
    font-size: 18px;
    color: #101010;
    line-height: 45px;
    border-bottom: 1px solid rgb(187,187,187);
}
.icon_cont {
    position: absolute;
    top: 50%;
    left: 0;
    padding: 0 19px;
    transform: translateY(-50%);
}
.icon {
    font-size: 28px;
}
</style>