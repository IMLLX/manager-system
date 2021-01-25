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

