<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">Signal调测系统（调用Signal js_sdk，提供调测接口）</h2>

    <!-- 初始化im -->
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uid">
            <el-input v-model="uid" disabled></el-input>
          </el-form-item>
          <el-form-item label="appid">
            <el-input v-model="appid" disabled></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="initSignal" style="border-radius: 4px">initSignal</el-button>
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

    <p class="text-unit">A给B发送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="reliable">
            <el-input v-model="SendP2PChatParams.option.reliable"></el-input>
          </el-form-item>
          <el-form-item label="content">
            <el-input v-model="SendP2PChatParams.content"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="SendP2PChatParams.receiver"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="sendMessageToUser" style="border-radius: 4px">sendMessageToUser</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{SendP2PChatRes}}</p>
    </div>

    <p class="text-unit">A给群组发消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="reliable">
            <el-input v-model="SendP2ChannelParams.option.reliable"></el-input>
          </el-form-item>
          <el-form-item label="content">
            <el-input v-model="SendP2ChannelParams.content"></el-input>
          </el-form-item>
          <el-form-item label="channelName">
            <el-input v-model="SendP2ChannelParams.channelName"></el-input>
          </el-form-item>

          <el-form-item class="search">
            <el-button type="primary"  @click="sendMessageToChannel" style="border-radius: 4px">sendMessageToChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{SendP2ChannelRes}}</p>
    </div>

    <p class="text-unit">加入Channel</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="channelName">
            <el-input v-model="JoinChannelReq.channelName"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="joinChannel" style="border-radius: 4px">joinChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{JoinChannelRes}}</p>
    </div>

    <p class="text-unit">离开Channel</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="channelName">
            <el-input v-model="LeaveChannelReq.channelName"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="leaveChannel" style="border-radius: 4px">leaveChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{LeaveChannelRes}}</p>
    </div>

    <p class="text-unit">查询用户列表</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="channelName">
            <el-input v-model="GetGroupUserListReq.channelName"></el-input>
          </el-form-item>
          <el-form-item label="pos">
            <el-input v-model="GetGroupUserListReq.pos"></el-input>
          </el-form-item>
          <el-form-item label="num">
            <el-input v-model="GetGroupUserListReq.num"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getChannelUserList" style="border-radius: 4px">getChannelUserList</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{GetGroupUserListRes}}</p>
    </div>
    
    <p class="text-unit">查询queryOnlineStatusForUser</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uid">
            <el-input v-model="queryOnlineStatusForUserParams.uid"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="queryOnlineStatusForUser" style="border-radius: 4px">queryOnlineStatusForUser</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{queryOnlineStatusForUserRes}}</p>
    </div>

    <p class="text-unit">清除MQ队列</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="clearMqData" style="border-radius: 4px">clearMqData</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--
    <p class="text-unit">接收MQ队列消息</p>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{mq_data}}</p>
    </div>
    -->

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  //import { APPID, AREA } from '@/global.js';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  import { constants } from 'fs';
  //import Hummer from 'hummer-signal';

  const UID = getStorage('uid');
  const AREA = getStorage("area");
  const APPID = getStorage("appid");

  export default {
    name : 'signal-test',
    data() {
      return {
        flag: -1,
        hummer: null,
        signal: null,
        appid: APPID,
        uid: UID,
        mq_data: [],
        mq_channel_data: [],
        GetInstanceRes: {},
        GetMaxSeqIdRes: {
        },
        GetGrpSysMaxSeqIdReq: {
          channelName: 'test_channel1',
        },
        GetGrpSysMaxSeqIdRes: {
        },
        JoinChannelReq: {
          channelName: 'test_channel1',
        },
        JoinChannelRes: '',
        LeaveChannelReq: {
          channelName: 'test_channel1',
        },
        LeaveChannelRes: '',
        GetGroupUserListReq: {
          channelName: 'test_channel1',
          pos: 0,
          num: 100,
        },
        GetGroupUserListRes: '',
        queryOnlineStatusForUserParams: {
          uid: '54321',
        },
        SendP2PChatParams: {
          option: { reliable: 'no' },
          content: 'js_sdk SendP2PChat',
          receiver: '54321',
        },
        SendP2PChatRes: {
        },
        SendP2ChannelParams: {
          option: { reliable: 'no' },
          content: 'js_sdk SendP2Channel',
          channelName: 'test_channel1',
        },
        SendP2ChannelRes: '',
        queryOnlineStatusForUserRes: '',
        ReceiveChannelMessage: '',
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
                                  uid: UID,
                                  token: token,
                                  area: AREA,
                                  onConnectStatus: this.onConnectStatus,
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

    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      initSignal() {
        if (!this.hummer) {
          console.log("hummer is null");
          return;
        }

        if (this.signal) {
            console.log("signal is ready");
            return;
        }

        this.signal = new Hummer.SignalService(this.hummer, {
            onReceiveMessage: this.onReceiveMessage,
            onReceiveChannelMessage: this.onReceiveChannelMessage,
            onNotifyJoinChannel: this.onNotifyJoinChannel,
            onNotifyLeaveChannel: this.onNotifyLeaveChannel,
            onerror: (d) => {
              console.log('new signal: d=' + JSON.stringify(d));
              this.flag = d.code;
            }
        });

        if (this.flag != 0) {
          delete this.signal;
          this.signal = null;
          return;
        }

      },
      // ------------------ 测试接口 --------------------
      getInstance() {
        if (!this.signal)
          return;

        this.signal.getInstance().then(res => {
          console.log("getInstance: ", res);
          this.GetInstanceRes = res;
        }).catch(err => {
          console.log(err);
        });
      },
      sendMessageToUser() {
        if (!this.signal)
          return;

        let reliable = this.SendP2PChatParams.option.reliable;
        let content = this.SendP2PChatParams.content;
        let receiver = this.SendP2PChatParams.receiver;

        this.signal.sendMessageToUser({
          receiver: receiver, 
          type: "100", 
          content: Hummer.Utify.encodeStringToUtf8Bytes(content),
          option: { reliable: reliable }
        }).then(res => {
          console.log("sendMessageToUser Res: " + JSON.stringify(res));
          this.SendP2PChatRes = res;

          console.log("消息队列mq_data: " + JSON.stringify(this.mq_data));
        }).catch((err) => {
          console.log(err)
        })
      },
      sendMessageToChannel() {
        if (!this.signal)
          return;

        let reliable = this.SendP2ChannelParams.option.reliable;
        let content = this.SendP2ChannelParams.content;
        let channelName = this.SendP2ChannelParams.channelName;

        this.signal.sendMessageToChannel({
          channelName: channelName, 
          type: "100", 
          content: Hummer.Utify.encodeStringToUtf8Bytes(content), 
          option: { reliable: reliable }
        }).then(res => {
          console.log("sendMessageToChannel Res: ", res);
          this.SendP2ChannelRes = JSON.stringify(res);

          console.log("消息队列mq_data: " + JSON.stringify(this.mq_data));
        }).catch((err) => {
          console.log(err)
        })
      },
      joinChannel() {
        if (!this.signal)
          return;

        let channelName = this.JoinChannelReq.channelName;

        let extra ={ "Name": "阿武" };
        let params = {channelName, extra};
        console.log("joinChannel Req: ", params);
        
        this.signal.joinChannel(params).then(res => {
          console.log("自己进入频道joinChannel res:", res);
          this.JoinChannelRes = JSON.stringify(res);
        }).catch(err => {
        });
      },
      leaveChannel() {
        if (!this.signal)
          return;

        let channelName = this.LeaveChannelReq.channelName;
        
        let extra ={ "Name": "阿武" };
        let params = {channelName, extra};
        console.log("leaveChannel Req: " + JSON.stringify(params));

        this.signal.leaveChannel(params).then(res => {
          console.log("自己离开频道leaveChannel res:", res);
          this.LeaveChannelRes = JSON.stringify(res);
        }).catch(err => {
        });
      },
      getChannelUserList() {
        if (!this.signal)
          return;

        let channelName = this.GetGroupUserListReq.channelName;
        let pos = this.GetGroupUserListReq.pos;
        let num = this.GetGroupUserListReq.num;

        this.signal.getChannelUserList({channelName, pos, num}).then(res => {
          console.log("getChannelUserList res:", res);
          this.GetGroupUserListRes = JSON.stringify(res);
        }).catch(err => {
        });
      },
      queryOnlineStatusForUser() {
        if (!this.signal)
          return;

        let uid = this.queryOnlineStatusForUserParams.uid;
        this.signal.queryOnlineStatusForUser({uid: uid}).then(res => {
          console.log("check user online res:", res);
          this.queryOnlineStatusForUserRes = JSON.stringify(res);
        }).catch(err => {
        });

      },
      clearMqData(){
        this.mq_data = [];
        this.mq_channel_data = [];
        this.ReceiveChannelMessage = '';
      },

      /* 消息接收模块 */
      onReceiveMessage(obj) {
        obj.message.data = Hummer.Utify.decodeUtf8BytesToString(obj.message.data);
        console.log("接收消息ReceiveMessage: " + JSON.stringify(obj));
        this.mq_data.push(obj);

        this.$message({
          duration: 3000,
          message: "ReceiveMessage: " + JSON.stringify(obj),
          type: 'success'
        });

        console.log("MQ队列mq_data: " + JSON.stringify(this.mq_data));
      },
      /* 组播消息接收模块 */
      onReceiveChannelMessage(obj) {
        this.ReceiveChannelMessage = JSON.stringify(obj);
        obj.message.data = Hummer.Utify.decodeUtf8BytesToString(obj.message.data);
        console.log("接收组播消息ReceiveChannelMessage: " + JSON.stringify(obj));

        this.mq_channel_data.push(obj);

        this.$message({
          duration: 3000,
          message: "ReceiveChannelMessage: " + JSON.stringify(obj),
          type: 'success'
        });

        console.log("组播MQ队列mq_channel_data: " + JSON.stringify(this.mq_channel_data));
      },
      onNotifyJoinChannel(obj) {
        console.log("接收消息NotifyJoinChannel: " + JSON.stringify(obj));
        this.$message({
          duration: 3000,
          message: "JoinChannel: " + JSON.stringify(obj),
          type: 'success'
        });
      },
      onNotifyLeaveChannel(obj) {
        console.log("接收消息NotifyLeaveChannel: " + JSON.stringify(obj));
        this.$message({
          duration: 3000,
          message: "LeaveChannel: " + JSON.stringify(obj),
          type: 'success'
        });
      },
      onConnectStatus(obj) {
        console.log("===channel status===:", obj);
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
