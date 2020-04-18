<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">Channel调测系统（Channel Service Tutorial）</h2>

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
            <el-button type="primary"  @click="login" style="border-radius: 4px">login</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="logout" style="border-radius: 4px">logout</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="showRefreshTokenModel" style="border-radius: 4px">refreshToken</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px;text-align:left;">{{loginRes}}</p>
    </div>

    <el-dialog align="left" title="刷新token" :visible="refreshTokenModelVisible" @close="closeRefreshTokenModel" customClass="customWidth">
      <refresh-token 
        :hummer="hummer" 
        :uid="uid" 
        @onRefreshToken=refreshToken
      >
      </refresh-token>
    </el-dialog>

    <!-- 初始化roomservice -->
    <p class="text-unit">设置用户归属地</p>
    <el-row type="flex">
      <el-col :span="24"  style="height:35px;text-align:left;" >
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
            <el-button type="primary"  @click="initRoom" style="border-radius: 4px">initRoom</el-button>
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
      <el-col :span="24" style="height:35px;text-align:left;">
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="showCreateRoomModel" style="border-radius: 4px">createRoom</el-button>
          </el-form-item>
          <el-form-item label="频道列表[region:roomId](用于选择频道)">
            <template>
              <el-select v-model="regionRoomId" placeholder="" style="width: 200px;">
                <el-option
                  v-for="item in regionRoomIds"
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

    <el-dialog align="left" title="创建频道实例" :visible="createRoomModelVisible" @close="closeCreateRoomModel" customClass="customWidth">
      <create-room :client="client" @onGetRoom=getRoom></create-room>
    </el-dialog>

    <p class="text-unit">加入/退出Room</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height: 35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="join" style="border-radius: 4px">join</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="leave" style="border-radius: 4px">leave</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{joinOrLeaveRes}}</p>
    </div>

    <p class="text-unit">A给频道发消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="content">
            <el-input v-model="sendMessageToRoomReq.content" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item class="search">
            <el-button type="primary" @click="sendMessageToRoom" style="border-radius: 4px">sendMessageToRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{sendMessageToRoomRes}}</p>
    </div>

    <p class="text-unit">设置用户属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
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
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="keys">
            <el-input v-model="deleteUserAttributesReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="deleteLocalUserAttributesByKeys" style="border-radius: 4px">deleteLocalUserAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{deleteUserAttributesRes}}</p>
    </div>

    <p class="text-unit">删除用户所有属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="clearLocalUserAttributes" style="border-radius: 4px">clearLocalUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{clearLocalUserAttributesRes}}</p>
    </div>

    <p class="text-unit">添加或更新本地用户的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="key">
            <el-input v-model="addOrUpdateLocalUserAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="addOrUpdateLocalUserAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="addOrUpdateLocalUserAttributes" style="border-radius: 4px">addOrUpdateLocalUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{addOrUpdateLocalUserAttributesRes}}</p>
    </div>

    <p class="text-unit">查询某指定用户指定属性名的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uid">
            <el-input v-model="getUserAttributesByKeysReq.uid"></el-input>
          </el-form-item>
          <el-form-item label="keys">
            <el-input v-model="getUserAttributesByKeysReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="getUserAttributesByKeys" style="border-radius: 4px">getUserAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getUserAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">查询某指定用户的全部属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uid">
            <el-input v-model="getUserAttributesReq.uid"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="getUserAttributes" style="border-radius: 4px">getUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getUserAttributesRes}}</p>
    </div>

    <p class="text-unit">查询频道用户列表</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="getRoomUserList" style="border-radius: 4px">getRoomUserList</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getRoomUserListRes}}</p>
    </div>

    <p class="text-unit">查询单个或多个频道的成员人数</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="region">
            <el-input v-model="getRoomUserCountReq.region"></el-input>
          </el-form-item>
          <el-form-item label="roomIds">
            <el-input v-model="getRoomUserCountReq.roomIds"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="getRoomUserCount" style="border-radius: 4px">getRoomUserCount</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getRoomUserCountRes}}</p>
    </div>
    
    <p class="text-unit">设置频道属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <!--
          <el-form-item label="roomId">
            <el-input v-model="setRoomAttributesReq.roomId"></el-input>
          </el-form-item>
          -->          
          <el-form-item label="key">
            <el-input v-model="setRoomAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="setRoomAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="setRoomAttributes" style="border-radius: 4px">setRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{setRoomAttributesRes}}</p>
    </div>

    <p class="text-unit">删除频道某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">   
          <el-form-item label="keys">
            <el-input v-model="deleteRoomAttributesByKeysReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="deleteRoomAttributesByKeys" style="border-radius: 4px">deleteRoomAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{deleteRoomAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">删除频道所有属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="clearRoomAttributes" style="border-radius: 4px">clearRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height:46px; text-align:left;" >{{clearRoomAttributesRes}}</p>
    </div>

    <p class="text-unit">增加或更新频道某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="key">
            <el-input v-model="addOrUpdateRoomAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="addOrUpdateRoomAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="addOrUpdateRoomAttributes" style="border-radius: 4px">addOrUpdateRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{addOrUpdateRoomAttributesRes}}</p>
    </div>

    <p class="text-unit">查询某指定频道指定属性名的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="keys">
            <el-input v-model="getRoomAttributesByKeysReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="getRoomAttributesByKeys" style="border-radius: 4px">getRoomAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getRoomAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">查询某指定频道的全部属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="getRoomAttributes" style="border-radius: 4px">getRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getRoomAttributesRes}}</p>
    </div>

    <!-- P2P消息 -->
    <el-divider content-position="left">P2P消息</el-divider>

    <p class="text-unit">A给B发送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="content">
            <el-input v-model="sendMessageToUserReq.content" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="sendMessageToUserReq.receiver" style="width:150px;"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="sendMessageToUser" style="border-radius: 4px">sendMessageToUser</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{sendMessageToUserRes}}</p>
    </div>
    
    <p class="text-unit">批量查询登录在线状态</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uids">
            <el-input v-model="queryUsersOnlineStatusReq.uids"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="queryUsersOnlineStatus" style="border-radius: 4px">queryUsersOnlineStatus</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{queryUsersOnlineStatusRes}}</p>
    </div>

    <!-- 辅助工具 -->
    <el-divider></el-divider>

    <p class="text-unit">获取实例信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="getInstanceInfo" style="border-radius: 4px">getInstanceInfo</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="clearMqData" style="border-radius: 4px">清除MQ队列</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true">{{result}}</p>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getStorage, setStorage } from '@/utils/BaseUtil';
  import { getRegions, getRegionRoomId } from '@/components/room_config.js';
  import RefreshToken from '@/components/token/refresh_token.vue';
  import CreateRoom from './create_room.vue';
  //import Hummer from 'hummer-channel-sdk';

  const UID = getStorage('uid');
  const AREA = getStorage('area');
  const REGION = getStorage('region');
  const APPID = getStorage('appid');
  const TOKEN = getStorage('token');

  // test parameters
  const TEST_ROOM_ID = 'test123456';
  const TEST_ROLE_KEY = 'room_role_name';
  const TEST_ROOM_NAME_KEY = 'room_name';

  export default {
    name : 'room-test',
    data() {
      return {
        hummer: null,
        client: null,
        rooms: [],
        appid: APPID,
        uid: UID,
        token: TOKEN,
        region: REGION || 'cn',
        area: 'cn',
        areas: getRegions(),
        userRegionFlag: false,
        regionRoomId: null,
        regionRoomIds: [],
        mq_data: [],
        mq_room_data: [],
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
          roomId: TEST_ROOM_ID,
        },
        deleteUserAttributesRes: '',
        clearLocalUserAttributesRes: '',
        addOrUpdateLocalUserAttributesReq: {
          key: TEST_ROLE_KEY,
          prop: 'student',
        },
        addOrUpdateLocalUserAttributesRes: '',
        getRoomUserListReq: {
          roomId: TEST_ROOM_ID,
        },
        getRoomUserListRes: '',
        getUserAttributesReq: {
          uid: UID,
        },
        getUserAttributesRes: '',
        getUserAttributesByKeysReq: {
          uid: UID,
          keys: TEST_ROLE_KEY,
        },
        getUserAttributesByKeysRes: '',
        sendMessageToRoomReq: {
          content: 'js_sdk sendMessageToRoom',
        },
        sendMessageToRoomRes: "",
        sendMessageToUserReq: {
          content: 'js_sdk sendMessageToUser',
          receiver: UID,
        },
        sendMessageToUserRes: "",
        getRoomUserCountReq: {
          region: 'cn',
          roomIds: TEST_ROOM_ID
        },
        getRoomUserCountRes: '',
        setRoomAttributesReq: {
          key: TEST_ROOM_NAME_KEY,
          prop: 'nginx大讲堂',
        },
        setRoomAttributesRes: '',
        deleteRoomAttributesByKeysReq: {
          keys: TEST_ROOM_NAME_KEY,
        },
        deleteRoomAttributesByKeysRes: '',
        clearRoomAttributesRes: '',
        addOrUpdateRoomAttributesReq: {
          key: TEST_ROOM_NAME_KEY,
          prop: 'nginx大讲堂',
        },
        addOrUpdateRoomAttributesRes: '',
        getRoomAttributesRes: '',
        getRoomAttributesByKeysReq: {
          keys: TEST_ROOM_NAME_KEY,
        },
        getRoomAttributesByKeysRes: '',
        queryUsersOnlineStatusReq: {
          uids: UID
        },
        queryUsersOnlineStatusRes: '',
        loginRes: '',
      }
    },
    components: {
      CreateRoom,
      RefreshToken,
    },
    computed: {
      ...mapState({
        createRoomModelVisible: state => state.room.createRoomModelVisible,
        refreshTokenModelVisible: state => state.refreshToken.refreshTokenModelVisible,
      })
    },
    watch: {
    },
    created() {
      // 初始化Hummer
      this.hummer = Hummer.createHummer({appid: this.appid});

      this.hummer.setLogLevel(-1);

      this.onConnectStatusChange();
      this.onTokenExpired();
    },
    destroyed() {
    },
    mounted() {
    },
    methods: {
      showRefreshTokenModel() {
        this.$store.commit('updateRefreshTokenModelVisible', true);
      },
      closeRefreshTokenModel() {
        this.$store.commit('updateRefreshTokenModelVisible', false)
      },
      showCreateRoomModel() {
        this.$store.commit('updateCreateRoomModelVisible', true);
      },
      closeCreateRoomModel() {
        this.$store.commit('updateCreateRoomModelVisible', false)
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
      // 初始化RoomService
      initRoom() {
        if (!this.hummer) {
          console.log("hummer is null");
          return;
        }

        if (this.client) {
          console.log("client is ready");
          return;
        }
        
        // 初始化RoomService
        this.client = this.hummer.createInstance();

        // 接收P2P消息
        this.onReceiveMessage();
      },
      getRoom(data) {
        console.log('getRoom data=', data);

        let region = data.region;
        let roomId = data.roomId;
        this.regionRoomId = getRegionRoomId(region, roomId);
        if (this.rooms[this.regionRoomId]) {
          console.log('room exists, and rooms=', this.rooms);
          return;
        }

        this.rooms[this.regionRoomId] = data;
        this.regionRoomIds.push({value: this.regionRoomId, label: this.regionRoomId});

        console.log('rooms=', this.rooms);

        let room = this.rooms[this.regionRoomId];
        this.onReceiveRoomMessage(room);
        this.onNotifyJoinRoom(room);
        this.onNotifyLeaveRoom(room);
        this.onNotifyUserCountChange(room);
        // 用户属性变更
        this.onNotifyUserAttributesChange(room);
        // 频道属性变更
        this.onNotifyRoomAttributesChange(room);
      },
      join() {
        if (!this.rooms[this.regionRoomId])
          return;

        let extra = {"Name": "阿武"};
        let params = { extra };
        console.log("join Req: " + JSON.stringify(params));
        
        this.joinOrLeaveRes = '';
        this.rooms[this.regionRoomId].room.join(params).then(res => {
          console.log("自己进入频道join res:", res);
          this.joinOrLeaveRes = JSON.stringify(res);
        }).catch(err => {
          console.error("join err:", err);
          this.joinOrLeaveRes = JSON.stringify(err);
        });
      },
      leave() {
        if (!this.rooms[this.regionRoomId])
          return;

        this.joinOrLeaveRes = '';
        this.rooms[this.regionRoomId].room.leave().then(res => {
          console.log("自己离开频道leave res:", res);
          this.joinOrLeaveRes = JSON.stringify(res);
        }).catch(err => {
          console.error("leave err:", err);
          this.joinOrLeaveRes = JSON.stringify(err);
        });
      },
      sendMessageToRoom() {
        if (!this.rooms[this.regionRoomId])
          return;

        let content = this.sendMessageToRoomReq.content;
        
        this.sendMessageToRoomRes = '';
        this.rooms[this.regionRoomId].room.sendMessageToRoom({
          type: "100", 
          content: Hummer.Utify.encodeStringToUtf8Bytes(content), 
        }).then(res => {
          console.log("sendMessageToRoom Res: " + JSON.stringify(res));
          this.sendMessageToRoomRes = JSON.stringify(res);

          console.log("消息队列mq_room_data: " + JSON.stringify(this.mq_room_data));
        }).catch(err => {
          console.error("sendMessageToRoom err:", err);
          this.sendMessageToRoomRes = JSON.stringify(err);
        });
      },
      setLocalUserAttributes() {
        if (!this.rooms[this.regionRoomId])
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
        this.rooms[this.regionRoomId].room.setLocalUserAttributes(req).then(res => {
          console.log("setLocalUserAttributes Res: ", res);
          this.setLocalUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("setLocalUserAttributes err:", err);
          this.setLocalUserAttributesRes = JSON.stringify(err);
        });
      },
      deleteLocalUserAttributesByKeys() {
        if (!this.rooms[this.regionRoomId])
          return;

        let keys_str = this.deleteUserAttributesReq.keys;

        let keys = [];

        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { keys };
        this.deleteUserAttributesRes = '';

        this.rooms[this.regionRoomId].room.deleteLocalUserAttributesByKeys(req).then(res => {
          console.log("deleteLocalUserAttributesByKeys Res: ", res);
          this.deleteUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.error("deleteLocalUserAttributesByKeys err:", err);
          this.deleteUserAttributesRes = JSON.stringify(err);
        });
      },
      clearLocalUserAttributes() {
        if (!this.rooms[this.regionRoomId])
          return;

        this.clearLocalUserAttributesRes = '';

        this.rooms[this.regionRoomId].room.clearLocalUserAttributes().then(res => {
          console.log("clearLocalUserAttributes Res: ", res);
          this.clearLocalUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.error("clearLocalUserAttributes err:", err);
          this.clearLocalUserAttributesRes = JSON.stringify(err);
        });
      },
      addOrUpdateLocalUserAttributes() {
        if (!this.rooms[this.regionRoomId])
          return;

        let attributes = {
          "Name": "awu",
        };
  
        let key = this.addOrUpdateLocalUserAttributesReq.key;
        let prop = this.addOrUpdateLocalUserAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        this.addOrUpdateLocalUserAttributesRes = '';
        this.rooms[this.regionRoomId].room.addOrUpdateLocalUserAttributes(req).then(res => {
          console.log("addOrUpdateLocalUserAttributes Res: ", res);
          this.addOrUpdateLocalUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("addOrUpdateLocalUserAttributes err:", err);
          this.addOrUpdateLocalUserAttributesRes = JSON.stringify(err);
        });
      },
      getRoomUserList() {
        if (!this.rooms[this.regionRoomId])
          return;

        this.getRoomUserListRes = '';
        this.rooms[this.regionRoomId].room.getRoomUserList().then(res => {
          console.log("getRoomUserList res:", res);
          this.getRoomUserListRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getRoomUserList err:", err);
          this.getRoomUserListRes = JSON.stringify(err);
        });
      },
      getUserAttributes() {
        if (!this.rooms[this.regionRoomId])
          return;

        let uid = this.getUserAttributesReq.uid;
        let req = { uid };

        this.getUserAttributesRes = '';
        this.rooms[this.regionRoomId].room.getUserAttributes(req).then(res => {
          console.log("getUserAttributes res:", res);
          this.getUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getUserAttributes err:", err);
          this.getUserAttributesRes = JSON.stringify(err);
        });
      },
      getUserAttributesByKeys() {
        if (!this.rooms[this.regionRoomId])
          return;

        let keys_str = this.getUserAttributesByKeysReq.keys;
        let keys = [];
        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }
        let uid = this.getUserAttributesByKeysReq.uid;
        let req = { uid, keys };

        this.getUserAttributesByKeysRes = '';
        this.rooms[this.regionRoomId].room.getUserAttributesByKeys(req).then(res => {
          console.log("getUserAttributesByKeys res:", res);
          this.getUserAttributesByKeysRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getUserAttributesByKeys err:", err);
          this.getUserAttributesByKeysRes = JSON.stringify(err);
        });
      },
      getRoomUserCount() {
        if (!this.client)
          return;

        let region = this.getRoomUserCountReq.region;

        let roomIdsStr = this.getRoomUserCountReq.roomIds;
        let roomIds = [];

        let elements = roomIdsStr.split(",");
        for (let k of elements) {
          roomIds.push(k);
        }
        this.getRoomUserCountRes = '';

        this.client.getRoomUserCount({region, roomIds}).then(res => {
          console.log("getRoomUserCount res:", res);
          this.getRoomUserCountRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getRoomUserCount err:", err);
          this.getRoomUserCountRes = JSON.stringify(err);
        });
      },
      // 频道属性
      setRoomAttributes() {
        if (!this.rooms[this.regionRoomId])
          return;

        let attributes = {
          "Name": "awu",
          "Description": "js_sdk测试",
          "Bulletin": "bull",
          "Extention": "ex"
        };
  
        let region = this.rooms[this.regionRoomId].region;
        let roomId = this.rooms[this.regionRoomId].roomId;

        let key = this.setRoomAttributesReq.key;
        let prop = this.setRoomAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { region, roomId, attributes };
        console.log('setRoomAttributes: req=', req);

        this.setRoomAttributesRes = '';
        this.client.setRoomAttributes(req).then(res => {
          console.log("setRoomAttributes Res: ", res);
          this.setRoomAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("setRoomAttributes err:", err);
          this.setRoomAttributesRes = JSON.stringify(err);
        });
      },
      deleteRoomAttributesByKeys() {
        if (!this.rooms[this.regionRoomId])
          return;
          
        let region = this.rooms[this.regionRoomId].region;
        let roomId = this.rooms[this.regionRoomId].roomId;

        let keys_str = this.deleteRoomAttributesByKeysReq.keys;

        let keys = [];

        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { region, roomId, keys };
        console.log('deleteRoomAttributesByKeys: req=', req);

        this.deleteRoomAttributesByKeysRes = '';

        this.client.deleteRoomAttributesByKeys(req).then(res => {
          console.log("deleteRoomAttributesByKeys res: ", res);
          this.deleteRoomAttributesByKeysRes = JSON.stringify(res);
        }).catch(err => {
          console.error("deleteRoomAttributesByKeys err:", err);
          this.deleteRoomAttributesByKeysRes = JSON.stringify(err);
        });
      },
      clearRoomAttributes() {
        if (!this.rooms[this.regionRoomId])
          return;

        let region = this.rooms[this.regionRoomId].region;
        let roomId = this.rooms[this.regionRoomId].roomId;

        let req = { region, roomId };
        console.log('clearRoomAttributes: req=', req);
        
        this.clearRoomAttributesRes = '';
        this.client.clearRoomAttributes({ roomId }).then(res => {
          console.log("clearRoomAttributes res: ", res);
          this.clearRoomAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("clearRoomAttributes err:", err);
          this.clearRoomAttributesRes = JSON.stringify(err);
        });
      },
      addOrUpdateRoomAttributes() {
        if (!this.rooms[this.regionRoomId])
          return;

        let attributes = {
          "owner": "awu",
        };
  
        let region = this.rooms[this.regionRoomId].region;
        let roomId = this.rooms[this.regionRoomId].roomId;

        let key = this.addOrUpdateRoomAttributesReq.key;
        let prop = this.addOrUpdateRoomAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { region, roomId, attributes };
        console.log('addOrUpdateRoomAttributes: req=', req);

        this.addOrUpdateRoomAttributesRes = '';
        this.client.addOrUpdateRoomAttributes(req).then(res => {
          console.log("addOrUpdateRoomAttributes res: ", res);
          this.addOrUpdateRoomAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("addOrUpdateRoomAttributes err:", err);
          this.addOrUpdateRoomAttributesRes = JSON.stringify(err);
        });
      },
      getRoomAttributes() {
        if (!this.rooms[this.regionRoomId])
          return;

        let region = this.rooms[this.regionRoomId].region;
        let roomId = this.rooms[this.regionRoomId].roomId;
        
        let req = { region, roomId };
        console.log('getRoomAttributes: req=', req);

        this.getRoomAttributesRes = '';
        this.client.getRoomAttributes(req).then(res => {
          console.log("getRoomAttributes res:", res);
          this.getRoomAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getRoomAttributes err:", err);
          this.getRoomAttributesRes = JSON.stringify(err);
        });
      },
      getRoomAttributesByKeys() {
        if (!this.rooms[this.regionRoomId])
          return;
        
        let region = this.rooms[this.regionRoomId].region;
        let roomId = this.rooms[this.regionRoomId].roomId;

        let keys_str = this.getRoomAttributesByKeysReq.keys;
        let keys = [];
        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { region, roomId, keys };
        console.log('getRoomAttributesByKeys: req=', req);

        this.getRoomAttributesByKeysRes = '';
        this.client.getRoomAttributesByKeys(req).then(res => {
          console.log("getRoomAttributesByKeys res:", res);
          this.getRoomAttributesByKeysRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getRoomAttributesByKeys err:", err);
          this.getRoomAttributesByKeysRes = JSON.stringify(err);
        });
      },

      sendMessageToUser() {
        if (!this.client)
          return;

        let content = this.sendMessageToUserReq.content;
        let receiver = this.sendMessageToUserReq.receiver;
        
        this.sendMessageToUserRes = '';
        this.client.sendMessageToUser({
          receiver: receiver, 
          type: "100", 
          content: Hummer.Utify.encodeStringToUtf8Bytes(content),
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
          if (res.rescode === 0) {
            this.rooms = [];
            this.regionRoomIds = [];
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
        this.mq_room_data = [];
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
      onReceiveRoomMessage(room) {
        room.room.on('RoomMessage', (data) => {
          data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
          console.log(`接收组播消息RoomMessage: [${room.region}:${room.roomId}]:` + JSON.stringify(data));
          this.mq_room_data.push(data);

          this.$message({
            duration: 3000,
            message: `RoomMessage: [${room.region}:${room.roomId}]:` + JSON.stringify(data),
            type: 'success'
          });

          console.log("组播MQ队列mq_room_data: " + JSON.stringify(this.mq_room_data));
        });
      },
      onNotifyJoinRoom(room) {
        room.room.on('NotifyJoinRoom', (data) => {
          console.log(`接收消息NotifyJoinRoom [${room.region}:${room.roomId}]:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `NotifyJoinRoom [${room.region}:${room.roomId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyLeaveRoom(room) {
        room.room.on('NotifyLeaveRoom', (data) => {
          console.log(`接收消息NotifyLeaveRoom [${room.region}:${room.roomId}]:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `NotifyLeaveRoom [${room.region}:${room.roomId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyUserCountChange(room) {
        room.room.on('NotifyUserCountChange', (data) => {
          console.log(`用户数量变更NotifyUserCountChange [${room.region}:${room.roomId}]: ` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `NotifyUserCountChange [${room.region}:${room.roomId}]: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onNotifyUserAttributesChange(room) {
        const roomEvents = [
          "NotifyUserAttributesSet",
          "NotifyUserAttributesDelete",
          "NotifyUserAttributesClear",
          "NotifyUserAttributesAddOrUpdate"
        ];
        roomEvents.forEach(eventName => {
          room.room.on(eventName, (data) => {
            console.log(`接收消息${eventName} [${room.region}:${room.roomId}]: ` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName} [${room.region}:${room.roomId}]: ` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onNotifyRoomAttributesChange(room) {
        const roomEvents = [
          "NotifyRoomAttributesSet",
          "NotifyRoomAttributesDelete",
          "NotifyRoomAttributesClear",
          "NotifyRoomAttributesAddOrUpdate"
        ];
        roomEvents.forEach(eventName => {
          room.room.on(eventName, (data) => {
            console.log(`接收消息${eventName} [${room.region}:${room.roomId}]: ` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName} [${room.region}:${room.roomId}]: ` + JSON.stringify(data),
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
      },
      onTokenExpired() {
        this.hummer.on('TokenExpired', () => {
          console.log("=== TokenExpired ===");
          this.$message({
            duration: 3000,
            message: `TokenExpired`,
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
