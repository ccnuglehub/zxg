<template>
<div style="height:100%">
<div style="height:50%"></div>
  <Input v-model="value" placeholder="请输入电话号码" type="text" style="width: 60%;margin:auto;"></Input>
    <Button type="info" v-tap="{ methods: login }">登录</Button>
</div>
    
</template>
<script>
import {API_ROUTER_CONFIG} from '@/api/config/api_config'
    export default {
        data () {
            return {
                value: ''
            }
        },
        methods:{
          login(){
            // alert(API_ROUTER_CONFIG.login)

          }
        }
    }
</script>
