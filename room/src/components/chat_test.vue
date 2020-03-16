<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">聊天室调测系统（ChatRoom Tutorial）</h2>

    <!-- 初始化chatroom -->
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="appid">
            <el-input v-model="appid" disabled></el-input>
          </el-form-item>
          <el-form-item label="uid">
            <el-input v-model="uid" disabled></el-input>
          </el-form-item>
          <el-form-item label="roomid">
            <el-input v-model="roomid"></el-input>
          </el-form-item>
          <el-form-item label="iRegion">
            <el-input v-model="iRegion"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="createChatRoomId" style="border-radius: 4px">createChatRoomId</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="initChatRoom" style="border-radius: 4px">initChatRoom</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getInstanceInfo" style="border-radius: 4px">getInstanceInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{getInstanceInfoRes}}</p>
    </div>
    
    <p class="text-unit">加入聊天室</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="joinChatRoom" style="border-radius: 4px">joinChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{JoinChatRoomRes}}</p>
    </div>

    <p class="text-unit">离开聊天室</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="leaveChatRoom" style="border-radius: 4px">leaveChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{LeaveChatRoomRes}}</p>
    </div>
    
    <p class="text-unit">更新聊天室信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="updateChatRoomInfo" style="border-radius: 4px">updateChatRoomInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{UpdateChatRoomInfoRes}}</p>
    </div>

    <p class="text-unit">解散聊天室</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="dismissChatRoom" style="border-radius: 4px">dismissChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{DismissChatRoomRes}}</p>
    </div>

    <p class="text-unit">剔除用户</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uid">
            <el-input v-model="KickOffUserReq.uid"></el-input>
          </el-form-item>
          <el-form-item label="secs">
            <el-input v-model="KickOffUserReq.secs"></el-input>
          </el-form-item>
          <el-form-item label="reason">
            <el-input v-model="KickOffUserReq.reason"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="kickOffUser" style="border-radius: 4px">kickOffUser</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{KickOffUserRes}}</p>
    </div>

    <p class="text-unit">客户端给群组推送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="content">
            <el-input v-model="sendGroupMessageReq.content"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="sendGroupMessage" style="border-radius: 4px">sendGroupMessage</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{sendGroupMessageRes}}</p>
    </div>

    <p class="text-unit">A给B发送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="content">
            <el-input v-model="sendSingleUserMessageReq.content"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="sendSingleUserMessageReq.receiver"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="sendSingleUserMessage" style="border-radius: 4px">sendSingleUserMessage</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{sendSingleUserMessageRes}}</p>
    </div>

    <p class="text-unit">客户端发送公屏</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="chat">
            <el-input v-model="SendTextChatReq.chat"></el-input>
          </el-form-item>
         <el-form-item class="search">
            <el-button type="primary"  @click="sendTextChat" style="border-radius: 4px">sendTextChat</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{SendTextChatRes}}</p>
    </div>

    <p class="text-unit">获取聊天室信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="getChatRoomInfo" style="border-radius: 4px">getChatRoomInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetChatRoomInfoRes}}</p>
    </div>

    <p class="text-unit">获取聊天室所有管理员</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="roler">
            <el-input v-model="GetChatRoomManagerReq.roler" disabled></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getChatRoomManager" style="border-radius: 4px">getChatRoomManager</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetChatRoomManagerRes}}</p>
    </div>

    <p class="text-unit">获取聊天室用户数</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="getUserCount" style="border-radius: 4px">getUserCount</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetUserCountRes}}</p>
    </div>

    <p class="text-unit">获取聊天室用户列表</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
         <el-form-item label="num">
            <el-input v-model="GetUserListReq.num"></el-input>
          </el-form-item>
          <el-form-item label="pos">
            <el-input v-model="GetUserListReq.pos"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getUserList" style="border-radius: 4px">GetUserList</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetUserListRes}}</p>
    </div>

    <p class="text-unit">设置用户属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="key">
            <el-input v-model="SetUserAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="SetUserAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="setUserAttributes" style="border-radius: 4px">setUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{setUserAttributesRes}}</p>
    </div>

    <p class="text-unit">查询用户属性列表</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="getUserAttributesList" style="border-radius: 4px">getUserAttributesList</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getUserAttributesListRes}}</p>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  import { getRegions, getRegionChannelId } from '@/components/room.js';
  //import Hummer from 'hummer-chatroom'
 
  const UID = getStorage('uid');
  const ROOMID = Number(getStorage('roomid'));
  const AREA = getStorage("area");
  const APPID = getStorage("appid");
  const REGION = getStorage('region');
  const TOKEN = getStorage('token');

  export default {
    name : 'chatroom-test',
    data() {
      return {
        flag: -1,
        hummer: null,
        appid: APPID,
        roomid: ROOMID,
        uid: UID,
        token: TOKEN,
        region: REGION || 'cn',
        iRegion: 'chn',
        area: 'chn',
        areas: getRegions(),
        chatroom: null,
        chatrooms: [],
        regionChatroomId: '',
        regionChatroomIds: [],
        getInstanceInfoRes: '',
        JoinChatRoomReq: {
          joinProps: "",
        },
        JoinChatRoomRes: '',
        LeaveChatRoomRes: '',
        CreateChatRoomIdRes: '',
        UpdateChatRoomInfoRes: '',
        DismissChatRoomRes: '',
        KickOffUserReq: {
          admin: UID,
          uid: '0',
          secs: '3000',
          reason: "js test KickOffUser",
        },
        KickOffUserRes: '',
        sendGroupMessageReq: {
          content: "js_sdk sendGroupMessage",
        },
        sendGroupMessageRes: '',
        sendSingleUserMessageReq: {
          content: "js_sdk sendUnicast",
          receiver: UID,
        },
        sendSingleUserMessageRes: '',
        SendTextChatReq: {
          chat: "js_sdk sendTextChat",
        },
        SendTextChatRes: '',
        GetChatRoomInfoRes: '',
        GetChatRoomManagerReq: {
          roler: "owner"
        },
        GetChatRoomManagerRes: '',
        GetUserCountRes: '',
        GetUserListReq: {
          num: 10,
          pos: 0,
        },
        GetUserListRes: '',
        display: {
          RcvSingleUserData: "",
        },
        SetUserAttributesReq: {
          key: 'Name',
          prop: '阿武'
        },
        setUserAttributesRes: '',
        getUserAttributesListRes: '',
      }
    },
    computed: {
    },
    watch: {
    },
    created() {
      let token = getStorage("token");
      // 初始化Hummer
      this.hummer = Hummer.createHummer({ appid: this.appid,
                                  uid: this.uid,
                                  token: this.token,
                                  onError: (data) => {
                                    console.log('new hummer: data=' + JSON.stringify(data));
                                    this.flag = data.code;
                                  }
                                });

      if (this.flag != 0) {
        this.hummer = null;
        return;
      }
      
      this.hummer.setLogLevel(-1);

      this.onConnectStatus();
      this.onLoginStatus();
    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      initChatRoom() {
        if (!this.hummer) {
          console.log("hummer is null");
          return;
        }

        if (this.chatroom) {
            console.log("renew chatroom again!");
            delete this.chatroom;
            this.chatroom = null;
        }

        this.regionChatroomId = getRegionChannelId(this.region, this.roomid);
        if (this.chatrooms[this.regionChatroomId]) {
          console.log('channel exists, and chatrooms=', this.chatrooms);
          return;
        }

        this.chatroom = this.hummer.createChatRoom({
          region: this.iRegion,
          roomid: this.roomid
        });
        if (!this.chatroom) {
          return;
        }
        
        this.chatrooms[this.regionChatroomId] = {
          chatroom: this.chatroom,
          region: this.region,
          roomid: this.roomid
        }

        this.regionChatroomIds.push({value: this.regionChatroomId, label: this.regionChatroomId});

        console.log('chatrooms=', this.chatrooms);

        let client = this.chatrooms[this.regionChatroomId];
        this.onRecvSingleUserMessage(client);
        this.onDismissChatRoomBc(client);
        this.onUpdateChatRoomInfoBc(client);
        this.onKickOffUserBc(client);
        this.onRecvGroupBc(client);
        this.onTextChatBc(client);
        this.onUserCountBc(client);
        this.onUserOnlineChangeBc(client);
        this.onNotifyUserAttributesSet(client);

        setStorage("roomid", this.roomid);
      },
      createChatRoomId() {
        if (!this.hummer)
          return;

        this.$confirm("确认创建RoomId吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {

          let props = {
            "Name": "Hummer聊天室",
            "Description": "测试",
            "Bulletin": "公告",
            "Extention": "自定义",
          };
         
          let region = this.iRegion;
          let params = { region, props };
          this.hummer.createChatRoomId(params).then((res) => {
            console.log("createChatRoomId Res: ", res);
            this.CreateChatRoomIdRes = res;
            if (res.rescode == 0) {
              this.roomid = res.roomid;
              setStorage("roomid", this.roomid);
            }
          }).catch(err => {
            console.log(err)
          });

        }).catch(e => {
          console.log(e);
        });
      },

      // ------------------ 测试接口 --------------------
      getInstanceInfo() {
        if (!this.hummer)
          return;

        this.hummer.getInstanceInfo().then(res => {
          console.log("getInstanceInfo: "  + JSON.stringify(res));
          this.GetInstanceInfoRes = JSON.stringify(res);
        }).catch(err => {
          console.log(err);
        });
      },
      joinChatRoom() {
        if (!this.chatrooms[this.regionChatroomId])
          return;

        console.log('regionChatroomId=', this.regionChatroomId, ' chatroom=', this.chatrooms[this.regionChatroomId]);
        
        let joinProps = { "H5_sdk": 'js_sdk' };
        let req = { joinProps }
        this.chatrooms[this.regionChatroomId].chatroom.joinChatRoom(req).then(res => {
          console.log("joinChatRoom Res: " + JSON.stringify(res));
          this.JoinChatRoomRes = res;
        }).catch(err => {
          console.log("joinChatRoom: err=", err);
        })
      },
      leaveChatRoom() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        this.chatrooms[this.regionChatroomId].chatroom.leaveChatRoom().then((res) => {
          console.log("leaveChatRoom Res: " + JSON.stringify(res));
          this.LeaveChatRoomRes = res;
        }).catch((err) => {
          console.log("leaveChatRoom: err=", err);
        })
      },
      updateChatRoomInfo() {
        if (!this.chatrooms[this.regionChatroomId])
          return;

        let props = {
          "Name": "阿武",
          "Description": "js_sdk测试",
          "Bulletin": "bull",
          "Extention": "ex",
        };
        
        let req = { props };
        this.chatrooms[this.regionChatroomId].chatroom.updateChatRoomInfo(req).then((res) => {
          this.UpdateChatRoomInfoRes = res;
          console.log("updateChatRoomInfo Res: " + JSON.stringify(res));
        }).catch(err => {
          console.log(err)
        })
      },
      dismissChatRoom() {
        if (!this.chatrooms[this.regionChatroomId])
          return;

        this.$confirm("解散聊天室RoomId吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {

          this.chatrooms[this.regionChatroomId].chatroom.dismissChatRoom().then((res) => {
            console.log("dismissChatRoom Res: ", res);
            this.DismissChatRoomRes = res;
            if (res.rescode == 0) {
              delete this.chatrooms[this.regionChatroomId];
              this.chatrooms[this.regionChatroomId] = null;
              this.roomid = 0;
              setStorage("roomid", this.roomid);
            }
          }).catch(err => {
            console.log(err)
          })

        }).catch(e => {
          console.log(e);
        });
      },
      kickOffUser() {
        if (!this.chatrooms[this.regionChatroomId])
          return;

        let uid = this.KickOffUserReq.uid;
        let secs = this.KickOffUserReq.secs;
        let reason = this.KickOffUserReq.reason;

        let req = { uid, secs, reason }
        this.chatrooms[this.regionChatroomId].chatroom.kickOffUser(req).then(res => {
          this.KickOffUserRes = JSON.stringify(res);
          console.log("kickOffUser Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      sendGroupMessage() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        let content = this.sendGroupMessageReq.content;
        let req = { content }
        this.chatrooms[this.regionChatroomId].chatroom.sendGroupMessage(req).then((res) => {
          console.log("sendGroupMessage Res: " + JSON.stringify(res));
          this.sendGroupMessageRes = res;
        }).catch(err => {
          console.log(err)
        })
      },
      sendSingleUserMessage() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        let content = this.sendSingleUserMessageReq.content;
        let receiver = this.sendSingleUserMessageReq.receiver;

        let req = { content, receiver }
        this.chatrooms[this.regionChatroomId].chatroom.sendSingleUserMessage(req).then((res) => {
          console.log("sendSingleUserMessage Res: " +  JSON.stringify(res));
          this.sendSingleUserMessageRes = JSON.stringify(res);
        }).catch(err => {
          console.log(err)
        })
      },
      sendTextChat() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        let chat = this.SendTextChatReq.chat;
        let chatProps = { "Name": "名称chatProps" };
        let extProps = { "Name": "名称extProps" };
  
        let req = { chat, chatProps, extProps }
        this.chatrooms[this.regionChatroomId].chatroom.sendTextChat(req).then((res) => {
          console.log("sendTextChat Res: " + JSON.stringify(res));
          this.SendTextChatRes = JSON.stringify(res);
        }).catch(err => {
          console.log(err)
        })
      },
      getChatRoomInfo() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        this.chatrooms[this.regionChatroomId].chatroom.getChatRoomInfo().then((res) => {
          console.log("getChatRoomInfo Res: " + JSON.stringify(res));
          this.GetChatRoomInfoRes = JSON.stringify(res);
        }).catch(err => {
          console.log(err)
        })
      },
      getChatRoomManager() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        let roler = this.GetChatRoomManagerReq.roler;

        let params = { roler }
        this.chatrooms[this.regionChatroomId].chatroom.getChatRoomManager(params).then((res) => {
          console.log("getChatRoomManager Res: " + JSON.stringify(res));
          this.GetChatRoomManagerRes = JSON.stringify(res);
        }).catch((err) => {
          console.log(err)
        })
      },
      getUserCount() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        this.chatrooms[this.regionChatroomId].chatroom.getUserCount().then((res) => {
          console.log("getUserCount Res: " + JSON.stringify(res));
          this.GetUserCountRes = JSON.stringify(res);
        }).catch(err => {
          console.log(err)
        })
      },
      getUserList() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        let num = this.GetUserListReq.num;
        let pos = this.GetUserListReq.pos;

        let req = { num, pos }
        this.chatrooms[this.regionChatroomId].chatroom.getUserList(req).then(res => {
          console.log("getUserList Res: " + JSON.stringify(res));
          this.GetUserListRes = JSON.stringify(res);
        }).catch(err => {
          console.log(err)
        })
      },
      setUserAttributes() {
        if (!this.chatrooms[this.regionChatroomId])
          return;

        let attributes = { 
          "Name": "awu", 
          "Description": "js_sdk测试", 
          "Bulletin": "bull", 
          "Extention": "ex" 
        };
        let key = this.SetUserAttributesReq.key;
        let prop = this.SetUserAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        this.chatrooms[this.regionChatroomId].chatroom.setUserAttributes(req).then((res) => {
          console.log("setUserAttributes Res: ", res);
          this.setUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.log(err)
        })
      },
      getUserAttributesList() {
        if (!this.chatrooms[this.regionChatroomId])
          return;
          
        this.chatrooms[this.regionChatroomId].chatroom.getUserAttributesList().then((res) => {
          console.log("getUserAttributesList Res: " + JSON.stringify(res));
          this.getUserAttributesListRes = JSON.stringify(res);
        }).catch((err) => {
          console.log(err)
        })
      },

      /*  消息接收模块 */
      onRecvSingleUserMessage(client) {
        client.chatroom.on('SingleUserMessage', (data) => {
          console.log("接收消息SingleUserMessage： " + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息SingleUserMessage： " + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onDismissChatRoomBc(client) {
        client.chatroom.on('DismissChatRoomBc', (data) => {
          console.log("接收消息DismissChatRoomBc： " + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息DismissChatRoomBc： " + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUpdateChatRoomInfoBc(client)  {
        client.chatroom.on('UpdateChatRoomInfoBc', (data) => {
          console.log("接收消息UpdateChatRoomInfoBc：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息UpdateChatRoomInfoBc：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onKickOffUserBc(client) {
        client.chatroom.on('KickOffUserBc', (data) => {
          console.log("接收消息KickOffUserBc：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息KickOffUserBc：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onRecvGroupBc(client) {
        client.chatroom.on('GroupMessage', (data) => {
          console.log("接收消息GroupMessage：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息GroupMessage：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onTextChatBc(client) {
        client.chatroom.on('TextChatBc', (data) => {
          console.log("接收消息TextChatBc：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息TextChatBc：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUserCountBc(client) {
        client.chatroom.on('NotifyUserCount', (data) => {
          console.log("接收消息NotifyUserCount：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息NotifyUserCount：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyUserAttributesSet(client) {
        client.chatroom.on('NotifyUserAttributesSet', (data) => {
          console.log("接收消息NotifyUserAttributesSet：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息NotifyUserAttributesSet：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onUserOnlineChangeBc(client) {
        client.chatroom.on('NotifyUserOnlineChange', (data) => {
          console.log("接收消息NotifyUserOnlineChange：" + JSON.stringify(data));

          this.$message({
            duration: 3000,
            message: "接收消息NotifyUserOnlineChange：" + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onConnectStatus() {
        this.hummer.on('ConnectStatus', (data) => {
          console.log("=== hummer channel status===:" + JSON.stringify(data));
        });
      },
      onLoginStatus() {
        this.hummer.on('LoginStatus', (data) => {
          console.log("=== hummer login status===:" + JSON.stringify(data));
        });
      }
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
</style>
