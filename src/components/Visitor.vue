<<template>
  <div v-infinite-scroll="onScroll" infinite-scroll-disabled="true" infinite-scroll-distance="22" class="item_list">
      <chead :msg="msg"></chead>
      <div class="top_menue">
		    <div v-tap="{ methods: getToday }" class="top_menue_item">
                <span class="m_txt">今天</span>
            </div>
            <div v-tap="{ methods: getWeek }" class="top_menue_item">
                <span class="m_txt">最近一周</span>
            </div>
            <div v-tap="{ methods: getMonth }" class="top_menue_item">
                <span class="m_txt">最近一个月</span>
            </div>
		</div>
            <div v-tap="{ methods: goWorkerDetail, index: index }" class="item_list_item" :key="index" v-for="(visitor,index) in visitors">
                <img class="work_photo" :src="workerAvatar(visitor.user_avatar)">
                <div class="work_info lb_item">
                    <div class="work_info_top work_info_item">
                        <div class="lb_item worker_type">{{workerType2Word(visitor.user_type)}}</div>
                        <div class="lb_item worker_name">{{visitor.user_name}}</div>
                    </div>
                    <!-- str2Num(worker.worker_average_rate) -->
                    <div class="work_info_middle work_info_item">
                    <div class="item_time m-logo">{{getTime(visitor.visitor_time)}}</div>
                        <a class="item_a m_logo" :href="tellphone(visitor.user_tel)"><div class="lb_item worker_phone">拨打电话
                    </div>
                    </a>
                    </div>
                    <div class="work_info_bottom work_info_item">
                        <div class="lb_item worker_region">{{visitor.user_address}}</div>
                    </div>
                </div>
            </div>
            <Menue></Menue>
        </div>
</template>

<<script>

import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import {HOST_CONFIG} from '@/api/config/api_config'
import {changeType2Number,changeRate2Number} from '@/util/util'
export default {
  name:"visitor",
  data(){
      return{
          msg:"访客记录",
          page_busy:false,
          get_data_flag:false,
          owner_type:"",
          limitation:"50",
          page:"0",
        //   tellphone:"",
          visitors:"",
          openid:""

      }
  },
  methods:{
        workerAvatar(url){
            // console.log(url)
            return HOST_CONFIG.imageIp+url;
        },
        workerType2Word(type){
            // console.log(typeof type)
            // 4油漆工 5泥瓦工 6水电工 7木工
            switch(type){
                case "4":
                    return "油漆工";
                case "5":
                    return "泥瓦工";
                case "6":
                    return "水电工";
                case "7":
                    return "木工";
                default : break;
            }
        },
        goWorkerDetail(){

        },
        typeSwitch(type){
            if(type.parseInt() > 3)
            return "4"
        },
        tellphone(phone){
            return "tel:"+phone;
        },
        getTime(time){
            var time = new Date(parseInt(time))
            var year = time.getFullYear();
            var month = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1)
            var date = time.getDate();
            var hours = time.getHours();
            var minites = time.getMinutes();
            return month+"/"+date+"   "+hours+":"+minites
        },
        getToday(){
            this.page = 0
            this.limitation = "1"
            this.getVisitor();
        },
        getWeek(){
            this.page = 0
            this.limitation = "7"
            this.getVisitor();
        },
        getMonth(){
            this.page = 0
            this.limitaion = "30"
            this.getVisitor();
        },
        getVisitor(){
            
            this.get_data_flag = true;
            this.$http.post(HOST_CONFIG.serverIp+'?c=visitor&f=visitor_list',
                    {
                        owner_type: this.owner_type,
                        open_id:this.openid,
                        limitation: this.limitation,
                        account:this.page,
                    },
                    {emulateJSON: true}).then((response) => {
                        if(response.status == 200){
                            if(!response.body.data[0]){
                                this.page_busy = true;
                            }else{
                                this.page_busy = false;
                            }
                            // this.visitors  = changeRate2Number(response.body.data)
                            // console.log(response.body.data)
                            if(this.page == "0"){
                                this.visitors = response.body.data
                            }else{
                                this.visitors = this.visitors.concat(response.body.data)
                            }

                        }
                        this.get_data_flag = false
                    }, (response) => {
                            // error callback 
                    })
        },
        onScroll(){
            if(!this.get_page_busy){
                if(!this.page_busy){
                    this.page ++;
                }
                this.getVisitor();
            }
            
        }

  },
  created(){
      this.openid = localStorage.getItem("openid")
      this.owner_type = localStorage.getItem("userType")
    //   alert(this.openid)
  },
  mounted(){
      this.get_data_flag = true;
      this.$http.post(HOST_CONFIG.serverIp+'?c=visitor&f=visitor_list',
                    {
                        owner_type: this.owner_type,
                        open_id: this.openid,
                        limitation: this.limitation,
                        account:this.page,
                    },
                    {emulateJSON: true}).then((response) => {
                        if(response.status == 200){
                            if(!response.body.data[0]){
                                this.page_busy = true;
                            }else{
                                this.page_busy = false;
                            }
                            // this.visitors  = changeRate2Number(response.body.data)
                            // console.log(response.body.data)
                            this.visitors = response.body.data;
                        }
                        this.get_data_flag = false
                    }, (response) => {
                            // error callback 
                    })
  },
  components: {
      Chead,Menue
  }

}
</script>
<<style scoped>
.top_menue_item {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    font-size: 0;
    width: 33%;
    border-right: 1px solid rgba(187,187,187,.6);
}
.top_menue_item:last-child {
    border: 0;
}
.top_menue {
    font-size: 0;
    height: 36px;
    border-top: 1px solid rgba(187,187,187,.6);
    border-bottom: 1px solid rgba(187,187,187,.6);
}
.m_txt,
.m_logo {
    font-size: 16px;
    line-height: 36px;
    vertical-align: middle;
    text-align:center;
}
.item_list {
     min-height: 88vh;
     background:#eee;
     padding-top: 1px;
     font-size: 0;
     padding-bottom: 60px;
}
.work_info_item{
    margin-top:6px;
}
.work_info_item:before{
    margin-top:0px;
}
.item_list_item {
    margin: 13px 13px;
    background: #fff;
    padding: 15px;
    text-align: left;
}
.work_photo {
    width: 26%;
    height: 66px;
    vertical-align: middle;
}
.work_info {
    width: 74%;
    padding-left: 10px;
    font-size: 14px;
}
.work_info_middle{

}
.item_a{
    text-decoration:none;
    display:inline-block;
    /* float:right;
     */
    position:absolute;
    right:10%;
    /* margin-left:10%; */
}
.item_time{
    display:inline-block;
}
.worker_phone{
    background:#19be6b;
    border:#19be6b;
    height:30px;
    padding:5px;
    line-height:24px;
    border-radius:6%;
    color:rgba(255,255,255,0.6);

}
.worker_type {
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
}
.worker_name {
    margin-right: 7%;
}
.worker_time{
    margin-left:7%;
}
.worker_auth {
    font-size: 12px;
    padding: 2px;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 5px;
    color: rgb(182,178,182);
}
.lb_item {
    vertical-align: middle;
    display: inline-block;
}

</style>
