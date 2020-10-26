<template>
  <div class="chat">
    <div class = "left">
      <div style="height:100px;">
        <p style="height:30px;text-align:left;" >【群组】</p>
        <template>
          <button style="width:95%; height:30px; text-align:left;" @click="switchGroup">{{ roomid }}</button><br/>
        </template>
      </div>
      <div style="height:250px;">
        <p style="height:30px;text-align:left;">【用户UID列表】</p>
        <template v-for="user in GetUserListRes.users">
          <button style="width:95%; height:30px; text-align:left;" @click="switchSingle(user)">{{ user }}</button><br/>
        </template>
      </div>

      <div style="display:flex; height:400px;">
        <el-row type="flex">
          <el-col :span="24"  style="height:30px;text-align:left;" >
            <el-form :inline="true" size="small">
              <el-form-item label="uid">
                <el-input v-model="uid" disabled></el-input>
              </el-form-item>
            </el-form>
            <el-form :inline="true" size="small">
              <el-form-item label="roomid">
                <el-input v-model="roomid"></el-input>
              </el-form-item>
            </el-form>
            <button style="width:95%; height:30px; text-align:center;" @click="initChatRoom">初始化</button><br/>
            <button style="width:95%; height:30px; text-align:center;" @click="onJoinChatRoom">加入</button><br/>
            <button style="width:95%; height:30px; text-align:center;" @click="onLeaveChatRoom">退出</button><br/>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class = "middle">
      <div class="chat-wrap">
        <h1 v-if="isGroupChat">{{ chatroom_name }}（总人数：{{GetUserCountRes.totalCount}}）</h1>
        <h1 v-else>{{ singleUserUid }}（一对一聊天）</h1>
        <div class="chat-con clearfix" id="chat_con">
          <!--
          <template>
            <p >{{item.message}}</p><br/>
          </template>
          -->

          <template v-if="isGroupChat">
            <!-- 群组消息 -->
            <!--
            <template v-for="item in textChatList">
              <template>
                <div class="chat-item item-right clearfix" v-if="item.uid == uid"><span class="img fr"></span><span class="message fr">{{ item.chat }}</span></div>
                <div class="chat-item item-left clearfix rela" v-else><span class="abs uname">{{item.uid}} </span><span class="img fl"></span><span class="fl message">{{ item.chat }}</span></div>
              </template>
            </template>
            -->
            <template v-for="item in groupContentList">
              <template>
                <div class="chat-item item-right clearfix" v-if="item.uid == uid"><span class="img fr"></span><span class="message fr">{{ item.content }}</span></div>
                <div class="chat-item item-left clearfix rela" v-else><span class="abs uname">{{item.uid}} </span><span class="img fl"></span><span class="fl message">{{ item.content }}</span></div>
              </template>
            </template>
          </template>
          <template v-else>
            <!-- A给B发消息 -->
            <template v-for="item in singleUserDataList">
              <template>
                <div class="chat-item item-right clearfix" v-if="isSingleReq(item)"><span class="img fr"></span><span class="message fr">{{ item.content }}</span></div>
                <div class="chat-item item-left clearfix rela" v-else>
                  <span v-if="isSingleRes(item)">
                    <span class="abs uname">{{item.uid}} </span><span class="img fl"></span><span class="fl message">{{ item.content }}</span>
                  </span>
                </div>
              </template>
            </template>            
          </template>

        </div>
        <div class="bottom">
          <template v-if="isGroupChat">
            <!--
            <input type="text" id="sendtxt" v-model.trim="SendTextChatParams.chat" @keyup.13="onSendTextChat">
            <button class="sendBtn" @click="onSendTextChat">发送</button>
            -->
            <input type="text" id="sendtxt" v-model.trim="SendGroupBcParams.content" @keyup.13="onSendGroupBc">
            <button class="sendBtn" @click="onSendGroupBc">发送</button>
          </template>
          <template v-else>
            <input type="text" id="sendtxt" v-model.trim="SendSingleUserDataParams.content" @keyup.13="onSendSingleUserData">
            <button class="sendBtn" @click="onSendSingleUserData">发送</button>
          </template>
        </div>
      </div>
    </div>

    <div class = "right">
      <button style="width:95%; height:30px; text-align:center;" @click="onCreateChatRoom">创建</button><br/>
      <p v-if="true" style="height:30px;text-align:left;">【聊天室信息】</p>
        <div style="height:30px;text-align:left;">名称: {{ chatroom_name }}<br/></div>
        <div style="height:30px;text-align:left;">描述: {{ chatroom_discription }}<br/></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { APPID, AREA } from '@/global.js';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  
  const UID = Number(getStorage('osudb_uid'));
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
        isGroupChat: true,
        singleUserUid: 0,
        chatroom_name: '聊天室',
        chatroom_discription: '',
        textChatList: [],
        groupContentList: [],
        singleUserDataList: [],
        joinUsers: [],
        leaveUsers: [],
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
        SendGroupBcParams: {
          content: "",
        },
        SendGroupBcRes: {
            rescode: -1
        },
        SendSingleUserDataParams: {
          content: "",
          receiver: 0,
        },
        SendSingleUserDataRes: {
          rescode: -1,
        },
        // 公屏消息
        SendTextChatParams: {
          chat: "",
        },
        SendTextChatRes: {
            rescode: -1
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
      }
    },
    mounted() {

    },
    filters: {
      formatDate(data) {
        var date = data ? new Date(data) : new Date();
        var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
        return time;
      }
    },
    created() {
      let uid = getStorage('osudb_uid');
      let token = getStorage("osudb_c");
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
      
      // 2. 初始化ChatRoom
      //this.initChatRoom();

    },
    methods: {
      switchGroup() {
        this.isGroupChat = true;
      },
      switchSingle(uid) {
        this.isGroupChat = false;
        console.log("switchSingle: user=" + uid);
        this.singleUserUid = uid;
      },
      isSingleReq(item) {
        return item.type == 1 && item.receiver == this.singleUserUid;
      },
      isSingleRes(item) {
        return item.type == 0 && item.uid == this.singleUserUid;
      },
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
      onCreateChatRoom() {
        if (!this.chatroom) {
          this.initChatRoom();
        }
          
        let props = new Map([
          ["Name", "Hummer聊天室"],
          ["Description", "测试"],
          ["Bulletin", "公告"],
          ["Extention", "自定义"],
        ]);
        
        let params = { props };
        this.chatroom.createChatRoom(params).then((res) => {
          console.log("CreateChatRoom Res: " + JSON.stringify(res));
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
          console.log("joinChatRoom Res: " + JSON.stringify(res));
          this.JoinChatRoomRes.rescode = res.rescode;
          if (res.rescode == 0) {
            // 聊天室信息刷新（需要初始刷新一次）
            this.onGetChatRoomInfo();
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onLeaveChatRoom() {
        if (!this.chatroom)
          return;
          
        this.chatroom.leaveChatRoom().then((res) => {
          console.log("LeaveChatRoom Res: " + JSON.stringify(res));
          this.LeaveChatRoomRes.rescode = res.rescode;
        }).catch((err) => {
          console.log(err)
        })
      },
      onSendGroupBc() {
        if (!this.chatroom)
          return;
          
        let content = this.SendGroupBcParams.content;

        let params = { content }
        if (this.SendGroupBcParams.content) {
          this.chatroom.sendGroupBc(params).then((res) => {
            console.log("SendGroupBc Res: " + JSON.stringify(res));
            this.SendGroupBcRes.rescode = res.rescode;
          }).catch((err) => {
            console.log(err)
          })

          this.SendGroupBcParams.content = "";
        } else {
          alert("请输入……");
        }
      },
      onSendSingleUserData() {
        if (!this.chatroom)
          return;
          
        let content = this.SendSingleUserDataParams.content;
        let receiver = this.singleUserUid;

        let params = { content, receiver }
        if (this.SendSingleUserDataParams.content) {
          this.chatroom.sendSingleUserData(params).then((res) => {
            console.log("SendSingleUserData Res: " + JSON.stringify(res));
            this.SendSingleUserDataRes.rescode = res.rescode;
            
            this.singleUserDataList.push({ type: 1, roomid: this.roomid, uid: this.uid, receiver: receiver, content: this.SendSingleUserDataParams.content });
            this.SendSingleUserDataParams.content = "";
          }).catch((err) => {
            console.log(err)
          });

        } else {
          alert("请输入...");
        }
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
  
        if (this.SendTextChatParams.chat) {
          let params = { chat, chatProps, extProps }
          this.chatroom.sendTextChat(params).then((res) => {
            console.log("SendTextChat Res: " + JSON.stringify(res));
            this.SendTextChatRes.rescode = res.rescode;
          }).catch((err) => {
            console.log(err)
          })

          this.SendTextChatParams.chat = "";
        } else {
          alert("请输入……");
        }
      },
      onGetChatRoomInfo() {
        if (!this.chatroom)
          return;
          
        this.chatroom.getChatRoomInfo().then((res) => {
          console.log("GetChatRoomInfo Res: " + JSON.stringify(res.toJsonObj()));
          if (res.rescode == 0) {
              this.chatroom_name = res.props.get('Name');
              this.chatroom_discription = res.props.get('Description');
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      onGetChatRoomManager() {
        if (!this.chatroom)
          return;

        let params = { roler: "owner" };
        this.chatroom.getChatRoomManager(params).then((res) => {
          console.log("GetChatRoomManager Res: " + JSON.stringify(res.toJsonObj()));
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
          console.log("GetUserCount Res: " + JSON.stringify(res));
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
          console.log("GetUserList Res: " + JSON.stringify(res));
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
        console.log("接收消息RecvSingleUserData： " + JSON.stringify(data));
        this.singleUserDataList.push({ type: 0, roomid: data.roomid, uid: data.uid, content: data.content });
      },
      onDismissChatRoomBc(data) {
        console.log("接收消息DismissChatRoomBc： " + JSON.stringify(data));
      },
      onUpdateChatRoomInfoBc(data)  {
        console.log("接收消息UpdateChatRoomInfoBc： " + JSON.stringify(data));
        if (data.code == 0) {
          // 聊天室信息刷新
          this.onGetChatRoomInfo();
        }
      },
      onKickOffUserBc(data) {
        console.log("接收消息KickOffUserBc： " + JSON.stringify(data));
        
        // 刷新用户列表
        this.onGetUserList();
      },
      onRecvGroupBc(data) {
        console.log("接收消息RecvGroupBc： " + JSON.stringify(data));
        if (data.code == 0 /*&& data.uid != this.uid*/) {
          this.groupContentList.push({uid: data.uid, content: data.content});
        }
      },
      onTextChatBc(data) {
        console.log("接收消息TextChatBc： " + JSON.stringify(data));
        if (data.code == 0 /*&& data.uid != this.uid*/) {
          this.textChatList.push({uid: data.uid, chat: data.chat});
        }
      },
      onUserCountBc(data) {
        console.log("接收消息UserCountBc： " + JSON.stringify(data));
        if (data.code == 0) {
          this.GetUserCountRes.totalCount = data.totalCount;
        }
      },
      onUserOnlineChangeBc(data) {
        console.log("接收消息UserOnlineChangeBc： " + JSON.stringify(data));
        if (data.code == 0) {
          this.joinUsers = data.joinUsers;
          this.leaveUsers = data.leaveUsers;

          // 刷新用户列表
          this.onGetUserList();
        }
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

<style scoped>
  .left{width:15%; height:800px; float:left}
  .middle{width:60%; height:800px; float:left}
  .right{width:25%; height:800px; float:right}

  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

</style>
