<template>
    <div class="header">
        <div v-if="icon" v-tap="{ methods: back }" class="icon_cont">
            <Icon class="icon" type="ios-arrow-back"></Icon>
        </div>
        <div class="title">{{ msg }}</div>
    </div>
</template>
<script>
export default {
    props:['msg','icon'],
  	name: 'header',
    methods: {
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.header {
    width: 100vw;
    font-size: 14px;
    position: relative;
    background: rgb(247,247,247);
}
.title {
    font-size: 18px;
    color: #101010;
    line-height: 45px;
}
.icon_cont {
    position: absolute;
    top: 50%;
    left: 0;
    padding: 0 19px;
    transform: translateY(-50%);
}
.icon {
    font-size: 24px;
}
</style>