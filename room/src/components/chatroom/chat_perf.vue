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
            <el-button type="primary"  @click="initChatRoom" style="border-radius: 4px">initChatRoom</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetInstance" style="border-radius: 4px">getInstance</el-button>
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
            <el-button type="primary"  @click="onJoinChatRoom" style="border-radius: 4px">joinChatRoom</el-button>
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
            <el-button type="primary"  @click="onLeaveChatRoom" style="border-radius: 4px">leaveChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{LeaveChatRoomRes}}</p>
    </div>
    
    <p class="text-unit">创建聊天室</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onCreateChatRoom" style="border-radius: 4px">createChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{CreateChatRoomRes}}</p>
    </div>

    <p class="text-unit">更新聊天室信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onUpdateChatRoomInfo" style="border-radius: 4px">updateChatRoomInfo</el-button>
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
            <el-button type="primary"  @click="onDismissChatRoom" style="border-radius: 4px">dismissChatRoom</el-button>
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
            <el-button type="primary"  @click="onKickOffUser" style="border-radius: 4px">kickOffUser</el-button>
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
            <el-button type="primary"  @click="onSendGroupBc" style="border-radius: 4px">SendGroupBc</el-button>
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
            <el-button type="primary"  @click="onSendSingleUserData" style="border-radius: 4px">sendSingleUserData</el-button>
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
            <el-button type="primary"  @click="onSendTextChat" style="border-radius: 4px">SendTextChat</el-button>
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
            <el-button type="primary"  @click="onGetChatRoomInfo" style="border-radius: 4px">getChatRoomInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetChatRoomInfoRes.props}}</p>
    </div>

    <p class="text-unit">获取聊天室所有管理员</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="roler">
            <el-input v-model="GetChatRoomManagerParams.roler" disabled></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetChatRoomManager" style="border-radius: 4px">getChatRoomManager</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetChatRoomManagerRes.admins}}</p>
    </div>

    <p class="text-unit">获取聊天室用户数</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetUserCount" style="border-radius: 4px">getUserCount</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >totalCount: {{GetUserCountRes.totalCount}}</p>
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
            <el-button type="primary"  @click="onGetUserList" style="border-radius: 4px">getUserList</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetUserListRes}}</p>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { APPID, AREA } from '@/global.js';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
import { constants } from 'fs';
  
  const UID = getStorage('uid');
  const ROOMID = Number(getStorage('roomid'));

  export default {
    name : 'chatroom-perf',
    data() {
      return {
        flag: -1,
        hummer: null,
        chatroom: null,
        appid: APPID,
        roomid: ROOMID,
        uid: UID,
        GetInstanceRes: {
        },
        JoinChatRoomParams: {
          joinProps: "",
        },
        JoinChatRoomRes: {
          rescode: -1,
        },
        LeaveChatRoomRes: {
          rescode: -1,
        },
        CreateChatRoomRes: {
          rescode: -1,
        },
        UpdateChatRoomInfoRes: {
          rescode: -1,
        },
        DismissChatRoomRes: {
          rescode: -1,
        },
        KickOffUserParams: {
          admin: UID,
          uid: '0',
          secs: 3000,
          reason: "js test KickOffUser",
        },
        KickOffUserRes: {
          rescode: -1,
        },
        SendGroupBcParams: {
          content: "js_sdk SendGroupBc",
        },
        SendGroupBcRes: {
            rescode: -1
        },
        SendSingleUserDataParams: {
          content: "js_sdk sendUnicast",
          receiver: 0,
        },
        SendSingleUserDataRes: {
          rescode: -1,
        },
        SendTextChatParams: {
          chat: "js_sdk sendTextChat",
        },
        SendTextChatRes: {
            rescode: -1
        },
        GetChatRoomInfoRes: {
            props: {}
        },
        GetChatRoomManagerParams: {
          roler: "owner"
        },
        GetChatRoomManagerRes: {
          admins: {
              owner: [],
          },
        },
        GetUserCountRes: {
            totalCount: 0,
        },
        GetUserListParams: {
          num: 10,
          pos: 0,
        },
        GetUserListRes: {
            users: [],
        },
        display: {
          RcvSingleUserData: "",
        }
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
                                  onConnectStatus: this.onChatRoomConnectStatus,
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
            console.log("chatroom is ready");
            return
        }

        setStorage("roomid", this.roomid);

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
                                      onerror: (d) => {
                                        console.log('new chatroom: d=' + JSON.stringify(d));
                                      } 
                                    });
      },
      // ------------------ 测试接口 --------------------
      onGetInstance() {
        if (!this.chatroom)
          return;

        this.chatroom.getInstance().then(res => {
          console.log("getInstance: " + JSON.stringify(res));
          this.GetInstanceRes = res;
        }).catch(err => {
          console.log(err);
        });
      },
      onJoinChatRoom() {
        if (!this.chatroom)
          return;
        
        let joinProps = new Map([
          ["H5_sdk", 'js_sdk']
        ]);
        
        let params = { joinProps }
        this.chatroom.joinChatRoom(params).then((res) => {
          console.log("JoinChatRoom Res: " + JSON.stringify(res));
          this.JoinChatRoomRes.rescode = res.rescode;
        }).catch((err) => {
          console.log(err)
        })
      },
      onLeaveChatRoom() {
        if (!this.chatroom)
          return;
          
        this.chatroom.leaveChatRoom().then((res) => {
          console.log("leaveChatRoom Res: " + JSON.stringify(res));
          this.LeaveChatRoomRes.rescode = res.rescode;
        }).catch((err) => {
          console.log(err)
        })
      },
      onCreateChatRoom() {
        if (!this.chatroom)
          return;
          
        let props = new Map([
          ["Name", "Hummer聊天室"],
          ["Description", "测试"],
          ["Bulletin", "公告"],
          ["Extention", "自定义"],
        ]);
        
        let params = { props };
        this.chatroom.createChatRoom(params).then((res) => {
          console.log("createChatRoom Res: " + JSON.stringify(res));
          if (res.rescode == 0) {
            let roomid = res.roomid;
            this.chatroom.updateChatRoomId({roomid});
            this.roomid = roomid;
            setStorage("roomid", roomid);
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onUpdateChatRoomInfo() {
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
          this.UpdateChatRoomInfoRes.rescode = res.rescode;
          console.log("UpdateChatRoomInfo Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onDismissChatRoom() {
        if (!this.chatroom)
          return;

        this.chatroom.dismissChatRoom().then((res) => {
          this.DismissChatRoomRes.rescode = res.rescode;
          console.log("dismissChatRoom Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onKickOffUser() {
        if (!this.chatroom)
          return;

        let uid = this.KickOffUserParams.uid;
        let secs = this.KickOffUserParams.secs;
        let reason = this.KickOffUserParams.reason;

        let params = { uid, secs, reason }
        this.chatroom.kickOffUser(params).then((res) => {
          this.KickOffUserRes.rescode = res.rescode;
          console.log("kickOffUser Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onSendGroupBc() {
        if (!this.chatroom)
          return;
          
        let content = this.SendGroupBcParams.content;

        let timesRun = 0;
        let interval = setInterval(() => {
          timesRun += 1;
          if(timesRun === 60){
            clearInterval(interval);
          }
          
          let params = { content }
          this.chatroom.sendGroupBc(params).then((res) => {
            console.log("sendGroupBc Res: " + JSON.stringify(res));
            this.SendGroupBcRes.rescode = res.rescode;
          }).catch((err) => {
            console.log(err)
          })
        }, 1000);

      },
      onSendSingleUserData() {
        if (!this.chatroom)
          return;
          
        let content = this.SendSingleUserDataParams.content;
        let receiver = this.SendSingleUserDataParams.receiver;
        if (receiver === '0')
          return;

        let timesRun = 0;
        let interval = setInterval(() => {
          timesRun += 1;
          if(timesRun === 60){
            clearInterval(interval);
          }
          
          let params = { content, receiver }
          this.chatroom.sendSingleUserData(params).then((res) => {
            console.log("sendSingleUserData Res: " + JSON.stringify(res));
            this.SendSingleUserDataRes.rescode = res.rescode;
          }).catch((err) => {
            console.log(err)
          })
        }, 1000);

      },
      onSendTextChat() {
        if (!this.chatroom)
          return;
          
        let chat = this.SendTextChatParams.chat;
        let chatProps = new Map([
          ["Name", "名称chatProps"],
        ]);
        let extProps = new Map([
          ["Name", "名称extProps"],
        ]);

        let timesRun = 0;
        let interval = setInterval(() => {
          timesRun += 1;
          if(timesRun === 60){
            clearInterval(interval);
          }
          
          let params = { chat, chatProps, extProps }
          this.chatroom.sendTextChat(params).then((res) => {
            console.log("sendTextChat Res: " + JSON.stringify(res));
            this.SendTextChatRes.rescode = res.rescode;
          }).catch((err) => {
            console.log(err)
          })
        }, 1000);
      },
      onGetChatRoomInfo() {
        if (!this.chatroom)
          return;
          
        this.chatroom.getChatRoomInfo().then((res) => {
          console.log("getChatRoomInfo Res: " + JSON.stringify(res.toJsonObj()));
          this.GetChatRoomInfoRes.props = {};
          if (res.rescode == 0) {
              for (let [k, v] of res.props) {
                  this.GetChatRoomInfoRes.props[k] = v;
              }
              console.log("GetChatRoomInfoRes: " + JSON.stringify(this.GetChatRoomInfoRes.props));
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onGetChatRoomManager() {
        if (!this.chatroom)
          return;
          
        let roler = this.GetChatRoomManagerParams.roler;

        let params = { roler }
        this.chatroom.getChatRoomManager(params).then((res) => {
          console.log("getChatRoomManager Res: " + JSON.stringify(res.toJsonObj()));
          this.GetChatRoomManagerRes.admins.owner = [];
          if (res.rescode == 0) {
              let owners = res.admins.get("owner");
              if (owners) {
                this.GetChatRoomManagerRes.admins.owner = owners;
              }
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onGetUserCount() {
        if (!this.chatroom)
          return;
          
        this.chatroom.getUserCount().then((res) => {
          console.log("getUserCount Res: " + JSON.stringify(res));
          if (res.rescode == 0) {
            this.GetUserCountRes.totalCount = res.totalCount;
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onGetUserList() {
        if (!this.chatroom)
          return;
          
        let num = this.GetUserListParams.num;
        let pos = this.GetUserListParams.pos;

        let params = { num, pos }
        this.chatroom.getUserList(params).then((res) => {
          console.log("getUserList Res: " + JSON.stringify(res));
          this.GetUserListRes.users = [];
          if (res.rescode == 0) {
            this.GetUserListRes.users = res.users;
          }
        }).catch((err) => {
          console.log(err)
        })
      },

      /*  消息接收模块 */
      onRecvSingleUserData(data) {
        console.log("接收消息RecvSingleUserDataKKK： " + JSON.stringify(data));
      },
      onDismissChatRoomBc(data) {
        console.log("接收消息DismissChatRoomBc： " + JSON.stringify(data));
      },
      onUpdateChatRoomInfoBc(data)  {
        console.log("接收消息UpdateChatRoomInfoBc： " + JSON.stringify(data));
      },
      onKickOffUserBc(data) {
        console.log("接收消息KickOffUserBc： " + JSON.stringify(data));
      },
      onRecvGroupBc(data) {
        console.log("接收消息RecvGroupBc： " + JSON.stringify(data));
      },
      onTextChatBc(data) {
        console.log("接收消息TextChatBc： " + JSON.stringify(data));
      },
      onUserCountBc(data) {
        console.log("接收消息UserCountBc： " + JSON.stringify(data));
      },
      onUserOnlineChangeBc(data) {
        console.log("接收消息UserOnlineChangeBc： " + JSON.stringify(data));
      },
      onChatRoomConnectStatus(code) {
        switch(code) {
        case 0:
            console.log('断线了，重连成功', code)
            break;
        case 1:
            console.log('掉线了 ', code)
            break;
        default:
            break;
        }
      },
      onLoginStatus(data) {
        console.log("登录状态变化onLoginStatus： " + JSON.stringify(data));
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
