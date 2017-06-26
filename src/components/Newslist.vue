<template>

            <!-- <div  v-bind:style="test" v-bind:class="{demoCarousel:true}"></div> -->
    <Carousel autoplay >
        <Carousel-item :key="index" v-for="(item ,index) in newslist">
            <div class="demo-carousel">
                <img style="height:45vh" :src="test(item)">
            </div>
        </Carousel-item>
    </Carousel>
    

</template>
   
       
       <!--  <Carousel-item>
            <div class="demo-carousel">2</div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">3</div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">4</div>
        </Carousel-item> -->

<script>
import {API_ROUTER_CONFIG,API_ASSETS_CONFIG,HOST_CONFIG} from '@/api/config/api_config'
    export default {
        data () {
            return {
                newslist:""
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getNewslist()
            })
        },
        computed:{
            
                
        },
        methods:{
            getNewslist(){
                this.$http.post(API_ROUTER_CONFIG.newslist).then(response => {
                // get body data
                    this.newslist = response.body.data;
                    // console.log(this.newslist[0])
                 }, response => {
                     console.log("error")
                })
            },
            test:function(item){
                console.log(item.news_image)
                
                return HOST_CONFIG.serverIp+item.news_image
            }
            
        }

    }
</script>