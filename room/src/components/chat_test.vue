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
            <el-input v-model="KickOffUserParams.uid"></el-input>
          </el-form-item>
          <el-form-item label="secs">
            <el-input v-model="KickOffUserParams.secs"></el-input>
          </el-form-item>
          <el-form-item label="reason">
            <el-input v-model="KickOffUserParams.reason"></el-input>
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
            <el-input v-model="SendGroupBcParams.content"></el-input>
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
            <el-input v-model="SendSingleUserDataParams.content"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="SendSingleUserDataParams.receiver"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="sendSingleUserData" style="border-radius: 4px">sendSingleUserData</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{SendSingleUserDataRes}}</p>
    </div>

    <p class="text-unit">客户端发送公屏</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="chat">
            <el-input v-model="SendTextChatParams.chat"></el-input>
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
            <el-input v-model="GetChatRoomManagerParams.roler" disabled></el-input>
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
            <el-input v-model="GetUserListParams.num"></el-input>
          </el-form-item>
          <el-form-item label="pos">
            <el-input v-model="GetUserListParams.pos"></el-input>
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
  import { APPID, AREA } from '@/global.js';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  
  const UID = getStorage('uid');
  const ROOMID = Number(getStorage('roomid'));

  export default {
    name : 'chatroom',
    data() {
      return {
        flag: -1,
        hummer: null,
        chatroom: null,
        appid: APPID,
        roomid: ROOMID,
        uid: UID,
        GetInstanceRes: '',
        JoinChatRoomParams: {
          joinProps: "",
        },
        JoinChatRoomRes: '',
        LeaveChatRoomRes: '',
        CreateChatRoomIdRes: '',
        UpdateChatRoomInfoRes: '',
        DismissChatRoomRes: '',
        KickOffUserParams: {
          admin: UID,
          uid: '0',
          secs: 3000,
          reason: "js test KickOffUser",
        },
        KickOffUserRes: '',
        SendGroupBcParams: {
          content: "js_sdk SendGroupBc",
        },
        SendGroupBcRes: '',
        SendSingleUserDataParams: {
          content: "js_sdk sendUnicast",
          receiver: '123',
        },
        SendSingleUserDataRes: '',
        SendTextChatParams: {
          chat: "js_sdk sendTextChat",
        },
        SendTextChatRes: '',
        GetChatRoomInfoRes: '',
        GetChatRoomManagerParams: {
          roler: "owner"
        },
        GetChatRoomManagerRes: '',
        GetUserCountRes: '',
        GetUserListParams: {
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
      let uid = getStorage('uid');
      let token = getStorage("token");
      let roomid = Number(getStorage('roomid'));

      // 1. 初始化Hummer
      this.hummer = new Hummer.Hummer({ appid: APPID, 
                                  uid: uid,
                                  token: token,
                                  area: AREA,
                                  onConnectStatus: this.onConnectStatus,
                                  onLoginStatus: this.onLoginStatus,
                                  onerror: (d) => {
                                    console.log('new hummer: d=' + JSON.stringify(d));
                                    this.flag = d.code;
                                  }
                                });

    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      initChatRoom() {
        if (!this.hummer) {
          console.log("hummer is null");
        }

        if (this.chatroom) {
            console.log("renew chatroom again!");
            delete this.chatroom;
            this.chatroom = null;
        }

        this.chatroom = new Hummer.ChatRoom(this.hummer, {  
                                      roomid: this.roomid,
                                      onRecvSingleUserData: this.onRecvSingleUserData,
                                      onDismissChatRoomBc: this.onDismissChatRoomBc,
                                      onUpdateChatRoomInfoBc: this.onUpdateChatRoomInfoBc,
                                      onKickOffUserBc: this.onKickOffUserBc,
                                      onRecvGroupBc: this.onRecvGroupBc,
                                      onTextChatBc: this.onTextChatBc,
                                      onUserCountBc: this.onUserCountBc,
                                      onUserOnlineChangeBc: this.onUserOnlineChangeBc,
                                      onNotifyUserAttributesSet: this.onNotifyUserAttributesSet,
                                      onerror: (d) => {
                                        console.log('new chatroom: d=' + JSON.stringify(d));
                                      } 
                                    });

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
          }).catch((err) => {
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
        
        let joinProps = new Map([
          ["H5_sdk", 'js_sdk']
        ]);
        
        let params = { joinProps }
        this.chatroom.joinChatRoom(params).then((res) => {
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

        let props = new Map([
          ["Name", "阿武"],
          ["Description", "js_sdk测试"],
          ["Bulletin", "bull"],
          ["Extention", "ex"],
        ]);
        
        let params = { props };
        this.chatroom.updateChatRoomInfo(params).then((res) => {
          this.UpdateChatRoomInfoRes = res;
          console.log("updateChatRoomInfo Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      dismissChatRoom() {
        if (!this.chatroom)
          return;

        this.chatroom.dismissChatRoom().then((res) => {
          console.log("dismissChatRoom Res: ", res);
          this.DismissChatRoomRes = res;
          if (res.rescode == 0) {
            delete this.chatroom;
            this.chatroom = null;
            this.roomid = 0;
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      kickOffUser() {
        if (!this.chatroom)
          return;

        let uid = this.KickOffUserParams.uid;
        let secs = this.KickOffUserParams.secs;
        let reason = this.KickOffUserParams.reason;

        let params = { uid, secs, reason }
        this.chatroom.kickOffUser(params).then((res) => {
          this.KickOffUserRes = res;
          console.log("kickOffUser Res: ", res);
        }).catch((err) => {
          console.log(err)
        })
      },
      sendGroupBc() {
        if (!this.chatroom)
          return;
          
        let content = this.SendGroupBcParams.content;

        let params = { content }
        this.chatroom.sendGroupBc(params).then((res) => {
          console.log("sendGroupBc Res: ", res);
          this.SendGroupBcRes = res;
        }).catch((err) => {
          console.log(err)
        })
      },
      sendSingleUserData() {
        if (!this.chatroom)
          return;
          
        let content = this.SendSingleUserDataParams.content;
        let receiver = this.SendSingleUserDataParams.receiver;

        let params = { content, receiver }
        this.chatroom.sendSingleUserData(params).then((res) => {
          console.log("sendSingleUserData Res: ", res);
          this.SendSingleUserDataRes = res;
        }).catch((err) => {
          console.log(err)
        })
      },
      sendTextChat() {
        if (!this.chatroom)
          return;
          
        let chat = this.SendTextChatParams.chat;
        let chatProps = { "Name": "名称chatProps" };
        let extProps = { "Name": "名称extProps" };
  
        let params = { chat, chatProps, extProps }
        this.chatroom.sendTextChat(params).then((res) => {
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
          
        let roler = this.GetChatRoomManagerParams.roler;

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
          
        let num = this.GetUserListParams.num;
        let pos = this.GetUserListParams.pos;

        let params = { num, pos }
        this.chatroom.getUserList(params).then((res) => {
          console.log("getUserList Res: " + JSON.stringify(res));
          this.GetUserListRes = JSON.stringify(res);
        }).catch((err) => {
          console.log(err)
        })
      },
      setUserAttributes() {
        if (!this.chatroom)
          return;

        /*
        let attributes = new Map([
          ["Name", "awu"],
          ["Description", "js_sdk测试"],
          ["Bulletin", "bull"],
          ["Extention", "ex"]
        ]);

        let key = this.SetUserAttributesReq.key;
        let prop = this.SetUserAttributesReq.prop;
        attributes.set(key, prop);
        */

        let attributes = { "Name": "awu", "Description": "js_sdk测试", "Bulletin": "bull", "Extention": "ex" };
        let key = this.SetUserAttributesReq.key;
        let prop = this.SetUserAttributesReq.prop;
        attributes[key] = prop;
        
        let params = { attributes };
        this.chatroom.setUserAttributes(params).then((res) => {
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
      onRecvSingleUserData(obj) {
        console.log("接收消息RecvSingleUserData： " + JSON.stringify(obj));

        this.$message({
          duration: 3000,
          message: "接收消息RecvSingleUserData： " + JSON.stringify(obj),
          type: 'success'
        });
      },
      onDismissChatRoomBc(data) {
        console.log("接收消息DismissChatRoomBc： " + JSON.stringify(data));
      },
      onUpdateChatRoomInfoBc(obj)  {
        console.log("接收消息UpdateChatRoomInfoBc： " + JSON.stringify(obj));

        this.$message({
          duration: 3000,
          message: "接收消息UpdateChatRoomInfoBc： " + JSON.stringify(obj),
          type: 'success'
        });
      },
      onKickOffUserBc(obj) {
        console.log("接收消息KickOffUserBc： " + JSON.stringify(obj));

        this.$message({
          duration: 3000,
          message: "接收消息KickOffUserBc： " + JSON.stringify(obj),
          type: 'success'
        });
      },
      onRecvGroupBc(obj) {
        console.log("接收消息RecvGroupBc： " + JSON.stringify(obj));

        this.$message({
          duration: 3000,
          message: "接收消息RecvGroupBc: " + JSON.stringify(obj),
          type: 'success'
        });
      },
      onTextChatBc(obj) {
        console.log("接收消息TextChatBc： " + JSON.stringify(obj));

        this.$message({
          duration: 3000,
          message: "接收消息TextChatBc： " + JSON.stringify(obj),
          type: 'success'
        });
      },
      onUserCountBc(obj) {
        console.log("接收消息UserCountBc：" + JSON.stringify(obj));

        this.$message({
          duration: 3000,
          message: "接收消息UserCountBc：" + JSON.stringify(obj),
          type: 'success'
        });
      },
      onNotifyUserAttributesSet(obj) {
        console.log("接收消息UserAttributesSet： " + JSON.stringify(obj));

        this.$message({
          duration: 3000,
          message: "接收消息UserAttributesSet：" + JSON.stringify(obj),
          type: 'success'
        });
      },
      onUserOnlineChangeBc(obj) {
        console.log("接收消息UserOnlineChangeBc：" + JSON.stringify(obj));

        this.$message({
          duration: 3000,
          message: "接收消息UserOnlineChangeBc：" + JSON.stringify(obj),
          type: 'success'
        });
      },
      onConnectStatus(obj) {
        console.log("===connect status===:", obj);
      },
      onLoginStatus(obj) {
        console.log("===login status===:", obj);
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
