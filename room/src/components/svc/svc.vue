<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">调测系统（Tutorial）</h2>

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
          <el-form-item class="search">
            <el-button type="primary" @click="login" style="border-radius: 4px">login</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="logout" style="border-radius: 4px">logout</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="showRefreshTokenModel" style="border-radius: 4px">refreshToken</el-button>
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

    <!-- 初始化svc_sdk -->
    <el-row type="flex">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="initSvc" style="border-radius: 4px">initSvc</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">订阅/退订广播组</p>
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="groupType">
            <el-input v-model="groupType"></el-input>
          </el-form-item>
          <el-form-item label="groupId">
            <el-input v-model="groupId"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="subscribeBcGroup" style="border-radius: 4px">subscribeBcGroup</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="unSubscribeBcGroup" style="border-radius: 4px">unSubscribeBcGroup</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">sub:{{subscribeBcGroupRes}} unsub:{{unSubscribeBcGroupRes}}</p>
    </div>

    <p class="text-unit">发送上行消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px; text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="sendData" style="border-radius:4px">sendData</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{sendDataRes}}</p>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  import { getRegions, getRegionRoomId } from '@/components/room_config.js';
  import RefreshToken from '@/components/token/refresh_token.vue';
  import EditableTable from '@/components/units/editable_table.vue';

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
        uid: UID,
        token: TOKEN,
        region: 'cn',
        regions: getRegions(),
        state: '',
        chatroom: null,
        chatClient: null,
        chatrooms: [],
        regionChatroomId: '',
        regionChatroomIds: [],
        loginRes: '',
        getInstanceInfoRes: '',
        groupUserAttributes: {},
        svc: null,
        groupType: '2147483729',
        groupId: '1577406886',
        subscribeBcGroupRes: '',
        unSubscribeBcGroupRes: '',
        sendDataRes: '',
      }
    },
    components: {
      RefreshToken,
      EditableTable,
    },
    computed: {
      ...mapState({
        refreshTokenModelVisible: state => state.refreshToken.refreshTokenModelVisible,
      })
    },
    watch: {
      regionChatroomId(val) {
        this.chatClient = this.chatrooms[val];
      }
    },
    created() {
      console.log('Hummer Version=' + Hummer.VERSION);

      let token = getStorage("token");
      // 初始化Hummer
      this.hummer = Hummer.createHummer({appid: this.appid});

      this.hummer.setLogLevel(-1);

      this.onConnectionStateChanged();
      this.onTokenExpired();
    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      login() {
        if (!this.hummer)
          return;
        
        let req = {
          uid: this.uid, 
          token: this.token,
          //tokenType: 'OTP_TOKEN',
        };

        this.loginRes = '';
        this.hummer.login(req).then(res => {
          console.log("login res=" + JSON.stringify(res));
          this.loginRes = JSON.stringify(res);
        }).catch(err => {
          console.error("login err=", err);
          this.loginRes = JSON.stringify(err);
        });
      },
      logout() {
        if (!this.hummer)
          return;

        this.loginRes = '';
        this.hummer.logout().then(res => {
          console.log("logout Res: " + JSON.stringify(res));
          this.loginRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.chatrooms = [];
            this.regionChatroomIds = [];
          }
        }).catch(err => {
          console.error("logout err:", err);
          this.loginRes = JSON.stringify(err);
        });
      },
      refreshToken(data) {
        this.loginRes = JSON.stringify(data);
        console.log('refreshToken res=', data);
      },
      getState() {
        this.state = '';
        this.state = this.hummer && this.hummer.getState();
        console.log("getState: " + this.state);

      },
      getInstanceInfo() {
        if (!this.hummer)
          return;

        this.getInstanceInfoRes = '';
        this.hummer.getInstanceInfo().then(res => {
          console.log("getInstanceInfo: " + JSON.stringify(res));
          this.getInstanceInfoRes = JSON.stringify(res);
        }).catch(err => {
          console.log(err);
          this.getInstanceInfoRes = JSON.stringify(err);
        });
      },

      onConnectionStateChanged() {
        this.hummer.on('ConnectionStateChanged', (data) => {
          console.log("chatroom-demo === ConnectionStateChanged ===:" + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `ConnectionStateChanged: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onTokenExpired() {
        this.hummer.on('TokenExpired', () => {
          console.log("chatroom-demo === TokenExpired ===");
          this.$message({
            duration: 3000,
            message: `TokenExpired`,
            type: 'success'
          });
        });
      },
      
      // ----  svc-sdk ----
      initSvc() {
        if (!this.hummer) {
          console.log("hummer is null");
          return;
        }

        this.svc = this.hummer.createSvcInstance();
        if (!this.svc) {
          return;
        }
        
        console.log('svc=', this.svc);

        this.onMessageReceived(this.svc);
      },
      async sendData() {
        if (!this.svc)
          return;

        try {
          let svcName = 'monitor_hash_1';
          let fnName = 'hello';
          let data = 'hello, nginx-vue';
          let req = {svcName, fnName, data};
          const res = await this.svc.sendData(req);
          console.log("sendData res=" + JSON.stringify(res));
          this.sendDataRes = JSON.stringify(res);
        } catch(e) {
          console.error("sendData err=", e);
        }
      },
      async subscribeBcGroup() {
        if (!this.svc)
          return;

        try {
          let req = [{ groupType: this.groupType, groupId: this.groupId }];
          const res = await this.svc.subscribeBcGroup(req);
          console.log("subscribeBcGroup res=" + JSON.stringify(res));
          this.subscribeBcGroupRes = JSON.stringify(res);
        } catch(e) {
          console.error("subscribeBcGroup err=", e);
        }
      },
      async unSubscribeBcGroup() {
        if (!this.svc)
          return;

        try {
          let req = [{ groupType: this.groupType, groupId: this.groupId }];
          const res = await this.svc.unSubscribeBcGroup(req);
          console.log("unSubscribeBcGroup res=" + JSON.stringify(res));
          this.unSubscribeBcGroupRes = JSON.stringify(res);
        } catch(e) {
          console.error("unSubscribeBcGroup err=", e);
        }
      },
      onMessageReceived(svc) {
        const eventName = [
          'BroadcastMessage',
          'UnicastMessage'
        ];

        eventName.forEach(eventName => {
          svc.on(eventName, (data) => {
            console.log(`接收数据${eventName}：` + JSON.stringify(data));
          });
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
