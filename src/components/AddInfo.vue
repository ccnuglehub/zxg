<template>
    <div id="add_info" class="add_info">
        <div class="info_wrap">
            <div class="title">个人信息</div>
            <div class="edit_area">
                <Form class="info_form" label-position="left" :label-width="80">
                    <Form-item label="姓名">
                        <Input class="info_input" type="text"></Input>
                    </Form-item>
                    <Form-item label="地址">
                        <Input class="info_input" type="text"></Input>
                    </Form-item>
                    <Form-item label="个人简介">
                        <Input class="info_input" type="textarea"></Input>
                    </Form-item>
                    <div class="bt">提交</div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'add_info',
    data(){
        return {

        }
    }
}
</script>

<style scoped>
.add_info {
    height: 100Vh;
    width: 100vw;
    background: rgb(239,239,239);
    font-size: 14px;
    color: rgb(16, 16, 16);
    padding-bottom: 20px;
}
.info_wrap {
    width: 94vw;
    background: #fff;
    display: inline-block;
    margin: 15px auto auto auto;
    border-radius: 8px;
    padding-bottom: 9vh;
    border-bottom: 20px solid rgb(249, 249, 249);
}
.title {
    text-align: left;
    line-height: 30px;
    border-radius: 8px;
    background: rgb(249, 249, 249);
}
.edit_area,
.title {
    padding: 0 20px;
}
.info_form {
    padding-top: 8px;
}
.info_form .ivu-form-label-left .ivu-form-item-label {
    padding-right: 20px;
}
.bt {
    background: rgb(134, 210, 198);
    width: 60px;
    height: 30px;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    margin: 0 auto;
}
</style>
