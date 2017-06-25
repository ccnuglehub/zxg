<template>
	<div class="app_project">
	    <div class="edit_cont">
            <div class="edit_box">
                <div class="edit_box_top">
                    <div class="p_name">
                        <label class="p_lable">项目名称</label>
                        <input class="p_input" placeholder="请输入项目名称">
                    </div>
                    <div class="p_local">
                        <label class="p_lable">项目地点</label>
                        <input class="p_input">
                    </div>
                    <textarea class="p_txt" placeholder="请输入你的项目简介"></textarea>
                </div>
                <div class="edit_area"></div>
            </div>
        </div>
        <div class="bt_box">发布</div>
	</div>
</template>

<script>
export default {
  	name: 'app_project',
  	data () {
    	return {
      		
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
}
.edit_box {
    background: #fff;
}
.p_lable {
    font-size: 16px;
    line-height: 40px;
    font-weight: 500;
    padding-right: 8%;
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
</style>