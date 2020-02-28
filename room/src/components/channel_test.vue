<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">Channel调测系统（调用channel js_sdk，提供调测接口）</h2>

    <!--
    <p class="text-unit">设置用户归属地</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="region">
            <template>
              <el-select v-model="setUserRegionReq.region" placeholder="region">
                <el-option
                  v-for="item in regions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="setRegionFlag">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="setUserRegion" style="border-radius: 4px" :disabled="setRegionFlag===true">setUserRegion</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{setUserRegionRes}}</p>
    </div>
    -->

    <!-- 初始化channel -->
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uid">
            <el-input v-model="uid" disabled></el-input>
          </el-form-item>
          <el-form-item label="appid">
            <el-input v-model="appid" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户归属地">
            <el-input v-model="region" disabled></el-input>
          </el-form-item>
          <el-form-item label="area">
            <template>
              <el-select v-model="area" placeholder="area">
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
            <el-button type="primary"  @click="setUserRegion" style="border-radius: 4px">setUserRegion</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="initChannel" style="border-radius: 4px">initChannel</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getInstance" style="border-radius: 4px">getInstance</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{result}}</p>
    </div>

    <p class="text-unit">加入Channel</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="channelId">
            <el-input v-model="joinChannelReq.channelId"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="joinChannel" style="border-radius: 4px">joinChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{joinChannelRes}}</p>
    </div>

    <p class="text-unit">离开Channel</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="channelId">
            <el-input v-model="leaveChannelReq.channelId"></el-input>
          </el-form-item>
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
          <el-form-item label="channelId">
            <el-input v-model="sendMessageToChannelReq.channelId"></el-input>
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
          <el-form-item label="channelId">
            <el-input v-model="setUserAttributesReq.channelId"></el-input>
          </el-form-item>
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
          <el-form-item label="channelId">
            <el-input v-model="deleteUserAttributesReq.channelId"></el-input>
          </el-form-item>
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
          <el-form-item label="channelId">
            <el-input v-model="getChannelUserListByAttributeReq.channelId"></el-input>
          </el-form-item>
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
          <el-form-item label="channelId">
            <el-input v-model="getChannelUserListReq.channelId"></el-input>
          </el-form-item>
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
  import { getRegions } from '@/global.js';
  //import Hummer from 'hummer-channel';

  const UID = getStorage('uid');
  const AREA = getStorage('area');
  const REGION = getStorage('region');
  const APPID = getStorage('appid');
  const TOKEN = getStorage('token');

  export default {
    name : 'channel-test',
    data() {
      return {
        flag: -1,
        hummer: null,
        channels: [],
        channel: null,
        appid: APPID,
        uid: UID,
        token: TOKEN,
        region: REGION || 'cn',
        area: 'cn',
        areas: getRegions(),
        setRegionFlag: false,
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
        joinChannelReq: {
          channelId: 'test_channel1',
        },
        joinChannelRes: '',
        leaveChannelReq: {
          channelId: 'test_channel1',
        },
        leaveChannelRes: '',
        setUserAttributesReq: {
          key: 'role',
          prop: 'teacher',
          channelId: 'test_channel1',
        },
        setUserAttributesRes: '',
        deleteUserAttributesReq: {
          keys: 'role',
          channelId: 'test_channel1',
        },
        deleteUserAttributesRes: '',
        getChannelUserListReq: {
          channelId: 'test_channel1',
        },
        getGroupUserListRes: '',
        getChannelUserListByAttributeReq: {
          channelId: 'test_channel1',
          key: 'role',
          prop: 'teacher',
        },
        getGroupUserListByAttributeRes: '',
        queryOnlineStatusForUserReq: {
          uid: '999000',
        },
        queryOnlineStatusForUserRes: '',
        sendMessageToChannelReq: {
          option: { reliable: 'no' },
          content: 'js_sdk sendMessageToChannel',
          channelId: 'test_channel1',
        },
        sendMessageToChannelRes: "",
        sendMessageToUserReq: {
          option: { reliable: 'no' },
          content: 'js_sdk sendMessageToUser',
          receiver: '999000',
        },
        sendMessageToUserRes: "",
        getChannelUserCountReq: {
          channelIds: 'test_channel1'
        },
        getChannelUserCountRes: '',
        queryUsersOnlineStatusReq: {
          uids: '999000'
        },
        queryUsersOnlineStatusRes: '',
        loginRes: '',
      }
    },
    computed: {
    },
    watch: {
    },
    created() {
      // 初始化Hummer
      this.hummer = new Hummer.Hummer({ appid: this.appid,
                                  uid: this.uid,
                                  token: this.token,
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

      //this.setUserRegion();

      this.hummer.setLogLevel({level: -1});

    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      setUserRegion() {
        if (!this.hummer)
          return;

        let region = this.region;
        this.hummer.setUserRegion({ region }).then(res => {
          console.log("setUserRegion res:", res);
          if (res.rescode == 0) {
            this.setRegionFlag = true;
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

        if (this.channels[this.area]) {
            console.log("channel is ready");
            this.result = JSON.stringify({code: 0, msg: "channel is ready"});
            return;
        }

        this.channels[this.area] = new Hummer.ChannelService(this.hummer, {
            area: this.area,
            onReceiveMessage: this.onReceiveMessage,
            onReceiveChannelMessage: this.onReceiveChannelMessage,
            onNotifyJoinChannel: this.onNotifyJoinChannel,
            onNotifyLeaveChannel: this.onNotifyLeaveChannel,
            onNotifyUserAttributesUpdated: this.onNotifyUserAttributesUpdated,
            onNotifyUserAttributesSet: this.onNotifyUserAttributesSet,
            onNotifyUserAttributesDelete: this.onNotifyUserAttributesDelete,
            onNotifyUserCountChange: this.onNotifyUserCountChange,
            onerror: (data) => {
              console.log('new channel: data=' + JSON.stringify(data));
              this.flag = data.code;
              this.result = JSON.stringify(data);
            }
        });

        this.channel = this.channels[this.area];

        if (this.flag != 0) {
          delete this.channel;
          this.channel = null;
          return;
        }
      },
      // ------------------ 测试接口 --------------------
      getInstance() {
        if (!this.channels[this.area])
          return;
          
        this.result = '';
        this.channels[this.area].getInstance().then(res => {
          console.log("getInstance: ", res);
          this.result = JSON.stringify(res);
        }).catch(err => {
          console.error("getInstance err:", err);
          this.result = JSON.stringify(err);
        });
      },
      joinChannel() {
        if (!this.channels[this.area])
          return;

        let channelId = this.joinChannelReq.channelId;
        let extra = {"Name": "阿武"};
        let params = { channelId, extra };
        console.log("joinChannel Req: " + JSON.stringify(params));
        
        this.joinChannelRes = '';
        this.channels[this.area].joinChannel(params).then(res => {
          console.log("自己进入频道joinChannel res:", res);
          this.joinChannelRes = JSON.stringify(res);
        }).catch(err => {
          console.error("joinChannel err:", err);
          this.joinChannelRes = JSON.stringify(err);
        });
      },
      leaveChannel() {
        if (!this.channels[this.area])
          return;

        let channelId = this.leaveChannelReq.channelId;
        let extra = {"Name": "阿武"};
        let params = { channelId, extra };
        console.log("leaveChannel Req: " + JSON.stringify(params));

        this.leaveChannelRes = '';
        this.channels[this.area].leaveChannel(params).then(res => {
          console.log("自己离开频道leaveChannel res:", res);
          this.leaveChannelRes = JSON.stringify(res);
        }).catch(err => {
          console.error("leaveChannel err:", err);
          this.leaveChannelRes = JSON.stringify(err);
        });
      },
      sendMessageToChannel() {
        if (!this.channels[this.area])
          return;

        let reliable = this.sendMessageToChannelReq.option.reliable;
        let content = this.sendMessageToChannelReq.content;
        let channelId = this.sendMessageToChannelReq.channelId;
        
        this.sendMessageToChannelRes = '';
        this.channels[this.area].sendMessageToChannel({
          channelId: channelId, 
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
        if (!this.channels[this.area])
          return;

        let channelId = this.setUserAttributesReq.channelId;

        let attributes = {
          "Name": "awu",
          "Description": "js_sdk测试",
          "Bulletin": "bull",
          "Extention": "ex"
        };
  
        let key = this.setUserAttributesReq.key;
        let prop = this.setUserAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { channelId, attributes };
        this.setUserAttributesRes = '';
        this.channels[this.area].setUserAttributes(req).then(res => {
          console.log("setUserAttributes Res: ", res);
          this.setUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("setUserAttributes err:", err);
          this.setUserAttributesRes = JSON.stringify(err);
        });
      },
      deleteUserAttributesByKeys() {
        if (!this.channels[this.area])
          return;

        let channelId = this.deleteUserAttributesReq.channelId;
        let keys_str = this.deleteUserAttributesReq.keys;

        let keys = [];

        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { channelId, keys };
        this.deleteUserAttributesRes = '';

        this.channels[this.area].deleteUserAttributesByKeys(req).then(res => {
          console.log("deleteUserAttributesByKeys Res: ", res);
          this.deleteUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.error("deleteUserAttributesByKeys err:", err);
          this.deleteUserAttributesRes = JSON.stringify(err);
        });
      },
      getChannelUserList() {
        if (!this.channels[this.area])
          return;

        let channelId = this.getChannelUserListReq.channelId;
        this.getGroupUserListRes = '';
        this.channels[this.area].getChannelUserList({ channelId }).then(res => {
          console.log("getChannelUserList res:", res);
          this.getGroupUserListRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getChannelUserList err:", err);
          this.getGroupUserListRes = JSON.stringify(err);
        });
      },
      getChannelUserListByAtrribute() {
        if (!this.channels[this.area])
          return;

        let channelId = this.getChannelUserListByAttributeReq.channelId;
        let key = this.getChannelUserListByAttributeReq.key;
        let prop = this.getChannelUserListByAttributeReq.prop;
        this.getGroupUserListByAttributeRes = '';

        this.channels[this.area].getChannelUserListByAtrribute({ channelId, key, prop }).then(res => {
          console.log("getChannelUserListByAtrribute res:", res);
          this.getGroupUserListByAttributeRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getChannelUserListByAtrribute err:", err);
          this.getGroupUserListByAttributeRes = JSON.stringify(err);
        });
      },
      getChannelUserCount() {
        if (!this.channels[this.area])
          return;

        let channelIdsStr = this.getChannelUserCountReq.channelIds;
        let channelIds = [];

        let elements = channelIdsStr.split(",");
        for (let k of elements) {
          channelIds.push(k);
        }
        this.getChannelUserCountRes = '';

        this.channels[this.area].getChannelUserCount({ channelIds: channelIds }).then(res => {
          console.log("getChannelUserCount res:", res);
          this.getChannelUserCountRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getChannelUserCount err:", err);
          this.getChannelUserCountRes = JSON.stringify(err);
        });

      },
      sendMessageToUser() {
        if (!this.channels[this.area])
          return;

        let reliable = this.sendMessageToUserReq.option.reliable;
        let content = this.sendMessageToUserReq.content;
        let receiver = this.sendMessageToUserReq.receiver;
        
        this.sendMessageToUserRes = '';
        this.channels[this.area].sendMessageToUser({
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
        if (!this.channels[this.area])
          return;

        this.queryOnlineStatusForUserRes = '';

        let uid = this.queryOnlineStatusForUserReq.uid;
        this.channels[this.area].queryOnlineStatusForUser({uid: uid}).then(res => {
          console.log("queryOnlineStatusForUser res:", res);
          this.queryOnlineStatusForUserRes = JSON.stringify(res);
        }).catch(err => {
          console.error("queryOnlineStatusForUser err:", err);
          this.queryOnlineStatusForUserRes = JSON.stringify(err);
        });

      },
      queryUsersOnlineStatus() {
        if (!this.channels[this.area])
          return;

        let uidsStr = this.queryUsersOnlineStatusReq.uids;
        let uids = [];

        let elements = uidsStr.split(",");
        for (let k of elements) {
          uids.push(k);
        }
        this.queryUsersOnlineStatusRes = '';

        this.channels[this.area].queryUsersOnlineStatus({ uids: uids }).then(res => {
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
      clearMqData() {
        this.mq_data = [];
        this.mq_channel_data = [];
      },

      /* 消息接收模块 */
      onReceiveMessage(data) {
        data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
        console.log("接收消息ReceiveMessage: " + JSON.stringify(data));
        this.mq_data.push(data);

        this.$message({
          duration: 3000,
          message: "ReceiveMessage: " + JSON.stringify(data),
          type: 'success'
        });

        console.log("MQ队列mq_data: " + JSON.stringify(this.mq_data));
      },
      /* 组播消息接收模块 */
      onReceiveChannelMessage(data) {
        data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
        console.log("接收组播消息ReceiveChannelMessage: " + JSON.stringify(data));
        this.mq_channel_data.push(data);

        this.$message({
          duration: 3000,
          message: "ReceiveChannelMessage: " + JSON.stringify(data),
          type: 'success'
        });

        console.log("组播MQ队列mq_channel_data: " + JSON.stringify(this.mq_channel_data));
      },
      onNotifyJoinChannel(data) {
        console.log("接收消息NotifyJoinChannel: " + JSON.stringify(data));
        this.$message({
          duration: 3000,
          message: "JoinChannel: " + JSON.stringify(data),
          type: 'success'
        });
      },
      onNotifyLeaveChannel(data) {
        console.log("接收消息NotifyLeaveChannel: " + JSON.stringify(data));
        this.$message({
          duration: 3000,
          message: "LeaveChannel: " + JSON.stringify(data),
          type: 'success'
        });
      },
      onNotifyUserAttributesSet(data) {
        console.log("用户属性设置UserAttributesSet: " + JSON.stringify(data));
        this.$message({
          duration: 3000,
          message: "UserAttributesSet: " + JSON.stringify(data),
          type: 'success'
        });
      },
      onNotifyUserAttributesDelete(data) {
        console.log("用户属性删除UserAttributesDelete: " + JSON.stringify(data));
        this.$message({
          duration: 3000,
          message: "UserAttributesDelete: " + JSON.stringify(data),
          type: 'success'
        });
      },
      onNotifyUserCountChange(data) {
        console.log("用户数量变更UserCountChange: " + JSON.stringify(data));
        this.$message({
          duration: 3000,
          message: "UserCountChange: " + JSON.stringify(data),
          type: 'success'
        });
      },
      onConnectStatus(data) {
        console.log("===channel status===:" + JSON.stringify(data));
      },
      onLoginStatus(data) {
        console.log("===login status===:" + JSON.stringify(data));
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
