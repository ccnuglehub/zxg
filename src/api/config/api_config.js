const key_config = {
    openid: ""
}

const host_config = {
    // serverIp:"http://localhost:8080"
    serverIp: "http://47.92.30.146/zxg/weixin/index",
    // serverMain:"",
    imageIp: "http://47.92.30.146/zxg/data/upload/",
    jssdkIp: "http://47.92.30.146/zxg/index.php?g=Weixin&m=WxApi&a=js_sdk_config"
}

const api_router_config = {
    login: host_config.serverIp + "?c=register&f=login",
    register: host_config.serverIp + "/register",
    banner: host_config.serverIp + "?c=news&f=banner",
    newslist: host_config.serverIp + "?c=news&f=news_list&account=0"
}

const api_assets_config = {
    // banner:"/zxg/src/assets/banner",
    // newslist:"/zxg/src/assets/newslist"
}

export const KEY_CONFIG = key_config;
export const HOST_CONFIG = host_config;
export const API_ROUTER_CONFIG = api_router_config;
export const API_ASSETS_CONFIG = api_assets_config;