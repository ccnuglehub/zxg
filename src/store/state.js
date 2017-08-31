const state = {
    // 项目经理个人信息,包含属性：name
    xmjl_info: {
        openid: "2adsfad1231",
        open_id: "2adsfad1231"
    },

    //软件针对的使用者
    versions: {
        is_xmjl: false,
        is_worker: false,
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
            id: '1',
            value: '江岸区'
        },
        {
            id: '2',
            value: '江汉区'
        },
        {
            id: '3',
            value: '硚口区'
        },
        {
            id: '4',
            value: '黄陂区'
        },
        {
            id: '5',
            value: '东西湖区'
        },
        {
            id: '6',
            value: '洪山区'
        },
        {
            id: '7',
            value: '武昌区'
        },
        {
            id: '8',
            value: '江夏区'
        },
        {
            id: '9',
            value: '汉阳区'
        }
    ],
    //可接单时间列表
    time_list: [
        {
            value: '0',
            lable: '当前可接单'
        },
        {
            value: '1',
            lable: '一天后接单'
        },
        {
            value: '2',
            lable: '两天后接单'
        },
        {
            value: '3',
            lable: '三天后接单'
        },
        {
            value: '4',
            lable: '四天后接单'
        },
        {
            value: '5',
            lable: '五天后接单'
        },
        {
            value: '6',
            lable: '六天后接单'
        },
        {
            value: '7',
            lable: '七天后接单'
        },
        {
            value: '8',
            lable: '十五天后接单'
        },
        {
            value: '9',
            lable: '一月后接单'
        }
    ],
}
export default state
