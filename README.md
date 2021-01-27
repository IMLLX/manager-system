# 流程通知模块 - API文档

1. ## 数据库字段 - eventdata

   1. Id

      事件id、主键

   2. fromuserCode

      事件发送者的代码

   3. touserCode

      事件接收者的代码

   4. name

      事件名称

   5. impNumber

      事件的执行编码

      **只有在发送事件时才会创建执行编码，未发送事件不会生成执行编码**

      执行编码格式：

      `YYMMDD + 事件类型编码 + 事件类型序号`

   6. timeClass

      时间类型

   7. eventClass

      事件类型

   8. receiveStatus

      接收状态

   9. routeCode

      界面编码

   10. sendStatus

       发送状态

   11. createTime

       创建时间

   12. handleStatus

       处理状态

   13. updateTime

       更新时间

       事件创建、收发状态、处理状态的改变都会更新更新时间

   14. processedTime

       处理时间

   15. sendTime

       发送时间

   16. detail_[0~10]

       事件详情保留字段

       **其中：`detail_0` 会保留在 `pollevent` 的 `detail` 中作为通知的预览信息**

2. ## eventinfo

   1. classname

      事件类型名称

   2. code

      事件类型编码

3. ## pollevent

   1. touserCode

      事件接收者的信息

   2. fromuserCode

      事件发送者的信息

   3. eventId

      事件Id

   4. isReceived

      通知接收状态

   5. detail

      通知简介

   6. impNumber

      事件执行编码

#  API

## 1.select

### select/event

```json
method: GET
path: select/event

// 不传入 touserCode
// 会返回事件的所有接收者
REQUEST:
{
    // 这里不再传入 touserCode 改到下面传入
	// touserCode: 104,
    Id :75,
	createTime: 2021
    toUser: {
    	// role_info 中的数据
    	// role_info:{
    	role_name: "总经理",
    	dept_name: "总经办"
		// },
    	// tool_user:{
        user_code: "101"
        // }
	}
}

RESPOND:
{
    "success": true,
    "results": [
        {
            "Id": 75,
            "fromuserCode": 101,
            "touserCode": "[11, 104]",
            "name": "解雇",
            "impNumber": "0A-20210124-0015",
            "timeClass": 1,
            "createTime": "2021-01-24T14:22:55.000Z",
            "processedTime": null,
            "updateTime": null,
            "sendTime": null,
            "receiveTime": null,
            "eventClass": "default",
            "eventClassCode": "0A",
            "sendStatus": 1,
            "receiveStatus": 0,
            "handleStatus": 0,
            "Deadline": null,
            "routeCode": "111",
            "detail_0": "1111",
            "detail_1": null,
            "detail_2": null,
            "detail_3": null,
            "detail_4": null,
            "detail_5": null,
            "detail_6": null,
            "detail_7": null,
            "detail_8": null,
            "detail_9": null,
            "detail_10": null,
            "fromUser": {
                "name": "皇甫菊华",
                "username": "hfjh",
                "sex": null,
                "role": "zjb_zjl",
                "user_code": "101",
                "client_role": "100101",
                "role_type": "1",
                "dept_code": "100",
                "post_code": "101"
            },
            "toUser": [
                {
                    "name": "Jack",
                    "username": "jack",
                    "sex": null,
                    "role": "designer",
                    "user_code": "11",
                    "client_role": "designer",
                    "role_type": "0",
                    "dept_code": "0",
                    "post_code": "0"
                },
                {
                    "name": "翟鸿发",
                    "username": "xhf",
                    "sex": null,
                    "role": "211601",
                    "user_code": "104",
                    "client_role": "211601",
                    "role_type": "3",
                    "dept_code": "211",
                    "post_code": "601"
                }
            ]
        }
    ],
    "page": {
        "totalCount": "1",
        "pageSize": "",
        "totalPage": "",
        "currPage": ""
    },
    "statusCode": 200
}

// 传入 touserCode
// 只返回特定的接收者

{
	touserCode: 104,
    Id :75,
	createTime: 2021
}

{
    "success": true,
    "results": [
        {
            "Id": 75,
            "fromuserCode": 101,
            "touserCode": "[11, 104]",
            "name": "解雇",
            "impNumber": "0A-20210124-0015",
            "timeClass": 1,
            "createTime": "2021-01-24T14:22:55.000Z",
            "processedTime": null,
            "updateTime": null,
            "sendTime": null,
            "receiveTime": null,
            "eventClass": "default",
            "eventClassCode": "0A",
            "sendStatus": 1,
            "receiveStatus": 0,
            "handleStatus": 0,
            "Deadline": null,
            "routeCode": "111",
            "detail_0": "1111",
            "detail_1": null,
            "detail_2": null,
            "detail_3": null,
            "detail_4": null,
            "detail_5": null,
            "detail_6": null,
            "detail_7": null,
            "detail_8": null,
            "detail_9": null,
            "detail_10": null,
            "fromUser": {
                "name": "皇甫菊华",
                "username": "hfjh",
                "sex": null,
                "role": "zjb_zjl",
                "user_code": "101",
                "client_role": "100101",
                "role_type": "1",
                "dept_code": "100",
                "post_code": "101"
            },
            "toUser": {
                "name": "翟鸿发",
                "username": "xhf",
                "sex": null,
                "role": "211601",
                "user_code": "104",
                "client_role": "211601",
                "role_type": "3",
                "dept_code": "211",
                "post_code": "601"
            }
        }
    ],
    "page": {
        "totalCount": "1",
        "pageSize": "",
        "totalPage": "",
        "currPage": ""
    },
    "statusCode": 200
}

```

#### 备注

`touserCode` 暂时只能传入一个，不能传入数组。

### select/user

对 tool_user 表的用户进行筛选，返回用户信息

```json
method: GET
path: select/user

REQUSET:
{
	role_type: 3,
	post_code: 601
}

RESPOND:
{
    "statusCode": 200,
    "success": true,
    "result": [
        {
            "name": "翟鸿发",
            "username": "xhf",
            "role": "211601",
            "user_code": "104",
            "dept_code": "211",
            "post_code": "601",
            "client_role": "211601",
            "role_type": "3",
            "role_info": {
                "role_name": "外贸组业务员",
                "dept_name": "外贸部",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "211",
                "post_code": "601"
            }
        },
        {
            "name": "皇甫雨齐",
            "username": "hfyq",
            "role": "211601",
            "user_code": "105",
            "dept_code": "211",
            "post_code": "601",
            "client_role": "211601",
            "role_type": "3",
            "role_info": {
                "role_name": "外贸组业务员",
                "dept_name": "外贸部",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "211",
                "post_code": "601"
            }
        },
        {
            "name": "苏祀祥",
            "username": "ssx",
            "role": "212601",
            "user_code": "108",
            "dept_code": "212",
            "post_code": "601",
            "client_role": "212601",
            "role_type": "3",
            "role_info": {
                "role_name": "国内业务组业务员",
                "dept_name": "业务部",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "212",
                "post_code": "601"
            }
        },
        {
            "name": "陈钊龙",
            "username": "czl",
            "role": "212601",
            "user_code": "109",
            "dept_code": "212",
            "post_code": "601",
            "client_role": "212601",
            "role_type": "3",
            "role_info": {
                "role_name": "国内业务组业务员",
                "dept_name": "业务部",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "212",
                "post_code": "601"
            }
        },
        {
            "name": "陈丽华",
            "username": "clh",
            "role": "212601",
            "user_code": "110",
            "dept_code": "212",
            "post_code": "601",
            "client_role": "212601",
            "role_type": "3",
            "role_info": {
                "role_name": "国内业务组业务员",
                "dept_name": "业务部",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "212",
                "post_code": "601"
            }
        },
        {
            "name": "张勤",
            "username": "zq",
            "role": "220601",
            "user_code": "114",
            "dept_code": "220",
            "post_code": "601",
            "client_role": "220601",
            "role_type": "3",
            "role_info": {
                "role_name": "渠道部业务员",
                "dept_name": "渠道部",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "220",
                "post_code": "601"
            }
        },
        {
            "name": "陈鹏",
            "username": "cp",
            "role": "310601",
            "user_code": "127",
            "dept_code": "310",
            "post_code": "601",
            "client_role": "310601",
            "role_type": "3",
            "role_info": {
                "role_name": "大沥门店业务员",
                "dept_name": "大沥门店",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "310",
                "post_code": "601"
            }
        },
        {
            "name": "詹致霖",
            "username": "zzl",
            "role": "310601",
            "user_code": "128",
            "dept_code": "310",
            "post_code": "601",
            "client_role": "310601",
            "role_type": "3",
            "role_info": {
                "role_name": "大沥门店业务员",
                "dept_name": "大沥门店",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "310",
                "post_code": "601"
            }
        },
        {
            "name": "顾守勇",
            "username": "gsy",
            "role": "320601",
            "user_code": "132",
            "dept_code": "320",
            "post_code": "601",
            "client_role": "320601",
            "role_type": "3",
            "role_info": {
                "role_name": "中山门店业务员",
                "dept_name": "中山门店",
                "post_name1": "业务员",
                "role_type": "3",
                "dept_code": "320",
                "post_code": "601"
            }
        }
    ]
}
```

### select/class

查询事件类型/事件类型编码

建议：前端只传入事件类型名称，事件类型编码由后台生成

需要创建事件类型，可以调用 create/class 接口

```json
method: GET
path: select/class

REQUSET:
{}

RESPOND:
{
    "statusCode": 200,
    "success": true,
    "result": [
        {
            "classname": "default",
            "code": "0A"
        },
        {
            "classname": "NEW CLASS",
            "code": "0B"
        },
        {
            "classname": "default",
            "code": "0B"
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": null
        },
        {
            "classname": null,
            "code": "0A"
        },
        {
            "classname": "123",
            "code": "0Ba"
        },
        {
            "classname": "class1",
            "code": "abc"
        },
        {
            "classname": "default1",
            "code": "13"
        }
    ]
}

REQUSET:
{
    classname: default
}

RESPOND:
{
    "statusCode": 200,
    "success": true,
    "result": [
        {
            "classname": "default",
            "code": "0A"
        },
        {
            "classname": "default",
            "code": "0B"
        }
    ]
}
```

## 2.create

### create/event

与原来接口不同的地方在于：touserCode 需传入一个数组

```json
method: POST
path: create/event

REQUEST:
{
    "fromuserCode": 11,
    "touserCode": [
        11,
        104
    ],
    "name": "解雇",
    "sendStatus": 1,
    "eventClass": "default",
    "timeClass": 1,
    "routeCode": 111,
    "detail_0": 1111
}

RESPOND:
{
    "statusCode": 200,
    "success": true,
    "data": {
        "Id": 76,
        "fromuserCode": 11,
        "touserCode": "[11, 104]",
        "name": "解雇",
        "impNumber": "0A-20210125-0016",
        "timeClass": 1,
        "createTime": "2021-01-25T03:26:30.000Z",
        "processedTime": null,
        "updateTime": null,
        "sendTime": null,
        "receiveTime": null,
        "eventClass": "default",
        "eventClassCode": "0A",
        "sendStatus": 1,
        "receiveStatus": 0,
        "handleStatus": 0,
        "Deadline": null,
        "routeCode": "111",
        "detail_0": "1111",
        "detail_1": null,
        "detail_2": null,
        "detail_3": null,
        "detail_4": null,
        "detail_5": null,
        "detail_6": null,
        "detail_7": null,
        "detail_8": null,
        "detail_9": null,
        "detail_10": null,
        "fromUser": {
            "name": "Jack",
            "username": "jack",
            "sex": null,
            "role": "designer",
            "user_code": "11",
            "client_role": "designer",
            "role_type": "0",
            "dept_code": "0",
            "post_code": "0"
        },
        "toUser": [
            {
                "name": "Jack",
                "username": "jack",
                "sex": null,
                "role": "designer",
                "user_code": "11",
                "client_role": "designer",
                "role_type": "0",
                "dept_code": "0",
                "post_code": "0"
            },
            {
                "name": "翟鸿发",
                "username": "xhf",
                "sex": null,
                "role": "211601",
                "user_code": "104",
                "client_role": "211601",
                "role_type": "3",
                "dept_code": "211",
                "post_code": "601"
            }
        ]
    }
}

```

#### 备注

`detail_0` 字段作为 pollevent 的 detail 保存，作为事件通知的预览。

### create/class

```json
method: POST
path: create/class

REQUEST:
{
	classname:hahaha
}
RESPOND:
{
    "statusCode": 200,
    "success": true,
    "result": {
        "classname": "hahaha",
        "code": "15"
    }
}
```

## 3.update

update接口保持不变。

```json
method: POST
path: update/sendStatus

REQUEST:
{
    "sendStatus": 1,
    "Id": 75
}
RESPOND:
{
    "statusCode": 200,
    "success": true,
    "data": {
        "Id": 75,
        "fromuserCode": 101,
        "touserCode": "[11, 104]",
        "name": "解雇",
        "impNumber": "0A-20210125-0016",
        "timeClass": 1,
        "createTime": "2021-01-24T14:22:55.000Z",
        "processedTime": null,
        "updateTime": "2021-01-25T03:34:43.000Z",
        "sendTime": "2021-01-25T03:34:43.000Z",
        "receiveTime": null,
        "eventClass": "default",
        "eventClassCode": "0A",
        "sendStatus": 1,
        "receiveStatus": 0,
        "handleStatus": 0,
        "Deadline": null,
        "routeCode": "111",
        "detail_0": "1111",
        "detail_1": null,
        "detail_2": null,
        "detail_3": null,
        "detail_4": null,
        "detail_5": null,
        "detail_6": null,
        "detail_7": null,
        "detail_8": null,
        "detail_9": null,
        "detail_10": null,
        "fromUser": {
            "name": "皇甫菊华",
            "username": "hfjh",
            "sex": null,
            "role": "zjb_zjl",
            "user_code": "101",
            "client_role": "100101",
            "role_type": "1",
            "dept_code": "100",
            "post_code": "101"
        },
        "toUser": [
            {
                "name": "Jack",
                "username": "jack",
                "sex": null,
                "role": "designer",
                "user_code": "11",
                "client_role": "designer",
                "role_type": "0",
                "dept_code": "0",
                "post_code": "0"
            },
            {
                "name": "翟鸿发",
                "username": "xhf",
                "sex": null,
                "role": "211601",
                "user_code": "104",
                "client_role": "211601",
                "role_type": "3",
                "dept_code": "211",
                "post_code": "601"
            }
        ]
    }
}
```

## 4.poll

只保留了主动轮询

### poll/active

```
method: GET
path: poll/active

REQUEST:
{
	touserCode: 104
}
RESPOND:
{
    "statusCode": 200,
    "success": true,
    "data": [
        {
            "Id": 19,
            "touserCode": 104,
            "impNumber": "0A-20210125-0017",
            "detail": "1111",
            "fromuserCode": 11,
            "eventId": 77,
            "isReceived": 0,
            "fromUser": {
                "name": "Jack",
                "username": "jack",
                "sex": null,
                "role": "designer",
                "user_code": "11",
                "client_role": "designer",
                "role_type": "0",
                "dept_code": "0",
                "post_code": "0"
            }
        }
    ]
}
```

#### 备注

在接收后会将 pollevent 中的 isRecieved 字段置为1

