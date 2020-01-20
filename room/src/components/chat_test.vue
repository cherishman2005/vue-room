<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">聊天室调测系统（调用聊天室js_sdk，提供调测接口）</h2>

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
          <el-form-item class="search">
            <el-button type="primary"  @click="createChatRoomId" style="border-radius: 4px">createChatRoomId</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="initChatRoom" style="border-radius: 4px">initChatRoom</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getInstance" style="border-radius: 4px">getInstance</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetInstanceRes}}</p>
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
            <el-input v-model="SendGroupBcReq.content"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="sendGroupBc" style="border-radius: 4px">sendGroupBc</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{SendGroupBcRes}}</p>
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
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{SetUserAttributesRes}}</p>
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
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{GetUserAttributesListRes}}</p>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  //import Hummer from 'hummer-chatroom'
 
  const UID = getStorage('uid');
  const ROOMID = Number(getStorage('roomid'));
  const AREA = getStorage("area");
  const APPID = getStorage("appid");

  export default {
    name : 'chatroom-test',
    data() {
      return {
        flag: -1,
        hummer: null,
        chatroom: null,
        appid: APPID,
        roomid: ROOMID,
        uid: UID,
        GetInstanceRes: '',
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
          secs: 3000,
          reason: "js test KickOffUser",
        },
        KickOffUserRes: '',
        SendGroupBcReq: {
          content: "js_sdk SendGroupBc",
        },
        SendGroupBcRes: '',
        sendSingleUserMessageReq: {
          content: "js_sdk sendUnicast",
          receiver: '123',
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
        SetUserAttributesRes: '',
        GetUserAttributesListRes: '',
      }
    },
    computed: {
    },
    watch: {
    },
    created() {
      let token = getStorage("token");

      // 1. 初始化Hummer
      this.hummer = new Hummer.Hummer({ appid: APPID, 
                                  uid: this.uid,
                                  token: token,
                                  area: AREA,
                                  onConnectStatus: this.onConnectStatus,
                                  onLoginStatus: this.onLoginStatus,
                                  onerror: (data) => {
                                    console.log('new hummer: data=' + JSON.stringify(data));
                                    this.flag = data.code;
                                  }
                                });

      if (this.flag != 0) {
        this.hummer = null;
        return;
      }

      this.hummer.setLogLevel({level: -1});
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

        this.chatroom = new Hummer.ChatRoom(this.hummer, {  
                                      roomid: this.roomid,
                                      onRecvSingleUserMessage: this.onRecvSingleUserMessage,
                                      onDismissChatRoomBc: this.onDismissChatRoomBc,
                                      onUpdateChatRoomInfoBc: this.onUpdateChatRoomInfoBc,
                                      onKickOffUserBc: this.onKickOffUserBc,
                                      onRecvGroupBc: this.onRecvGroupBc,
                                      onTextChatBc: this.onTextChatBc,
                                      onUserCountBc: this.onUserCountBc,
                                      onUserOnlineChangeBc: this.onUserOnlineChangeBc,
                                      onNotifyUserAttributesSet: this.onNotifyUserAttributesSet,
                                      onerror: (data) => {
                                        console.log('new chatroom: data=' + JSON.stringify(data));
                                        this.flag = data.code;
                                      } 
                                    });

        if (this.flag != 0) {
          delete this.chatroom;
          this.chatroom = null;
          return;
        }

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
        
          let params = { props };
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
      getInstance() {
        if (!this.chatroom)
          return;

        this.chatroom.getInstance().then(res => {
          console.log("getInstance: ", res);
          this.GetInstanceRes = res;
        }).catch(err => {
          console.log(err);
        });
      },
      joinChatRoom() {
        if (!this.chatroom)
          return;
        
        let joinProps = { "H5_sdk": 'js_sdk' };
        let req = { joinProps }
        this.chatroom.joinChatRoom(req).then((res) => {
          console.log("joinChatRoom Res: " + JSON.stringify(res));
          this.JoinChatRoomRes = res;
        }).catch((err) => {
          console.log("joinChatRoom: err=", err);
        })
      },
      leaveChatRoom() {
        if (!this.chatroom)
          return;
          
        this.chatroom.leaveChatRoom().then((res) => {
          console.log("leaveChatRoom Res: " + JSON.stringify(res));
          this.LeaveChatRoomRes = res;
        }).catch((err) => {
          console.log("leaveChatRoom: err=", err);
        })
      },
      updateChatRoomInfo() {
        if (!this.chatroom)
          return;

        let props = {
          "Name": "阿武",
          "Description": "js_sdk测试",
          "Bulletin": "bull",
          "Extention": "ex",
        };
        
        let req = { props };
        this.chatroom.updateChatRoomInfo(req).then((res) => {
          this.UpdateChatRoomInfoRes = res;
          console.log("updateChatRoomInfo Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      dismissChatRoom() {
        if (!this.chatroom)
          return;


        this.$confirm("解散聊天室RoomId吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {

          this.chatroom.dismissChatRoom().then((res) => {
            console.log("dismissChatRoom Res: ", res);
            this.DismissChatRoomRes = res;
            if (res.rescode == 0) {
              delete this.chatroom;
              this.chatroom = null;
              this.roomid = 0;
              setStorage("roomid", this.roomid);
            }
          }).catch((err) => {
            console.log(err)
          })

        }).catch(e => {
          console.log(e);
        });
      },
      kickOffUser() {
        if (!this.chatroom)
          return;

        let uid = this.KickOffUserReq.uid;
        let secs = this.KickOffUserReq.secs;
        let reason = this.KickOffUserReq.reason;

        let req = { uid, secs, reason }
        this.chatroom.kickOffUser(req).then((res) => {
          this.KickOffUserRes = res;
          console.log("kickOffUser Res: ", res);
        }).catch((err) => {
          console.log(err)
        })
      },
      sendGroupBc() {
        if (!this.chatroom)
          return;
          
        let content = this.SendGroupBcReq.content;
        let req = { content }
        this.chatroom.sendGroupBc(req).then((res) => {
          console.log("sendGroupBc Res: ", res);
          this.SendGroupBcRes = res;
        }).catch((err) => {
          console.log(err)
        })
      },
      sendSingleUserMessage() {
        if (!this.chatroom)
          return;
          
        let content = this.sendSingleUserMessageReq.content;
        let receiver = this.sendSingleUserMessageReq.receiver;

        let req = { content, receiver }
        this.chatroom.sendSingleUserMessage(req).then((res) => {
          console.log("sendSingleUserMessage Res: ", res);
          this.sendSingleUserMessageRes = res;
        }).catch((err) => {
          console.log(err)
        })
      },
      sendTextChat() {
        if (!this.chatroom)
          return;
          
        let chat = this.SendTextChatReq.chat;
        let chatProps = { "Name": "名称chatProps" };
        let extProps = { "Name": "名称extProps" };
  
        let req = { chat, chatProps, extProps }
        this.chatroom.sendTextChat(req).then((res) => {
          console.log("sendTextChat Res: " + JSON.stringify(res));
          this.SendTextChatRes = res;
        }).catch((err) => {
          console.log(err)
        })
      },
      getChatRoomInfo() {
        if (!this.chatroom)
          return;
          
        this.chatroom.getChatRoomInfo().then((res) => {
          console.log("getChatRoomInfo Res: " + JSON.stringify(res));
          this.GetChatRoomInfoRes = res;
        }).catch((err) => {
          console.log(err)
        })
      },
      getChatRoomManager() {
        if (!this.chatroom)
          return;
          
        let roler = this.GetChatRoomManagerReq.roler;

        let params = { roler }
        this.chatroom.getChatRoomManager(params).then((res) => {
          console.log("getChatRoomManager Res: " + JSON.stringify(res));
          this.GetChatRoomManagerRes = JSON.stringify(res);
        }).catch((err) => {
          console.log(err)
        })
      },
      getUserCount() {
        if (!this.chatroom)
          return;
          
        this.chatroom.getUserCount().then((res) => {
          console.log("getUserCount Res: " + JSON.stringify(res));
          this.GetUserCountRes = JSON.stringify(res);
        }).catch((err) => {
          console.log(err)
        })
      },
      getUserList() {
        if (!this.chatroom)
          return;
          
        let num = this.GetUserListReq.num;
        let pos = this.GetUserListReq.pos;

        let req = { num, pos }
        this.chatroom.getUserList(req).then((res) => {
          console.log("getUserList Res: " + JSON.stringify(res));
          this.GetUserListRes = JSON.stringify(res);
        }).catch((err) => {
          console.log(err)
        })
      },
      setUserAttributes() {
        if (!this.chatroom)
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
        this.chatroom.setUserAttributes(req).then((res) => {
          console.log("setUserAttributes Res: ", res);
          this.SetUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.log(err)
        })
      },
      getUserAttributesList() {
        if (!this.chatroom)
          return;
          
        this.chatroom.getUserAttributesList().then((res) => {
          console.log("getUserAttributesList Res: " + JSON.stringify(res));
          this.GetUserAttributesListRes = JSON.stringify(res);
        }).catch((err) => {
          console.log(err)
        })
      },

      /*  消息接收模块 */
      onRecvSingleUserMessage(data) {
        console.log("接收消息RecvSingleUserData： " + JSON.stringify(data));

        this.$message({
          duration: 3000,
          message: "接收消息RecvSingleUserData： " + JSON.stringify(data),
          type: 'success'
        });
      },
      onDismissChatRoomBc(data) {
        console.log("接收消息DismissChatRoomBc： " + JSON.stringify(data));
      },
      onUpdateChatRoomInfoBc(data)  {
        console.log("接收消息UpdateChatRoomInfoBc： " + JSON.stringify(data));

        this.$message({
          duration: 3000,
          message: "接收消息UpdateChatRoomInfoBc： " + JSON.stringify(data),
          type: 'success'
        });
      },
      onKickOffUserBc(data) {
        console.log("接收消息KickOffUserBc： " + JSON.stringify(data));

        this.$message({
          duration: 3000,
          message: "接收消息KickOffUserBc： " + JSON.stringify(data),
          type: 'success'
        });
      },
      onRecvGroupBc(data) {
        console.log("接收消息RecvGroupBc： " + JSON.stringify(data));

        this.$message({
          duration: 3000,
          message: "接收消息RecvGroupBc: " + JSON.stringify(data),
          type: 'success'
        });
      },
      onTextChatBc(data) {
        console.log("接收消息TextChatBc： " + JSON.stringify(data));

        this.$message({
          duration: 3000,
          message: "接收消息TextChatBc： " + JSON.stringify(data),
          type: 'success'
        });
      },
      onUserCountBc(data) {
        console.log("接收消息UserCountBc：" + JSON.stringify(data));

        this.$message({
          duration: 3000,
          message: "接收消息UserCountBc：" + JSON.stringify(data),
          type: 'success'
        });
      },
      onNotifyUserAttributesSet(data) {
        console.log("接收消息UserAttributesSet： " + JSON.stringify(data));

        this.$message({
          duration: 3000,
          message: "接收消息UserAttributesSet：" + JSON.stringify(data),
          type: 'success'
        });
      },
      onUserOnlineChangeBc(data) {
        console.log("接收消息UserOnlineChangeBc：" + JSON.stringify(data));

        this.$message({
          duration: 3000,
          message: "接收消息UserOnlineChangeBc：" + JSON.stringify(data),
          type: 'success'
        });
      },
      onConnectStatus(data) {
        console.log("===connect status===:", data);
      },
      onLoginStatus(data) {
        console.log("===login status===:", data);
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
