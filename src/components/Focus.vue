<template>
    <div class="wrap">
        <Chead :msg="top_title" :icon="true"></Chead>
        <div class="focus">
            <div class="item_list">
                <div class="type item">油漆工</div>
                <div class="name item">李东波</div>
                <div class="free_time item">5月5日后可接单</div>
            </div>
        </div>
    </div>
</template>

<script>
import Chead from './common/Header.vue'
export default {
    data(){
        return {
            top_title: '我的关注'
        }
    },
    created(){
        // this.$http.post('url', data,
        //     {emulateJSON: true}).then((response) => {
                
        //     }, (response) => {
        //             // error callback 
        // })
    },
    components: {
        Chead,
    }
}
</script>

<style scoped>
.wrap {
    width: 100%;
    height: 100%;
}
.focus {
    height: 100vh;
    width: 100vw;
    font-size: 0;
    text-align: left;
    padding-left: 16vw;
    background-image:
    linear-gradient(rgb(221,221,221) 1px, transparent 0); 
    background-size: 55px 55px;
}
.type {
    color: rgb(8, 194, 165);
}
.item {
    font-size: 18px;
    display: inline-block;
    vertical-align: middle;
}
.name,
.free_time {
    color: #101010;
}
.type {
    width: 65px;
}
.name {
    width: 80px;
}
.item_list {
    line-height: 55px;
}
</style>
