<template>
    <div class="menue">
        <div v-if="homePage" v-tap="{ methods: goHome }" :class="visitor?menue_box_3:menue_box_5">
            <Icon class="icon" type="ios-home"></Icon>
            <div class="menue_txt">主页</div>
        </div>
        <div v-if="findWorker" v-tap="{ methods: goWork }" :class="visitor?menue_box_3:menue_box_5">
            <Icon class="icon" type="search"></Icon>
            <div class="menue_txt">找工人</div>
        </div>
         <div v-if="visitor" v-tap="{ methods: goVisitor }" :class="visitor?menue_box_3:menue_box_5">
            <Icon class="icon" type="search"></Icon>
            <div class="menue_txt">访客记录</div>
        </div>
        <div v-if="publishProject" v-tap="{ methods: goReProject }" :class="visitor?menue_box_3:menue_box_5">
            <Icon class="icon" type="social-rss"></Icon>
            <div class="menue_txt">项目发布</div>
        </div>
        <div v-if="publishWork" v-tap="{ methods: goPublishWork }" :class="visitor?menue_box_3:menue_box_5">
            <Icon class="icon" type="social-rss"></Icon>
            <div class="menue_txt">接单发布</div>
        </div>
        <div v-if="project" v-tap="{ methods: goMyProject }" :class="visitor?menue_box_3:menue_box_5">
            <Icon class="icon" type="ios-folder-outline"></Icon>
            <div class="menue_txt">我的项目</div>
        </div>
        <div v-if="personal" v-tap="{ methods: goPerson }" :class="visitor?menue_box_3:menue_box_5">
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
            homePage:true,
            findWorker:true,
            publishProject:true,
            publishWork:false,
            project:true,
            personal:true,
            visitor:false,
            menue_box_3:"menue_box_3",
            menue_box_5:"menue_box_5",
        }
    },
    created(){
            // console.log(this.$store.state.userType)
            // console.log(localStorage.getItem("userType"))
            var userType = localStorage.getItem("userType")
            switch(userType){
                case "1"://项目经理
                    break;
                case "2"://物业
                    this.findWorker = false,this.visitor = true,this.publishProject = false,this.project = false;
                    break;
                case "3"://业主
                    this.findWorker = false,this.visitor = true,this.publishProject = false,this.project = false;
                    break;
                case "4"://工人
                    this.publishProject = false,this.publishWork = true;
                    break;

            }

    },
    methods: {
        goHome(){
            this.goRouter("home")
        },
        goWork(){
            this.goRouter("find_worker")
        },
        goVisitor(){
            this.goRouter("visitor")
        },
        goReProject(){
            this.goRouter("add_project")
        },
        goMyProject(){
            this.goRouter("my_project")
        },
        goPublishWork(){
            this.goRouter("publish_work")
        },
        goPerson(){
            this.goRouter("person")
        },
        //judge weather has the localStorage item openid
        goRouter(router){
            if(localStorage.getItem("openid")){
                this.$router.push(router)
            }else{
                this.$router.push("login")
            }
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
