<template>
	<div class="work">
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
            <div v-tap="{ methods: slotByRate }" class="top_menue_item">
                <Icon class="m_logo" type="shuffle"></Icon>
                <span class="m_txt">智能排序</span>
            </div>
            <div v-tap="{ methods: openPicker }" class="top_menue_item">
                <Icon class="m_logo" type="ios-clock"></Icon>
                <span class="m_txt">可接单时间</span>
            </div>
		</div>
        <div class="item_list">
            <div v-tap="{ methods: goWorkerDetail, index: index }" class="item_list_item" :key="workerlist" v-for="(worker ,index) in workers">
                <img class="work_photo" :src="workerAvatar(worker.user_avatar)">
                <div class="work_info lb_item">
                    <div class="work_info_top">
                        <div class="lb_item worker_type">{{workerType(worker.user_type)}}</div>
                        <div class="lb_item worker_name">{{worker.user_name}}</div>
                        <div class="lb_item worker_auth" :class="{ unauthed: !identify(worker.user_is_identify), authed:identify(worker.user_is_identify)}">{{workerIdentify(worker.user_is_identify)}}</div>
                    </div>
                    <Rate allow-half v-model="worker.worker_average_rate"></Rate>
                    <div class="work_info_bottom">
                        <div class="lb_item worker_region">{{worker.user_address}}</div>
                        <div class="lb_item">已接单：{{worker.worker_orders_count}}</div>
                    </div>
                </div>
            </div>
            
        </div>
        <Menue></Menue>
        <mt-datetime-picker
            ref="picker"
            type="time"
            v-model="time"
            @confirm="handleConfirm">
        </mt-datetime-picker>
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
import {HOST_CONFIG} from '@/api/config/api_config'
export default {
  	name: 'work',
  	data () {
    	return {
            top_title: '找工人',
      		valueHalf: 4,
            time:'',
            local: '',
            type: '',
            loca_flag: false,
            loca_wrap_flag: false,
            type_flag: false,
            type_wrap_flag: false,
            local_slots: [
                {
                flex: 1,
                values: ['北京', '上海', '广州', '深圳', '天津', '武汉'],
                    className: 'local_slots',
                    textAlign: 'center'
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
            workers:""
		}
  	},
	methods: {
        openPicker() {
            this.$refs.picker.open();
        },
        //按时间
        handleConfirm(value ){
            // alert(1)
            this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=time_list',
            {
                account: "0",
                time: value
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == "200"){
                    console.log(response.body.data.length)
                    this.workers = response.body.data
                }
            }, (response) => {
                    // error callback 
            })
        },
        openLocaPicker() {
            this.loca_wrap_flag = true
            this.loca_flag = true
        },
        closeLocaPicker(){
            this.loca_flag = false
            var self = this
            setTimeout(() => {
                self.loca_wrap_flag = false
            },100)
            this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=address_list',
            {
                account: "0",
                address: this.local[0]
            },
            {emulateJSON: true}).then((response) => {

            }, (response) => {
                    // error callback 
            })
        },
        openTypePicker() {
            this.type_wrap_flag = true
            this.type_flag = true
        },
        //按类型
        closeTypePicker(){
            this.type_flag = false
            var self = this
            setTimeout(() => {
                self.type_wrap_flag = false
            },100)
            this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=type_list',
            {
                account: "0",
                type: this.type[0]
            },
            {emulateJSON: true}).then((response) => {

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
        slotByRate(){
            this.$http.post(HOST_CONFIG.serverIp+'?c=worker&f=rate_list',
            {
                account: "0"
            },
            {emulateJSON: true}).then((response) => {
                if(response.status == 200){
                    // console.log(response.body)
                    this.workers = response.body.data;

                }
            }, (response) => {
                    // error callback 
            })
        },
        goWorkerDetail(obj){
            var index = obj.index;
            this.$router.push({url:'worker_detail',params:{worker : this.workers && this.workers[index]}})
        },
        workerAvatar(url){
            // console.log(url)
            return HOST_CONFIG.imageIp+url;
        },
        workerType(type){
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
        identify(user_is_identify){
            if(user_is_identify == "1")
                return true;
            else return false;
        }
	},
    created(){
        // this.$http.post('url', data,
        //     {emulateJSON: true}).then((response) => {

        //     }, (response) => {
        //             // error callback 
        // })
    },
    components: {
        Chead,
        Menue,
    }
}
</script>
.authed {
    color:rgb(76,175,80);
}
.unauthed {
    color: rgb(255,152,0);
}
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
    font-size: 0;
    height: 36px;
    border-top: 1px solid rgba(187,187,187,.6);
    border-bottom: 1px solid rgba(187,187,187,.6);
}
.item_list {
     min-height: 88vh;
     background:#eee;
     padding-top: 1px;
     font-size: 0;
     padding-bottom: 60px;
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
.worker_type {
    font-size: 15px;
    font-weight: 500;
    margin-right: 10px;
}
.worker_name {
    margin-right: 7%;
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
    margin-right: 28px;
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