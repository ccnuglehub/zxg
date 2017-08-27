const state = {
    // 项目经理个人信息,包含属性：name
    xmjl_info: {
        openid: "2adsfad1231",
        open_id: "2adsfad1231"
    },
    //软件针对的使用者
    versions: {
        is_xmjl: false,
        is_worker: true,
        is_owner: false,
        is_wy: false
    },
    //用户类型
    user_type_list: [
        {
            id: 1,
            value: '项目经理'
        },
        {
            id: 2,
            value: '物业公司'
        },
        {
            id: 3,
            value: '业主'
        },
        {
            id: 4,
            value: '工友'
        }
    ],
    //工人类型
    user_work_type_list: [
        {
            id: 1,
            value: '油漆工'
        },
        {
            id: 2,
            value: '泥瓦工'
        },
        {
            id: 3,
            value: '水电工'
        },
        {
            id: 4,
            value: '木工'
        }
    ],
    //行政区列表
    city_list: [
        {
            value: '1',
            label: '江岸区'
        },
        {
            value: '2',
            label: '江汉区'
        },
        {
            value: '3',
            label: '硚口区'
        },
        {
            value: '4',
            label: '黄陂区'
        },
        {
            value: '5',
            label: '东西湖区'
        },
        {
            value: '6',
            label: '洪山区'
        },
        {
            value: '7',
            label: '武昌区'
        },
        {
            value: '8',
            label: '江夏区'
        },
        {
            value: '9',
            label: '汉阳区'
        }
    ],
    //可接单时间列表
    time_list: [
        {
            value: '0',
            label: '当前可接单'
        },
        {
            value: '1',
            label: '一天后接单'
        },
        {
            value: '2',
            label: '两天后接单'
        },
        {
            value: '3',
            label: '三天后接单'
        },
        {
            value: '4',
            label: '四天后接单'
        },
        {
            value: '5',
            label: '五天后接单'
        },
        {
            value: '6',
            label: '六天后接单'
        },
        {
            value: '7',
            label: '七天后接单'
        },
        {
            value: '8',
            label: '十五天后接单'
        },
        {
            value: '9',
            label: '一月后接单'
        }
    ],
}
export default state
