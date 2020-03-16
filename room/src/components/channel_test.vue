<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">Channel调测系统（调用channel js_sdk，提供调测接口）</h2>

    <p class="text-unit">设置用户归属地</p>
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="appid">
            <el-input v-model="appid" disabled></el-input>
          </el-form-item>
          <el-form-item label="uid">
            <el-input v-model="uid" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户归属地">
            <template>
              <el-select v-model="userRegion" placeholder="userRegion">
                <el-option
                  v-for="item in areas"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="setUserRegion" style="border-radius: 4px" :disabled='userRegionFlag'>setUserRegion</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{setUserRegionRes}}</p>
    </div>

    <!-- 初始化channel -->
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="initChannel" style="border-radius: 4px">initChannel</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getInstanceInfo" style="border-radius: 4px">getInstanceInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{result}}</p>
    </div>

    <p class="text-unit">创建频道实例</p>
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="iRegion">
            <template>
              <el-select v-model="iRegion" placeholder="iRegion">
                <el-option
                  v-for="item in areas"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="iChannelId">
            <el-input v-model="iChannelId"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="createChannel" style="border-radius: 4px">createChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">频道列表[region:channelId](暂时用于选择频道)</p>
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="[region:channelId]">
            <template>
              <el-select v-model="regionChannelId" placeholder="">
                <el-option
                  v-for="item in regionChannelIds"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">加入Channel</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="joinChannel" style="border-radius: 4px">joinChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{joinChannelRes}}</p>
    </div>

    <p class="text-unit">退出Channel</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="leaveChannel" style="border-radius: 4px">leaveChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{leaveChannelRes}}</p>
    </div>

    <p class="text-unit">A给频道发消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="reliable">
            <template>
              <el-select v-model="sendMessageToChannelReq.option.reliable" placeholder="reliable">
                <el-option
                  v-for="item in reliable"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="content">
            <el-input v-model="sendMessageToChannelReq.content"></el-input>
          </el-form-item>

          <el-form-item class="search">
            <el-button type="primary"  @click="sendMessageToChannel" style="border-radius: 4px">sendMessageToChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{sendMessageToChannelRes}}</p>
    </div>

    <p class="text-unit">设置用户属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="key">
            <el-input v-model="setUserAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="setUserAttributesReq.prop"></el-input>
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

    <p class="text-unit">删除用户某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="keys">
            <el-input v-model="deleteUserAttributesReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="deleteUserAttributesByKeys" style="border-radius: 4px">deleteUserAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{deleteUserAttributesRes}}</p>
    </div>

    <p class="text-unit">查询某一属性的用户列表</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="key">
            <el-input v-model="getChannelUserListByAttributeReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="getChannelUserListByAttributeReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getChannelUserListByAtrribute" style="border-radius: 4px">getChannelUserListByAtrribute</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getGroupUserListByAttributeRes}}</p>
    </div>

    <p class="text-unit">查询频道用户列表</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="getChannelUserList" style="border-radius: 4px">getChannelUserList</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getGroupUserListRes}}</p>
    </div>

    <p class="text-unit">查询单个或多个频道的成员人数</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="channelIds">
            <el-input v-model="getChannelUserCountReq.channelIds"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getChannelUserCount" style="border-radius: 4px">getChannelUserCount</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getChannelUserCountRes}}</p>
    </div>

    <p class="text-unit">A给B发送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="reliable">
            <template>
              <el-select v-model="sendMessageToUserReq.option.reliable" placeholder="reliable">
                <el-option
                  v-for="item in reliable"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="content">
            <el-input v-model="sendMessageToUserReq.content"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="sendMessageToUserReq.receiver"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="sendMessageToUser" style="border-radius: 4px">sendMessageToUser</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{sendMessageToUserRes}}</p>
    </div>
    
    <p class="text-unit">查询单人登录在线状态</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uid">
            <el-input v-model="queryOnlineStatusForUserReq.uid"></el-input>
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
    
    <p class="text-unit">批量查询登录在线状态</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uids">
            <el-input v-model="queryUsersOnlineStatusReq.uids"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="queryUsersOnlineStatus" style="border-radius: 4px">queryUsersOnlineStatus</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{queryUsersOnlineStatusRes}}</p>
    </div>

    <p class="text-unit">登录/登出</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="login" style="border-radius: 4px">login</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="logout" style="border-radius: 4px">logout</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{loginRes}}</p>
    </div>

    <p class="text-unit">刷新token</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="refreshToken" style="border-radius: 4px">refreshToken</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{refreshTokenRes}}</p>
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

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getStorage, setStorage } from '@/utils/BaseUtil';
  import { getRegions, getRegionChannelId } from '@/components/room.js';
  //import Hummer from 'hummer-channel-sdk';

  const UID = getStorage('uid');
  const AREA = getStorage('area');
  const REGION = getStorage('region');
  const APPID = getStorage('appid');
  const TOKEN = getStorage('token');

  // test parameters
  const TEST_CHANNEL_ID = 'test123456';
  const TEST_ROLE_KEY = 'channel_role_name';

  export default {
    name : 'channel-test',
    data() {
      return {
        flag: -1,
        hummer: null,
        client: null,
        channel: null,
        channels: [],
        appid: APPID,
        uid: UID,
        token: TOKEN,
        region: REGION || 'cn',
        area: 'cn',
        areas: getRegions(),
        userRegionFlag: false,
        iRegion: 'cn',
        iChannelId: TEST_CHANNEL_ID,
        regionChannelId: null,
        regionChannelIds: [],
        mq_data: [],
        mq_channel_data: [],
        reliable: [{
            value: 'yes',
            label: 'yes'
          }, {
            value: 'no',
            label: 'no'
          }],
        result: '',
        userRegion: 'cn',
        setUserRegionRes: '',
        joinChannelRes: '',
        leaveChannelRes: '',
        setUserAttributesReq: {
          key: TEST_ROLE_KEY,
          prop: 'teacher',
          channelId: TEST_CHANNEL_ID,
        },
        setUserAttributesRes: '',
        deleteUserAttributesReq: {
          keys: TEST_ROLE_KEY,
          channelId: TEST_CHANNEL_ID,
        },
        deleteUserAttributesRes: '',
        getChannelUserListReq: {
          channelId: TEST_CHANNEL_ID,
        },
        getGroupUserListRes: '',
        getChannelUserListByAttributeReq: {
          channelId: TEST_CHANNEL_ID,
          key: TEST_ROLE_KEY,
          prop: 'teacher',
        },
        getGroupUserListByAttributeRes: '',
        queryOnlineStatusForUserReq: {
          uid: UID,
        },
        queryOnlineStatusForUserRes: '',
        sendMessageToChannelReq: {
          option: { reliable: 'yes' },
          content: 'js_sdk sendMessageToChannel',
          channelId: TEST_CHANNEL_ID,
        },
        sendMessageToChannelRes: "",
        sendMessageToUserReq: {
          option: { reliable: 'yes' },
          content: 'js_sdk sendMessageToUser',
          receiver: UID,
        },
        sendMessageToUserRes: "",
        getChannelUserCountReq: {
          channelIds: TEST_CHANNEL_ID
        },
        getChannelUserCountRes: '',
        queryUsersOnlineStatusReq: {
          uids: UID
        },
        queryUsersOnlineStatusRes: '',
        loginRes: '',
        refreshTokenRes: '',
      }
    },
    computed: {
    },
    watch: {
    },
    created() {
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
      setUserRegion() {
        if (!this.hummer)
          return;

        this.hummer.setUserRegion({ region: this.userRegion }).then(res => {
          console.log("setUserRegion res:", res);
          this.setUserRegionRes = JSON.stringify(res);
          if (res.rescode == 0) {
            this.userRegionFlag = true;
          }
        }).catch(err => {
          console.error("setUserRegion err:", err);
        });
      },
      initChannel() {
        if (!this.hummer) {
          console.log("hummer is null");
          return;
        }

        if (this.client) {
          console.log("client is ready");
          return;
        }
        
        // 初始化ChannelService
        this.client = this.hummer.createInstance({
          region: this.area,
        });
        
        this.client.on('Error', (data) => {
          console.log('new channel: data=' + JSON.stringify(data));
          this.flag = data.code;
          this.result = JSON.stringify(data);
        });

        if (this.flag != 0) {
          delete this.client;
          this.client = null;
          return;
        }

        // 接收P2P消息
        this.onReceiveMessage();
      },
      createChannel() {
        if (!this.client)
          return;

        this.regionChannelId = getRegionChannelId(this.iRegion, this.iChannelId);
        if (this.channels[this.regionChannelId]) {
          console.log('channel exists, and channels=', this.channels);
          return;
        }

        this.channel = this.client.createChannel({
          region: this.iRegion,
          channelId: this.iChannelId
        });
        if (!this.channel) {
          return;
        }
        
        this.channels[this.regionChannelId] = {
          channel: this.channel,
          region: this.iRegion,
          channelId: this.iChannelId
        }

        this.regionChannelIds.push({value: this.regionChannelId, label: this.regionChannelId});

        console.log('channels=', this.channels);

        let client = this.channels[this.regionChannelId];
        this.onReceiveChannelMessage(client);
        this.onNotifyJoinChannel(client);
        this.onNotifyLeaveChannel(client);
        this.onNotifyUserAttributesSet(client);
        this.onNotifyUserAttributesDelete(client);
        this.onNotifyUserCountChange(client);
      },
      // ------------------ 测试接口 --------------------
      getInstanceInfo() {
        if (!this.hummer)
          return;
          
        this.result = '';
        this.hummer.getInstanceInfo().then(res => {
          console.log("getInstanceInfo Res: ", res);
          this.result = JSON.stringify(res);
        }).catch(err => {
          console.error("getInstanceInfo err:", err);
          this.result = JSON.stringify(err);
        });
      },
      joinChannel() {
        if (!this.channels[this.regionChannelId])
          return;

        let extra = {"Name": "阿武"};
        let params = { extra };
        console.log("joinChannel Req: " + JSON.stringify(params));
        
        this.joinChannelRes = '';
        this.channels[this.regionChannelId].channel.joinChannel(params).then(res => {
          console.log("自己进入频道joinChannel res:", res);
          this.joinChannelRes = JSON.stringify(res);
        }).catch(err => {
          console.error("joinChannel err:", err);
          this.joinChannelRes = JSON.stringify(err);
        });
      },
      leaveChannel() {
        if (!this.channels[this.regionChannelId])
          return;

        let extra = {"Name": "阿武"};
        let params = { extra };
        console.log("leaveChannel Req: " + JSON.stringify(params));

        this.leaveChannelRes = '';
        this.channels[this.regionChannelId].channel.leaveChannel(params).then(res => {
          console.log("自己离开频道leaveChannel res:", res);
          this.leaveChannelRes = JSON.stringify(res);
        }).catch(err => {
          console.error("leaveChannel err:", err);
          this.leaveChannelRes = JSON.stringify(err);
        });
      },
      sendMessageToChannel() {
        if (!this.channels[this.regionChannelId])
          return;

        let reliable = this.sendMessageToChannelReq.option.reliable;
        let content = this.sendMessageToChannelReq.content;
        
        this.sendMessageToChannelRes = '';
        this.channels[this.regionChannelId].channel.sendMessageToChannel({
          type: "100", 
          content: Hummer.Utify.encodeStringToUtf8Bytes(content), 
          option: { reliable: reliable }
        }).then(res => {
          console.log("sendMessageToChannel Res: " + JSON.stringify(res));
          this.sendMessageToChannelRes = JSON.stringify(res);

          console.log("消息队列mq_channel_data: " + JSON.stringify(this.mq_channel_data));
        }).catch(err => {
          console.error("sendMessageToChannel err:", err);
          this.sendMessageToChannelRes = JSON.stringify(err);
        });
      },
      setUserAttributes() {
        if (!this.channels[this.regionChannelId])
          return;

        let attributes = {
          "Name": "awu",
          "Description": "js_sdk测试",
          "Bulletin": "bull",
          "Extention": "ex"
        };
  
        let key = this.setUserAttributesReq.key;
        let prop = this.setUserAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        this.setUserAttributesRes = '';
        this.channels[this.regionChannelId].channel.setUserAttributes(req).then(res => {
          console.log("setUserAttributes Res: ", res);
          this.setUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("setUserAttributes err:", err);
          this.setUserAttributesRes = JSON.stringify(err);
        });
      },
      deleteUserAttributesByKeys() {
        if (!this.channels[this.regionChannelId])
          return;

        let keys_str = this.deleteUserAttributesReq.keys;

        let keys = [];

        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { keys };
        this.deleteUserAttributesRes = '';

        this.channels[this.regionChannelId].channel.deleteUserAttributesByKeys(req).then(res => {
          console.log("deleteUserAttributesByKeys Res: ", res);
          this.deleteUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.error("deleteUserAttributesByKeys err:", err);
          this.deleteUserAttributesRes = JSON.stringify(err);
        });
      },
      getChannelUserList() {
        if (!this.channels[this.regionChannelId])
          return;

        this.getGroupUserListRes = '';
        this.channels[this.regionChannelId].channel.getChannelUserList().then(res => {
          console.log("getChannelUserList res:", res);
          this.getGroupUserListRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getChannelUserList err:", err);
          this.getGroupUserListRes = JSON.stringify(err);
        });
      },
      getChannelUserListByAtrribute() {
        if (!this.channels[this.regionChannelId])
          return;

        let channelId = this.getChannelUserListByAttributeReq.channelId;
        let key = this.getChannelUserListByAttributeReq.key;
        let prop = this.getChannelUserListByAttributeReq.prop;
        this.getGroupUserListByAttributeRes = '';

        this.channels[this.regionChannelId].channel.getChannelUserListByAtrribute({ key, prop }).then(res => {
          console.log("getChannelUserListByAtrribute res:", res);
          this.getGroupUserListByAttributeRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getChannelUserListByAtrribute err:", err);
          this.getGroupUserListByAttributeRes = JSON.stringify(err);
        });
      },
      getChannelUserCount() {
        if (!this.channels[this.regionChannelId])
          return;

        let channelIdsStr = this.getChannelUserCountReq.channelIds;
        let channelIds = [];

        let elements = channelIdsStr.split(",");
        for (let k of elements) {
          channelIds.push(k);
        }
        this.getChannelUserCountRes = '';

        this.channels[this.regionChannelId].channel.getChannelUserCount({ channelIds: channelIds }).then(res => {
          console.log("getChannelUserCount res:", res);
          this.getChannelUserCountRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getChannelUserCount err:", err);
          this.getChannelUserCountRes = JSON.stringify(err);
        });
      },
      sendMessageToUser() {
        if (!this.client)
          return;

        let reliable = this.sendMessageToUserReq.option.reliable;
        let content = this.sendMessageToUserReq.content;
        let receiver = this.sendMessageToUserReq.receiver;
        
        this.sendMessageToUserRes = '';
        this.client.sendMessageToUser({
          receiver: receiver, 
          type: "100", 
          content: Hummer.Utify.encodeStringToUtf8Bytes(content),
          option: { reliable: reliable }
        }).then(res => {
          console.log("sendMessageToUser Res: " + JSON.stringify(res));
          this.sendMessageToUserRes = JSON.stringify(res);

          console.log("消息队列mq_data: " + JSON.stringify(this.mq_data));
        }).catch(err => {
          console.error("sendMessageToUser err:", err);
          this.sendMessageToUserRes = JSON.stringify(err);
        });
      },
      queryOnlineStatusForUser() {
        if (!this.client)
          return;

        this.queryOnlineStatusForUserRes = '';

        let uid = this.queryOnlineStatusForUserReq.uid;
        this.client.queryOnlineStatusForUser({uid: uid}).then(res => {
          console.log("queryOnlineStatusForUser res:", res);
          this.queryOnlineStatusForUserRes = JSON.stringify(res);
        }).catch(err => {
          console.error("queryOnlineStatusForUser err:", err);
          this.queryOnlineStatusForUserRes = JSON.stringify(err);
        });

      },
      queryUsersOnlineStatus() {
        if (!this.client)
          return;

        let uidsStr = this.queryUsersOnlineStatusReq.uids;
        let uids = [];

        let elements = uidsStr.split(",");
        for (let k of elements) {
          uids.push(k);
        }
        this.queryUsersOnlineStatusRes = '';

        this.client.queryUsersOnlineStatus({ uids: uids }).then(res => {
          console.log("queryUsersOnlineStatus res:", res);
          this.queryUsersOnlineStatusRes = JSON.stringify(res);
        }).catch(err => {
          console.error("queryUsersOnlineStatus err:", err);
          this.queryUsersOnlineStatusRes = JSON.stringify(err);
        });
      },
      login() {
        if (!this.hummer)
          return;
        
        this.loginRes = '';
        this.hummer.login({uid: this.uid, token: this.token}).then(res => {
          console.log("login Res: " + JSON.stringify(res));
          this.loginRes = JSON.stringify(res);
        }).catch(err => {
          console.error("login err:", err);
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
        }).catch(err => {
          console.error("logout err:", err);
          this.loginRes = JSON.stringify(err);
        });
      },
      // hummer3.1
      refreshToken() {
        if (!this.hummer)
          return;
        
        this.refreshTokenRes = '';
        this.hummer.refreshToken({uid: this.uid, token: this.token}).then(res => {
          console.log("refreshToken Res: " + JSON.stringify(res));
          this.refreshTokenRes = JSON.stringify(res);
        }).catch(err => {
          console.error("refreshToken err:", err);
          this.refreshTokenRes = JSON.stringify(err);
        });
      },
      clearMqData() {
        this.mq_data = [];
        this.mq_channel_data = [];
      },

      /* 消息接收模块 */
      onReceiveMessage() {
        this.client.on('MessageFromUser', (data) => {
          data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
          console.log("接收消息MessageFromUser: " + JSON.stringify(data));
          this.mq_data.push(data);

          this.$message({
            duration: 3000,
            message: "MessageFromUser: " + JSON.stringify(data),
            type: 'success'
          });

          console.log("MQ队列mq_data: " + JSON.stringify(this.mq_data));
        });
      },
      /* 组播消息接收模块 */
      onReceiveChannelMessage(client) {
        client.channel.on('ChannelMessage', (data) => {
          data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
          console.log(`接收组播消息ChannelMessage: [${client.region}:${client.channelId}]:` + JSON.stringify(data));
          this.mq_channel_data.push(data);

          this.$message({
            duration: 3000,
            message: `ChannelMessage: [${client.region}:${client.channelId}]:` + JSON.stringify(data),
            type: 'success'
          });

          console.log("组播MQ队列mq_channel_data: " + JSON.stringify(this.mq_channel_data));
        });
      },
      onNotifyJoinChannel(client) {
        client.channel.on('NotifyJoinChannel', (data) => {
          console.log(`接收消息NotifyJoinChannel [${client.region}:${client.channelId}]:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `JoinChannel [${client.region}:${client.channelId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyLeaveChannel(client) {
        client.channel.on('NotifyLeaveChannel', (data) => {
          console.log(`接收消息NotifyLeaveChannel [${client.region}:${client.channelId}]:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `LeaveChannel [${client.region}:${client.channelId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyUserAttributesSet(client) {
        client.channel.on('NotifyUserAttributesSet', (data) => {
          console.log(`用户属性设置NotifyUserAttributesSet [${client.region}:${client.channelId}]: ` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `NotifyUserAttributesSet [${client.region}:${client.channelId}]: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyUserAttributesDelete(client) {
        client.channel.on('NotifyUserAttributesDelete', (data) => {
          console.log(`用户属性删除NotifyUserAttributesDelete [${client.region}:${client.channelId}]: ` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `NotifyUserAttributesDelete [${client.region}:${client.channelId}]: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyUserCountChange(client) {
        client.channel.on('NotifyUserCountChange', (data) => {
          console.log(`用户数量变更NotifyUserCountChange [${client.region}:${client.channelId}]: ` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `NotifyUserCountChange [${client.region}:${client.channelId}]: ` + JSON.stringify(data),
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
