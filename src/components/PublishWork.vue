<template>
   <div class="wrap">
        <Chead :msg="top_title"></Chead>
        <div class="add_work">
            <div class="edit_cont">
                <div class="edit_box">
                    <span class="edit_box_buttom" v-tap="{methods: openTimePicker}">{{time_value}}</span>                    
                    <span class="edit_box_top" >{{show_text}}</span>
                </div>
            </div>
            <div v-tap="{ methods: open }" class="bt_box">{{button_text}}</div>
            <div v-tap="{ methods: closeTimePicker }" v-if="time_wrap_flag" class="picker_wrap">
                <transition name="slide-fade">
                    <mt-picker v-if="time_flag" class="b_picker" :slots="time_slots" @change="onTimeValueChange"></mt-picker>
                </transition>
            </div>
            <CNotice v-if="cnotice_flag" :nclick="closeD" :mclick="postWork" :msg="sure_msg"></CNotice>

        </div>
        <Menue></Menue>
        
   </div>
</template>

<script>
import CNotice from './common/Notice.vue'
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import {HOST_CONFIG} from '@/api/config/api_config'
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
        top_title:"接单发布",
        time_value:"",
        show_text:"请选择接单时间",
        button_text:"选择",
        status:"choose",
        time_flag:false,
        time_wrap_flag:false,
        cnotice_flag:false,
        sure_msg:"确认发布",
        openid:localStorage.getItem("openid"),
        state_publish_work:"",
        time_slots:[
                    {
                        flex: 1,
                        values: ['1天后', '2天后', '3天后', '4天后','5天后','6天后','7天后','8天后'],
                        className: 'time_slots',
                        textAlign: 'center',
                        visibleItemCount: 4,
                    }
                ],
        };
    },
   methods: {
    open() {
        switch(this.status){
            case "choose":
                this.time_wrap_flag = true;
                this.time_flag = true;
                break;
            case "submit":
                this.showNotice();
                break;
            case "finish":
                Toast({
                    message: '已经发布完成',
                    position: 'top',
                    duration: 2000
                });
                break;
            default :
                break;
        }
      },
    showNotice(){
        this.cnotice_flag = true;
    },
    closeD(){
        this.cnotice_flag = false;
    },
    closeTimePicker(){
        this.time_flag = false;
        this.time_wrap_flag =false;
        //改变text显示
        this.status = "submit";
        this.show_text = "可接单"
        this.button_text = "提交";
        this.tranformObj();
    },
    onTimeValueChange(picker,value){
        this.time_value = picker.getValues().join("")
    },
    openTimePicker(){
            this.time_wrap_flag = true
            this.time_flag = true
            // console.log(new Date() - new Date())
    },
    postWork(){
        this.closeD()
        this.show_text = "接单 发布成功"
        this.button_text = "完成"
        this.status = "finish"

        this.tranformObj();
        this.$http.post(HOST_CONFIG.serverIp + '?c=worker&f=accept_time',
            {
                open_id:this.openid,
                worler_accept_time: this.timeValue2time(this.time_value)
            },
            {emulateJSON: true}).then((response) => {
                if(response.body.status == 1) {
                    this.cnotice_flag = false
                    // console.log(response.body.data)
                }
            }, (response) => {
                      // error callback 
            })
    },
    tranformObj(){
        var obj = {}
        obj.show_text = this.show_text;
        obj.button_text =  this.button_text;
        obj.starttime = new Date();
        var match ="";
        obj.endtime =  this.time_value && (match = /(\d+)/.exec(this.time_value)) ? parseInt(match[1], 10)+ new Date().getDay() : 0;
        obj.status = this.status;
        this.$store.state.publish_work = obj;
        localStorage.setItem("timeline",[obj.show_text,obj.button_text,obj.starttime,obj.endtime,obj.status])
        // console.log(this.$store.state.publish_work)
    },
    timeValue2time(time_value){
        var match = "";
        return time_value && (match = /(\d+)/.exec(time_value)) ? parseInt(match[1], 10): 0;
    }
  },
  created(){
    if(!this.$store.state.publish_work.button_text){
        // alert(1)
        this.$store.state.publish_work = (function(){
            var str = localStorage.getItem("timeline")
            var item = str.split(",")
            // console.log(item)
            return {
                show_text:item[0],
                button_text:item[1],
                starttime:item[2],
                endtime:item[3],
                status:item[4]
            }
        })()
    }
    this.state_publish_work = this.$store.state.publish_work
            // console.log(this.state_publish_work)
    
    if(this.state_publish_work.button_text){
        this.time_value = this.state_publish_work.endtime - new Date((new Date()-new Date(this.state_publish_work.starttime))).getDay()
            if(this.time_value <= 0){
                this.time_value = 0
            }
            this.time_value += "天后"
            this.show_text = this.state_publish_work.show_text
            this.button_text = this.state_publish_work.button_text
            this.status = this.state_publish_work.status
    } 
  },
  components:{
      CNotice,Chead,Menue
  }
}
</script>
<style scoped>
.wrap {
    width: 100%;
    min-height: 100%;
}
.add_work{
    margin:10px 5px;
    
}
.edit_cont{
    margin-top: 10vh;
    border: solid rgba(143,143,143,0.6) 1px;
    border-radius: 5px;
    height: 30vh;
}
.edit_box_top {
    font-size: 24px;
    line-height: 32px;
    display: inline-block;
    margin:10vh 0 0 0;
}
.edit_box_buttom{
    font-size: 24px;
    line-height: 32px;
    color:coral;
    display: inline-block;
    margin:10vh 0 0 0;
}
.bt_box {
    width: 21vw;
    height: 21vw;
    border-radius: 50%;
    font-size: 19px;
    line-height: 70px;
    /* margin: 2vh auto; */
    background: rgb(8,194,165);
    color: #fff;
    font-weight: 800;
    box-shadow: 0px 0px 20px rgb(8,194,165);
    position: absolute;
    bottom:15vh;
    right:39vw;

}
.b_picker {
    position: absolute;
    width: 100vw;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
}
.picker_wrap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,.4);
}
.slide-fade-enter-active {
    animation: up .3s;
}
.slide-fade-enter, .slide-fade-leave-active {
    animation: down .8s;
}
@keyframes down {
    from {
        bottom: 0;
    }
    to {
        bottom: -100%;
    }
}
@keyframes up {
    from {
        bottom: -100%;
    }
    to {
        bottom: 0;
    }
}
</style>
