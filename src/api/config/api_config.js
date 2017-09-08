
const key_config ={
	openid:""
}

const host_config ={
	// serverIp:"http://localhost:8080"
	serverIp:"http://dashifan.cn/zxg/weixin/index",
	// serverMain:"",
	imageIp:"http://dashifan.cn/zxg/data/upload/",

	//服务器ip或域名
	Ip: 'http://dashifan.cn/'
}

const api_router_config = {
	//用户上传头像
	upload_user_avatar: host_config.Ip+"zxg/weixin/index?c=register&f=upload_user_avatar",
	//完善个人信息
	update_user: host_config.Ip+"zxg/weixin/index?c=register&f=update_user",
	//实名认证
	identity: host_config.Ip+"zxg/weixin/index?c=register&f=identity",
	//登录
	login:host_config.Ip+"zxg/weixin/index?c=register&f=login",
	//获取验证码
	get_auth_code: host_config.Ip+"zxg/weixin/index?c=register&f=get_auth_code",
	//提交注册信息
	add_user: host_config.Ip+"zxg/weixin/index?c=register&f=add_user",
	//获取微信open_id
	get_open_id:host_config.Ip+"zxg/Weixin/WxApi/get_openid/user_register/123",
	//访客记录列表
	visitor_list: host_config.Ip+"zxg/weixin/index?c=visitor&f=visitor_list",
	//按 一天、一周、一月获取访客记录
	visitor_list_limitation: host_config.Ip+"zxg/weixin/index?c=visitor&f=visitor_list_limitation",
	//工人扫描进房间
	owner_visit: host_config.Ip+"zxg/weixin/index?c=visitor&f=owner_visit",
	//工人扫码进小区
	facility_visit: host_config.Ip+"zxg/weixin/index?c=visitor&f=facility_visit",
	//业主生成具体楼栋二维码
	owner_get_code: host_config.Ip+"zxg/weixin/index?c=visitor&f=owner_get_code",
	//物业经理生成物业通行二维码
	facility_get_code: host_config.Ip+"zxg/weixin/index?c=visitor&f=facility_get_code",
	//关注列表
	focus_list: host_config.Ip+"zxg/weixin/index?c=focus&f=focus_list",
	//关注工人
	focus_worker: host_config.Ip+"zxg/weixin/index?c=focus&f=focus_worker",
	//项目经理评价工人
	worker_rate: host_config.Ip+"zxg/weixin/index?c=project&f=worker_rate",
	//项目完成
	project_complete: host_config.Ip+"zxg/weixin/index?c=project&f=project_complete",
	//移除工人
	delete_worker: host_config.Ip+"zxg/weixin/index?c=project&f=delete_worker",
	//改变工人的项目状态（只能是进行中变成已经完成）
	worker_project_status: host_config.Ip+"zxg/weixin/index?c=project&f=worker_project_status",
	//工人加入项目
	worker_addin_project: host_config.Ip+"zxg/weixin/index?c=project&f=worker_addin_project",
	//项目中的个人列表
	projec_worker_list: host_config.Ip+"zxg/weixin/index?c=project&f=projec_worker_list",
	//我的项目
	project_list: host_config.Ip+"zxg/weixin/index?c=project&f=project_list",
	//项目发布
	add_project: host_config.Ip+"zxg/weixin/index?c=project&f=add_project",
	//获取个人目前的接单状态
	get_message_type: host_config.Ip+"zxg/weixin/index?c=worker&f=get_message_type",
	//工人发布可接单时间
	accept_time: host_config.Ip+"zxg/weixin/index?c=worker&f=accept_time",
	//客户评价列表
	rate_detail: host_config.Ip+"zxg/weixin/index?c=worker&f=rate_detail",
	//按照可接单时间找工人
	time_list: host_config.Ip+"zxg/weixin/index?c=worker&f=time_list",
	//按照工友类别找工人
	type_list: host_config.Ip+"zxg/weixin/index?c=worker&f=type_list",
	//按照地区找工人
	address_list: host_config.Ip+"zxg/weixin/index?c=worker&f=address_list",
	//按照智能排序找工人
	rate_list: host_config.Ip+"zxg/weixin/index?c=worker&f=rate_list",
	//list新闻请求
	news_list: host_config.Ip+"zxg/weixin/index?c=news&f=news_list",
	//banner新闻请求
	banner: host_config.Ip+"zxg/weixin/index?c=news&f=banner",
	//获取用户详细信息
	get_user_detail: host_config.Ip+"zxg/weixin/index?c=register&f=get_user_detail",
	//注销用户
	delete_user: host_config.Ip+"zxg/weixin/index?c=register&f=delete_user",
}

const api_assets_config = {
	// banner:"/zxg/src/assets/banner",
	// newslist:"/zxg/src/assets/newslist"
}

export const KEY_CONFIG=key_config;
export const HOST_CONFIG = host_config;
export const API_ROUTER_CONFIG = api_router_config;
export const API_ASSETS_CONFIG = api_assets_config;