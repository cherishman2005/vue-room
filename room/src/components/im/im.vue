<template>
  <div class="chat">
    <div class = "left">
      <div style="height:250px;">
        <p style="height:30px;text-align:left;">【用户UID列表】</p>
        <template v-for="user in userList">
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
              <el-form-item label="receiver">
                <el-input v-model="receiver"></el-input>
              </el-form-item>
            </el-form>

            <!--
            <button style="width:95%; height:30px; text-align:center;" @click="onJoinChatRoom">加入</button><br/>
            <button style="width:95%; height:30px; text-align:center;" @click="onLeaveChatRoom">退出</button><br/>
            -->
          </el-col>
        </el-row>
      </div>
    </div>

    <div class = "middle">
      <div class="chat-wrap">
        <h1>{{ singleUserUid }}（IM聊天）</h1>
        <div class="chat-con clearfix" id="chat_con">
          <template>
            <!-- A给B发消息 -->
            <template v-for="item in mq_data">
              <template>
                <div class="chat-item item-right clearfix" v-if="isSingleReq(item)"><span class="img fr"></span><span class="message fr">{{ item.content }}</span></div>
                <div class="chat-item item-left clearfix rela" v-else>
                  <span v-if="isSingleRes(item)">
                    <span class="abs uname">{{item.from_uid}} </span><span class="img fl"></span><span class="fl message">{{ item.content }}</span>
                  </span>
                </div>
              </template>
            </template>
          </template>

        </div>
        <div class="bottom">
          <template>
            <input type="text" id="sendtxt" v-model.trim="SendP2PChatParams.content" @keyup.13="onSendP2PChat">
            <button class="sendBtn" @click="onSendP2PChat">发送</button>
          </template>
        </div>
      </div>
    </div>

    <div class = "right">
      <button style="width:95%; height:30px; text-align:center;" @click="clearMqData">清除记录</button><br/>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { APPID, AREA } from '@/global.js';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  
  const UID = getStorage('uid');

  export default {
    name : 'im',
    data() {
      return {
        flag: -1,
        hummer: null,
        im: null,
        appid: APPID,
        uid: UID,
        singleUserUid: 0,
        userList: [],
        start_seq_id: '0',
        has_more: false,
        mq_data: [],
        receiver: '0',
        limit: 10,
        GetInstanceRes: {
        },
        InitPullMsgParams: {
          mode: 0
        },
        InitPullMsgRes: {
        },
        SendP2PChatParams: {
          content: "",
          receiver: 0,
        },
        SendP2PChatRes: {
        },
        PullMsgParams: {
        },
        PullMsgRes: {
        }
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
      let uid = getStorage('uid');
      let token = getStorage("token");

      // 1. 初始化Hummer
      this.hummer = new Hummer.Hummer({ appid: APPID, 
                                  uid: uid,
                                  token: token,
                                  token_type: 'TOKEN_3RD',
                                  area: AREA,
                                  onConnectStatus: this.onIMConnectStatus,
                                  onLoginStatus: this.onLoginStatus,
                                  onerror: (d) => {
                                    console.log('new hummer: d=' + JSON.stringify(d));
                                    this.flag = d.code;
                                  } 
                                });
      
      if (this.flag != 0) {
        this.hummer = null;
        return;
      }                
      
      this.hummer.setLogLevel({level: -1});
      
      // 2. 初始化IM
      this.initIM();
    },
    mounted() {
    },
    methods: {
      switchSingle(uid) {
        this.isGroupChat = false;
        console.log("switchSingle: user=" + uid);
        this.singleUserUid = uid;
      },
      isSingleReq(item) {
        return item.from_uid == this.uid;
      },
      isSingleRes(item) {
        //return item.type == 0 && item.uid == this.singleUserUid;
        return item.to_uid == this.uid;
      },
      initIM() {
        if (!this.hummer) {
          console.log("hummer is null");
        }

        if (this.im) {
          console.log("im is ready");
          return
        }

        this.im = new Hummer.IM(this.hummer, {
                                      onRecvIMPushMsg: this.onRecvIMPushMsg,
                                      onerror: (d) => {
                                        console.log('new im: d=' + JSON.stringify(d));
                                        this.flag = d.code;
                                      } 
                                    });

        if (this.flag != 0) {
          delete this.im;
          this.im = null;
          return;
        }

        this.onInitPullMsg();
      },
      // ------------------ 测试接口 --------------------
      onGetInstance() {
        if (!this.im)
          return;

        this.im.GetInstance().then(res => {
          console.log("GetInstance: " + JSON.stringify(res));
          this.GetInstanceRes = res;
        }).catch(err => {
          console.log(err);
        });
      },
      onInitPullMsg() {
        if (!this.im)
          return;

        let mode = this.InitPullMsgParams.mode;
        this.im.initPullMsg({ mode }).then(res => {
          console.log("initPullMsg: " + JSON.stringify(res));
          this.InitPullMsgRes = res;
        }).catch(err => {
        });
      },
      onmessage(obj) {
        console.log("message回调data=" + JSON.stringify(obj));
        this.SendP2PChatParams.uuid = obj.uuid;
        this.mq_data.push(obj);
      },
      onSendP2PChat() {
        if (!this.im)
          return;
        
        if (!this.SendP2PChatParams.content) {
          alert("请输入……");
          return;
        }

        let content = this.SendP2PChatParams.content;
        let receiver = this.receiver; //this.SendP2PChatParams.receiver;
        
        this.userList = [];
        this.userList.push(receiver); // 接收用户列表

        let params = { 
                content: content, 
                msg_type: 0,
                receiver: receiver, 
                onmessage: this.onmessage
              }

        this.im.sendP2PMessage(params).then((res) => {
          this.SendP2PChatParams.content = "";

          console.log("sendP2PMessage Res: " + JSON.stringify(res));
          this.SendP2PChatRes = JSON.stringify(res);
          
        }).catch((err) => {
          console.log(err)
        })
      },

      clearMqData(){
        this.mq_data = [];
      },

      /*  消息接收模块 */
      onRecvIMPushMsg(data) {
        console.log("接收消息RecvIMPushMsg： " + JSON.stringify(data));
        this.mq_data.push(data);
          
        console.log("MQ队列mq_data: " + JSON.stringify(this.mq_data));
      },
      onIMConnectStatus(code) {
        switch(code) {
        case 0:
            console.log('断线了，重连成功', code)
            break;
        case 1:
            console.log('掉线了', code)
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
