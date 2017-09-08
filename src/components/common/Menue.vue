<template>
    <div class="menue">
        <div v-tap="{ methods: goHome }" :class="[ (is_owner || is_wy) ? 'menue_box_3':'menue_box_5']">
            <Icon class="icon" type="ios-home"></Icon>
            <div class="menue_txt">主页</div>
        </div>
        <div v-if="is_xmjl || is_worker" v-tap="{ methods: goWork }" :class="[ (is_owner || is_wy) ? 'menue_box_3':'menue_box_5']">
            <Icon class="icon" type="search"></Icon>
            <div class="menue_txt">找工人</div>
        </div>
        <div v-if="is_xmjl || is_worker" v-tap="{ methods: goReProject }" :class="[ (is_owner || is_wy) ? 'menue_box_3':'menue_box_5']">
            <Icon class="icon" type="social-rss"></Icon>
            <div class="menue_txt">{{ is_xmjl ? '项目发布':'接单发布' }}</div>
        </div>
        <div v-if="is_xmjl || is_worker" v-tap="{ methods: goMyProject }" :class="[ (is_owner || is_wy) ? 'menue_box_3':'menue_box_5']">
            <Icon class="icon" type="ios-folder-outline"></Icon>
            <div class="menue_txt">我的项目</div>
        </div>
        <div v-if="is_owner || is_wy" v-tap="{ methods: goVisitor }" :class="[ (is_owner || is_wy) ? 'menue_box_3':'menue_box_5']">
            <Icon class="icon" type="android-people"></Icon>
            <div class="menue_txt">访客记录</div>
        </div> 
        <div v-tap="{ methods: goPerson }" :class="[ (is_owner || is_wy) ? 'menue_box_3':'menue_box_5']">
            <Icon class="icon" type="android-person"></Icon>
            <div class="menue_txt">个人中心</div>
        </div> 
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'menue',
    data(){
        return {
            is_xmjl: false,
            is_worker: false,
            is_wy: false,
            is_owner: false
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
            this.isLogin('add_project')
        },
        goMyProject(){
            this.isLogin('my_project')
        },
        goVisitor(){
            this.isLogin('visitor')
        },
        goPerson(){
            this.isLogin('person')
        },
        isLogin(arg) {
            if(localStorage.open_id) {
                this.$router.push(arg)
                return
            } else {
                this.$router.push('login')
                return
            }
        }
    },
    created() {
        localStorage.is_xmjl == 'true' ? this.is_xmjl = true : this.is_xmjl = false
        localStorage.is_worker == 'true' ? this.is_worker = true : this.is_worker = false
        localStorage.is_wy == 'true' ? this.is_wy = true : this.is_wy = false
        localStorage.is_owner == 'true' ? this.is_owner = true : this.is_owner = false
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
