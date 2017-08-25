<template>
    <div v-infinite-scroll="onScroll" infinite-scroll-disabled="true" infinite-scroll-distance="22" class="container">
        <Chead :msg="top_title"></Chead>      
        <div class="carousel">
            <Carousel autoplay>
            <Carousel-item v-for="(item ,index) in banner" :key="index">
                <div class="demo-carousel">
                    <img class="banner" :src="newsBanner(item)" v-tap="{ methods: toBannerDetail ,index:index}">
                </div>
            </Carousel-item>
            </Carousel>
        </div>        
        <div class="newslist">
            <div v-for="(listitem ,index) in newslist" :key="index" v-tap="{ methods: toListDetail, index: index }" class="newslist_item">
                <img class="newslist_img" :src="newsImage(listitem)"></img>
                <div class="newslist_content">
                    <div class="newslist_content_header">装修材料怎么选才好</div>
                    <div class="newslist_content_abstract">{{listitem.news_abstract}}</div>
                </div>
            </div>
        </div>
        <Menue></Menue>
    </div>
</template>

<script>
import {API_ROUTER_CONFIG,API_ASSETS_CONFIG,HOST_CONFIG} from '@/api/config/api_config'
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
export default {
    data () {
        return {
            top_title: '主页',
            banner:[],
            newslist:[],
            page: 0,
            get_data_flag: true
        }
    },
    created(){
        this.page = 0
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getNewslist();
            this.getBanner();
        })

        if(window.localStorage){
            // alert(localStorage.getItem("openid"))
            // localStorage.setItem("openid","123")
        }
    },
    methods:{
        getNewslist(){
            this.get_data_flag = false
            this.$http.post(HOST_CONFIG.serverIp+'?c=news&f=news_list',
            {
                account: this.page
            }
            ,
            {emulateJSON: true}).then((response) => {
                if(response.status == 200) {
                    this.newslist = this.newslist.concat(response.body.data)
                    this.get_data_flag = true
                }
            }, (response) => {
                    // error callback 
            })
        },
        getBanner(){
            this.$http.post(HOST_CONFIG.serverIp+'?c=news&f=banner',
            {
                project_id: ""
            }
            ,
            {emulateJSON: true}).then((response) => {
                if(response.status == 200) {
                    this.banner =response.body.data
                    // console.log(response.body.data[0],response.body.data.length)
                } else {

                }
            }, (response) => {
                    // error callback 
            })
        },
        newsBanner:function(item){
            // console.log(item.news_image)
            
            return HOST_CONFIG.imageIp+"/"+item.news_image
        },
        newsImage(item){
            return HOST_CONFIG.imageIp+"/"+item.news_image
        },
        toListDetail(obj){
            var index = obj.index
            this.$router.push({name:"newsDetail",params:{
                title:this.newslist[index].news_title
                ,detail:this.newslist[index].news_content
                ,auther:this.newslist[index].news_create_person
                ,time:this.newslist[index].news_create_time
            }})
        },
        toBannerDetail(obj){
            var index = obj.index
            this.$router.push({name:"newsDetail",params:{
                title:this.banner[index].news_title
                ,detail:this.banner[index].news_content
                ,auther:this.banner[index].news_create_person
                ,time:this.banner[index].news_create_time

            }})

        },
        onScroll(){
            if(this.get_data_flag) {
                this.page++
                this.getNewslist()
            }
        }
    },
    components: {
        Chead,
        Menue,
    }
}
</script>
<style scoped>
::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
}
.container{
    background: rgb(236,236,236);
    min-height: 110vh;
}
.carousel{
    position: relative;
    margin-bottom: 10px;
}
.banner{
    height: 32vh;
    width: 100%;
}
.newslist{
    position: relative;
    width: 100vw;
    height: auto;
    overflow-y: scroll;
    background: #fff;
    margin-bottom: 60px;
}
.newslist::-webkit-scrollbar {
    display: none;
}
.newslist_item {
    font-size: 0;
    border-bottom:1px solid rgb(221,221,221);
    height: 15.2vh;
    padding:0.7vh 2.8vw;
}
.newslist_img{
    height: 12.1vh;
    width: 26.8%;
    display: inline-block;
    vertical-align: middle;
}
.newslist_content{
    display: inline-block;
    vertical-align: middle;
    width: 73.2%;
}
.newslist_content_header{
    font-weight: 600;
    text-align: left;
    font-size: 16px;
    margin-left: 2.5vw;
    margin-bottom: 1vh;
}
.newslist_content_abstract{
    font-weight: normal;
    text-align: left;
    font-size: 14px;
    line-height: 18px;
    height: 56px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-left: 2.5vw;
}
</style>