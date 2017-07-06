<template>
	<div class="work">
        <Chead :msg="top_title"></Chead>
		<div class="top_menue">
		    <div v-tap="{ methods: openLocaPicker }" class="top_menue_item">
                <Icon class="m_logo" type="ios-location"></Icon>
                <span class="m_txt">全部地区</span>
            </div>
            <div class="top_menue_item">
                <Icon class="m_logo" type="person"></Icon>
                <span class="m_txt">工友类别</span>
            </div>
            <div class="top_menue_item">
                <Icon class="m_logo" type="shuffle"></Icon>
                <span class="m_txt">智能排序</span>
            </div>
            <div v-tap="{ methods: openPicker }" class="top_menue_item">
                <Icon class="m_logo" type="ios-clock"></Icon>
                <span class="m_txt">可接单时间</span>
            </div>
		</div>
        <div class="item_list">
            <div v-tap="{ methods: goWorkerDetail }" class="item_list_item">
                <img class="work_photo" src="../assets/people.png">
                <div class="work_info lb_item">
                    <div class="work_info_top">
                        <div class="lb_item worker_type">油漆工</div>
                        <div class="lb_item worker_name">王凯</div>
                        <div class="lb_item worker_auth authed">已实名认证</div>
                    </div>
                    <Rate allow-half v-model="valueHalf"></Rate>
                    <div class="work_info_bottom">
                        <div class="lb_item worker_region">江汉区</div>
                        <div class="lb_item">已接单：149</div>
                    </div>
                </div>
            </div>
            <div class="item_list_item">
                <img class="work_photo" src="../assets/people.png">
                <div class="work_info lb_item">
                    <div class="work_info_top">
                        <div class="lb_item worker_type">油漆工</div>
                        <div class="lb_item worker_name">王凯</div>
                        <div class="lb_item worker_auth authed">已实名认证</div>
                    </div>
                    <Rate allow-half v-model="valueHalf"></Rate>
                    <div class="work_info_bottom">
                        <div class="lb_item worker_region">江汉区</div>
                        <div class="lb_item">已接单：149</div>
                    </div>
                </div>
            </div>
        </div>
        <Menue></Menue>
        <mt-datetime-picker
            ref="picker"
            type="time"
            v-model="pickerValue">
        </mt-datetime-picker>
        <div v-tap="{ methods: closeLocaPicker }" v-if="loca_wrap_flag" class="picker_wrap">
            <transition name="slide-fade">
                <mt-picker v-if="loca_flag" class="b_picker" :slots="slots" @change="onValuesChange"></mt-picker>
            </transition>
        </div>
	</div>
</template>

<script>
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
export default {
  	name: 'work',
  	data () {
    	return {
            top_title: '找工人',
      		valueHalf: 4,
            pickerValue:'',
            loca_flag: false,
            loca_wrap_flag: false,
            slots: [
                {
                flex: 1,
                values: ['北京', '上海', '广州', '深圳', '天津', '武汉'],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ]
		}
  	},
	methods: {
        openPicker() {
            this.$refs.picker.open();
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
        },
        onValuesChange(picker, values) {
            // this.loca_flag = false
            console.log(values)
        },
        goWorkerDetail(){
            this.$router.push('worker_detail')
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
     height: 88vh;
     background:#eee;
     padding-top: 1px;
     font-size: 0;
}
.item_list_item {
    margin: 13px 13px;
    background: #fff;
    padding: 15px;
    text-align: left;
}
.work_photo {
    width: 26%;
    vertical-align: middle;
}
.work_info {
    width: 74%;
    padding-left: 16px;
    font-size: 14px;
}
.worker_type {
    font-size: 16px;
    font-weight: 500;
    margin-right: 22px;
}
.worker_name {
    margin-right: 13%;
}
.worker_auth {
    font-size: 12px;
    padding: 2px 6px;
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
    color: rgb(255,152,0);
}
.m_txt,
.m_logo {
    font-size: 14px;
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