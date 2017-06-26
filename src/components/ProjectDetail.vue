<template>
    <div class="project_detail">
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
                    <div class="bt">完成项目</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  	name: 'project_detail',
  	data () {
    	return {

        }
    }
}

</script>

<style scoped>
.project_detail {
    width: 100%;
    height: 100%;
    background: rgb(239,239,239);
    padding: 3.75vh 3.2vw 0;
}
.project_intro {
    text-align: left;
    background: rgb(250,250,250);
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
    padding: 12px;
    border-bottom: 1px solid rgb(227,227,227);
}
.intro_etc {
    padding: 12px;
    font-size: 0;
}
.etc_items {
    width: 70%;
}
.etc_item,
.etc_items,
.bt_box {
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
</style>
