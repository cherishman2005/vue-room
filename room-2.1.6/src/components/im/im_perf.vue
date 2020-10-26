<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">IM调测系统（调用IM js_sdk，提供调测接口）</h2>

    <!-- 初始化im -->
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="uid">
            <el-input v-model="uid" disabled></el-input>
          </el-form-item>
          <el-form-item label="appid">
            <el-input v-model="appid" disabled></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="initIM" style="border-radius: 4px">initIM</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetInstance" style="border-radius: 4px">GetInstance</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetInstanceRes}}</p>
    </div>

    <p class="text-unit">获取MaxSeqId</p>
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetMaxSeqId" style="border-radius: 4px">GetMaxSeqId</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{GetMaxSeqIdRes}}</p>
    </div>

    <p class="text-unit">初始化拉取InitPullMsg</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="mode">
            <el-input v-model="InitPullMsgParams.mode"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onInitPullMsg" style="border-radius: 4px">initPullMsg</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{InitPullMsgRes}}</p>
    </div>

    <p class="text-unit">A给B发送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="uuid">
            <el-input v-model="SendP2PChatParams.uuid" disabled></el-input>
          </el-form-item>
          <el-form-item label="content">
            <el-input v-model="SendP2PChatParams.content"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="SendP2PChatParams.receiver"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onSendP2PChat" style="border-radius: 4px">sendP2PMessage</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{SendSendP2PChatRes}}</p>
    </div>

    <p class="text-unit">清除MQ队列</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="clearMqData" style="border-radius: 4px">clearMqData</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--
    <p class="text-unit">接收RecvIMPushMsg</p>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{RecvIMPushMsg}}</p>
    </div>
    -->
    <p class="text-unit">接收MQ队列消息</p>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{mq_data}}</p>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { APPID, AREA } from '@/global.js';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  import { constants } from 'fs';
  
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
        mq_data: [],
        GetInstanceRes: {
        },
        GetMaxSeqIdRes: {
        },
        InitPullMsgParams: {
          mode: 1
        },
        InitPullMsgRes: {
        },
        SendP2PChatParams: {
          uuid: '',
          content: "js_sdk SendP2PChat",
          receiver: '135666911222',
        },
        SendP2PChatRes: {
        },
        RecvIMPushMsg: '',
      }
    },
    computed: {
    },
    watch: {
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
    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
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
      },
      // ------------------ 测试接口 --------------------
      onGetInstance() {
        if (!this.im)
          return;

        this.im.getInstance().then(res => {
          console.log("getInstance: " + JSON.stringify(res));
          this.GetInstanceRes = res;
        }).catch(err => {
          console.log(err);
        });
      },
      onGetMaxSeqId() {
        if (!this.im)
          return;

        this.im.GetMaxSeqId().then(res => {
          console.log("GetInstance: " + JSON.stringify(res));
          this.GetMaxSeqIdRes = res;
        }).catch(err => {
          console.log(err);
        });
      },
      onInitPullMsg() {
        if (!this.im)
          return;

        let mode = this.InitPullMsgParams.mode;
        this.im.initPullMsg({ mode }).then(res => {
          console.log("InitPullMsg: " + JSON.stringify(res));
          this.InitPullMsgRes = res;
        }).catch(err => {
        });
      },
      onSendP2PChat() {
        if (!this.im)
          return;

        let content = this.SendP2PChatParams.content;
        let receiver = this.SendP2PChatParams.receiver;

        let params = { content: content, 
                       msg_type: 0,  // text
                       receiver: receiver, 
                       onmessage: (message) => {
                         console.log("message回调data=" + JSON.stringify(message));
                         this.SendP2PChatParams.uuid = message.uuid;
                         this.mq_data.push(message);
                       } 
                     }



        let timesRun = 0;
        let interval = setInterval(() => {
          timesRun += 1;
          if(timesRun === 60){
            clearInterval(interval);
          }
          
          this.im.sendP2PMessage(params).then((res) => {
            console.log("sendP2PMessage Res: " + JSON.stringify(res));
            this.SendP2PChatRes = JSON.stringify(res);
            
            console.log("MQ队列mq_data: " + JSON.stringify(this.mq_data));
          }).catch((err) => {
            console.log(err)
          })
          
        }, 1000);  
      },

      clearMqData(){
        this.mq_data = [];
        this.RecvIMPushMsg = '';
      },

      /* 消息接收模块 */
      onRecvIMPushMsg(data) {
        this.RecvIMPushMsg = JSON.stringify(data);
        console.log("接收消息RecvIMPushMsg: " + JSON.stringify(data));

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
