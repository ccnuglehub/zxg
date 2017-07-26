<template>
    <div class="header">
        <div v-if="icon" v-tap="{ methods: back }" class="icon_cont">
            <Icon class="icon" type="ios-arrow-back"></Icon>
        </div>
        <div class="title">{{ msg }}</div>
        <img v-if="versions.is_worker && qr" class="qr_logo" src="../../assets/qr_code.png">
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props:['msg','icon','qr'],
    name: 'header',
    computed: {
		...mapState([
			'versions'
		])
	},
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
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
.qr_logo {
    width: 24px;
    position: absolute;
    top: 50%;
    right: 3.2vw;
    transform: translateY(-50%);
}
</style>