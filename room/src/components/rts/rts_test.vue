<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">RTS调测系统（Real-Time Signal Service Tutorial）</h2>

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
          <el-form-item label="用户归属地">
            <template>
              <el-select v-model="userRegion" placeholder="userRegion" style="width:150px;">
                <el-option
                  v-for="item in regions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="login" style="border-radius:4px">login</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="logout" style="border-radius:4px">logout</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="showRefreshTokenModel" style="border-radius:4px">refreshToken</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width:80%; height:46px; text-align:left;">{{loginRes}}</p>
    </div>

    <el-dialog align="left" title="刷新token" :visible="refreshTokenModelVisible" @close="closeRefreshTokenModel" customClass="customWidth">
      <refresh-token 
        :hummer="hummer" 
        :uid="uid" 
        @onRefreshToken=refreshToken
      >
      </refresh-token>
    </el-dialog>

    <!-- 初始化RoomService -->
    <p class="text-unit">初始化RTS</p>
    <el-row type="flex">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="initRTS" style="border-radius: 4px">initRTS</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 频道消息 -->
    <el-divider content-position="left">频道消息</el-divider>

    <p class="text-unit">创建频道实例</p>
    <el-row type="flex">
      <el-col :span="24" style="height:35px;text-align:left;">
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="showCreateRoomModel" style="border-radius: 4px">createRoom</el-button>
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
            <el-button type="primary" @click="join" style="border-radius:4px">join</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="leave" style="border-radius:4px">leave</el-button>
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
            <el-input v-model="sendMessageReq.content" style="width: 200px;"></el-input>
          </el-form-item>

          <el-form-item class="search">
            <el-button type="primary" @click="sendMessage" style="border-radius: 4px">sendMessage</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width:80%; height:46px; text-align:left;">{{sendMessageRes}}</p>
    </div>

    <p class="text-unit">设置用户属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
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
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="keys">
            <el-input v-model="deleteUserAttributesReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="deleteUserAttributesByKeys" style="border-radius: 4px">deleteUserAttributesByKeys</el-button>
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
            <el-button type="primary" @click="clearUserAttributes" style="border-radius: 4px">clearUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{clearUserAttributesRes}}</p>
    </div>

    <p class="text-unit">添加或更新本地用户的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="key">
            <el-input v-model="addOrUpdateUserAttributesReq.key"></el-input>
          </el-form-item>
          <el-form-item label="prop">
            <el-input v-model="addOrUpdateUserAttributesReq.prop"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="addOrUpdateUserAttributes" style="border-radius: 4px">addOrUpdateUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;" >{{addOrUpdateUserAttributesRes}}</p>
    </div>

    <p class="text-unit">查询某指定用户指定属性名的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
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
            <el-button type="primary" @click="getMembers" style="border-radius: 4px">getMembers</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width: 80%;height: 46px; text-align:left;">{{getMembersRes}}</p>
    </div>

    <p class="text-unit">查询单个或多个频道的成员人数</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="region">
            <template>
              <el-select v-model="getRoomMemberCountReq.region" placeholder="region" style="width:150px;">
                <el-option
                  v-for="item in regions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="roomIds">
            <el-input v-model="getRoomMemberCountReq.roomIds"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="getRoomMemberCount" style="border-radius: 4px">getRoomMemberCount</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width:80%; height:46px; text-align:left;">{{getRoomMemberCountRes}}</p>
    </div>
    
    <p class="text-unit">设置频道属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">     
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
      <p class="rsp-text" type="textarea" contenteditable="true" style="width:80%; height:46px; text-align:left;" >{{setRoomAttributesRes}}</p>
    </div>

    <p class="text-unit">删除频道某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">   
          <el-form-item label="keys">
            <el-input v-model="deleteRoomAttributesByKeysReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="deleteRoomAttributesByKeys" style="border-radius:4px">deleteRoomAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width:80%; height:46px; text-align:left;" >{{deleteRoomAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">删除频道所有属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="clearRoomAttributes" style="border-radius:4px">clearRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width:80%; height:46px; text-align:left;" >{{clearRoomAttributesRes}}</p>
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
            <el-button type="primary" @click="addOrUpdateRoomAttributes" style="border-radius:4px">addOrUpdateRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width:80%; height:46px; text-align:left;" >{{addOrUpdateRoomAttributesRes}}</p>
    </div>

    <p class="text-unit">查询某指定频道指定属性名的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="keys">
            <el-input v-model="getRoomAttributesByKeysReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="getRoomAttributesByKeys" style="border-radius:4px">getRoomAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="true" style="width:80%; height:46px; text-align:left;">{{getRoomAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">查询某指定频道的全部属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="getRoomAttributes" style="border-radius:4px">getRoomAttributes</el-button>
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
  //import Hummer from 'hummer-rts-sdk';

  const UID = getStorage('uid');
  const REGION = getStorage('region');
  const APPID = getStorage('appid');
  const TOKEN = getStorage('token');

  // test parameters
  const TEST_ROOM_ID = 'test123456';
  const TEST_ROLE_KEY = 'room_role_name';
  const TEST_ROOM_NAME_KEY = 'room_name';

  export default {
    name : 'rts-test',
    data() {
      return {
        hummer: null,
        client: null,
        rooms: [],
        appid: APPID,
        uid: UID,
        token: TOKEN,
        region: REGION || 'cn',
        regions: getRegions(),
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
        joinOrLeaveRes: '',
        setUserAttributesReq: {
          key: TEST_ROLE_KEY,
          prop: 'teacher',
        },
        setUserAttributesRes: '',
        deleteUserAttributesReq: {
          keys: TEST_ROLE_KEY,
          roomId: TEST_ROOM_ID,
        },
        deleteUserAttributesRes: '',
        clearUserAttributesRes: '',
        addOrUpdateUserAttributesReq: {
          key: TEST_ROLE_KEY,
          prop: 'student',
        },
        addOrUpdateUserAttributesRes: '',
        getMembersReq: {
          roomId: TEST_ROOM_ID,
        },
        getMembersRes: '',
        getUserAttributesReq: {
          uid: UID,
        },
        getUserAttributesRes: '',
        getUserAttributesByKeysReq: {
          uid: UID,
          keys: TEST_ROLE_KEY,
        },
        getUserAttributesByKeysRes: '',
        sendMessageReq: {
          content: 'js_sdk sendMessage',
        },
        sendMessageRes: "",
        sendMessageToUserReq: {
          content: 'js_sdk sendMessageToUser',
          receiver: UID,
        },
        sendMessageToUserRes: "",
        getRoomMemberCountReq: {
          region: 'cn',
          roomIds: TEST_ROOM_ID
        },
        getRoomMemberCountRes: '',
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
      login() {
        if (!this.hummer)
          return;
        
        this.loginRes = '';
        this.hummer.login({
          region: this.userRegion, 
          uid: this.uid, 
          token: this.token
        }).then(res => {
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
      // 初始化RTS
      initRTS() {
        if (!this.hummer) {
          console.log("hummer is null");
          return;
        }

        if (this.client) {
          console.log("client is ready");
          return;
        }
        
        // 初始化RTS
        this.client = this.hummer.createRTSInstance();

        // 接收Peer消息
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

        let rtsRoom = this.rooms[this.regionRoomId];
        this.onReceiveRoomMessage(rtsRoom);
        this.onMemberJoined(rtsRoom);
        this.onMemberLeft(rtsRoom);
        this.onMemberCountUpdated(rtsRoom);
        // 用户属性变更
        this.onMemberAttributesUpdated(rtsRoom);
        // 频道属性变更
        this.onRoomAttributesUpdated(rtsRoom);

        this.onRoomMemberOffline(rtsRoom);
      },
      join() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;
        
        let extra = {"Name": "阿武"};
        let params = { extra };
        console.log("join Req: " + JSON.stringify(params));
        
        this.joinOrLeaveRes = '';
        rtsRoom.room.join(params).then(res => {
          console.log("自己进入频道join res:", res);
          this.joinOrLeaveRes = JSON.stringify(res);
        }).catch(err => {
          console.error("join err:", err);
          this.joinOrLeaveRes = JSON.stringify(err);
        });
      },
      leave() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        this.joinOrLeaveRes = '';
        rtsRoom.room.leave().then(res => {
          console.log("自己离开频道leave res:", res);
          this.joinOrLeaveRes = JSON.stringify(res);
        }).catch(err => {
          console.error("leave err:", err);
          this.joinOrLeaveRes = JSON.stringify(err);
        });
      },
      sendMessage() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;
        
        let content = this.sendMessageReq.content;
        
        this.sendMessageRes = '';
        rtsRoom.room.sendMessage({
          type: "100", 
          content: Hummer.Utify.encodeStringToUtf8Bytes(content), 
        }).then(res => {
          console.log("sendMessage Res: " + JSON.stringify(res));
          this.sendMessageRes = JSON.stringify(res);

          console.log("消息队列mq_room_data: " + JSON.stringify(this.mq_room_data));
        }).catch(err => {
          console.error("sendMessage err:", err);
          this.sendMessageRes = JSON.stringify(err);
        });
      },
      setUserAttributes() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
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
        rtsRoom.room.setUserAttributes(req).then(res => {
          console.log("setUserAttributes Res: ", res);
          this.setUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("setUserAttributes err:", err);
          this.setUserAttributesRes = JSON.stringify(err);
        });
      },
      deleteUserAttributesByKeys() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        let keys_str = this.deleteUserAttributesReq.keys;

        let keys = [];

        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { keys };
        this.deleteUserAttributesRes = '';

        rtsRoom.room.deleteUserAttributesByKeys(req).then(res => {
          console.log("deleteUserAttributesByKeys Res: ", res);
          this.deleteUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.error("deleteUserAttributesByKeys err:", err);
          this.deleteUserAttributesRes = JSON.stringify(err);
        });
      },
      clearUserAttributes() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        this.clearUserAttributesRes = '';

        rtsRoom.room.clearUserAttributes().then(res => {
          console.log("clearUserAttributes Res: ", res);
          this.clearUserAttributesRes = JSON.stringify(res);
        }).catch((err) => {
          console.error("clearUserAttributes err:", err);
          this.clearUserAttributesRes = JSON.stringify(err);
        });
      },
      addOrUpdateUserAttributes() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        let attributes = {
          "Name": "awu",
        };
  
        let key = this.addOrUpdateUserAttributesReq.key;
        let prop = this.addOrUpdateUserAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        this.addOrUpdateUserAttributesRes = '';
        rtsRoom.room.addOrUpdateUserAttributes(req).then(res => {
          console.log("addOrUpdateUserAttributes Res: ", res);
          this.addOrUpdateUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("addOrUpdateUserAttributes err:", err);
          this.addOrUpdateUserAttributesRes = JSON.stringify(err);
        });
      },
      getMembers() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        this.getMembersRes = '';
        rtsRoom.room.getMembers().then(res => {
          console.log("getMembers res:", res);
          this.getMembersRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getMembers err:", err);
          this.getMembersRes = JSON.stringify(err);
        });
      },
      getUserAttributes() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        let uid = this.getUserAttributesReq.uid;
        let req = { uid };

        this.getUserAttributesRes = '';
        rtsRoom.room.getUserAttributes(req).then(res => {
          console.log("getUserAttributes res:", res);
          this.getUserAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getUserAttributes err:", err);
          this.getUserAttributesRes = JSON.stringify(err);
        });
      },
      getUserAttributesByKeys() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
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
        rtsRoom.room.getUserAttributesByKeys(req).then(res => {
          console.log("getUserAttributesByKeys res:", res);
          this.getUserAttributesByKeysRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getUserAttributesByKeys err:", err);
          this.getUserAttributesByKeysRes = JSON.stringify(err);
        });
      },
      getRoomMemberCount() {
        if (!this.client)
          return;

        let region = this.getRoomMemberCountReq.region;

        let roomIdsStr = this.getRoomMemberCountReq.roomIds;
        let roomIds = [];

        let elements = roomIdsStr.split(",");
        for (let k of elements) {
          roomIds.push(k);
        }
        this.getRoomMemberCountRes = '';

        this.client.getRoomMemberCount({region, roomIds}).then(res => {
          console.log("getRoomMemberCount res:", res);
          this.getRoomMemberCountRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getRoomMemberCount err:", err);
          this.getRoomMemberCountRes = JSON.stringify(err);
        });
      },
      // 频道属性
      setRoomAttributes() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        let attributes = {
          "Name": "awu",
          "Description": "js_sdk测试",
          "Bulletin": "bull",
          "Extention": "ex"
        };
  
        let key = this.setRoomAttributesReq.key;
        let prop = this.setRoomAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        console.log('setRoomAttributes: req=', req);

        this.setRoomAttributesRes = '';
        rtsRoom.room.setRoomAttributes(req).then(res => {
          console.log("setRoomAttributes res: ", res);
          this.setRoomAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("setRoomAttributes err:", err);
          this.setRoomAttributesRes = JSON.stringify(err);
        });
      },
      deleteRoomAttributesByKeys() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;
          
        let keys_str = this.deleteRoomAttributesByKeysReq.keys;

        let keys = [];

        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { keys };
        console.log('deleteRoomAttributesByKeys: req=', req);

        this.deleteRoomAttributesByKeysRes = '';

        rtsRoom.room.deleteRoomAttributesByKeys(req).then(res => {
          console.log("deleteRoomAttributesByKeys res: ", res);
          this.deleteRoomAttributesByKeysRes = JSON.stringify(res);
        }).catch(err => {
          console.error("deleteRoomAttributesByKeys err:", err);
          this.deleteRoomAttributesByKeysRes = JSON.stringify(err);
        });
      },
      clearRoomAttributes() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        this.clearRoomAttributesRes = '';
        rtsRoom.room.clearRoomAttributes().then(res => {
          console.log("clearRoomAttributes res: ", res);
          this.clearRoomAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("clearRoomAttributes err:", err);
          this.clearRoomAttributesRes = JSON.stringify(err);
        });
      },
      addOrUpdateRoomAttributes() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        let attributes = {
          "owner": "awu",
        };
  
        let key = this.addOrUpdateRoomAttributesReq.key;
        let prop = this.addOrUpdateRoomAttributesReq.prop;
        attributes[key] = prop;
        
        let req = { attributes };
        console.log('addOrUpdateRoomAttributes: req=', req);

        this.addOrUpdateRoomAttributesRes = '';
        rtsRoom.room.addOrUpdateRoomAttributes(req).then(res => {
          console.log("addOrUpdateRoomAttributes res: ", res);
          this.addOrUpdateRoomAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("addOrUpdateRoomAttributes err:", err);
          this.addOrUpdateRoomAttributesRes = JSON.stringify(err);
        });
      },
      getRoomAttributes() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;

        this.getRoomAttributesRes = '';
        rtsRoom.room.getRoomAttributes().then(res => {
          console.log("getRoomAttributes res:", res);
          this.getRoomAttributesRes = JSON.stringify(res);
        }).catch(err => {
          console.error("getRoomAttributes err:", err);
          this.getRoomAttributesRes = JSON.stringify(err);
        });
      },
      getRoomAttributesByKeys() {
        const rtsRoom = this.rooms[this.regionRoomId];
        if (!rtsRoom)
          return;
        
        let keys_str = this.getRoomAttributesByKeysReq.keys;
        let keys = [];
        let elements = keys_str.split(",");
        for (let k of elements) {
          keys.push(k);
        }

        let req = { keys };
        console.log('getRoomAttributesByKeys: req=', req);

        this.getRoomAttributesByKeysRes = '';
        rtsRoom.room.getRoomAttributesByKeys(req).then(res => {
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
      onReceiveRoomMessage(rtsRoom) {
        rtsRoom.room.on('RoomMessage', (data) => {
          data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
          console.log(`接收组播消息RoomMessage: [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data));
          this.mq_room_data.push(data);

          this.$message({
            duration: 3000,
            message: `RoomMessage: [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data),
            type: 'success'
          });

          console.log("组播MQ队列mq_room_data: " + JSON.stringify(this.mq_room_data));
        });
      },
      onMemberJoined(rtsRoom) {
        rtsRoom.room.on('MemberJoined', (data) => {
          console.log(`接收消息MemberJoined [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `MemberJoined [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onMemberLeft(rtsRoom) {
        rtsRoom.room.on('MemberLeft', (data) => {
          console.log(`接收消息MemberLeft [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `MemberLeft [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onMemberCountUpdated(rtsRoom) {
        rtsRoom.room.on('MemberCountUpdated', (data) => {
          console.log(`用户数量变更MemberCountUpdated [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `MemberCountUpdated [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data),
            type: 'success'
          });
        });
      },
      onMemberAttributesUpdated(rtsRoom) {
        const roomEvents = [
          "MemberAttributesSet",
          "MemberAttributesDeleted",
          "MemberAttributesCleared",
          "MemberAttributesAddedOrUpdated"
        ];
        roomEvents.forEach(eventName => {
          rtsRoom.room.on(eventName, (data) => {
            console.log(`接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onRoomAttributesUpdated(rtsRoom) {
        const roomEvents = [
          "RoomAttributesSet",
          "RoomAttributesDeleted",
          "RoomAttributesCleared",
          "RoomAttributesAddedOrUpdated"
        ];
        roomEvents.forEach(eventName => {
          rtsRoom.room.on(eventName, (data) => {
            console.log(`接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onRoomMemberOffline(rtsRoom) {
        const roomEvents = [
          "RoomMemberOffline"
        ];
        roomEvents.forEach(eventName => {
          rtsRoom.room.on(eventName, (data) => {
            console.log(`接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      onConnectStatusChange() {
        this.hummer.on('ConnectionStateChanged', (data) => {
          console.log("=== ConnectionStateChanged ===:" + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `ConnectionStateChanged: ` + JSON.stringify(data),
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
