<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { API_ROUTER_CONFIG } from '@/api/config/api_config'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'app',
    data() {
        return {
            open_id: ''
        }
    },
    computed: {
		...mapState([
			'xmjl_info'
		])
	},
    created() {
        this.$http.get(API_ROUTER_CONFIG.get_open_id,
        {emulateJSON: true}).then((response) => {
            this.open_id = response.body.data.open_id
            this.changeXmjlInfo(response.body.data)
        }, (response) => {
                // error callback 
        })
    }
}
</script>

<style>
html, body, #app {
    width: 100%;
    height: 100%;
}
body {
    margin: 0;
}
.ivu-input:focus {
    border-color: rgb(179,179,179);
    outline: none;
    box-shadow: 0 0 0 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-top: 45px;
    box-sizing: border-box;
}
.ivu-select-single .ivu-select-selection {
    border: 0;
}
.ivu-select-visible .ivu-select-selection {
    box-shadow: 0 0 0;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    font-size: 15px;
}
.add_info .ivu-form-label-left .ivu-form-item-label {
    font-size: 14px;
}
.news_detail img {
	width: 100%;
    display: block;
}

.txt_ell {
    white-space:nowrap !important;  /*强制文字不换行(标准浏览器)*/
    overflow:hidden;
    text-overflow:ellipsis;  /*截断*/
}
/* .ivu-select-placeholder {
    display: inline-block !important;
}  */
</style>
