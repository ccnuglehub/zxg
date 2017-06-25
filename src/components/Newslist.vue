<template>

<div class="container">
                
    <div class="carousel">
        <Carousel autoplay>
        <Carousel-item :key="banner" v-for="(item ,index) in banner" >
            <div class="demo-carousel">
                <img class="banner" :src="newsBanner(item)" @click.stop="toBannerDetail(index)">
            </div>
        </Carousel-item>
        </Carousel>
    </div>        
    <div class="newslist">
    <div :key="newslist" v-for="(listitem ,index) in newslist" @click.stop="toListDetail(index)">
        <div class="newslist_item">
            <img class="newslist_img" :src="newsImage(listitem)"></img>
            <div class="newslist_content">
                <div class="newslist_content_header">{{listitem.news_title}}</div>
                <div class="newslist_content_abstract">{{listitem.news_abstract}}</div>
            </div>
        </div>
    </div>
    </div>
   
</div>
</template>


            <!-- <div  v-bind:style="test" v-bind:class="{demoCarousel:true}"></div> -->
    <Carousel autoplay >
        <Carousel-item v-for="(item ,index) in newslist">
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
                banner:"",
                newslist:"",
                newslist:""
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getNewslist();
                this.getBanner();
            })
        },
        computed:{
            
                
        },
        methods:{
            getNewslist(){
                this.$http.post(API_ROUTER_CONFIG.newslist).then(response => {
                // get body data
                    this.newslist = response.body.data;
                    console.log(this.newslist)
                 }, response => {
                     console.log("newslist error")
                })
            },
            getBanner(){
                this.$http.post(API_ROUTER_CONFIG.banner).then(response =>{
                    this.banner = response.body.data;
                },response =>{
                    console.log("banner error")
                })
            },
            newsBanner:function(item){
                // console.log(item.news_image)
                
                return HOST_CONFIG.serverIp+item.news_image
            },
            newsImage(item){
                return HOST_CONFIG.serverIp+item.news_image
            },
            toListDetail(index){
                this.$router.push({name:"newsDetail",params:{data:this.newslist[index],detail:"<p>大漠鸣金鼓，空中鏖战急。<strong class='kw'><a href='http://military.china.com/baike_56m65Yab.html' target='_blank'>空军</a></strong>对抗空战竞赛考核已进入白热化阶段，北部战区空军航空兵某旅飞行一大队大队长聂健男和副大队长吴其君正组成双机编队，飞向对抗空域。</p><p>这是一场关键的“天王山之战”，对手实力很强，已经在比分上占据了优势，这一仗不容有失。聂健男和吴其君本轮担任防守方，他们通过无线电频繁交流，等待对手的进攻。</p><p>对抗开始！对手双机编队向任务区扑来，聂健男和吴其君立刻按照基定战术迎战，一时间双方互有攻防，难解难分。空战态势瞬息万变，突然间，二人被对手形成“咬尾”之势，情况十分危急。关键时刻，聂健男驾驶长机假意寻求摆脱，实为诱敌深入，准备配合吴其君将对手“击落”。对手果然中计。正当吴其君利用机载雷达从侧向锁定对手之时，突然机舱内持续告警，原来，另一名对手已经提前向他发射了导弹。千钧一发之际，只见吴其君拉出近7个G的过载，驾驶战机快速置尾，闪转腾挪般躲避掉袭来的导弹，并果断扣下扳机，将导弹射向“来犯之敌”……赛后评估视频显示，正是这一枪的命中，奠定了获胜的基础。</p><p class='pcenter'><img src='http://img0.utuku.china.com/650x0/mili/20170625/058b1f12-89d8-498b-8dc8-1596b9e8a1f1.jpg' alt='北部战区装备的歼-11战机'></p><p class='news_img_title' style='text-align: center;'><cite>北部战区装备的歼-10B战机</cite></p><p>此后，二人越战越勇，一路过关斩将，在全部参赛飞行员中唯一五战全胜，并取得了考核全部20个战果中的18个，还两次打出“64:0”的压倒性比分，最终毫无悬念地夺得“金头盔”，助力该旅问鼎“天鹰杯”。</p><p>从名不见经传到一战天下知，大队长聂健男和副大队长吴其君的夺冠经历并不是一夜成名的童话，而是整个大队一步一个脚印、一年一个台阶奋斗历程的缩影。</p><p> </p></div>"}})
            },
            toBannerDetail(index){
                this.$router.push({name:"newsDetail",params:{data:this.banner[index],detail:"<p>大漠鸣金鼓，空中鏖战急。<strong class='kw'><a href='http://military.china.com/baike_56m65Yab.html' target='_blank'>空军</a></strong>对抗空战竞赛考核已进入白热化阶段，北部战区空军航空兵某旅飞行一大队大队长聂健男和副大队长吴其君正组成双机编队，飞向对抗空域。</p><p>这是一场关键的“天王山之战”，对手实力很强，已经在比分上占据了优势，这一仗不容有失。聂健男和吴其君本轮担任防守方，他们通过无线电频繁交流，等待对手的进攻。</p><p>对抗开始！对手双机编队向任务区扑来，聂健男和吴其君立刻按照基定战术迎战，一时间双方互有攻防，难解难分。空战态势瞬息万变，突然间，二人被对手形成“咬尾”之势，情况十分危急。关键时刻，聂健男驾驶长机假意寻求摆脱，实为诱敌深入，准备配合吴其君将对手“击落”。对手果然中计。正当吴其君利用机载雷达从侧向锁定对手之时，突然机舱内持续告警，原来，另一名对手已经提前向他发射了导弹。千钧一发之际，只见吴其君拉出近7个G的过载，驾驶战机快速置尾，闪转腾挪般躲避掉袭来的导弹，并果断扣下扳机，将导弹射向“来犯之敌”……赛后评估视频显示，正是这一枪的命中，奠定了获胜的基础。</p><p class='pcenter'><img src='http://img0.utuku.china.com/650x0/mili/20170625/058b1f12-89d8-498b-8dc8-1596b9e8a1f1.jpg' alt='北部战区装备的歼-11战机'></p><p class='news_img_title' style='text-align: center;'><cite>北部战区装备的歼-10B战机</cite></p><p>此后，二人越战越勇，一路过关斩将，在全部参赛飞行员中唯一五战全胜，并取得了考核全部20个战果中的18个，还两次打出“64:0”的压倒性比分，最终毫无悬念地夺得“金头盔”，助力该旅问鼎“天鹰杯”。</p><p>从名不见经传到一战天下知，大队长聂健男和副大队长吴其君的夺冠经历并不是一夜成名的童话，而是整个大队一步一个脚印、一年一个台阶奋斗历程的缩影。</p><p> </p></div>"}})
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
<style scoped>
::-webkit-scrollbar {/*隐藏滚轮*/
display: none;
}
.container{
    overflow: hidden;
}
.carousel{
    position: relative;
}
.banner{
    height: 32vh;

}
.newslist{
    /*border:solid gray .5px;*/
    /*top: 32vh;*/
    position: relative;
    width: 100vw;
    height: auto;
    height: 65vh;
    overflow-y: scroll;
}
.newslist::-webkit-scrollbar {
    display: none;
}
.newslist_item{
    border-top:gray 1px solid;
    height: 15.2vh;
    padding:0.7vh 2.8vw;
}
.newslist_img{
    height: 12.1vh;
    width: 25vw;
    float: left;
    position: relative;

}
.newslist_content{
    float: left;
    height: 12.5vh;
    width: 68vw;
}
.newslist_content_header{
    font-weight: 600;
    text-align: left;
    font-size: 14px;
    margin-left: 2vw;
}
.newslist_content_abstract{
    font-weight: normal;
    text-align: left;
    font-size: 10px;
    overflow: hidden;
    height: 15.5vh;
    margin-left: 2vw;
}
</style>

