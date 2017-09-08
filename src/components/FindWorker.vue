<template>
	<div class="work" v-infinite-scroll="onScroll" infinite-scroll-disabled="true" infinite-scroll-distance="22">
        <Chead :msg="top_title"></Chead>
		<div class="top_menue">
		    <div v-tap="{ methods: openLocaPicker }" class="top_menue_item">
                <Icon class="m_logo" type="ios-location"></Icon>
                <span class="m_txt">全部地区</span>
            </div>
            <div v-tap="{ methods: openTypePicker }" class="top_menue_item">
                <Icon class="m_logo" type="person"></Icon>
                <span class="m_txt">工友类别</span>
            </div>
            <div v-tap="{ methods: callSlotByRate }" class="top_menue_item">
                <Icon class="m_logo" type="shuffle"></Icon>
                <span class="m_txt">智能排序</span>
            </div>
            <div v-tap="{ methods: openTimePicker }" class="top_menue_item">
                <Icon class="m_logo" type="ios-clock"></Icon>
                <span class="m_txt">可接单时间</span>
            </div>
		</div>
        <div class="item_list">
            <div v-tap="{ methods: goWorkerDetail, worker: worker }" class="item_list_item" :key="index" v-for="(worker ,index) in workers">
                <img class="work_photo" :src="workerAvatar(worker.user_avatar)">
                <div class="work_info lb_item">
                    <div class="work_info_top">
                        <div class="lb_item worker_type">{{workerType2Word(worker.user_type)}}</div>
                        <div class="lb_item worker_name txt_ell">{{worker.user_name}}</div>
                        <div class="lb_item worker_auth" :class="{ unauthed: !identify(worker.user_is_identify), authed:identify(worker.user_is_identify)}">{{workerIdentify(worker.user_is_identify)}}</div>
                    </div>
                    <Rate allow-half disabled v-model.number="worker.worker_average_rate"></Rate>
                    <div class="lb_item worker_region">关注量：{{ worker.focus_count }}</div>
                    <div class="work_info_bottom">
                        <div class="lb_item worker_region">{{ worker.user_address }}</div>
                        <div class="lb_item worker_region">已接单：{{ worker.worker_orders_count }}</div>
                        <div class="lb_item">{{ worker.worker_accept_day | filterDate }}</div>
                    </div>
                </div>
            </div>
        </div>
        <Menue></Menue>
<!--         <mt-datetime-picker
            ref="picker"
            type="time"
            v-model="time"
            @confirm="handleConfirm">
        </mt-datetime-picker> -->
         <div v-tap="{ methods: closeTimePicker }" v-if="time_wrap_flag" class="picker_wrap">
            <transition name="slide-fade">
                <mt-picker v-if="time_flag" class="b_picker" :slots="time_slots" @change="onTimeValueChange"></mt-picker>
            </transition>
        </div>
        <div v-tap="{ methods: closeLocaPicker }" v-if="loca_wrap_flag" class="picker_wrap">
            <transition name="slide-fade">
                <mt-picker v-if="loca_flag" class="b_picker" :slots="local_slots" @change="onLocaValuesChange"></mt-picker>
            </transition>
        </div>
        <div v-tap="{ methods: closeTypePicker }" v-if="type_wrap_flag" class="picker_wrap">
            <transition name="slide-fade">
                <mt-picker v-if="type_flag" class="b_picker" :slots="type_slots" @change="onTypeValuesChange"></mt-picker>
            </transition>
        </div>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import { HOST_CONFIG } from '@/api/config/api_config'
import { changeType2Number, changeRate2Number } from '@/util/util'
export default {
  	name: 'work',
  	data () {
    	return {
            top_title: '找工人',
      		valueHalf: 4,
            rateValue: 3,
            time:'',
            page: 0,
            local: '',
            type: '',
            loca_flag: false,
            loca_wrap_flag: false,
            type_flag: false,
            type_wrap_flag: false,
            time_flag:false,
            time_wrap_flag:false,
            local_slots: [
                {
                flex: 1,
                values: ['江岸区', '江汉区', '硚口区', '汉阳区', '武昌区', '青山区','洪山区','蔡甸区','江夏区','黄陂区','新洲区'],
                    className: 'local_slots',
                    textAlign: 'center',
                    visibleItemCount: 4
                }
            ],
            type_slots: [
                {
                flex: 1,
                values: ['油漆工', '泥瓦工', '水电工', '木工',],
                    className: 'type_slots',
                    textAlign: 'center'
                }
            ],
            time_slots:[
                {
                    flex: 1,
                    values: ['1天后', '2天后', '3天后', '4天后','5天后','6天后','7天后','8天后'],
                    className: 'type_slots',
                    textAlign: 'center',
                    visibleItemCount: 4,
                }
            ],
            workers:[],
            get_data_flag: true,
            page_flag: 'rate_list'
		}
    },
    filters: {
        filterDate: function (value) {
            if (value < 90) {
                return value + '天后可接单'
            } else {
                return '暂不可接单'
            }
        }
    },
	methods: {
        openLocaPicker() {
            this.loca_wrap_flag = true
            this.loca_flag = true
            this.page = 0
            this.workers = []
        },
        onScroll(){
            if(this.get_data_flag) {
                this.page++ 
				this.getWorker()
			}
        },
        getWorker() {
            if(this.page_flag == 'address_list') {
                this.closeLocaPicker()
            }
            if(this.page_flag == 'type_list') {
                this.closeTypePicker()
            }
            if(this.page_flag == 'rate_list') {
                this.slotByRate()
            }
            if(this.page_flag == 'time_list') {
                this.closeTimePicker()
            }
            
        },
        closeLocaPicker() {
            this.loca_flag = false
            this.page_flag ='address_list'
            this.get_data_flag = false
            var self = this
            setTimeout(() => {
                this.loca_wrap_flag = false
            },200)
            var local_data
            if(this.local[0]) {
                local_data = this.local[0]
            } else {
                local_data = this.local_slots[0].values[2]
            }
            this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=address_list',
            {
                account: this.page,
                address: local_data
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == 200){
                    this.get_data_flag = true
                    var worker_data = changeRate2Number(response.body.data)
                    this.workers = this.workers.concat(worker_data)
                }
            }, (response) => {
                    // error callback 
            })
        },
        openTimePicker(){
            this.time_wrap_flag = true
            this.time_flag = true
            this.page = 0
            this.workers = []
        },
        closeTimePicker(){
            this.time_flag = false
            this.page_flag = 'time_list'
            this.get_data_flag = false
            setTimeout(()=>{
                this.time_wrap_flag = false
            },200)
            var time_data
            if(this.time[0]) {
                time_data = this.time[0]
            } else {
                time_data = this.time_slots[0].values[2]
            }
            this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=time_list',
            {
                account: this.page,
                time: this.changeAcceptDuty(time_data),
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == "200"){
                    // console.log(response.body.data.length)
                    this.get_data_flag = true
                    var worker_data = changeRate2Number(response.body.data)
                    this.workers = this.workers.concat(worker_data)
                }
            }, (response) => {
                    // error callback 
            })
        },
        openTypePicker() {
            this.type_wrap_flag = true
            this.type_flag = true
            this.page = 0
            this.workers = []
        },
        //按类型
        closeTypePicker(){
            this.type_flag = false
            this.page_flag = 'type_list'
            this.get_data_flag = false
            var self = this
            setTimeout(() => {
                this.type_wrap_flag = false
            },100)
            var type_data
            if(this.type[0]) {
                type_data = this.type[0]
            } else {
                type_data = this.type_slots[0].values[2]
            }
            this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=type_list',
            {
                account: this.page,
                user_type: changeType2Number(type_data)
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == 200){
                    this.get_data_flag = true
                    var worker_data = changeRate2Number(response.body.data)
                    this.workers = this.workers.concat(worker_data)
                }
            }, (response) => {
                    // error callback 
            })
        },
        onLocaValuesChange(picker, values) {
            // this.loca_flag = false
            this.local = picker.getValues()
        },
        onTypeValuesChange(picker, values) {
            // this.loca_flag = false
            this.type = picker.getValues()
        },
        onTimeValueChange(picker,values) {
            this.time = picker.getValues()
        },
        callSlotByRate(e){
            this.page = 0
            this.workers = []
            this.slotByRate()
        },
        slotByRate(e, flag){
            this.page_flag = 'rate_list'
            this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=rate_list',
            {
                account: this.page,
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == 200){
                    // console.log(response.body)
                    this.get_data_flag = true
                    var worker_data = changeRate2Number(response.body.data)
                    this.workers = this.workers.concat(worker_data)
                }
            }, (response) => {
                    // error callback 
            })
        },
        goWorkerDetail(obj){

            var worker = obj.worker;
            this.$router.push({ name:'worker_detail', params:{ find_worker : worker }})
        },
        workerAvatar(url){
            // console.log(url)
            return HOST_CONFIG.imageIp+url;
        },
        //工具函数
        workerType2Word(type){
            // console.log(typeof type)
            //4油漆工 5泥瓦工 6水电工 7木工
            switch(type){
                case "4":
                    return "油漆工";
                    break;
                case "5":
                    return "泥瓦工";
                    break;
                case "6":
                    return "水电工";
                    break;
                case "7":
                    return "木工";
                    break;
            }
        },

        //工具函数
        workerIdentify(user_is_identify){
            //0未实名认证 1审核通过 2上传等待审核 3审核未通过
            switch(user_is_identify){
                case "0":
                    return "未实名认证";
                    break;
                case "1":
                    return "审核通过";
                    break;
                case "2":
                    return "等待审核";
                    break;
                case "3":
                    return "审核未通过";
                    break;
            }
        },
        //获取第几天接单的数字
        changeAcceptDuty(str){
            // console.log("".split.call(str,""))
            let time = "".split.call(str,"")
            return [].shift.call(time) 
        },
        //改变是否认证过的颜色
        identify(user_is_identify){
            if(user_is_identify == "1")
                return true;
            else return false;
        },

        
	},
    created(){
        this.get_data_flag = false
        this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=rate_list',
            {
                account: this.page,
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == 200){
                    // console.log(response.body)
                    this.get_data_flag = true
                    var worker_data = changeRate2Number(response.body.data)
                    this.workers = this.workers.concat(worker_data)
                }
            }, (response) => {
                    // error callback 
            })
    },
    components: {
        Chead,
        Menue,
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top_menue_item {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    font-size: 0;
    width: 25%;
    border-right: 1px solid rgba(187,187,187,.6);
}
.top_menue_item:last-child {
    border: 0;
}
.top_menue {
    position: fixed;
    z-index: 1000;
    width: 100%;
    background: #fff;
    font-size: 0;
    height: 36px;
    border-top: 1px solid rgba(187,187,187,.6);
    border-bottom: 1px solid rgba(187,187,187,.6);
}
.item_list {
     min-height: 88vh;
     background:#eee;
     padding-top: 36px;
     font-size: 0;
     padding-bottom: 60px;
}
.item_list_item {
    margin: 13px 13px;
    background: #fff;
    padding: 15px;
    text-align: left;
    border: 1px solid #fff;
    border-radius: 6px;
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
.worker_type {
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
}
.worker_name {
    margin-right: 6px;
    max-width: 5em;
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
.worker_region {
    margin-right: 12px;
}
.authed {
    color:rgb(76,175,80);
}
.unauthed {
    color: rgb(255,152,0);
}
.m_txt,
.m_logo {
    font-size: 13px;
    line-height: 36px;
    vertical-align: middle;
}
.m_logo {
    padding-right: 1vw;
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
    position: fixed;
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