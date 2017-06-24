<template>
<div style="height:100%">
<div style="height:50%"></div>
  <Input v-model="value" placeholder="请输入电话号码" style="width: 60%;margin:auto;"></Input>
    <Button type="info" @click="login()">登录</Button>
</div>
    
</template>
<script>
    export default {
        data () {
            return {
                value: ''
            }
        },
        methods:{
          login(){

          }
        }
    }
</script>
