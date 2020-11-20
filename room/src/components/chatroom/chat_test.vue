<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">聊天室调测系统（ChatRoom Tutorial）</h2>
    <p class="text-unit" style="color: #ef4f4f">ChatRoom SDK是基于面对对象的实现，所以需要初始化initChatroom实例才能调用相关的接口！</p>

    <!-- 登录/登出 -->
    <p class="text-unit">登录/登出</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="appid">
            <el-input v-model="appid" disabled style="width:150px;"></el-input>
          </el-form-item>
          <el-form-item label="uid">
            <el-input v-model="uid" disabled style="width:150px;"></el-input>
          </el-form-item>
          <el-form-item label="用户归属地">
            <template>
              <el-select v-model="userRegion" placeholder="userRegion" style="width:150px;">
                <el-option
                  v-for="item in regions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="login" style="border-radius: 4px">login</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="logout" style="border-radius: 4px">logout</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{loginRes}}</p>
    </div>

    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="chatroom聊天室" name="chatroom">
        <!-- 初始化chatroom -->
        <p class="text-unit" style="color: #ef4f4f">初始化initChatRoom（如果需要创建聊天室，请先调用createChatRoom）</p>
        <el-row type="flex">
          <el-col :span="24" style="height:35px; text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item label="region">
                <template>
                  <el-select v-model="region" placeholder="region" style="width:150px;">
                    <el-option
                      v-for="item in regions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item label="roomid">
                <el-input v-model="roomid" style="width:150px;"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button @click="showSetGroupAttributesModel" style="border-radius:4px">attributes</el-button>
              </el-form-item>
              <!--
              <el-form-item class="search">
                <el-button type="primary" @click="showCreateGroupModel" style="border-radius: 4px">createChatRoom</el-button>
              </el-form-item>
              -->
              <el-form-item class="search">
                <el-button type="primary" @click="createChatRoom" style="border-radius: 4px">createChatRoom</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="initChatRoom" style="border-radius: 4px">initChatRoom</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <!--
        <el-dialog align="left" title="创建ChatRoom" :visible="createGroupModelVisible" @close="closeCreateGroupModel">
          <create-group :hummer="hummer" @onGetChatRoom=getChatRoom></create-group>
        </el-dialog>
        -->

        <el-dialog align="left" title="atrributes" :visible="setGroupAttributesVisible" @close="closeSetGroupAttributesModel">
          <editable-table
          :tableData="this.setGroupAttributes" @onGetPlainObject="onSetChatRoomAttributes"></editable-table>
        </el-dialog>

        <p class="text-unit">加入/退出聊天室</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24"  style="height:35px; text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item class="search">
                <el-button @click="showJoinChatRoomPropsModel" style="border-radius: 4px">joinProps</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="joinChatRoom" style="border-radius: 4px">joinChatRoom</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="leaveChatRoom" style="border-radius: 4px">leaveChatRoom</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{joinOrLeaveRes}}</p>
        </div>

        <el-dialog align="left" title="joinProps" :visible="joinChatRoomPropsVisible" @close="closeJoinChatRoomPropsModel">
          <editable-table
          :tableData="this.joinProps" @onGetPlainObject="onJoinChatRoomProps"></editable-table>
        </el-dialog>

        <p class="text-unit">更新聊天室信息</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24"  style="height:35px; text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item class="search">
                <el-button @click="showUpdateGroupAttributesModel" style="border-radius:4px">attributes</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="updateChatRoomAttributes" style="border-radius:4px">updateChatRoomAttributes</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{updateChatRoomAttributesRes}}</p>
        </div>

        <el-dialog align="left" title="atrributes" :visible="updateGroupAttributesVisible" @close="closeUpdateGroupAttributesModel">
          <editable-table
          :tableData="this.groupAttributes" @onGetPlainObject="onUpdateChatRoomAttributes"></editable-table>
        </el-dialog>

        <p class="text-unit">获取聊天室属性</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24"  style="height:35px;text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item class="search">
                <el-button type="primary" @click="getChatRoomAttributes" style="border-radius:4px">getChatRoomAttributes</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{getChatRoomAttributesRes}}</p>
        </div>

        <p class="text-unit">解散聊天室</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px; text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item class="search">
                <template>
                  <el-popconfirm
                    confirmButtonText='确定'
                    cancelButtonText='取消'
                    icon="el-icon-info"
                    iconColor="red"
                    title="确认解散聊天室Room?"
                    @onConfirm="dismissChatRoom"
                  >
                    <el-button type="primary" slot="reference" style="border-radius: 4px">dismissChatRoom</el-button>
                  </el-popconfirm>
                </template>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{dismissChatRoomRes}}</p>
        </div>

        <!--
        <p class="text-unit">剔除用户</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24"  style="height:35px;text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item label="uid">
                <el-input v-model="kickOffUserReq.uid"></el-input>
              </el-form-item>
              <el-form-item label="secs">
                <el-input v-model="kickOffUserReq.secs"></el-input>
              </el-form-item>
              <el-form-item label="reason">
                <el-input v-model="kickOffUserReq.reason"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="kickOffUser" style="border-radius: 4px">kickOffUser</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{kickOffUserRes}}</p>
        </div>
        -->

        <p class="text-unit">发送广播消息</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;">
            <el-form :inline="true" size="small">
              <el-form-item class="search">
                <el-button @click="showSendGroupMessageAttributesModel" style="border-radius:4px">kvExtra</el-button>
              </el-form-item>
              <el-form-item label="content">
                <el-input v-model="sendGroupMessageReq.content"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="sendGroupMessage" style="border-radius: 4px">sendGroupMessage</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{sendGroupMessageRes}}</p>
        </div>

        <el-dialog
          align="left"
          title="atrributes"
          :visible="setSendGroupMessageAttributesVisible"
          @close="closeSendGroupMessageAttributesModel">
          <editable-table
            :tableData="this.sendGroupMessageAttributes"
            @onGetPlainObject="onSendGroupMessageAttributes"
            @close="closeSendGroupMessageAttributesModel">
          </editable-table>
        </el-dialog>

        <p class="text-unit">发送单播消息</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item class="search">
                <el-button @click="showSendSingleUserAttributesModel" style="border-radius:4px">kvExtra</el-button>
              </el-form-item>
              <el-form-item label="content">
                <el-input v-model="sendSingleUserMessageReq.content"></el-input>
              </el-form-item>
              <el-form-item label="receiver">
                <el-input v-model="sendSingleUserMessageReq.receiver"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="sendSingleUserMessage" style="border-radius: 4px">sendSingleUserMessage</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{sendSingleUserMessageRes}}</p>
        </div>

        <el-dialog
          align="left"
          title="atrributes"
          :visible="setSendSingleUserAttributesVisible"
          @close="closeSendSingleUserAttributesModel">
          <editable-table
            :tableData="this.sendSingleUserAttributes"
            @onGetPlainObject="onSendSingleUserAttributes"
            @close="closeSendSingleUserAttributesModel">
          </editable-table>
        </el-dialog>

        <p class="text-unit">发送公屏</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item label="extra">
                <el-input v-model="sendTextChatReq.extra"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button @click="showSendTextExtAttributesModel" style="border-radius:4px">kvExtra</el-button>
              </el-form-item>
              <el-form-item label="chat">
                <el-input v-model="sendTextChatReq.chat"></el-input>
              </el-form-item>
            <el-form-item class="search">
                <el-button type="primary" @click="sendTextChat" style="border-radius: 4px">sendTextChat</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{sendTextChatRes}}</p>
        </div>

        <el-dialog
          align="left"
          title="extProps"
          :visible="setSendTextExtAttributesVisible"
          @close="closeSendTextExtAttributesModel">
          <editable-table
            :tableData="this.sendTextExtAttributes"
            @onGetPlainObject="onSendTextExtAttributes"
            @close="closeSendTextExtAttributesModel">
          </editable-table>
        </el-dialog>

        <el-dialog
          align="left"
          title="chatProps"
          :visible="setSendTextChatAttributesVisible"
          @close="closeSendTextChatAttributesModel">
          <editable-table
            :tableData="this.sendTextChatAttributes"
            @onGetPlainObject="onSendTextChatAttributes"
            @close="closeSendTextChatAttributesModel">
          </editable-table>
        </el-dialog>

        <!--
        <p class="text-unit">获取聊天室所有管理员</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24"  style="height:35px; text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item label="roler">
                <el-input v-model="getChatRoomManagerReq.roler" disabled></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="getChatRoomManager" style="border-radius: 4px">getChatRoomManager</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{getChatRoomManagerRes}}</p>
        </div>
        -->

        <p class="text-unit">获取聊天室用户数</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24"  style="height:35px; text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item label="region">
                <template>
                  <el-select v-model="getUserCountReq.region" placeholder="region" style="width:150px;">
                    <el-option
                      v-for="item in regions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item label="roomid">
                <el-input v-model="getUserCountReq.roomid" style="width:150px;"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="getUserCount" style="border-radius:4px">getUserCount</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{getUserCountRes}}</p>
        </div>

        <p class="text-unit">获取聊天室用户列表</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24"  style="height:35px; text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item label="num">
                <el-input v-model="getUserListReq.num"></el-input>
              </el-form-item>
              <el-form-item label="pos">
                <el-input v-model="getUserListReq.pos"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="getUserList" style="border-radius:4px">GetUserList</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{getUserListRes}}</p>
        </div>

        <p class="text-unit">禁言/解禁</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item label="uid">
                <el-input v-model="muteUserReq.uid"></el-input>
              </el-form-item>
              <el-form-item label="secs">
                <el-input v-model="muteUserReq.secs"></el-input>
              </el-form-item>
              <el-form-item label="reason">
                <el-input v-model="muteUserReq.reason"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="muteUser" style="border-radius:4px">muteUser</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="unMuteUser" style="border-radius:4px">unMuteUser</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{muteUserRes}}</p>
        </div>

        <p class="text-unit">获取禁言用户列表</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item class="search">
                <el-button type="primary" @click="getMutedUserList" style="border-radius:4px">getMutedUserList</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{getMutedUserListRes}}</p>
        </div>

        <p class="text-unit">设置用户属性</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item>
                <el-button @click="showSetGroupUserAttributesModel" style="border-radius:4px">attributes</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="setUserAttributes" style="border-radius: 4px">setUserAttributes</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{setUserAttributesRes}}</p>
        </div>

        <el-dialog align="left" title="atrributes" :visible="setGroupUserAttributesVisible" @close="closeSetGroupUserAttributesModel">
          <editable-table
          :tableData="this.groupUserAttributes" @onGetPlainObject="onSetChatRoomUserAttributes"></editable-table>
        </el-dialog>

        <p class="text-unit">查询用户属性列表</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item class="search">
                <el-button type="primary" @click="getUserAttributesList" style="border-radius:4px">getUserAttributesList</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{getUserAttributesListRes}}</p>
        </div>

        <p class="text-unit">查询历史消息</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px; text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item label="msgTypes">
                <el-input v-model="fetchHistoryMessagesReq.msgTypes" style="width:50px;"></el-input>
              </el-form-item>
              <el-form-item label="direction">
                <el-input v-model="fetchHistoryMessagesReq.direction" style="width:50px;"></el-input>
              </el-form-item>
              <el-form-item label="limit">
                <el-input v-model="fetchHistoryMessagesReq.limit" style="width:100px;"></el-input>
              </el-form-item>
              <!--
              <el-form-item label="anchor">
                <el-input v-model="fetchHistoryMessagesReq.anchor" style="width:250px;"></el-input>
              </el-form-item>
              -->
              <el-form-item label="anchor">
                <template>
                  <el-select v-model="fetchHistoryMessagesReq.anchor" placeholder="anchor" filterable @blur="selectBlur" style="width:250px;">
                    <el-option
                      v-for="item in anchors"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="fetchHistoryMessages" style="border-radius:4px">fetchHistoryMessages</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{fetchHistoryMessagesRes}}</p>
        </div>

        <el-divider content-position="left">房间扩展属性</el-divider>
        <p class="text-unit">设置房间扩展属性</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item>
                <el-button @click="showSetRoomExtraAttributesModel" style="border-radius:4px">extraAttributes</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="setRoomExtraAttributes" style="border-radius: 4px">setRoomExtraAttributes</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{setRoomExtraAttributesRes}}</p>
        </div>

        <el-dialog align="left" title="extraAttributes" :visible="setRoomExtraAttributesVisible" @close="closeSetRoomExtraAttributesModel">
          <editable-table
          :tableData="setRoomExtraAttributesReq.extraAttributes" @onGetPlainObject="onSetRoomExtraAttributes"></editable-table>
        </el-dialog>

        <p class="text-unit">更新房间某些扩展属性</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item>
                <el-button @click="showUpdateRoomExtraAttributesModel" style="border-radius:4px">extraAttributes</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="updateRoomExtraAttributes" style="border-radius:4px">updateRoomExtraAttributes</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{updateRoomExtraAttributesRes}}</p>
        </div>

        <el-dialog align="left" title="extraAttributes" :visible="updateRoomExtraAttributesVisible" @close="closeUpdateRoomExtraAttributesModel">
          <editable-table
          :tableData="updateRoomExtraAttributesReq.extraAttributes" @onGetPlainObject="onUpdateRoomExtraAttributes"></editable-table>
        </el-dialog>

        <p class="text-unit">删除房间某些扩展属性(key用","隔开)</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;">
            <el-form :inline="true" size="small">
              <el-form-item label="extraKeys">
                <el-input v-model="deleteRoomExtraAttributesReq.extraKeys"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="deleteRoomExtraAttributes" style="border-radius:4px">deleteRoomExtraAttributes</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{deleteRoomExtraAttributesRes}}</p>
        </div>

        <p class="text-unit">清空房间扩展属性</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;">
            <el-form :inline="true"  size="small">
              <el-form-item class="search">
                <el-button type="primary" @click="clearRoomExtraAttributes" style="border-radius:4px">clearRoomExtraAttributes</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{clearRoomExtraAttributesRes}}</p>
        </div>

        <p class="text-unit">查询房间扩展属性(key用","隔开)</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px; text-align:left;">
            <el-form :inline="true" size="small">
              <el-form-item label="extraKeys">
                <el-input v-model="fetchRoomExtraAttributesReq.extraKeys"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="fetchRoomExtraAttributes" style="border-radius:4px">fetchRoomExtraAttributes</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{fetchRoomExtraAttributesRes}}</p>
        </div>

        <el-divider content-position="left">特殊案例</el-divider>
        <el-row type="flex" class="row-bg">
          <el-button @click="set32RoomExtraAttributes" type="primary" size="small">设置32个房间扩展属性</el-button>
          <el-button @click="set33RoomExtraAttributes" type="primary" size="small">设置33个房间扩展属性</el-button>
        </el-row>
        <div class="text">
          <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{set32RoomExtraAttributesRes}}</p>
        </div>

        <el-row type="flex" class="row-bg">
          <el-button @click="update32RoomExtraAttributes" type="primary" size="small">更新32个房间扩展属性</el-button>
          <el-button @click="update33RoomExtraAttributes" type="primary" size="small">更新33个房间扩展属性</el-button>
        </el-row>
        <div class="text">
          <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{update32RoomExtraAttributesRes}}</p>
        </div>

      </el-tab-pane>
      
      <el-tab-pane label="P2P消息" name="p2p">
        <p class="text-unit">查询在线状态(uid用","隔开)</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px; text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item label="uids">
                <el-input v-model="fetchUserOnlineStatusReq.uids"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="fetchUserOnlineStatus" style="border-radius:4px">fetchUserOnlineStatus</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{fetchUserOnlineStatusRes}}</p>
        </div>

        <p class="text-unit">发送点对点（P2P）消息</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height: 45px;text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item label="isOffline">
                <template>
                  <el-select v-model="sendP2PMessageReq.options.isOffline" placeholder="isOffline" style="width:80px;">
                    <el-option
                      v-for="item in isOffline"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              <el-form-item>
                <el-button @click="showCreatePeerAppExtrasModel" style="border-radius:4px">appExtras</el-button>
              </el-form-item>
              <el-form-item label="content">
                <el-input v-model="sendP2PMessageReq.content" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item label="receiver">
                <el-input v-model="sendP2PMessageReq.receiver" style="width:150px;"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="sendP2PMessage" style="border-radius:4px">sendP2PMessage</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{sendP2PMessageRes}}</p>
        </div>

        <el-dialog
          align="left"
          title="atrributes"
          :visible="createPeerAppExtrasVisible"
          @close="closeCreatePeerAppExtrasModel">
          <editable-table
            :tableData="this.peerAppExtras"
            @onGetPlainObject="getPeerAppExtras"
            @close="closeCreatePeerAppExtrasModel">
          </editable-table>
        </el-dialog>

        <el-divider content-position="left">特殊案例</el-divider>
        <el-row type="flex" class="row-bg">
          <el-button @click="sendP2PMessage_Key32" type="primary" size="small">P2PMessage设置32个属性</el-button>
          <el-button @click="sendP2PMessage_Key33" type="primary" size="small">P2PMessage设置33个属性</el-button>
        </el-row>
        <div class="text">
          <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{sendP2PMessage_Key32Res}}</p>
        </div>

      </el-tab-pane>
      
      <el-tab-pane label="P2C Channel消息" name="p2c">
        <p class="text-unit" style="color: #ef4f4f">创建Channel实例</p>
        <el-row type="flex">
          <el-col :span="24" style="height:35px;text-align:left;">
            <el-form :inline="true"  size="small">
              <el-form-item class="search">
                <el-button type="primary" @click="showCreateChannelModel" style="border-radius: 4px">createChannel</el-button>
              </el-form-item>
              <el-form-item label="Channel列表[region:channelId](用于选择Channel)">
                <template>
                  <el-select v-model="regionChannelId" placeholder="" style="width: 200px;">
                    <el-option
                      v-for="item in regionChannelIds"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      <span style="float: left;" >{{ item.label.substr(0, Math.min(item.label.length, 30))}}</span>
                      <el-tooltip class="item" effect="light" :content="item.label" placement="right-end">
                      <span v-if="item.hasJoin" style="float: right; color: #00FF7F; font-size: 13px">已加入</span>
                      <span v-else style="float: right; color: #8492a6; font-size: 13px; margin-left: 5px">未加入</span>
                      </el-tooltip>
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-dialog align="left" title="创建Channel实例" :visible="createChannelModelVisible" @close="closeCreateChannelModel" customClass="customWidth">
          <create-channel :client="hummer" @onGetChannel=getChannel></create-channel>
        </el-dialog>

        <p class="text-unit">加入/退出Channel</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px; text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item class="search">
                <el-button type="primary" @click="joinChannel" style="border-radius:4px">joinChannel</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="leaveChannel" style="border-radius:4px">leaveChannel</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{joinOrLeaveChannelRes}}</p>
        </div>

        <p class="text-unit">发送Channel消息</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px; text-align:left;" >
            <el-form :inline="true" size="small">
              <!--
              <el-form-item label="isOffline">
                <template>
                  <el-select v-model="sendP2CMessageReq.options.isOffline" placeholder="isOffline" style="width:80px;">
                    <el-option
                      v-for="item in isOffline"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>
              -->
              <el-form-item>
                <el-button @click="showCreateChannelAppExtrasModel" style="border-radius:4px">appExtras</el-button>
              </el-form-item>
              <el-form-item label="content">
                <el-input v-model="sendP2CMessageReq.content" style="width:200px;"></el-input>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="sendP2CMessage" style="border-radius:4px">sendP2CMessage</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{sendP2CMessageRes}}</p>
        </div>

        <el-dialog
          align="left"
          title="atrributes"
          :visible="createChannelAppExtrasVisible"
          @close="closeCreateChannelAppExtrasModel">
          <editable-table
            :tableData="this.channelAppExtras"
            @onGetPlainObject="getChannelAppExtras"
            @close="closeCreateChannelAppExtrasModel">
          </editable-table>
        </el-dialog>

        <el-divider content-position="left">特殊案例</el-divider>
        <el-row type="flex" class="row-bg">
          <el-button @click="sendP2CMessage_Key32" type="primary" size="small">P2CMessage设置32个属性</el-button>
          <el-button @click="sendP2CMessage_Key33" type="primary" size="small">P2CMessage设置33个属性</el-button>
        </el-row>
        <div class="text">
          <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{sendP2CMessage_Key32Res}}</p>
        </div>

      </el-tab-pane>
      
      <el-tab-pane label="Token相关" name="token">
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item class="search">
                <el-button type="primary" @click="showRefreshTokenModel" style="border-radius: 4px">refreshToken(废弃)</el-button>
              </el-form-item>
              <el-form-item class="search">
                <el-button type="primary" @click="showRefreshToken1Model" style="border-radius: 4px">refreshToken1</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{refreshTokenRes}}</p>
        </div>

        <el-dialog align="left" title="刷新token" :visible="refreshTokenModelVisible" @close="closeRefreshTokenModel" customClass="customWidth">
          <refresh-token
            :hummer="hummer"
            :uid="uid"
            @onRefreshToken=refreshToken
          >
          </refresh-token>
        </el-dialog>

        <el-dialog align="left" title="刷新token1" :visible="refreshToken1ModelVisible" @close="closeRefreshToken1Model" customClass="customWidth">
          <refresh-token1
            :hummer="hummer"
            :uid="uid"
            @onRefreshToken1=refreshToken1
          >
          </refresh-token1>
        </el-dialog>

        <p class="text-unit">HummerSDK 当前所处的状态</p>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" style="height:35px;text-align:left;" >
            <el-form :inline="true"  size="small">
              <el-form-item class="search">
                <el-button type="primary" @click="getConnectionState" style="border-radius:4px">getConnectionState</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div class="text">
          <p class="rsp-text" type="textarea" contenteditable="false">{{state}}</p>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getStorage, setStorage, padMs, generateAttributes, timestampToTime } from '@/utils/BaseUtil'
  import { getRegions, getRegionRoomId, getRegionChannelId } from '@/components/room_config.js';
  import RefreshToken from '@/components/token/refresh_token.vue';
  import RefreshToken1 from '@/components/token/refresh_token1.vue';
  import CreateGroup from './create_group.vue';
  import CreateChannel from './create_channel.vue';
  import EditableTable from '@/components/units/editable_table.vue';
  //import Hummer from 'hummer-chatroom-sdk'

  const DEMO_TAG = "chatroom-demo"
  const log4test = (info, ext, ...args) => {
    let date = new Date();
    let timestamp = date.toLocaleTimeString('en-US', { hour12: false}) + "." + padMs(date.getMilliseconds())
    console.log(`${DEMO_TAG} ${timestamp} : ${info} ` + (ext ? JSON.stringify(ext) : ""), ...args)
  }

  const UID = getStorage('uid');
  const ROOMID = Number(getStorage('roomid'));
  const APPID = getStorage("appid");
  const TOKEN = getStorage('token');
  const REGION = getStorage('region');

  export default {
    name: 'chatroom-test',
    data() {
      return {
        activeName: 'chatroom',
        hummer: null,
        appid: Number(APPID),
        roomid: Number(ROOMID),
        uid: UID,
        token: TOKEN,
        region: 'cn',
        regions: getRegions(),
        userRegion: 'cn',
        state: '',
        chatroom: null,
        chatClient: null,
        chatrooms: [],
        regionChatroomId: '',
        regionChatroomIds: [],
        channelRegion: REGION || 'cn',
        userRegionFlag: false,
        regionChannelId: null,
        regionChannelIds: [],
        channels: [],
        channel: null,
        loginRes: '',
        refreshTokenRes: '',
        JoinChatRoomReq: {
          joinProps: {},
        },
        joinOrLeaveRes: '',
        setGroupAttributes: {
          "Name": "Hummer聊天室",
          "Description": "测试",
          "Bulletin": "公告",
          "AppExtra": "自定义",
        },
        groupAttributes: {
          "Name": "nginx大讲堂",
          "Description": "全栈技术",
          "Bulletin": "bull",
          "AppExtra": "ex",
        },
        groupUserAttributes: {},
        updateChatRoomAttributesRes: '',
        dismissChatRoomRes: '',
        kickOffUserReq: {
          uid: '123',
          secs: '3000',
          reason: "js KickOffUser",
        },
        kickOffUserRes: '',
        muteUserReq: {
          uid: '123',
          secs: '',
          reason: "",
        },
        muteUserRes: '',
        sendGroupMessageReq: {
          content: "js_sdk sendGroupMessage",
        },
        sendGroupMessageRes: '',
        sendSingleUserMessageReq: {
          content: "js_sdk sendUnicast",
          receiver: UID,
        },
        sendSingleUserMessageRes: '',
        sendTextChatReq: {
          chat: "js_sdk sendTextChat",
          extra: 'extra',
        },
        sendTextChatRes: '',
        getChatRoomAttributesRes: '',
        getChatRoomManagerReq: {
          roler: "owner"
        },
        getChatRoomManagerRes: '',
        getUserCountReq: {
          region: 'cn',
          roomid: Number(ROOMID),
        },
        getUserCountRes: '',
        getUserListReq: {
          num: 100,
          pos: 0,
        },
        getUserListRes: '',
        getMutedUserListRes: '',
        display: {
          RcvSingleUserData: "",
        },
        setUserAttributesReq: {
          key: 'Name',
          prop: '阿武'
        },
        setUserAttributesRes: '',
        getUserAttributesListRes: '',
        sendTextExtAttributes: {},
        sendTextChatAttributes: {},
        sendSingleUserAttributes: {},
        sendGroupMessageAttributes: {},
        fetchHistoryMessagesReq: {
          msgTypes: '0',
          direction: 0,
          limit: 100,
          anchor: "",
        },
        fetchHistoryMessagesRes: '',
        setRoomExtraAttributesReq: {
          extraAttributes: {},
        },
        setRoomExtraAttributesRes: '',
        updateRoomExtraAttributesReq: {
          extraAttributes: {},
        },
        updateRoomExtraAttributesRes: '',
        deleteRoomExtraAttributesReq: {
          extraKeys: '',
        },
        deleteRoomExtraAttributesRes: '',
        clearRoomExtraAttributesRes: '',
        fetchRoomExtraAttributesReq: {
          extraKeys: '',
        },
        fetchRoomExtraAttributesRes: '',
        fetchUserOnlineStatusReq: {
          uids: '',
        },
        anchor: {},
        fetchUserOnlineStatusRes: '',
        isOffline: [{
            value: false,
            label: 'false'
          }, {
            value: true,
            label: 'true'
          }],
        sendP2PMessageReq: {
          content: 'js_sdk sendP2PMessage',
          receiver: UID,
          options: {isOffline: false},
        },
        peerAppExtras: {},
        sendP2PMessageRes: "",
        joinOrLeaveChannelRes: "",
        channelAppExtras: {},
        sendP2CMessageReq: {
          content: 'js_sdk sendP2CMessage',
          //options: {isOffline: false},
        },
        sendP2CMessageRes: "",
        joinProps: {},
        set32RoomExtraAttributesRes: "",
        update32RoomExtraAttributesRes: "",
        sendP2PMessage_Key32Res: "",
        sendP2CMessage_Key32Res: "",
      }
    },
    components: {
      CreateGroup,
      CreateChannel,
      RefreshToken,
      RefreshToken1,
      EditableTable,
    },
    computed: {
      ...mapState({
        refreshTokenModelVisible: state => state.refreshToken.refreshTokenModelVisible,
        refreshToken1ModelVisible: state => state.refreshToken1.refreshToken1ModelVisible,
        createGroupModelVisible: state => state.group.createGroupModelVisible,
        createChannelModelVisible: state => state.channel.createChannelModelVisible,
        setGroupAttributesVisible: state => state.setGroupAttributes.setGroupAttributesVisible,
        updateGroupAttributesVisible: state => state.updateGroupAttributes.updateGroupAttributesVisible,
        setGroupUserAttributesVisible: state => state.setGroupUserAttributes.setGroupUserAttributesVisible,
        setSendTextExtAttributesVisible: state => state.setSendTextExtAttributes.setSendTextExtAttributesVisible,
        setSendSingleUserAttributesVisible: state => state.setSendSingleUserAttributes.setSendSingleUserAttributesVisible,
        setSendGroupMessageAttributesVisible: state => state.setSendGroupMessageAttributes.setSendGroupMessageAttributesVisible,
        setSendTextChatAttributesVisible: state => state.setSendTextChatAttributes.setSendTextChatAttributesVisible,
        joinChatRoomPropsVisible: state => state.joinChatRoomProps.joinChatRoomPropsVisible,
        setRoomExtraAttributesVisible: state => state.setRoomExtraAttributes.setRoomExtraAttributesVisible,
        updateRoomExtraAttributesVisible: state => state.updateRoomExtraAttributes.updateRoomExtraAttributesVisible,
        createPeerAppExtrasVisible: state => state.peerAppExtras.createPeerAppExtrasVisible,
        createChannelAppExtrasVisible: state => state.channelAppExtras.createChannelAppExtrasVisible,
      })
    },
    watch: {
      regionChatroomId(val) {
        this.chatClient = this.chatrooms[val];
      },
      regionChannelId(val) {
        this.channel = this.channels[val];
      }
    },
    created() {
      log4test('Hummer Version = ', Hummer.VERSION);

      let token = getStorage("token");
      // 初始化Hummer
      this.hummer = Hummer.createHummer({appid: this.appid});

      this.hummer.setLogLevel(-1);

      log4test('getConnectionState=', this.hummer.getConnectionState());

      this.onConnectionStateChanged();
      this.onTokenExpire();
      this.onForceoutOffline();
      this.subscribeP2PMessage();
    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      onSendTextChatAttributes (data) {
        console.log('onSendTextChatAttributes attributes=', data)
        this.sendTextChatAttributes = data
      },
      onSendSingleUserAttributes (data) {
        console.log('onSendSingleUserAttributes attributes=', data)
        this.sendSingleUserAttributes = data
      },
      onSendTextExtAttributes (data) {
        console.log('onSendTextAttributes attributes=', data)
        this.sendTextExtAttributes = data
      },
      onSendGroupMessageAttributes (data) {
        console.log('onSendGroupMessageAttributes attributes=', data)
        this.sendGroupMessageAttributes = data
      },
      getChatRoom(data) {
        console.log('getChatRoom data=', data);

        this.region = data.region;
        this.roomid = data.roomid;
      },
      onSetChatRoomAttributes(data) {
        console.log('onSetChatRoomAttributes attributes=', data);
        this.setGroupAttributes = data;
      },
      createChatRoom() {
        if (!this.hummer) {
          log4test('hummer does not init');
          return;
        }

        let attributes = this.setGroupAttributes;

        this.$confirm('创建chatroom聊天室?', '提示', {
          type: 'warning',
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        }).then(async() => {

          try {
            let region = this.region;
            let req = {region, attributes};
            log4test('createChatRoom req=', req);
            const res = await this.hummer.createChatRoom(req);
            log4test('createChatRoom res=', res);
            if (res.rescode === 0) {
              this.roomid = res.roomid;
            }
          } catch(e) {
            log4test('createChatRoom res=', e);
          }

        }).catch(err => {
          console.log(err);
        });
      },
      async login() {
        if (!this.hummer)
          return;

        try {
          let req = {
            region: this.userRegion,
            uid: this.uid,
            token: this.token
          }
          log4test("login req=", req)

          this.loginRes = '';
          const res = await this.hummer.login(req);
          log4test("login res=", res);
          this.loginRes = JSON.stringify(res);
        } catch (e) {
          log4test("login res=", e);
          this.loginRes = JSON.stringify(e);
        }
      },
      async logout() {
        if (!this.hummer)
          return;

        try {
          this.loginRes = '';
          const res = await this.hummer.logout();
          log4test("logout res=" + JSON.stringify(res));
          this.loginRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.chatrooms = [];
            this.regionChatroomIds = [];
          }
        } catch(e) {
          log4test("logout res=", e);
          this.loginRes = JSON.stringify(e);
        }
      },
      refreshToken(data) {
        this.refreshTokenRes = JSON.stringify(data);
        log4test('refreshToken res=', data);
      },
      refreshToken1(data) {
        this.refreshTokenRes = JSON.stringify(data);
        log4test('refreshToken1 res=', data);
      },
      initChatRoom() {
        if (!this.hummer) {
          log4test("hummer is null");
          return;
        }

        this.regionChatroomId = getRegionRoomId(this.region, this.roomid);

        if (this.chatrooms[this.regionChatroomId]) {
          console.log('chatroom exists, and chatrooms=', this.chatrooms);
          return;
        }

        const region = this.region;
        const roomid = this.roomid;

        let chatroom = this.hummer.createChatRoomInstance({
          region: region,
          roomid: Number(roomid)
        });
        if (!chatroom) {
          return;
        }

        const regionChatroomId = getRegionRoomId(region, roomid);

        this.chatrooms[regionChatroomId] = {
          chatroom: chatroom,
          region: region,
          roomid: roomid,
        }

        this.regionChatroomIds.push({value: regionChatroomId, label: regionChatroomId});
        

        console.log('chatrooms=', this.chatrooms);

        let client = this.chatrooms[regionChatroomId];

        console.log(`chatroom add Listener: ${regionChatroomId}`);
        this.onSingleUserMessageReceived(client);
        this.onChatRoomDismissed(client);
        this.onChatRoomAttributesUpdated(client);
        this.onUserKickedOff(client);
        this.onGroupMessageReceived(client);
        this.subscribeTextChat(client);
        this.onUserCountUpdated(client);
        this.onUserOnlineUpdated(client);
        this.onUserAttributesSet(client);
        this.onChatRoomUserOffline(client);
        this.subscribeRoomExtraAtrributes(client);

        setStorage("roomid", roomid);
      },
      onJoinChatRoomProps(data) {
        console.log('onJoinChatRoomProps joinProps=', data);
        this.joinProps = data;
      },
      async joinChatRoom() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        console.log('regionChatroomId=', this.regionChatroomId, ' chatroom=', this.chatClient);

        try {
          let joinProps = this.joinProps;
          let req = { joinProps }
          log4test("joinChatRoom req=", req);

          this.joinOrLeaveRes = '';
          const res = await this.chatClient.chatroom.joinChatRoom(req);
          log4test("joinChatRoom res=" + JSON.stringify(res));
          this.joinOrLeaveRes = JSON.stringify(res);
        } catch(e) {
          log4test("joinChatRoom res=", e);
          this.joinOrLeaveRes = JSON.stringify(e);
        }
      },
      async leaveChatRoom() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          this.joinOrLeaveRes = '';
          const res = await this.chatClient.chatroom.leaveChatRoom();
          log4test("leaveChatRoom res=" + JSON.stringify(res));
          this.joinOrLeaveRes = JSON.stringify(res);
        } catch(e) {
          log4test("leaveChatRoom res=", e);
          this.joinOrLeaveRes = JSON.stringify(e);
        }

      },
      onUpdateChatRoomAttributes(data) {
        console.log('onUpdateChatRoomAttributes attributes=', data);
        this.groupAttributes = data;
      },
      async updateChatRoomAttributes() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }
          

        try {
          let attributes = this.groupAttributes || {};
          let req = { attributes };
          log4test("updateChatRoomAttributes req=" + JSON.stringify(req));

          this.updateChatRoomAttributesRes = '';
          const res = await this.chatClient.chatroom.updateChatRoomAttributes(req);
          this.updateChatRoomAttributesRes = JSON.stringify(res);
          log4test("updateChatRoomAttributes res=" + JSON.stringify(res));
        } catch(e) {
          log4test("updateChatRoomAttributes res=", e);
          this.updateChatRoomAttributesRes = JSON.stringify(e);
        }
      },
      async dismissChatRoom() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          this.dismissChatRoomRes = '';
          const res = await this.chatClient.chatroom.dismissChatRoom();
          log4test("dismissChatRoom res=" + JSON.stringify(res));
          this.dismissChatRoomRes = JSON.stringify(res);
          if (res.rescode == 0) {
            delete this.chatClient;
            this.chatClient = null;
            this.roomid = 0;
            setStorage("roomid", this.roomid);
          }
        } catch(e) {
          log4test("dismissChatRoom res=", e);
          this.dismissChatRoomRes = JSON.stringify(e);
        }
      },
      async kickOffUser() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let uid = this.kickOffUserReq.uid;
          let secs = this.kickOffUserReq.secs;
          let reason = this.kickOffUserReq.reason;

          let req = { uid, secs, reason };
          log4test("kickOffUser req=" + JSON.stringify(req));

          this.kickOffUserRes = '';
          const res = await this.chatClient.chatroom.kickOffUser(req);
          log4test("kickOffUser res=" + JSON.stringify(res));
          this.kickOffUserRes = JSON.stringify(res);
        } catch(e) {
          log4test("kickOffUser res=", e);
          this.kickOffUserRes = JSON.stringify(e);
        }
      },
      async sendGroupMessage() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let content = this.sendGroupMessageReq.content;
          let kvExtra = this.sendGroupMessageAttributes;
          let req = { content, kvExtra };
          log4test("sendGroupMessage req=" + JSON.stringify(req));

          this.sendGroupMessageRes = '';
          const res = await this.chatClient.chatroom.sendGroupMessage(req);
          log4test("sendGroupMessage res=" + JSON.stringify(res));
          this.sendGroupMessageRes = JSON.stringify(res);
        } catch(e) {
          log4test("sendGroupMessage res=", e);
          this.sendGroupMessageRes = JSON.stringify(e);
        }
      },
      async sendSingleUserMessage() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let content = this.sendSingleUserMessageReq.content;
          let receiver = this.sendSingleUserMessageReq.receiver;
          let kvExtra = this.sendSingleUserAttributes;

          let req = { content, receiver, kvExtra };
          log4test("sendSingleUserMessage req=" +  JSON.stringify(req));

          this.sendSingleUserMessageRes = '';
          const res = await this.chatClient.chatroom.sendSingleUserMessage(req);
          log4test("sendSingleUserMessage res=" +  JSON.stringify(res));
          this.sendSingleUserMessageRes = JSON.stringify(res);
        } catch(e) {
          log4test("sendSingleUserMessage res=", e);
          this.sendSingleUserMessageRes = JSON.stringify(e);
        }
      },
      async sendTextChat() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let chat = this.sendTextChatReq.chat;
          //let chatProps = this.sendTextChatAttributes;
          let extra = this.sendTextChatReq.extra;
          let kvExtra = this.sendTextExtAttributes;

          let req = { chat, extra, kvExtra }
          log4test('sendTextChat req=', req);

          this.sendTextChatRes = '';
          const res = await this.chatClient.chatroom.sendTextChat(req);
          log4test("sendTextChat res=" + JSON.stringify(res));
          this.sendTextChatRes = JSON.stringify(res);
        } catch(e) {
          log4test("sendTextChat res=", e);
          this.sendTextChatRes = JSON.stringify(e);
        }
      },
      async muteUser() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let uid = this.muteUserReq.uid;
          let secs = this.muteUserReq.secs;
          let reason = this.muteUserReq.reason;

          let req = { uid, secs, reason };
          log4test("muteUser req=", req);
          this.muteUserRes = '';
          const res = await this.chatClient.chatroom.muteUser(req);
          this.muteUserRes = JSON.stringify(res);
          log4test("muteUser res=" + JSON.stringify(res));
        } catch (e) {
          log4test("muteUser res=", e);
          this.muteUserRes = JSON.stringify(e);
        };
      },
      async unMuteUser() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let uid = this.muteUserReq.uid;
          let secs = this.muteUserReq.secs;
          let reason = this.muteUserReq.reason;

          let req = { uid, secs, reason };
          log4test("unMuteUser req=" + JSON.stringify(req));

          this.muteUserRes = '';
          const res = await this.chatClient.chatroom.unMuteUser(req);
          this.muteUserRes = JSON.stringify(res);
          log4test("unMuteUser res=" + JSON.stringify(res));
        } catch (e) {
          console.log("unMuteUser err=", e);
          this.muteUserRes = JSON.stringify(e);
        };
      },
      async getChatRoomAttributes() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }
 
        try {
          this.getChatRoomAttributesRes = '';
          const res = await this.chatClient.chatroom.getChatRoomAttributes();
          log4test("getChatRoomAttributes res=" + JSON.stringify(res));
          this.getChatRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("getChatRoomAttributes res=", e);
          this.getChatRoomAttributesRes = JSON.stringify(e);  
        }
      },
      async getChatRoomManager() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let roler = this.getChatRoomManagerReq.roler;
          let req = { roler }
          log4test("getChatRoomManager req=" + JSON.stringify(req));

          this.getChatRoomManagerRes = '';
          const res = await this.chatClient.chatroom.getChatRoomManager(req);
          log4test("getChatRoomManager res=" + JSON.stringify(res));
          this.getChatRoomManagerRes = JSON.stringify(res);
        } catch(e) {
          log4test("getChatRoomManager res=", e);
          this.getChatRoomManagerRes = JSON.stringify(e);
        }
      },
      async getUserList() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let num = this.getUserListReq.num;
          let pos = this.getUserListReq.pos;

          let req = { num, pos }
          log4test("getUserList req=", req);

          this.getUserListRes = '';
          const res = await this.chatClient.chatroom.getUserList(req);
          log4test("getUserList res=" + JSON.stringify(res));
          this.getUserListRes = JSON.stringify(res);
        } catch(e) {
          log4test("getUserList res=", e);
          this.getUserListRes = JSON.stringify(e); 
        }
      },
      async getMutedUserList() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        this.getMutedUserListRes = '';
        try {
          const res = await this.chatClient.chatroom.getMutedUserList();
          log4test("getMutedUserList res=" + JSON.stringify(res));
          this.getMutedUserListRes = JSON.stringify(res);
        } catch(e) {
          log4test("getMutedUserList res=", e);
          this.getMutedUserListRes = JSON.stringify(e);
        };
      },
      onSetChatRoomUserAttributes(data) {
        console.log('onSetChatRoomUserAttributes attributes=', data);
        this.groupUserAttributes = data;
      },
      async setUserAttributes() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let attributes = this.groupUserAttributes || {};

          let req = { attributes };
          log4test("setUserAttributes req=", req);
          const res = await this.chatClient.chatroom.setUserAttributes(req);
          log4test("setUserAttributes res=", res);
          this.setUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("setUserAttributes res=", res);
          this.setUserAttributesRes = JSON.stringify(e);
        }
      },
      async getUserAttributesList() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          this.getUserAttributesListRes = '';
          const res = await this.chatClient.chatroom.getUserAttributesList();
          log4test("getUserAttributesList res=" + JSON.stringify(res));
          this.getUserAttributesListRes = JSON.stringify(res);
        } catch(e) {
          log4test("getUserAttributesList res=", e);
          this.getUserAttributesListRes = JSON.stringify(e);
        }
      },
      async getUserCount() {
        if (!this.hummer) {
          log4test("hummer not init");
          return;
        }

        const region = this.getUserCountReq.region;
        const roomid = Number(this.getUserCountReq.roomid);
        const req = {region, roomid};

        this.getUserCountRes = '';
        this.hummer.getChatRoomUserCount(req).then((res) => {
          console.log("getChatRoomUserCount Res: " + JSON.stringify(res));
          this.getUserCountRes = JSON.stringify(res);
        }).catch(e => {
          console.log(e)
          this.getUserCountRes = JSON.stringify(e);
        })
      },
      getConnectionState() {
        if (!this.hummer) {
          log4test("hummer not init");
          return;
        }

        this.state = '';
        this.state = this.hummer.getConnectionState();
        log4test("getConnectionState=" + this.state);
      },

      /* ------ 拉取历史消息 ------ */
      selectBlur(e) {
        this.fetchHistoryMessagesReq.anchor = e.target.value;
      },
      getAnchors(msgs) {
        let anchors = [];
        for (let [i, msg] of msgs.entries()){
          let time = timestampToTime(msg.timestamp);
          anchors.push({value: `${msg.timestamp}:${msg.uuid}`, label: `#${i+1}#${time}#${msg.uuid}`});
        }
        return anchors;
      },
      async fetchHistoryMessages() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let msgTypes_str = this.fetchHistoryMessagesReq.msgTypes;
          let msgTypes = [];

          let elements = msgTypes_str.split(",");
          for (let k of elements) {
            if (k.length > 0) {
              msgTypes.push(Number(k));
            }
          }
          
          let direction = this.fetchHistoryMessagesReq.direction;
          let limit = this.fetchHistoryMessagesReq.limit;

          let anchor = this.fetchHistoryMessagesReq.anchor;
          console.log("fetchHistoryMessages: anchor=", anchor);

          let req;
          if (!anchor || anchor.length === 0) {
            req = { msgTypes, direction, limit };
          } else {
            let items = anchor.split(":");
            let anchorTimestamp = Number(items[0]) || 0;
            let anchorUuid = items[1] || "";
            req = { msgTypes, direction, limit, anchorUuid, anchorTimestamp };
          }
          log4test('fetchHistoryMessages req=', req);

          this.fetchHistoryMessagesRes = '';
          let res = await this.chatClient.chatroom.fetchHistoryMessages(req);
          res.size = res.msgs.length || 0; 
          log4test("fetchHistoryMessages res=", res, "size=", res.size, "hasMore=", res.hasMore);
          this.fetchHistoryMessagesRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.anchors = this.getAnchors(res.msgs || []);
          }
        } catch(e) {
          log4test("fetchHistoryMessages res=", e);
          this.fetchHistoryMessagesRes = JSON.stringify(e);
        }
      },

      /* ------ 房间扩展属性 ------ */
      onSetRoomExtraAttributes(data) {
        console.log('onSetRoomExtraAttributes extraAttributes=', data);
        this.setRoomExtraAttributesReq.extraAttributes = data;
      },
      // Room Extra Attributes
      async setRoomExtraAttributes() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let extraAttributes = this.setRoomExtraAttributesReq.extraAttributes || {};
          let req = { extraAttributes };
   
          log4test('setRoomExtraAttributes: req=', req);

          this.setRoomExtraAttributesRes = '';
          const res = await this.chatClient.chatroom.setRoomExtraAttributes(req);
          log4test("setRoomExtraAttributes res=" , res);
          this.setRoomExtraAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("setRoomExtraAttributes err:" , e);
          this.setRoomExtraAttributesRes = JSON.stringify(e);
        }
      },

      onUpdateRoomExtraAttributes(data) {
        console.log('onUpdateRoomExtraAttributes extraAttributes=', data);
        this.updateRoomExtraAttributesReq.extraAttributes = data;
      },
      async updateRoomExtraAttributes() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let extraAttributes = this.updateRoomExtraAttributesReq.extraAttributes || {};
          let req = { extraAttributes };
   
          log4test('updateRoomExtraAttributes req=', req);

          this.updateRoomExtraAttributesRes = '';
          const res = await this.chatClient.chatroom.updateRoomExtraAttributes(req);
          log4test("updateRoomExtraAttributes res=" , res);
          this.updateRoomExtraAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("updateRoomExtraAttributes res=" , e);
          this.updateRoomExtraAttributesRes = JSON.stringify(e);
        }
      },

      async deleteRoomExtraAttributes() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let keys_str = this.deleteRoomExtraAttributesReq.extraKeys;

          let extraKeys = [];

          let elements = keys_str.split(",");
          for (let k of elements) {
            if (k.length > 0) {
              extraKeys.push(k);
            }
          }

          let req = { extraKeys };
          log4test('deleteRoomExtraAttributes: req=', req);

          this.deleteRoomExtraAttributesRes = '';
          const res = await this.chatClient.chatroom.deleteRoomExtraAttributes(req);
          log4test("deleteRoomExtraAttributes res=", res);
          this.deleteRoomExtraAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("deleteRoomExtraAttributes res=", e);
          this.deleteRoomExtraAttributesRes = JSON.stringify(e);
        }
      },
      async clearRoomExtraAttributes() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let req = {};
          log4test('clearRoomExtraAttributes: req=', req);

          this.clearRoomExtraAttributesRes = '';
          const res = await this.chatClient.chatroom.clearRoomExtraAttributes(req);
          log4test("clearRoomExtraAttributes res=", res);
          this.clearRoomExtraAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("clearRoomExtraAttributes err:", e);
          this.clearRoomExtraAttributesRes = JSON.stringify(e);
        }
      },

      async fetchRoomExtraAttributes() {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let keys_str = this.fetchRoomExtraAttributesReq.extraKeys;

          let extraKeys = [];

          let elements = keys_str.split(",");
          for (let k of elements) {
            if (k.length > 0) {
              extraKeys.push(k);
            }
          }

          let req = { extraKeys };
          log4test('fetchRoomExtraAttributes req=', req);

          this.fetchRoomExtraAttributesRes = '';
          const res = await this.chatClient.chatroom.fetchRoomExtraAttributes(req);
          log4test("fetchRoomExtraAttributes res=", res);
          this.fetchRoomExtraAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("fetchRoomExtraAttributes res=", e);
          this.fetchRoomExtraAttributesRes = JSON.stringify(e);
        }
      },

      set32RoomExtraAttributes() {
        this.setMultiRoomExtraAttributes(32)
      },
      set33RoomExtraAttributes() {
        this.setMultiRoomExtraAttributes(33)
      },

      async setMultiRoomExtraAttributes(size) {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }
        
        try {
          let extraAttributes = generateAttributes(size, "set")
          let req = { extraAttributes };
   
          log4test('setRoomExtraAttributes req=', req);

          this.set32RoomExtraAttributesRes = '';
          const res = await this.chatClient.chatroom.setRoomExtraAttributes(req);
          log4test("setRoomExtraAttributes res=" , res);
          this.set32RoomExtraAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("setRoomExtraAttributes res=" , e);
          this.set32RoomExtraAttributesRes = JSON.stringify(e);
        }

      },

      update32RoomExtraAttributes() {
        this.updateMultiRoomExtraAttributes(32)
      },
      update33RoomExtraAttributes() {
        this.updateMultiRoomExtraAttributes(33)
      },

      async updateMultiRoomExtraAttributes(size) {
        if (!this.chatClient) {
          log4test("chatroom not init");
          return;
        }

        try {
          let extraAttributes = generateAttributes(size, "update")
          let req = { extraAttributes };
   
          log4test('updateRoomExtraAttributes req=', req);

          this.update32RoomExtraAttributesRes = '';
          const res = await this.chatClient.chatroom.updateRoomExtraAttributes(req);
          log4test("updateRoomExtraAttributes res=" , res);
          this.update32RoomExtraAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("updateRoomExtraAttributes res=" , e);
          this.update32RoomExtraAttributesRes = JSON.stringify(e);
        }

      },
      
      // 消息通道
      async fetchUserOnlineStatus() {
        if (!this.hummer) {
          log4test("hummer not init");
          return;
        }

        try {
          let uids_str = this.fetchUserOnlineStatusReq.uids;
          let uids = [];

          let elements = uids_str.split(",");
          for (let k of elements) {
            if (k.length > 0) {
              uids.push(k);
            }
          }

          let req = { uids };
          log4test('fetchUserOnlineStatus req=', req);

          this.fetchUserOnlineStatusRes = '';
          const res = await this.hummer.fetchUserOnlineStatus(req);
          log4test("fetchUserOnlineStatus res=", res);
          this.fetchUserOnlineStatusRes = JSON.stringify(res);
        } catch(e) {
          log4test("fetchUserOnlineStatus res=", e);
          this.fetchUserOnlineStatusRes = JSON.stringify(e);
        }
      },
      getPeerAppExtras(data) {
        console.log('getPeerAppExtras appExtras=', data);
        this.peerAppExtras = data;
      },
      async sendP2PMessage() {
        if (!this.hummer) {
          log4test("hummer not init");
          return;
        }

        try {
          let content = this.sendP2PMessageReq.content;
          let receiver = this.sendP2PMessageReq.receiver;
          let isOffline = this.sendP2PMessageReq.options.isOffline || false;

          let message = Hummer.createMessage(0, content);
          log4test("createMessage success");
          console.log("createMessage message=", message);

          let req = {
            receiver: receiver,
            message: message,
            appExtras: this.peerAppExtras,
            options: { isOffline: isOffline },
          };

          log4test("sendP2PMessage req=", req);

          this.sendP2PMessageRes = '';
          const res = await this.hummer.sendP2PMessage(req);
          log4test("sendP2PMessage res=", res);
          this.sendP2PMessageRes = JSON.stringify(res);

        } catch(e) {
          log4test("sendP2PMessage res=", e);
          this.sendP2PMessageRes = JSON.stringify(e);
        }
      },

      sendP2PMessage_Key32() {
        this.sendP2PMessage_MultiKey(32)
      },
      sendP2PMessage_Key33() {
        this.sendP2PMessage_MultiKey(33)
      },

      async sendP2PMessage_MultiKey(size) {
        if (!this.hummer) {
          log4test("hummer not init");
          return;
        }

        try {
          let content = this.sendP2PMessageReq.content;
          let receiver = this.sendP2PMessageReq.receiver;
          let isOffline = this.sendP2PMessageReq.options.isOffline || false;

          let message = Hummer.createMessage(0, content);
          log4test("createMessage success");
          console.log("createMessage message=", message);
          
          let appExtras = generateAttributes(size, "p2p")

          let req = {
            receiver: receiver,
            message: message,
            appExtras: appExtras,
            options: { isOffline: isOffline },
          };

          log4test("sendP2PMessage req=", req);

          this.sendP2PMessage_Key32Res = '';
          const res = await this.hummer.sendP2PMessage(req);
          log4test("sendP2PMessage res=", res);
          this.sendP2PMessage_Key32Res = JSON.stringify(res);

        } catch(e) {
          log4test("sendP2PMessage res=", e);
          this.sendP2PMessage_Key32Res = JSON.stringify(e);
        }


      },


      updateChannelJoinStatus(join) {
        if (!this.channel)
          return;

        let region = this.channel.region;
        let channelId = this.channel.channelId;
        this.updateChannelJoinStatusByRegionAndChannelId(region, channelId, join);
      },
      updateChannelJoinStatusByRegionAndChannelId(region, channelId, join) {
        let regionChannelId = getRegionChannelId(region, channelId);
        if (this.channels[this.regionChannelId]) {
          let target = this.regionChannelIds.find( (value, index, arr) => {
            return value.label === regionChannelId;
          })
          if (target) {
            target.hasJoin = join;
          }
        }
      },
      getChannel(data) {
        console.log('getChannel data=', data);

        let region = data.region;
        let channelId = data.channelId;
        this.regionChannelId = getRegionChannelId(region, channelId);
        if (this.channels[this.regionChannelId]) {
          console.log('channel exists, and channels=', this.channels);
          return;
        }

        this.channels[this.regionChannelId] = data;
        this.regionChannelIds.push({value: this.regionChannelId, label: this.regionChannelId, hasJoin: false});

        console.log('channels=', this.channels);

        let channel = this.channels[this.regionChannelId];
        this.subscribeChannelMessage(channel);
      },
      getCurrentChannelTag() {
        if (!this.channel) {
          return "";
        }
        return `[${this.channel.region}:${this.channel.channelId}]`;
      },
      async joinChannel() {
        if (!this.channel)
          return;

        try {
          log4test("joinChannel req={}");

          this.joinOrLeaveChannelRes = '';
          const res = await this.channel.channel.joinChannel();
          log4test(`自己进入Channel ${this.getCurrentChannelTag()}, joinChannel res=`, res);
          this.joinOrLeaveChannelRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.updateChannelJoinStatus(true)
          }
        } catch(e) {
          log4test("joinChannel res=", e);
          this.joinOrLeaveChannelRes = JSON.stringify(e);
        }
      },
      async leaveChannel() {
        if (!this.channel)
          return;

        try {
          log4test("leaveChannel req={}");
          
          this.joinOrLeaveChannelRes = '';
          const res = await this.channel.channel.leaveChannel();
          log4test(`自己离开Channel ${this.getCurrentChannelTag()}, leaveChannel res=`, res);
          this.joinOrLeaveChannelRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.updateChannelJoinStatus(false);
          }
        } catch(e) {
          log4test("leaveChannel res=", e);
          this.joinOrLeaveChannelRes = JSON.stringify(e);
        }
      },
      getChannelAppExtras(data) {
        console.log('getChannelAppExtras channelAppExtras=', data);
        this.channelAppExtras = data;
      },
      async sendP2CMessage() {
        if (!this.channel)
          return;

        try {
          let content = this.sendP2CMessageReq.content;
          //let isOffline = this.sendP2CMessageReq.options.isOffline || false;

          let message = Hummer.createMessage(0, content);
          log4test("createMessage success");
          console.log("createMessage message=", message);

          let req = {
            message: message,
            appExtras: this.channelAppExtras,
            //options: {isOffline: isOffline},
          }
          log4test(`${this.getCurrentChannelTag()} sendP2CMessage req=`, req);

          this.sendP2CMessageRes = '';
          const res = await this.channel.channel.sendP2CMessage(req);
          log4test("sendP2CMessage res=", res);
          this.sendP2CMessageRes = JSON.stringify(res);
        } catch(e) {
          log4test("sendP2CMessage res=", e);
          this.sendP2CMessageRes = JSON.stringify(e);
        }
      },

      sendP2CMessage_Key32() {
        this.sendP2CMessage_MultiKey(32)
      },
      sendP2CMessage_Key33() {
        this.sendP2CMessage_MultiKey(33)
      },
      async sendP2CMessage_MultiKey(size) {
        if (!this.channel) {
          log4test("channel not init");
          return;
        }

        try {
          let content = this.sendP2CMessageReq.content;
          //let isOffline = this.sendP2CMessageReq.options.isOffline || false;

          let message = Hummer.createMessage(0, content);
          log4test("createMessage success");
          console.log("createMessage message=", message);

          let appExtras = generateAttributes(size, "p2c")

          let req = {
            message: message,
            appExtras: appExtras,
            //options: {isOffline: isOffline},
          }
          log4test(`${this.getCurrentChannelTag()} sendP2CMessage req=`, req);

          this.sendP2CMessage_Key32Res = '';
          const res = await this.channel.channel.sendP2CMessage(req);
          log4test("sendP2CMessage res=", res);
          this.sendP2CMessage_Key32Res = JSON.stringify(res);
        } catch(e) {
          log4test("sendP2CMessage res=", e);
          this.sendP2CMessage_Key32Res = JSON.stringify(e);
        }
      },

      /*  消息接收模块 */
      onSingleUserMessageReceived(client) {
        const eventName = 'SingleUserMessage';
        client.chatroom.on(eventName, (data) => {
          log4test(`接收消息${eventName}： ` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onChatRoomDismissed(client) {
        const eventName = 'ChatRoomDismissed';
        client.chatroom.on(eventName, (data) => {
          log4test(`接收消息${eventName}: ` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onChatRoomAttributesUpdated(client)  {
        const eventName = 'ChatRoomAttributesUpdated';
        client.chatroom.on(eventName, (data) => {
          log4test(`接收消息${eventName}: ` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUserKickedOff(client) {
        const eventName = "UserKickedOff";
        client.chatroom.on(eventName, (data) => {
          log4test(`接收消息${eventName}：` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}：` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onGroupMessageReceived(client) {
        const eventName = "GroupMessage";
        client.chatroom.on(eventName, (data) => {
          log4test(`接收消息${eventName}：` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}：` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      subscribeTextChat(client) {
        const eventNames = [
          'TextChat',
          'UsersMuted',
          'UsersUnMuted',
        ];

        eventNames.forEach(eventName => {
          client.chatroom.on(eventName, (data) => {
            log4test(`接收消息${eventName}：` + JSON.stringify(data));

            this.$message({
              duration: 3000,
              message: `${eventName}：` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onUserCountUpdated(client) {
        const eventName = 'UserCountUpdated';
        client.chatroom.on(eventName, (data) => {
          log4test(`接收消息${eventName}：` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUserAttributesSet(client) {
        const eventName = "UserAttributesSet";
        client.chatroom.on(eventName, (data) => {
          log4test(`接收消息${eventName}：` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUserOnlineUpdated(client) {
        const eventName = "UserOnlineUpdated";
        client.chatroom.on(eventName, (data) => {
          log4test(`接收消息${eventName}：` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onChatRoomUserOffline(client) {
        const eventName = "ChatRoomUserOffline";
        client.chatroom.on(eventName, () => {
          log4test(`接收消息${eventName}`);
          this.$message({
            duration: 3000,
            message: `${eventName}`,
            type: 'success'
          });
        });
      },
      subscribeRoomExtraAtrributes(client) {
        const eventNames = [
          "RoomExtraAttributesSet",
          "RoomExtraAttributesUpdated",
          "RoomExtraAttributesDeleted",
          "RoomExtraAttributesCleared",
        ];

        eventNames.forEach(eventName => {
          client.chatroom.on(eventName, (data) => {
            log4test(`接收消息${eventName}：` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName}：` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onConnectionStateChanged() {
        const eventName = "ConnectionStateChanged";
        this.hummer.on(eventName, (data) => {
          log4test(`=== ${eventName} ===:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });

          log4test('getConnectionState=', this.hummer.getConnectionState());
        });
      },
      onTokenExpire() {
        const eventNames = [
          "TokenWillExpire",
          "TokenExpired"
        ];

        eventNames.forEach(eventName => {
          this.hummer.on(eventName, () => {
            log4test(`=== ${eventName} ===`);
            this.$message({
              duration: 3000,
              message: `${eventName}`,
              type: 'success'
            });
          });
        })
      },
      onForceoutOffline() {
        const eventName = "ForceoutOffline";
        this.hummer.on(eventName, (data) => {
          log4test(`=== ${eventName} ===:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      // message-channel
      subscribeP2PMessage() {
        const eventName = "P2PMessageReceived";
        this.hummer.on(eventName, (data) => {
          log4test(`接收消息${eventName}：` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `${eventName}：` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      subscribeChannelMessage(channel) {
        const eventName = 'P2CMessageReceived';
        channel.channel.on(eventName, (data) => {
          log4test(`接收消息${eventName}: [${channel.region}:${channel.channelId}]:` + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: `${eventName}: [${channel.region}:${channel.channelId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },

      showRefreshTokenModel() {
        this.$store.commit('updateRefreshTokenModelVisible', true);
      },
      closeRefreshTokenModel() {
        this.$store.commit('updateRefreshTokenModelVisible', false)
      },
      showRefreshToken1Model() {
        this.$store.commit('updateRefreshToken1ModelVisible', true);
      },
      closeRefreshToken1Model() {
        this.$store.commit('updateRefreshToken1ModelVisible', false)
      },
      showCreateGroupModel() {
        this.$store.commit('updateCreateGroupModelVisible', true);
      },
      closeCreateGroupModel() {
        this.$store.commit('updateCreateGroupModelVisible', false)
      },
      showCreateChannelModel() {
        this.$store.commit('updateCreateChannelModelVisible', true);
      },
      closeCreateChannelModel() {
        this.$store.commit('updateCreateChannelModelVisible', false)
      },
      showSetGroupAttributesModel() {
        this.$store.commit('updateSetGroupAttributesVisible', true);
      },
      closeSetGroupAttributesModel() {
        this.$store.commit('updateSetGroupAttributesVisible', false)
      },
      showJoinChatRoomPropsModel() {
        this.$store.commit('updateJoinChatRoomPropsVisible', true);
      },
      closeJoinChatRoomPropsModel() {
        this.$store.commit('updateJoinChatRoomPropsVisible', false)
      },
      showUpdateGroupAttributesModel() {
        this.$store.commit('updateUpdateGroupAttributesVisible', true);
      },
      closeUpdateGroupAttributesModel() {
        this.$store.commit('updateUpdateGroupAttributesVisible', false)
      },
      showSetGroupUserAttributesModel() {
        this.$store.commit('updateSetGroupUserAttributesVisible', true);
      },
      closeSetGroupUserAttributesModel() {
        this.$store.commit('updateSetGroupUserAttributesVisible', false)
      },
      showSendTextExtAttributesModel() {
        this.$store.commit('updateSendTextExtAttributesVisible', true);
      },
      closeSendTextExtAttributesModel() {
        this.$store.commit('updateSendTextExtAttributesVisible', false);
      },
      showSendSingleUserAttributesModel () {
        this.$store.commit('updateSendSingleUserAttributesVisible', true);
      },
      closeSendSingleUserAttributesModel () {
        this.$store.commit('updateSendSingleUserAttributesVisible', false);
      },
      showSendGroupMessageAttributesModel () {
        this.$store.commit('updateSendGroupMessageAttributesVisible', true);
      },
      closeSendGroupMessageAttributesModel () {
        this.$store.commit('updateSendGroupMessageAttributesVisible', false);
      },
      showSendTextChatAttributesModel () {
        this.$store.commit('updateSendTextChatAttributesVisible', true);
      },
      closeSendTextChatAttributesModel () {
        this.$store.commit('updateSendTextChatAttributesVisible', false);
      },
      showSetRoomExtraAttributesModel() {
        this.$store.commit('updateSetRoomExtraAttributesVisible', true);
      },
      closeSetRoomExtraAttributesModel() {
        this.$store.commit('updateSetRoomExtraAttributesVisible', false)
      },
      showUpdateRoomExtraAttributesModel() {
        this.$store.commit('updateUpdateRoomExtraAttributesVisible', true);
      },
      closeUpdateRoomExtraAttributesModel() {
        this.$store.commit('updateUpdateRoomExtraAttributesVisible', false)
      },
      showCreatePeerAppExtrasModel() {
        this.$store.commit('updateCreatePeerAppExtrasVisible', true);
      },
      closeCreatePeerAppExtrasModel() {
        this.$store.commit('updateCreatePeerAppExtrasVisible', false)
      },
      showCreateChannelAppExtrasModel() {
        this.$store.commit('updateCreateChannelAppExtrasVisible', true);
      },
      closeCreateChannelAppExtrasModel() {
        this.$store.commit('updateCreateChannelAppExtrasVisible', false)
      },
    }
  }
</script>

<style lang='less'>
  .dashboard {
    &-container {
      margin: 30px;
      display: flex;
      justify-content: center;
      align-items: left;
      flex-direction: column;
      //height: 300px;
    }
    &-text {
      font-size: 30px;
      line-height: 40px;
    }
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
 .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .text-unit {
    //margin: 10px 25px;
    text-align: left;
    //white-space: pre;
  }
  .rsp-text {
    font-style: italic;
    font-size: 13px;
    width:100%;
    height:46px;
    text-align:left;
    word-wrap:break-word;
    overflow-y:auto;
    _overflow-y:visible;
  }
</style>
