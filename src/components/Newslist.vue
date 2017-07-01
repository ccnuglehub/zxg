<template>
    <div class="container">
        <Chead :msg="top_title"></Chead>      
        <div class="carousel">
            <Carousel autoplay>
            <Carousel-item :key="index" v-for="(item ,index) in banner" >
                <div class="demo-carousel">
                    <img class="banner" :src="newsBanner(item)" @click.stop="toBannerDetail(index)">
                </div>
            </Carousel-item>
            </Carousel>
        </div>        
        <div class="newslist">
            <div :key="index" v-for="(listitem ,index) in newslist" @click.stop="toListDetail(index)" class="newslist_item">
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
                banner:"",
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
    overflow: hidden;
    background: rgb(236,236,236);
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
    height: 65vh;
    overflow-y: scroll;
    background: #fff;
    margin-bottom: 30px;
}
.newslist::-webkit-scrollbar {
    display: none;
}
.newslist_item {
    font-size: 0;
    border-top:1px solid rgb(221,221,221);
    height: 15.2vh;
    padding:0.7vh 2.8vw;
}
.newslist_item:first-child {
    border-top: 0;
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
    font-size: 14px;
    margin-left: 2.5vw;
    margin-bottom: 1vh;
}
.newslist_content_abstract{
    font-weight: normal;
    text-align: left;
    font-size: 12px;
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