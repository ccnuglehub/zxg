<template>
	<div class="app_project">
	    <div class="edit_cont">
            <div class="edit_box">
                <div class="edit_box_top">
                    <div class="p_name">
                        <label class="p_lable p_lable_top">项目名称</label>
                        <input class="p_input" placeholder="请输入项目名称">
                    </div>
                    <div class="p_local">
                        <label class="p_lable p_lable_bottom">项目地点</label>
                        <Select v-model="model1" style="width:100px">
                            <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                        <img class="qr_logo" src="../assets/qr_code.png">
                    </div>
                    <textarea class="p_txt" placeholder="请输入你的项目简介"></textarea>
                </div>
                <div class="edit_area"></div>
            </div>
        </div>
        <div class="bt_box">发布</div>
        <div class="log_cont">
            <Icon class="bt_close" type="close-circled"></Icon>
            <div class="log_txt">您确认发布新的项目？</div>
            <div class="bt_ok">确认</div>
        </div>
	</div>
</template>

<script>
export default {
  	name: 'app_project',
  	data () {
    	return {
      		cityList: [
                {
                    value: 'beijing',
                    label: '北京市'
                },
                {
                    value: 'shanghai',
                    label: '上海市'
                },
                {
                    value: 'shenzhen',
                    label: '深圳市'
                },
                {
                    value: 'hangzhou',
                    label: '杭州市'
                },
                {
                    value: 'nanjing',
                    label: '南京市'
                },
                {
                    value: 'chongqing',
                    label: '重庆市'
                }
            ],
            model1: '',
		}
  	},
	methods: {
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app_project {
    width: 100%;
    min-height: 85vh;
    background: rgb(239,239,239);
    padding-top: 27px;
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
.bt_ok {
    display: inline-block;
    width: 26.7vw;
    height: 4.5vh;
    border-radius: 8px;
    background: #08c2a5;
    line-height: 4.5vh;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    margin: 15px auto 12px;
}
.bt_close {
    position: absolute;
    top: -5%;
    right: -4%;
    width: 30px;
    height: 30px;
}
.ivu-icon-close-circled:before {
    font-size: 20px;
}
</style>