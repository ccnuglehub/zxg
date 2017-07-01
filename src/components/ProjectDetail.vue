<template>
    <div class="project_detail">
        <Chead></Chead>
        <div class="project_details">
            <div class="project_intro">
                <div class="intro_title">项目简介</div>
                <div class="intro_txt">如果你到现在都还没听说过 Vue.js,你心里可能在想:前端的幺蛾子就是多</div>
                <div class="intro_etc">
                    <div class="etc_items">
                        <div class="etc_item">江岸区</div>
                        <div class="etc_item">2017.06.12</div>
                        <div class="etc_item etc_name">马云</div>
                    </div>
                    <div class="bt_box">
                        <div @click="showCompleteNotice" class="bt">完成项目</div>
                    </div>
                </div>
            </div>
            <div class="project_intro project_intro_bottom">
                <div class="bottom_title">
                    <div class="intro_title intro_title_b">工人信息</div>
                    <div class="b_bt_box">
                        <div class="bt">添加工人</div>
                    </div>
                </div>
                <div class="etc_items_bottom_box">
                    <div class="etc_items_bottom">
                        <div class="etc_bottom_type">油漆工</div>
                        <div class="etc_bottom_name">王凯</div>
                    </div>
                    <div class="bt_box_bottom">
                        <div class="bt_item_bottom">
                            <div @click="showEnotce" class="bt">待评价</div>
                        </div>
                        <div class="bt_item_bottom">
                            <div class="bt">关注</div>
                        </div>
                        <div class="bt_item_bottom">
                            <div @click="showDeleteNotice" class="bt">移除</div>
                        </div>
                    </div>
                </div>
                <div class="etc_items_bottom_box">
                    <div class="etc_items_bottom">
                        <div class="etc_bottom_type">油漆工</div>
                        <div class="etc_bottom_name">王凯</div>
                    </div>
                    <div class="bt_box_bottom">
                        <div class="bt_item_bottom">
                            <div class="bt">进行中</div>
                        </div>
                        <div class="bt_item_bottom">
                            <div class="bt">关注</div>
                        </div>
                        <div class="bt_item_bottom">
                            <div @click="showDeleteNotice" class="bt">移除</div>
                        </div>
                    </div>
                </div>
            </div>
            <CNotice v-if="cnotice_flag" :nclick="closeD" :mclick="mFn" :msg="msg"></CNotice>
            <div v-if="evaluate_flag" class="evaluate">
                <textarea class="e_txt" placeholder="请对工人的工作进行简短的评价"></textarea>
                <div class="e_title">请对工人的工作进行评分</div>
                <Rate allow-half v-model="valueHalf"></Rate>
                <div class="e_bt_box">
                    <div @click="Epost" class="bt">确认评价</div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>
import CNotice from './common/Notice.vue'
import Chead from './common/Header.vue'
export default {
  	name: 'project_detail',
  	data () {
    	return {
            valueHalf: 4.5,
            cnotice_flag: false,
            evaluate_flag: false,
            msg: '您确认完成该项目？',
            mFn: () => {
                console.log('需要一个回调函数')
            }
        }
    },
    components: {
        CNotice,
        Chead,
    },
    methods: {
        closeD(){
            this.cnotice_flag = false
        },
        completeProject(){
            this.$http.post('url', data,
                {emulateJSON: true}).then((response) => {
                    if(true) {
                        
                    } else {

                    }
                }, (response) => {
                      // error callback 
            })
        },
        deleteWorker(){
            this.$http.post('url', data,
                {emulateJSON: true}).then((response) => {
                    if(true) {
                        
                    } else {

                    }
                }, (response) => {
                      // error callback 
            })
        },
        Epost(){
            this.$http.post('url', data,
                {emulateJSON: true}).then((response) => {
                    if(true) {
                        
                    } else {

                    }
                }, (response) => {
                      // error callback 
            })
        },
        showCompleteNotice(){
            this.cnotice_flag = true
            this.mFn = this.completeProject
        },
        showDeleteNotice(){
            this.msg = '您确定移除该工人？'
            this.cnotice_flag = true
            this.mFn = this.deleteWorker
        },
        showEnotce(){
            this.evaluate_flag = true
        }
    }
}

</script>

<style scoped>
.project_detail {
    width: 100%;
    height: 100%;
}
.project_details {
    width: 100%;
    height: 100%;
    background: rgb(239,239,239);
    padding: 0 3.2vw;
}
.project_intro {
    margin-top: 3.75vh;
    text-align: left;
    background: rgb(250,250,250);
    display: inline-block;
    border-radius: 8px;
    width: 100%;
}
.intro_title {
    font-size: 16px;
    line-height: 23px;
    font-weight: bold;
    color: rgb(134,210,198);
    padding: 12px 14px;
}
.intro_txt {
    background: #fff;
    text-indent: 2em;
    font-size: 15px;
    line-height: 23px;
    min-height: 23.2vh;
    padding: 12px;
    border-bottom: 1px solid rgb(227,227,227);
}
.intro_etc {
    padding: 12px;
    font-size: 0;
    background: #fff;
    margin-bottom: 16px;
}
.etc_items {
    width: 70%;
}
.etc_item,
.etc_items,
.intro_title_b,
.b_bt_box,
.bt_box,
.etc_bottom_type,
.etc_bottom_name,
.bt_box_bottom,
.etc_items_bottom,
.bt_item_bottom {
    display: inline-block;
    vertical-align: middle;
}
.etc_item {
    font-size: 14px;
    color: #7d7c7d;
    width: 30%;
}
.etc_name {
    text-align: right;
}
.bt_box {
    width: 30%;
    text-align: center;
}
.bt {
    display: inline-block;
    font-size: 14px;
    padding: 5px 11px;
    font-weight: bold;
    border-radius: 8px;
    background-color: rgb(134,210,198);
    color: #fff;
    cursor: pointer;
}
.project_intro_bottom {
    margin-top: 20px;
}
.bottom_title {
    font-size: 0;
    padding-right: 12px;
}
.intro_title_b {
    width: 70%;
}
.b_bt_box {
    width: 30%;
    text-align: center;
}
.etc_items_bottom {
    width: 35%;
}
.etc_items_bottom_box {
    width: 100%;
    font-size: 0;
    background: #fff;
    padding: 10px 0;
    border-bottom: 1px solid rgb(227,227,227);
}
.etc_bottom_type,
.etc_bottom_name {
    width: 50%;
}
.etc_bottom_type {
    font-size: 16px;
    padding-left: 12px;
    font-weight: bold;
}
.etc_bottom_name {
    font-size: 14px;
    text-align: center;
}
.bt_box_bottom {
    width: 65%;
}
.bt_item_bottom {
    width: 33.3%;
    text-align: center;
}
.etc_items_bottom_box:last-child {
    border-bottom: 0;
    padding-bottom: 6vh;
}
.project_intro_bottom {
    padding-bottom: 16px;
    border-radius: 8px;
}
.bt_item_bottom .bt {
    min-width: 64px;
}
.evaluate {
    width: 69vw;
    font-size: 0;
    padding-top: 15px;
    position: absolute;
    top: 28vh;
    left: 50%;
    transform: translateX(-50%);
    background: rgb(241,241,241);
    border-radius: 8px;
}
.e_txt {
    width: 62.6vw;
    font-size: 14px;
    padding: 6px;
    min-height: 10.5vh;
    border-radius: 6px;
    outline: none;
    border: 1px solid rgb(187,187,187);
}
.e_title {
    width: 62.6vw;
    display: inline-block;
    text-align: left;
    padding-left: 10px;
    font-size: 14px;
    padding-top: 8px;
    margin-top: 10px;
    border-top: 1px solid rgb(187,187,187);
}
.e_bt_box {
    width: 100%;
    padding-bottom: 10px;
}
</style>
