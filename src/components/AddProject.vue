<template>
    <div class="wrap">
        <Chead :msg="top_title"></Chead>
        <div class="add_project">
            <div class="edit_cont">
                <div class="edit_box">
                    <div class="edit_box_top">
                        <div class="p_name">
                            <label class="p_lable p_lable_top">项目名称</label>
                            <input v-model="form_data.project_name" class="p_input" placeholder="请输入项目名称">
                        </div>
                        <div class="p_local">
                            <label class="p_lable p_lable_bottom">项目地点</label>
                            <Select v-model="form_data.project_address_detail" style="width:100px">
                                <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                            </Select>
                            <img class="qr_logo" src="../assets/qr_code.png">
                        </div>
                        <textarea v-model="form_data.projec_description" class="p_txt" placeholder="请输入你的项目简介"></textarea>
                    </div>
                    <div class="edit_area"></div>
                </div>
            </div>
            <div v-tap="{ methods: showNotice }" class="bt_box">发布</div>
            <CNotice v-if="cnotice_flag" :nclick="closeD" :mclick="postProject" :msg="msg"></CNotice>
        </div>
        <Menue></Menue>
    </div>
</template>

<script>
import CNotice from './common/Notice.vue'
import Chead from './common/Header.vue'
import Menue from './common/Menue.vue'
import {HOST_CONFIG} from '@/api/config/api_config'

// import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  	name: 'add_project',
  	data () {
    	return {
            top_title: '项目发布',
            msg: '您确认发布新的项目？',
            cnotice_flag: false,
      		cityList: [
                {
                    value: 'jiangan',
                    label: '江岸区'
                },
                {
                    value: 'jianghan',
                    label: '江汉区'
                },
                {
                    value: 'qiaokou',
                    label: '硚口区'
                },
                {
                    value: 'huangpi',
                    label: '黄陂区'
                },
                {
                    value: 'dongxihu',
                    label: '东西湖区'
                },
                {
                    value: 'hongshan',
                    label: '洪山区'
                },
                {
                    value: 'wuchang',
                    label: '武昌区'
                },
                {
                    value: 'jiangxia',
                    label: '江夏区'
                },
                {
                    value: 'hanyang',
                    label: '汉阳区'
                }
            ],
            form_data: {
                project_name: "测试",
                openid: "1adf123adaf",
                project_address_section: "洪山区",
                project_address_detail: "武汉市洪山区",
                projec_description: "测试"
            }
		}
  	},
	methods: {
		showNotice(){
            this.cnotice_flag = true
        },
        postProject(){
            console.log(this.form_data)
            this.$http.post(HOST_CONFIG.serverIp + '?c=project&f=add_project',
            this.form_data,
            {emulateJSON: true}).then((response) => {
                if(response.body.status == 1) {
                    this.cnotice_flag = false
                    this.$router.push({ name: 'project_detail', params: { obj: this.form_data }})
                }
            }, (response) => {
                      // error callback 
            })
            // this.cnotice_flag = false
            // this.$router.push({ name: 'project_detail', params: { obj: {} }})
        },
        closeD(){
            this.cnotice_flag = false
        }
	},
    components: {
        CNotice,
        Chead,
        Menue
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 100%;
    min-height: 100%;
}
.add_project {
    width: 100%;
    min-height: 100vh;
    background: rgb(239,239,239);
    padding-top: 22px;
    padding-right: 12px;
    padding-left: 12px;
}
.edit_cont {
    background: rgb(250,250,250);
    padding: 4.8vh 0 3.35vh;
    border-radius: 6px;
}
.p_input {
    outline: none;
    border: 0;
    font-size: 15px;
}
.p_name,
.p_local {
    text-align: left;
    padding-left: 22px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    position: relative;
}
.edit_box {
    background: #fff;
}
.p_lable {
    font-size: 16px;
    line-height: 40px;
    font-weight: 500;
}
.p_lable_top {
    padding-right: 8%;
}
.p_lable_bottom {
    padding-right: 6%;
}
.p_txt {
    width: 100%;
    padding: 3vh 7vw;
    outline: none;
    resize: none;
    font-size: 14px;
    height: 45vh;
    box-sizing: border-box;
}
.bt_box {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    font-size: 19px;
    line-height: 70px;
    margin: 2vh auto;
    background: rgb(8,194,165);
    color: #fff;
    font-weight: 800;
    box-shadow: 0px 0px 20px rgb(8,194,165);
}
.qr_logo {
    width: 24px;
    position: absolute;
    top: 50%;
    right: 7.4vw;
    transform: translateY(-50%);
}
.log_cont {
    position: absolute;
    border-radius: 8px;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    background: rgb(241,241,241);
    padding: 0 12px;
}
.log_txt {
    width: 65vw;
    padding: 4vh 0;
    font-size: 16px;
    border-bottom: 1px solid rgb(207,200,207);
}
</style>