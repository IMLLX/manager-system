# 数据库字段

## eventdata(事件表)

~~当前还没写事件的详情字段和界面id，想等逻辑完善了再加…~~

### Id

事件Id、主索引

### fromUserId

事件发起者的Id

### toUserId

事件接收者的Id

### name

事件名称

### impNumber

执行编码

#### 格式

`YYMMDD` + `事件类型编码` +`事件类型序号`

### timeClass

时限类型。

#### 值

1：紧急

0：正常

### eventClass

事件类型

### receiveStatus

事件的收状态

#### 值

0：未接收

1：已发送

### routeCode

界面编号

### sendStatus

事件的发状态

#### 值

0：未发送

1：已发送

### createTime

事件创建时间

### handleStatus

事件处理状态

#### 值

1：已完成

0：未完成

2：待完成

### deadline

事件截止时间

### updateTime

事件更新时间，创建、收发事件都会更新为当前时间

### processedTime

事件处理时间

### sendTime

事件发送时间

### detail_[0~10]

事件详情字段

## userdata(用户表)

### Id

主索引、用户Id

### name

用户名

### post

岗位Id

### org

组织Id

### usernum

用户编号

#### 格式

`组织编号` + `岗位编号` + `组织岗位序号`

### password

用户登录密码

## orginfo(组织表)

### name

组织名称

### number

组织编号

## postinfo(岗位表)

### name

岗位名称

### number

岗位编号

## pollevent(待通知事件)

### toUserId

接收者Id

### impNumber

事件执行编码

# API

## SELECT

查询数据库的数据

### SelectEvent

#### 描述

查询由某人发给另一个人的事件

**会筛选出所有符合传入参数的事件**

#### 请求格式

```json
url: "/select/event"
method: GET
content-type: JSON

请求格式：
{
    "fromUserId": 1,	// 发起者
    "toUserId": 4,		// 接收者
    "name": "解雇",		// 事件名称
    "eventClass": "default",	// 事件类
    "eventClassCode": "0A",		// 类编号
    "timeClass": 1,			// 时间类型
    "routeCode": 111,		// 界面编码
    "detail_0": 1111,		// 保留字段
    "page":{
		pageSize: '',		// 不传值默认 10
		currPage: ''		// 不传值默认 1
	},    
    "createTime": {
        "date": "2020-10-27"
    	//"year":"2020"
        //"month":"2020-10"
    },
}
```

#### 响应

```json
请求成功：
{
    "success": true,
    "results": [
        {
            "Id": 10,		// 事件id
            "fromUserId": 1,	// 发起者
            "toUserId": 4,		// 接收者
            "name": "解雇",		// 事件名
            "impNumber": "201027",	// 执行编码
            "timeClass": 1,			// 时间类
            "createTime": "2020-10-27 20:46:37",	// 创建时间
            "processedTime": null,		// 执行时间
            "updateTime": null,		// 更新时间
            "sendTime": null,		// 发送时间
            "receiveTime": null,	// 接收时间
            "eventClass": "default",	// 事件类
            "eventClassCode": "0A",	// 类编码
            "sendStatus": 0,		// 发送状态
            "receiveStatus": null,	// 接收状态
            "handleStatus": 1,		// 处理状态
            "Deadline": null,		// 截止时间(暂时没用)
            "routeCode": "111",		// 界面编码
            "detail_0": "1111",		// 保留字
            "detail_1": null,
            "detail_2": null,
            "detail_3": null,
            "detail_4": null,
            "detail_5": null,
            "detail_6": null,
            "detail_7": null,
            "detail_8": null,
            "detail_9": null,
            "fromUser": {		// 发送者
                "Id": 1,
                "name": "张三",
                "post": "1",	// 岗位名
                "org": null,	// 组织名
                "usernum": null,	// 用户编号
                "password": "default"		// 密码
            },
            "toUser": {			// 接收者
                "Id": 4,
                "name": "hhh",
                "post": "hh",
                "org": "hh",
                "usernum": "hhh",
                "password": "default"
            }
        },  
        // 此处省略了一些 result
    ],
    "page": {
        "totalCount": 19,
        "pageSize": 10,
        "totalPage": 2,
        "currPage": 1,
    },
    "code": "200"
}
```

### 排序

以上请求可以传入 `order` 参数来按照 `待完成` 、`未完成 `、`已完成` 排序。

#### 请求格式

```json
{
    "fromUserId": 1,		// 发送者
    "toUserId": 4,			// 接收者
    "name": "解雇",			// 事件名
    "eventClass": "default",	// 事件类
    "eventClassCode": "0A",		// 类编号
    "timeClass": 1,		// 时间类
    "routeCode": 111,	// 界面编码
    "detail_0": 1111,		// 保留字段
    "order":true 	// 传入排序参数
}
```

#### 响应

```json
{
    "results": [
        [
            {
                "Id": 3,
                "FromUserId": 2,
                "ToUserId": 1,
                "Name": "解雇",
                "ImpNumber": "Error",
                "TimeClass": 0,
                "EventClass": "default",
                "RSStatus": 1,
                "CreateTime": "2020-10-17T09:03:04.000Z",
                "HandleStatus": 1,
                "Deadline": "2020-10-20T00:50:21.000Z",
                "UpdateTime": "2020-10-20T00:51:53.000Z",
                "HandleTime": "2020-10-20T00:51:53.000Z",
                "SendTime": "2020-10-20T00:50:21.000Z"
            },
            {
                "Id": 5,
                "FromUserId": 2,
                "ToUserId": 1,
                "Name": "解雇",
                "ImpNumber": "2010200104",
                "TimeClass": 0,
                "EventClass": "default",
                "RSStatus": 0,
                "CreateTime": "2020-10-20T08:58:31.000Z",
                "HandleStatus": 1,
                "Deadline": null,
                "UpdateTime": "2020-10-20T09:21:45.000Z",
                "HandleTime": null,
                "SendTime": null
            },
            {
                "Id": 8,
                "FromUserId": 2,
                "ToUserId": 1,
                "Name": "解雇",
                "ImpNumber": "2010200107",
                "TimeClass": 0,
                "EventClass": "default",
                "RSStatus": 0,
                "CreateTime": "2020-10-20T09:38:22.000Z",
                "HandleStatus": 1,
                "Deadline": null,
                "UpdateTime": null,
                "HandleTime": null,
                "SendTime": null
            },
            {
                "Id": 7,
                "FromUserId": 2,
                "ToUserId": 1,
                "Name": "解雇",
                "ImpNumber": "2010200106",
                "TimeClass": 0,
                "EventClass": "default",
                "RSStatus": 0,
                "CreateTime": "2020-10-20T09:38:15.000Z",
                "HandleStatus": 0,
                "Deadline": null,
                "UpdateTime": null,
                "HandleTime": null,
                "SendTime": null
            },
            {
                "Id": 6,
                "FromUserId": 2,
                "ToUserId": 1,
                "Name": "解雇",
                "ImpNumber": "2010200105",
                "TimeClass": 0,
                "EventClass": "default",
                "RSStatus": 0,
                "CreateTime": "2020-10-20T09:38:00.000Z",
                "HandleStatus": -1,
                "Deadline": null,
                "UpdateTime": null,
                "HandleTime": null,
                "SendTime": null
            }
        ]
    ],
    "code": "200"
}
```

### SelectClass

#### 请求格式

```json
url: "/select/class"
method: GET
content-type: JSON

请求示例 1：
{
    eventClassCode:"0A",
}
响应 1：
{
    "success": true,
    "result": {
        "classname": "default"
    }
}

请求示例 2：
{
    "eventClass":"default"
}
响应 2：
{
    "success": true,
    "result": {
        "code": "0A"
    }
}
```



## CREATE

### CreateEvent

#### 描述

新建一个事件。

**新建事件时，`eventClass` 和 `eventClassCode` 有一个不一样就会创建新的事件类型**

因此建议输入完 `eventClass` 或者 `eventClassCode ` 后调用 `SelectClass` 接口自动补全另一个字段



#### 请求格式

```json
url: "/create/event"
method: POST
content-type: JSON

请求示例：
{
    "fromUserId": 1,		// 发送者
    "toUserId": 4,			// 接收者
    "name": "解雇",			// 事件名
    "eventClass": "default",	// 事件类
    "eventClassCode": "0A",		// 类编号
    "timeClass": 1,		// 时间类
    "routeCode": 111,	// 界面编码
    "detail_0": 1111,		// 保留字段
}
```

#### 响应

```json
请求成功：
{
    "success": true,
    "msg": "创建成功",
    "result": {
        "Id": 19,		// 事件id
        "fromUserId": 1,	// 发送者
        "toUserId": 4,		// 接收者
        "name": "解雇",	// 事件名
        "impNumber": "201027",	// 执行编码
        "timeClass": 1,		// 时间类
        "createTime": "2020-10-27 20:53:24",		// 创建时间
        "processedTime": null,	// 处理时间
        "updateTime": null,	// 更新时间
        "sendTime": null,	// 发送时间
        "receiveTime": null,	// 接收时间
        "eventClass": "default",	// 事件类
        "eventClassCode": "0A",		// 类编码
        "sendStatus": 0,			// 发送状态
        "receiveStatus": null,		// 接收状态
        "handleStatus": 1,			// 处理状态
        "Deadline": null,			
        "routeCode": "111",		// 界面编码
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
        "fromUser": {	// 发送者
            "Id": 1,
            "name": "张三",
            "post": "1",
            "org": null,
            "usernum": null,
            "password": "default"
        },
        "toUser": {		// 接收者
            "Id": 4,
            "name": "hhh",
            "post": "hh",
            "org": "hh",
            "usernum": "hhh",
            "password": "default"
        }
    },
    "code": "201"
}
创建失败：
{
    "success": false,
    "msg": "创建失败",
    "code": 400,
    "result": {},
}
```

#### 草稿事件

将请求中的 `sendStatus` 置 `0` 为保存草稿事件

草稿事件不会生成执行编码，不会生成通知，查询通过事件 Id 来查

### CreateUser

#### 描述

创建用户。

#### 请求格式

```json
url: "/create/user"
method: POST
content-type: JSON
{
    "name": "李四",
    "post": "default",		// 岗位名	
    "org": "default"		// 组织名
}
```

#### 响应

```json
请求成功：
{
    "success": true,
    "msg": "创建成功",
    "result": {
        "Id": 9,
        "name": "李四",
        "post": "default",
        "org": "default",
        "usernum": "010105"		// 用户编号
    },
    "code": "201"
}
请求失败：
{
    "success": false,
    "msg": "创建失败",
    "code": 400,
    "result": {},
}
```

## DELETE

### DeleteEvent

#### 描述

根据 `id` 删除特定事件

#### 请求格式

```json
url: '/delete'
method: POST
content-type: JSON
请求示例：
{
    "Id":"2"
}
```

#### 响应

```json
删除成功：
{
    "success": true,
    "msg": "删除成功",
    "code": "204"
}
删除失败：
{
    "success": false,
    "msg": "删除失败",
    "code": "400",
}
```

## UPDATE

### receiveStatus/sendStatus/handleStatus

#### 描述

更新事件的收发状态

#### 请求格式

```json
url: "/update/receivestatus"
method: POST
content-type: JSON
以 receiveStatus 为例 其他类似

注意sendStatus 一旦改变 会触发创建通知

请求示例:
{
    "Id":"3",
    "receiveStatus":1		// 接收状态
}
```

#### 响应

```json
请求成功：
{
    "msg": "接收成功",
    "success": true,
    "result": {
        "Id": 3,
        "fromUserId": 2,
        "toUserId": 1,
        "name": "解雇",
        "impNumber": "Error",
        "timeClass": 0,
        "createTime": "2020-10-17 17:03:04",
        "processedTime": "2020-10-20 08:51:53",
        "updateTime": "2020-10-30 21:49:59",
        "sendTime": "2020-10-24 21:01:01",
        "receiveTime": "2020-10-30 21:49:59",
        "eventClass": "default",
        "eventClassCode": null,
        "sendStatus": 1,
        "receiveStatus": "1",
        "handleStatus": 1,
        "Deadline": "2020-10-20 08:50:21",
        "routeCode": null,
        "detail_0": null,
        "detail_1": null,
        "detail_2": null,
        "detail_3": null,
        "detail_4": null,
        "detail_5": null,
        "detail_6": null,
        "detail_7": null,
        "detail_8": null,
        "detail_9": null
    },
    "code": "201"
}

请求失败：
{
    "msg":"更新失败",
    "success":false,
    "code":400
}
```

## LOGIN

### 描述

用户登录

### 请求格式

```json
url: "/login"
method: POST
content-type: JSON

请求示例：
{
    "UserNum": "010101",
    "Password": "default"
}
```

### 响应

```json
登录成功：
{
    "code": "200",
    "msg": "登录成功",
    "user": {
        "Id": 5,
        "Name": "李四",
        "Post": "default",
        "Org": "default",
        "UserNum": "010101",
        "Password": "default"
    }
}
密码错误：
{
    "code": "400",
    "msg": "密码错误"
}
用户不存在：
{
    "code": "404",
    "msg": "用户不存在"
}
```

## POLL

### 描述

获取用户通知。请求成功后会删除记录。

### 请求格式

```json
url: "/poll"
method: GET
content-type: JSON
请求示例：
{
    "toUserId":2 
}
```

### 响应

```
超时时间 ：10分钟
请求成功：
{
    "code": "200",
    "result": [
        {
            "Id": 1,
            "toUserId": 2,
            "impNumber": "20020121"
        }
    ],
    "success": true
}
超时：
{
	"code": 202,
    "msg": "获取超时"
}

```



# TODO

## ~~通知~~

## ~~登录~~

## 字段检测

## …