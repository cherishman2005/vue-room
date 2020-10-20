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
          <el-form-item class="search">
            <el-button type="primary" @click="showRefreshTokenModel" style="border-radius: 4px">refreshToken</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="showRefreshToken1Model" style="border-radius: 4px">refreshToken1</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{loginRes}}</p>
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
            <el-button @click="showJoinChatRoomPropsModel" style="border-radius:4px">joinProps</el-button>
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
      <el-col :span="24"  style="height:35px;text-align:left;" >
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
          <!--
          <el-form-item class="search">
            <el-button @click="showSendTextChatAttributesModel" style="border-radius:4px">chatProps</el-button>
          </el-form-item>
          -->
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

    <!--
    <p class="text-unit">获取实例信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="getInstanceInfo" style="border-radius:4px">getInstanceInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{getInstanceInfoRes}}</p>
    </div>
    -->

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getStorage, setStorage, padMs } from '@/utils/BaseUtil'
  import { getRegions, getRegionRoomId } from '@/components/room_config.js';
  import RefreshToken from '@/components/token/refresh_token.vue';
  import RefreshToken1 from '@/components/token/refresh_token1.vue';
  import CreateGroup from './create_group.vue';
  import EditableTable from '@/components/units/editable_table.vue';
  //import Hummer from 'hummer-chatroom-sdk'

  const DEMO_TAG = "chatroom-demo"
  const log4test = (info, ext) => {
    let date = new Date();
    let timestamp = date.toLocaleTimeString('en-US', { hour12: false}) + "." + padMs(date.getMilliseconds())
    console.log(`${DEMO_TAG} ${timestamp} : ${info} ` + (ext ? JSON.stringify(ext) : ""))
  }

  const UID = getStorage('uid');
  const ROOMID = Number(getStorage('roomid'));
  const APPID = getStorage("appid");
  const TOKEN = getStorage('token');

  export default {
    name: 'chatroom-test',
    data() {
      return {
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
        loginRes: '',
        getInstanceInfoRes: '',
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
        joinProps: {},
      }
    },
    components: {
      CreateGroup,
      RefreshToken,
      RefreshToken1,
      EditableTable,
    },
    computed: {
      ...mapState({
        refreshTokenModelVisible: state => state.refreshToken.refreshTokenModelVisible,
        refreshToken1ModelVisible: state => state.refreshToken1.refreshToken1ModelVisible,
        createGroupModelVisible: state => state.group.createGroupModelVisible,
        setGroupAttributesVisible: state => state.setGroupAttributes.setGroupAttributesVisible,
        updateGroupAttributesVisible: state => state.updateGroupAttributes.updateGroupAttributesVisible,
        setGroupUserAttributesVisible: state => state.setGroupUserAttributes.setGroupUserAttributesVisible,
        setSendTextExtAttributesVisible: state => state.setSendTextExtAttributes.setSendTextExtAttributesVisible,
        setSendSingleUserAttributesVisible: state => state.setSendSingleUserAttributes.setSendSingleUserAttributesVisible,
        setSendGroupMessageAttributesVisible: state => state.setSendGroupMessageAttributes.setSendGroupMessageAttributesVisible,
        setSendTextChatAttributesVisible: state => state.setSendTextChatAttributes.setSendTextChatAttributesVisible,
        joinChatRoomPropsVisible: state => state.joinChatRoomProps.joinChatRoomPropsVisible,
      })
    },
    watch: {
      regionChatroomId(val) {
        this.chatClient = this.chatrooms[val];
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
          console.warn('hummer is null');
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
        this.loginRes = JSON.stringify(data);
        log4test('refreshToken res=', data);
      },
      refreshToken1(data) {
        this.loginRes = JSON.stringify(data);
        log4test('refreshToken1 res=', data);
      },
      initChatRoom() {
        if (!this.hummer) {
          console.log("hummer is null");
          return;
        }

        this.regionChatroomId = getRegionRoomId(this.region, this.roomid);

        if (this.chatClient) {
          console.log('chatroom exists, and chatrooms=', this.chatrooms);
          delete this.chatClient;
          this.chatClient = null;
          //return;
        }

        this.chatClient = this.chatrooms[this.regionChatroomId];

        let chatroom = this.hummer.createChatRoomInstance({
          region: this.region,
          roomid: Number(this.roomid)
        });
        if (!chatroom) {
          return;
        }

        // todo:
        if (Object.keys(this.chatrooms).indexOf(this.regionChatroomId) > -1) {
          return;
        }

        this.chatrooms[this.regionChatroomId] = {
          chatroom: chatroom,
          region: this.region,
          roomid: this.roomid
        }

        this.regionChatroomIds.push({value: this.regionChatroomId, label: this.regionChatroomId});

        console.log('chatrooms=', this.chatrooms);

        let client = this.chatrooms[this.regionChatroomId];
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

        setStorage("roomid", this.roomid);
      },
      onJoinChatRoomProps(data) {
        console.log('onJoinChatRoomProps joinProps=', data);
        this.joinProps = data;
      },
      async joinChatRoom() {
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;
 
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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.chatClient)
          return;

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
        if (!this.hummer)
          return;

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
        this.state = '';
        if (this.hummer)
        {
          this.state = this.hummer.getConnectionState();
          log4test("getConnectionState=" + this.state);
        }
      },
      async getInstanceInfo() {
        if (!this.hummer)
          return;

        try {
          this.getInstanceInfoRes = '';
          const res = await this.hummer.getInstanceInfo();
          log4test("getInstanceInfo res=" + JSON.stringify(res));
          this.getInstanceInfoRes = JSON.stringify(res);
        } catch(e) {
          log4test('getInstanceInfo res=', e);
          this.getInstanceInfoRes = JSON.stringify(e);
        }
      },

      /*  消息接收模块 */
      onSingleUserMessageReceived(client) {
        client.chatroom.on('SingleUserMessage', (data) => {
          log4test("接收消息SingleUserMessage： " + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息SingleUserMessage： " + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onChatRoomDismissed(client) {
        client.chatroom.on('ChatRoomDismissed', (data) => {
          log4test("接收消息ChatRoomDismissed： " + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息ChatRoomDismissed： " + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onChatRoomAttributesUpdated(client)  {
        client.chatroom.on('ChatRoomAttributesUpdated', (data) => {
          log4test("接收消息ChatRoomAttributesUpdated：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息ChatRoomAttributesUpdated：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUserKickedOff(client) {
        client.chatroom.on('UserKickedOff', (data) => {
          log4test("接收消息UserKickedOff：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息UserKickedOff：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onGroupMessageReceived(client) {
        client.chatroom.on('GroupMessage', (data) => {
          log4test("接收消息GroupMessage：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息GroupMessage：" + JSON.stringify(data),
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
              message: `接收消息${eventName}：` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onUserCountUpdated(client) {
        client.chatroom.on('UserCountUpdated', (data) => {
          log4test("接收消息UserCountUpdated：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息UserCountUpdated：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUserAttributesSet(client) {
        client.chatroom.on('UserAttributesSet', (data) => {
          log4test("接收消息UserAttributesSet：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息UserAttributesSet：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUserOnlineUpdated(client) {
        client.chatroom.on('UserOnlineUpdated', (data) => {
          log4test("接收消息UserOnlineUpdated：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息UserOnlineUpdated：" + JSON.stringify(data),
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
      onConnectionStateChanged() {
        this.hummer.on('ConnectionStateChanged', (data) => {
          log4test("=== ConnectionStateChanged ===:" + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `ConnectionStateChanged: ` + JSON.stringify(data),
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
