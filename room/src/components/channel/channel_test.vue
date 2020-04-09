<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">Channel调测系统（Channel Service Tutorial）</h2>

    <!-- 登录/登出 -->
    <p class="text-unit">登录/登出</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="appid">
            <el-input v-model="appid" disabled style="width:150px;"></el-input>
          </el-form-item>
          <el-form-item label="uid">
            <el-input v-model="uid" disabled style="width:150px;"></el-input>
          </el-form-item>
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
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px;text-align:left;">{{loginRes}}</p>
    </div>

    <!-- 初始化ChannelService -->
    <p class="text-unit">设置用户归属地</p>
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="用户归属地">
            <template>
              <el-select v-model="userRegion" placeholder="userRegion" style="width:150px;">
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
          <el-form-item class="search">
            <el-button type="primary"  @click="initChannel" style="border-radius: 4px">initChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{setUserRegionRes}}</p>
    </div>

    <!-- 频道消息 -->
    <el-divider content-position="left">频道消息</el-divider>

    <p class="text-unit">创建频道实例</p>
    <el-row type="flex">
      <el-col :span="24" style="height:30px;text-align:left;">
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="showCreateChannelModel" style="border-radius: 4px">createChannel</el-button>
          </el-form-item>
          <el-form-item label="频道列表[region:channelId](用于选择频道)">
            <template>
              <el-select v-model="regionChannelId" placeholder="" style="width: 200px;">
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

    <el-dialog align="left" title="创建频道实例" :visible="createChannelModelVisible" @close="closeCreateChannelModel" customClass="customWidth">
      <create-channel :client="client" @onGetChannel=getChannel></create-channel>
    </el-dialog>

    <p class="text-unit">加入/退出Channel</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="joinChannel" style="border-radius: 4px">joinChannel</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="leaveChannel" style="border-radius: 4px">leaveChannel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{joinOrLeaveRes}}</p>
    </div>

    <p class="text-unit">A给频道发消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="reliable">
            <template>
              <el-select v-model="sendMessageToChannelReq.option.reliable" placeholder="reliable" style="width: 80px;">
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
            <el-input v-model="sendMessageToChannelReq.content" style="width: 200px;"></el-input>
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
            <el-input v-model="setLocalUserAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="setLocalUserAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="setLocalUserAttributes" style="border-radius: 4px">setLocalUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{setLocalUserAttributesRes}}</p>
    </div>

    <p class="text-unit">删除用户某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="keys">
            <el-input v-model="deleteUserAttributesReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="deleteLocalUserAttributesByKeys" style="border-radius: 4px">deleteLocalUserAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{deleteUserAttributesRes}}</p>
    </div>

    <p class="text-unit">删除用户所有属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="clearLocalUserAttributes" style="border-radius: 4px">clearLocalUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{clearLocalUserAttributesRes}}</p>
    </div>

    <p class="text-unit">添加或更新本地用户的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="key">
            <el-input v-model="addOrUpdateLocalUserAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="addOrUpdateLocalUserAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="addOrUpdateLocalUserAttributes" style="border-radius: 4px">addOrUpdateLocalUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{addOrUpdateLocalUserAttributesRes}}</p>
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
            <el-button type="primary" @click="getChannelUserList" style="border-radius: 4px">getChannelUserList</el-button>
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
            <el-button type="primary" @click="getChannelUserCount" style="border-radius: 4px">getChannelUserCount</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getChannelUserCountRes}}</p>
    </div>
    
    <p class="text-unit">设置频道属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="key">
            <el-input v-model="setChannelAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="setChannelAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="setChannelAttributes" style="border-radius: 4px">setChannelAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{setChannelAttributesRes}}</p>
    </div>

    <p class="text-unit">删除频道某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="keys">
            <el-input v-model="deleteChannelAttributesByKeysReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="deleteChannelAttributesByKeys" style="border-radius: 4px">deleteChannelAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{deleteChannelAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">删除频道所有属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="clearChannelAttributes" style="border-radius: 4px">clearChannelAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{clearChannelAttributesRes}}</p>
    </div>

    <p class="text-unit">增加或更新频道某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="key">
            <el-input v-model="addOrUpdateChannelAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="addOrUpdateChannelAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="addOrUpdateChannelAttributes" style="border-radius: 4px">addOrUpdateChannelAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{addOrUpdateChannelAttributesRes}}</p>
    </div>

    <p class="text-unit">查询某指定频道指定属性名的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="keys">
            <el-input v-model="getChannelAttributesByKeysReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="getChannelAttributesByKeys" style="border-radius: 4px">getChannelAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getChannelAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">查询某指定频道的全部属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="getChannelAttributes" style="border-radius: 4px">getChannelAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getChannelAttributesRes}}</p>
    </div>

    <!-- P2P消息 -->
    <el-divider content-position="left">P2P消息</el-divider>

    <p class="text-unit">A给B发送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="reliable">
            <template>
              <el-select v-model="sendMessageToUserReq.option.reliable" placeholder="reliable" style="width: 80px;">
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
            <el-input v-model="sendMessageToUserReq.content" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="sendMessageToUserReq.receiver" style="width:150px;"></el-input>
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

    <!-- 登录/登出 -->
    <el-divider></el-divider>

    <p class="text-unit">刷新token</p>
    <el-row type="flex">
      <el-col :span="24" style="height:30px;text-align:left;">
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="showRefreshTokenModel" style="border-radius: 4px">refreshToken</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{refreshTokenRes}}</p>
    </div>

    <el-dialog align="left" title="刷新token" :visible="refreshTokenModelVisible" @close="closeRefreshTokenModel" customClass="customWidth">
      <refresh-token 
        :hummer="hummer" 
        :uid="uid" 
        @onRefreshToken=refreshToken
      >
      </refresh-token>
    </el-dialog>

    <p class="text-unit">获取实例信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="getInstanceInfo" style="border-radius: 4px">getInstanceInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true">{{result}}</p>
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
  import CreateChannel from './create_channel.vue'
  import RefreshToken from './refresh_token.vue'

  //import Hummer from 'hummer-channel-sdk';

  const UID = getStorage('uid');
  const AREA = getStorage('area');
  const REGION = getStorage('region');
  const APPID = getStorage('appid');
  const TOKEN = getStorage('token');

  // test parameters
  const TEST_CHANNEL_ID = 'test123456';
  const TEST_ROLE_KEY = 'channel_role_name';
  const TEST_CHANNEL_NAME_KEY = 'channel_name';

  export default {
    name : 'channel-test',
    data() {
      return {
        flag: -1,
        hummer: null,
        client: null,
        channels: [],
        appid: APPID,
        uid: UID,
        token: TOKEN,
        region: REGION || 'cn',
        area: 'cn',
        areas: getRegions(),
        userRegionFlag: false,
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
        joinOrLeaveRes: '',
        setLocalUserAttributesReq: {
          key: TEST_ROLE_KEY,
          prop: 'teacher',
        },
        setLocalUserAttributesRes: '',
        deleteUserAttributesReq: {
          keys: TEST_ROLE_KEY,
          channelId: TEST_CHANNEL_ID,
        },
        deleteUserAttributesRes: '',
        clearLocalUserAttributesRes: '',
        addOrUpdateLocalUserAttributesReq: {
          key: TEST_ROLE_KEY,
          prop: 'student',
        },
        addOrUpdateLocalUserAttributesRes: '',
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
        sendMessageToChannelReq: {
          option: { reliable: 'yes' },
          content: 'js_sdk sendMessageToChannel',
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
        setChannelAttributesReq: {
          key: TEST_CHANNEL_NAME_KEY,
          prop: 'nginx大讲堂',
        },
        setChannelAttributesRes: '',
        deleteChannelAttributesByKeysReq: {
          keys: TEST_CHANNEL_NAME_KEY,
        },
        deleteChannelAttributesByKeysRes: '',
        clearChannelAttributesRes: '',
        addOrUpdateChannelAttributesReq: {
          key: TEST_CHANNEL_NAME_KEY,
          prop: 'nginx大讲堂',
        },
        addOrUpdateChannelAttributesRes: '',
        getChannelAttributesRes: '',
        getChannelAttributesByKeysReq: {
          keys: TEST_CHANNEL_NAME_KEY,
        },
        getChannelAttributesByKeysRes: '',
        queryUsersOnlineStatusReq: {
          uids: UID
        },
        queryUsersOnlineStatusRes: '',
        loginRes: '',
        refreshTokenRes: '',
      }
    },
    components: {
      CreateChannel,
      RefreshToken,
    },
    computed: {
      ...mapState({
        createChannelModelVisible: state => state.channel.createChannelModelVisible,
        refreshTokenModelVisible: state => state.refreshToken.refreshTokenModelVisible,
      })
    },
    watch: {
    },
    created() {
      // 初始化Hummer
      this.hummer = Hummer.createHummer({ appid: this.appid,
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

      this.onConnectStatusChange();
    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      showCreateChannelModel() {
        this.$store.commit('updateCreateChannelModelVisible', true);
      },
      closeCreateChannelModel() {
        this.$store.commit('updateCreateChannelModelVisible', false)
      },
      showRefreshTokenModel() {
        this.$store.commit('updateRefreshTokenModelVisible', true);
      },
      closeRefreshTokenModel() {
        this.$store.commit('updateRefreshTokenModelVisible', false)
      },
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
      // 初始化ChannelService
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
      getChannel(data) {
        console.log('getChannel data=', data);

        let region = data.region;
        let channelId = data.channelId;
        this.regionChannelId = getRegionChannelId(region, channelId);
        if (this.channels[this.regionChannelId]) {
          console.log('channel exists, and channels=', this.channels);
          return;
        }

        this.channels[this.regionChannelId] = data;
        this.regionChannelIds.push({value: this.regionChannelId, label: this.regionChannelId});

        console.log('channels=', this.channels);

        let channel = this.channels[this.regionChannelId];
        this.onReceiveChannelMessage(channel);
        this.onNotifyJoinChannel(channel);
        this.onNotifyLeaveChannel(channel);
        this.onNotifyUserCountChange(channel);
        // 用户属性变更
        this.onNotifyUserAttributesChange(channel);
        // 频道属性变更
        this.onNotifyChannelAttributesChange(channel);
      },
      joinChannel() {
        if (!this.channels[this.regionChannelId])
          return;

        let extra = {"Name": "阿武"};
        let params = { extra };
        console.log("joinChannel Req: " + JSON.stringify(params));
        
        this.joinOrLeaveRes = '';
        this.channels[this.regionChannelId].channel.joinChannel(params).then(res => {
          console.log("自己进入频道joinChannel res:", res);
          this.joinOrLeaveRes = JSON.stringify(res);
        }).catch(err => {
          console.error("joinChannel err:", err);
          this.joinOrLeaveRes = JSON.stringify(err);
        });
      },
      leaveChannel() {
        if (!this.channels[this.regionChannelId])
          return;

        this.joinOrLeaveRes = '';
        this.channels[this.regionChannelId].channel.leaveChannel().then(res => {
          console.log("自己离开频道leaveChannel res:", res);
          this.joinOrLeaveRes = JSON.stringify(res);
        }).catch(err => {
          console.error("leaveChannel err:", err);
          this.joinOrLeaveRes = JSON.stringify(err);
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
      setLocalUserAttributes() {
        if (!this.channels[this.regionChannelId])
          return;

        let attributes = {
          "Name": "awu",
          "Description": "js_sdk测试",
          "Bulletin": "bull",
          "Extention": "ex"
        };
  
        let key = this.setLocalUserAttributesReq.key;
        let prop = this.setLocalUserAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        this.setLocalUserAttributesRes = '';
        this.channels[this.regionChannelId].channel.setLocalUserAttributes(req).then(res => {
          console.log("setLocalUserAttributes Res: ", res);
          this.setLocalUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("setLocalUserAttributes err:", err);
          this.setLocalUserAttributesRes = JSON.stringify(err);
        });
      },
      deleteLocalUserAttributesByKeys() {
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

        this.channels[this.regionChannelId].channel.deleteLocalUserAttributesByKeys(req).then(res => {
          console.log("deleteLocalUserAttributesByKeys Res: ", res);
          this.deleteUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.error("deleteLocalUserAttributesByKeys err:", err);
          this.deleteUserAttributesRes = JSON.stringify(err);
        });
      },
      clearLocalUserAttributes() {
        if (!this.channels[this.regionChannelId])
          return;

        this.clearLocalUserAttributesRes = '';

        this.channels[this.regionChannelId].channel.clearLocalUserAttributes().then(res => {
          console.log("clearLocalUserAttributes Res: ", res);
          this.clearLocalUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.error("clearLocalUserAttributes err:", err);
          this.clearLocalUserAttributesRes = JSON.stringify(err);
        });
      },
      addOrUpdateLocalUserAttributes() {
        if (!this.channels[this.regionChannelId])
          return;

        let attributes = {
          "Name": "awu",
        };
  
        let key = this.addOrUpdateLocalUserAttributesReq.key;
        let prop = this.addOrUpdateLocalUserAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        this.addOrUpdateLocalUserAttributesRes = '';
        this.channels[this.regionChannelId].channel.addOrUpdateLocalUserAttributes(req).then(res => {
          console.log("addOrUpdateLocalUserAttributes Res: ", res);
          this.addOrUpdateLocalUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("addOrUpdateLocalUserAttributes err:", err);
          this.addOrUpdateLocalUserAttributesRes = JSON.stringify(err);
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
      // 频道属性
      setChannelAttributes() {
        if (!this.channels[this.regionChannelId])
          return;

        let attributes = {
          "Name": "awu",
          "Description": "js_sdk测试",
          "Bulletin": "bull",
          "Extention": "ex"
        };
  
        let key = this.setChannelAttributesReq.key;
        let prop = this.setChannelAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        this.setChannelAttributesRes = '';
        this.channels[this.regionChannelId].channel.setChannelAttributes(req).then(res => {
          console.log("setChannelAttributes Res: ", res);
          this.setChannelAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("setChannelAttributes err:", err);
          this.setChannelAttributesRes = JSON.stringify(err);
        });
      },
      deleteChannelAttributesByKeys() {
        if (!this.channels[this.regionChannelId])
          return;

        let keys_str = this.deleteChannelAttributesByKeysReq.keys;

        let keys = [];

        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { keys };
        this.deleteChannelAttributesByKeysRes = '';

        this.channels[this.regionChannelId].channel.deleteChannelAttributesByKeys(req).then(res => {
          console.log("deleteChannelAttributesByKeys res: ", res);
          this.deleteChannelAttributesByKeysRes = JSON.stringify(res);
        }).catch(err => {
          console.error("deleteChannelAttributesByKeys err:", err);
          this.deleteChannelAttributesByKeysRes = JSON.stringify(err);
        });
      },
      clearChannelAttributes() {
        if (!this.channels[this.regionChannelId])
          return;

        this.clearChannelAttributesRes = '';

        this.channels[this.regionChannelId].channel.clearChannelAttributes().then(res => {
          console.log("clearChannelAttributes res: ", res);
          this.clearChannelAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("clearChannelAttributes err:", err);
          this.clearChannelAttributesRes = JSON.stringify(err);
        });
      },
      addOrUpdateChannelAttributes() {
        if (!this.channels[this.regionChannelId])
          return;

        let attributes = {
          "owner": "awu",
        };
  
        let key = this.addOrUpdateChannelAttributesReq.key;
        let prop = this.addOrUpdateChannelAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        this.addOrUpdateChannelAttributesRes = '';
        this.channels[this.regionChannelId].channel.addOrUpdateChannelAttributes(req).then(res => {
          console.log("addOrUpdateChannelAttributes res: ", res);
          this.addOrUpdateChannelAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("addOrUpdateChannelAttributes err:", err);
          this.addOrUpdateChannelAttributesRes = JSON.stringify(err);
        });
      },
      getChannelAttributes() {
        if (!this.channels[this.regionChannelId])
          return;

        this.getChannelAttributesRes = '';
        this.channels[this.regionChannelId].channel.getChannelAttributes().then(res => {
          console.log("getChannelAttributes res:", res);
          this.getChannelAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getChannelAttributes err:", err);
          this.getChannelAttributesRes = JSON.stringify(err);
        });
      },
      getChannelAttributesByKeys() {
        if (!this.channels[this.regionChannelId])
          return;

        let keys_str = this.getChannelAttributesByKeysReq.keys;
        let keys = [];
        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }
        let req = { keys };

        this.getChannelAttributesByKeysRes = '';
        this.channels[this.regionChannelId].channel.getChannelAttributesByKeys(req).then(res => {
          console.log("getChannelAttributesByKeys res:", res);
          this.getChannelAttributesByKeysRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getChannelAttributesByKeys err:", err);
          this.getChannelAttributesByKeysRes = JSON.stringify(err);
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
      refreshToken(data) {
        this.refreshTokenRes = JSON.stringify(data);
        console.log('refreshToken res=', data);
      },
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
      onReceiveChannelMessage(channel) {
        channel.channel.on('ChannelMessage', (data) => {
          data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
          console.log(`接收组播消息ChannelMessage: [${channel.region}:${channel.channelId}]:` + JSON.stringify(data));
          this.mq_channel_data.push(data);

          this.$message({
            duration: 3000,
            message: `ChannelMessage: [${channel.region}:${channel.channelId}]:` + JSON.stringify(data),
            type: 'success'
          });

          console.log("组播MQ队列mq_channel_data: " + JSON.stringify(this.mq_channel_data));
        });
      },
      onNotifyJoinChannel(channel) {
        channel.channel.on('NotifyJoinChannel', (data) => {
          console.log(`接收消息NotifyJoinChannel [${channel.region}:${channel.channelId}]:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `JoinChannel [${channel.region}:${channel.channelId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyLeaveChannel(channel) {
        channel.channel.on('NotifyLeaveChannel', (data) => {
          console.log(`接收消息NotifyLeaveChannel [${channel.region}:${channel.channelId}]:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `LeaveChannel [${channel.region}:${channel.channelId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyUserCountChange(channel) {
        channel.channel.on('NotifyUserCountChange', (data) => {
          console.log(`用户数量变更NotifyUserCountChange [${channel.region}:${channel.channelId}]: ` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `NotifyUserCountChange [${channel.region}:${channel.channelId}]: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyUserAttributesChange(channel) {
        const channelEvents = [
          "NotifyUserAttributesSet",
          "NotifyUserAttributesDelete",
          "NotifyUserAttributesAddOrUpdate"
        ];
        channelEvents.forEach(eventName => {
          channel.channel.on(eventName, (data) => {
            console.log(`接收消息${eventName} [${channel.region}:${channel.channelId}]: ` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName} [${channel.region}:${channel.channelId}]: ` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onNotifyChannelAttributesChange(channel) {
        const channelEvents = [
          "NotifyChannelAttributesSet",
          "NotifyChannelAttributesDelete",
          "NotifyChannelAttributesAddOrUpdate"
        ];
        channelEvents.forEach(eventName => {
          channel.channel.on(eventName, (data) => {
            console.log(`接收消息${eventName} [${channel.region}:${channel.channelId}]: ` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName} [${channel.region}:${channel.channelId}]: ` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onConnectStatusChange() {
        this.hummer.on('ConnectionStateChange', (data) => {
          console.log("=== ConnectionStateChange ===:" + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `ConnectionStateChange: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      }
    }
  }
</script>

<style lang='less'>
  .customWidth {
    width: 80%;
  }
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
    width: 80%;
    height: 46px;
    text-align: left;
  }
</style>
