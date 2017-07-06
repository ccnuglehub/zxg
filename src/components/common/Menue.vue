<template>
    <div class="menue">
        <div v-tap="{ methods: goHome }" class="menue_box_5">
            <Icon class="icon" type="ios-home"></Icon>
            <div class="menue_txt">主页</div>
        </div>
        <div v-tap="{ methods: goWork }" class="menue_box_5">
            <Icon class="icon" type="search"></Icon>
            <div class="menue_txt">找工人</div>
        </div>
        <div v-tap="{ methods: goReProject }" class="menue_box_5">
            <Icon class="icon" type="social-rss"></Icon>
            <div class="menue_txt">项目发布</div>
        </div>
        <div v-tap="{ methods: goMyProject }" class="menue_box_5">
            <Icon class="icon" type="ios-folder-outline"></Icon>
            <div class="menue_txt">我的项目</div>
        </div>
        <div v-tap="{ methods: goPerson }" class="menue_box_5">
            <Icon class="icon" type="android-person"></Icon>
            <div class="menue_txt">个人中心</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menue',
    data(){
        return {

        }
    },
    methods: {
        goHome(){
            this.$router.push('home')
        },
        goWork(){
            this.$router.push('find_worker')
        },
        goReProject(){
            this.$router.push('add_project')
        },
        goMyProject(){
            this.$router.push('my_project')
        },
        goPerson(){
            this.$router.push('person')
        }
    }
}
</script>

<style scoped>
.menue {
    width: 100vw;
    height: 50px;
    padding-top: 5px;
    background: #fff;
    font-size: 0;
    position: fixed;
    bottom: 0;
    border-top:1px solid rgb(221,221,221);
}
.menue_box_3 {
    width: 33.3vw;
    display: inline-block;
}
.menue_box_4 {
    width: 25vw;
    display: inline-block;
}
.menue_box_5 {
    width: 20vw;
    display: inline-block;
}
.icon {
    font-size: 24px;
}
.menue_txt {
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #2c3e50;
}
</style>
