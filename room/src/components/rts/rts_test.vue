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
        rtsRoom: null,
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
      regionRoomId(val) {
        this.rtsRoom = this.rooms[val];
      }
    },
    created() {
      console.log('Hummer Version=' + Hummer.VERSION);

      // 初始化Hummer
      this.hummer = Hummer.createHummer({appid: this.appid});

      this.hummer.setLogLevel(-1);

      console.log('hummer state=' + this.hummer.getState());

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
      async login() {
        if (!this.hummer)
          return;
        
        try {
          this.loginRes = '';
          let res = await this.hummer.login({
            region: this.userRegion, 
            uid: this.uid, 
            token: this.token
          });

          console.log("login Res: " + JSON.stringify(res));
          this.loginRes = JSON.stringify(res);
        } catch(e) {
          console.error("login err:", e);
          this.loginRes = JSON.stringify(e);
        }
      },
      async logout() {
        if (!this.hummer)
          return;
        
        try {
          this.loginRes = '';
          const res = await this.hummer.logout();
          console.log("logout Res: " + JSON.stringify(res));
          this.loginRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.rooms = [];
            this.regionRoomIds = [];
          }
        } catch(e) {
          console.error("logout err:", e);
          this.loginRes = JSON.stringify(e);
        }
      },
      refreshToken(data) {
        this.loginRes = JSON.stringify(data);
        console.log('refreshToken res=', data);
      },
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
        this.subscribeRoomEvents(rtsRoom);
        this.onReceiveRoomMessage(rtsRoom);
        // 用户属性变更
        this.onMemberAttributesUpdated(rtsRoom);
        // 频道属性变更
        this.onRoomAttributesUpdated(rtsRoom);

        this.onRoomMemberOffline(rtsRoom);
      },
      async join() {
        if (!this.rtsRoom)
          return;

        try {
          let extra = {"Name": "阿武"};
          let req = { extra };
          console.log("join: req=" + JSON.stringify(req));
          
          this.joinOrLeaveRes = '';
          const res = await this.rtsRoom.room.join(req);
          console.log("自己进入频道join res:", res);
          this.joinOrLeaveRes = JSON.stringify(res);
        } catch(e) {
          console.error("join err:", e);
          this.joinOrLeaveRes = JSON.stringify(e);
        }
      },
      async leave() {
        if (!this.rtsRoom)
          return;

        try {
          this.joinOrLeaveRes = '';
          const res = await this.rtsRoom.room.leave();
          console.log("自己离开频道leave: res=", res);
          this.joinOrLeaveRes = JSON.stringify(res);
        } catch(e) {
          console.error("leave err:", e);
          this.joinOrLeaveRes = JSON.stringify(e);
        }
      },
      async sendMessage() {
        if (!this.rtsRoom)
          return;
        
        try {
          let content = this.sendMessageReq.content;
          let appExtras = {nickname: "awu", rtc: 'sfu/mcu'};
          
          this.sendMessageRes = '';
          const res = await this.rtsRoom.room.sendMessage({
            type: "100", 
            content: Hummer.Utify.encodeStringToUtf8Bytes(content), 
            appExtras: appExtras
          });
          console.log("sendMessage res=" + JSON.stringify(res));
          this.sendMessageRes = JSON.stringify(res);

          console.log("消息队列mq_room_data: " + JSON.stringify(this.mq_room_data));
        } catch(e) {
          console.error("sendMessage err:", e);
          this.sendMessageRes = JSON.stringify(e);
        }
      },
      async setUserAttributes() {
        if (!this.rtsRoom)
          return;

        try {
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
          const res = await this.rtsRoom.room.setUserAttributes(req);
          console.log("setUserAttributes Res: ", res);
          this.setUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("setUserAttributes err:", e);
          this.setUserAttributesRes = JSON.stringify(e);
        }
      },
      async deleteUserAttributesByKeys() {
        if (!this.rtsRoom)
          return;

        try {
          let keys_str = this.deleteUserAttributesReq.keys;

          let keys = [];

          let elements = keys_str.split(",");
          for (let k of elements) {
            keys.push(k);
          }

          let req = { keys };
          this.deleteUserAttributesRes = '';

          const res = await this.rtsRoom.room.deleteUserAttributesByKeys(req);
          console.log("deleteUserAttributesByKeys res=", res);
          this.deleteUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("deleteUserAttributesByKeys err:", e);
          this.deleteUserAttributesRes = JSON.stringify(e);
        }
      },
      async clearUserAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          this.clearUserAttributesRes = '';
          const res = await this.rtsRoom.room.clearUserAttributes();
          console.log("clearUserAttributes res=", res);
          this.clearUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("clearUserAttributes err:", e);
          this.clearUserAttributesRes = JSON.stringify(e);
        }
      },
      async addOrUpdateUserAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          let attributes = {
            "Name": "awu",
          };
    
          let key = this.addOrUpdateUserAttributesReq.key;
          let prop = this.addOrUpdateUserAttributesReq.prop;
          attributes[key] = prop;
          
          let req = { attributes };
          this.addOrUpdateUserAttributesRes = '';
          const res = await this.rtsRoom.room.addOrUpdateUserAttributes(req);
          console.log("addOrUpdateUserAttributes res=", res);
          this.addOrUpdateUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("addOrUpdateUserAttributes err:", e);
          this.addOrUpdateUserAttributesRes = JSON.stringify(e);
        }
      },
      async getMembers() {
        if (!this.rtsRoom)
          return;

        try {
          this.getMembersRes = '';
          const res = await this.rtsRoom.room.getMembers();
          console.log("getMembers res=", res);
          this.getMembersRes = JSON.stringify(res);
        } catch(e) {
          console.error("getMembers err:", e);
          this.getMembersRes = JSON.stringify(e);
        }
      },
      async getUserAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          let uid = this.getUserAttributesReq.uid;
          let req = { uid };

          this.getUserAttributesRes = '';
          const res = await this.rtsRoom.room.getUserAttributes(req);
          console.log("getUserAttributes res=", res);
          this.getUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("getUserAttributes err:", e);
          this.getUserAttributesRes = JSON.stringify(e);
        }
      },
      async getUserAttributesByKeys() {
        if (!this.rtsRoom)
          return;

        try {
          let keys_str = this.getUserAttributesByKeysReq.keys;
          let keys = [];
          let elements = keys_str.split(",");
          for (let k of elements) {
            keys.push(k);
          }
          let uid = this.getUserAttributesByKeysReq.uid;
          let req = { uid, keys };

          this.getUserAttributesByKeysRes = '';
          const res = await this.rtsRoom.room.getUserAttributesByKeys(req);
          console.log("getUserAttributesByKeys res=", res);
          this.getUserAttributesByKeysRes = JSON.stringify(res);
        } catch(e) {
          console.error("getUserAttributesByKeys err:", e);
          this.getUserAttributesByKeysRes = JSON.stringify(e);
        }
      },
      async getRoomMemberCount() {
        if (!this.client)
          return;

        try {
          let region = this.getRoomMemberCountReq.region;

          let roomIdsStr = this.getRoomMemberCountReq.roomIds;
          let roomIds = [];

          let elements = roomIdsStr.split(",");
          for (let k of elements) {
            roomIds.push(k);
          }
          this.getRoomMemberCountRes = '';

          const res = await this.client.getRoomMemberCount({region, roomIds});
          console.log("getRoomMemberCount res=", res);
          this.getRoomMemberCountRes = JSON.stringify(res);
        } catch(e) {
          console.error("getRoomMemberCount err:", e);
          this.getRoomMemberCountRes = JSON.stringify(e);
        }
      },
      // Room Attributes
      async setRoomAttributes() {
        if (!this.rtsRoom)
          return;

        try {
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
          const res = await this.rtsRoom.room.setRoomAttributes(req);
          console.log("setRoomAttributes res=", res);
          this.setRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("setRoomAttributes err:", e);
          this.setRoomAttributesRes = JSON.stringify(e);
        }
      },
      async deleteRoomAttributesByKeys() {
        if (!this.rtsRoom)
          return;

        try {
          let keys_str = this.deleteRoomAttributesByKeysReq.keys;

          let keys = [];

          let elements = keys_str.split(",");
          for (let k of elements) {
            keys.push(k);
          }

          let req = { keys };
          console.log('deleteRoomAttributesByKeys: req=', req);

          this.deleteRoomAttributesByKeysRes = '';
          const res = await this.rtsRoom.room.deleteRoomAttributesByKeys(req);
          console.log("deleteRoomAttributesByKeys res=", res);
          this.deleteRoomAttributesByKeysRes = JSON.stringify(res);
        } catch(e) {
          console.error("deleteRoomAttributesByKeys err:", e);
          this.deleteRoomAttributesByKeysRes = JSON.stringify(e);
        }
      },
      async clearRoomAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          this.clearRoomAttributesRes = '';
          const res = await this.rtsRoom.room.clearRoomAttributes();
          console.log("clearRoomAttributes res=", res);
          this.clearRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("clearRoomAttributes err:", e);
          this.clearRoomAttributesRes = JSON.stringify(e);
        }
      },
      async addOrUpdateRoomAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          let attributes = {
            "owner": "awu",
          };
    
          let key = this.addOrUpdateRoomAttributesReq.key;
          let prop = this.addOrUpdateRoomAttributesReq.prop;
          attributes[key] = prop;
          
          let req = { attributes };
          console.log('addOrUpdateRoomAttributes: req=', req);

          this.addOrUpdateRoomAttributesRes = '';
          const res = await this.rtsRoom.room.addOrUpdateRoomAttributes(req);
          console.log("addOrUpdateRoomAttributes res=", res);
          this.addOrUpdateRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("addOrUpdateRoomAttributes err:", e);
          this.addOrUpdateRoomAttributesRes = JSON.stringify(e);
        }
      },
      async getRoomAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          this.getRoomAttributesRes = '';
          const res = await this.rtsRoom.room.getRoomAttributes();
          console.log("getRoomAttributes res=", res);
          this.getRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          console.error("getRoomAttributes err:", e);
          this.getRoomAttributesRes = JSON.stringify(e);
        }
      },
      async getRoomAttributesByKeys() {
        if (!this.rtsRoom)
          return;
        
        try {
          let keys_str = this.getRoomAttributesByKeysReq.keys;
          let keys = [];
          let elements = keys_str.split(",");
          for (let k of elements) {
            keys.push(k);
          }

          let req = { keys };
          console.log('getRoomAttributesByKeys: req=', req);

          this.getRoomAttributesByKeysRes = '';
          const res = await this.rtsRoom.room.getRoomAttributesByKeys(req);
          console.log("getRoomAttributesByKeys res=", res);
          this.getRoomAttributesByKeysRes = JSON.stringify(res);
        } catch(e) {
          console.error("getRoomAttributesByKeys err:", e);
          this.getRoomAttributesByKeysRes = JSON.stringify(e);
        }
      },

      async sendMessageToUser() {
        if (!this.client)
          return;

        try {
          let content = this.sendMessageToUserReq.content;
          let receiver = this.sendMessageToUserReq.receiver;
          let appExtras = {nickname: "awu", rtc: 'p2p'}
          
          this.sendMessageToUserRes = '';
          const res = await this.client.sendMessageToUser({
            receiver: receiver, 
            type: "100", 
            content: Hummer.Utify.encodeStringToUtf8Bytes(content),
            appExtras: appExtras
          });
          console.log("sendMessageToUser res=" + JSON.stringify(res));
          this.sendMessageToUserRes = JSON.stringify(res);

          console.log("消息队列mq_data: " + JSON.stringify(this.mq_data));
        } catch(e) {
          console.error("sendMessageToUser err:", e);
          this.sendMessageToUserRes = JSON.stringify(e);
        }
      },
      async queryUsersOnlineStatus() {
        if (!this.client)
          return;

        try {
          let uidsStr = this.queryUsersOnlineStatusReq.uids;
          let uids = [];

          let elements = uidsStr.split(",");
          for (let k of elements) {
            uids.push(k);
          }
          this.queryUsersOnlineStatusRes = '';

          const res = await this.client.queryUsersOnlineStatus({ uids: uids });
          console.log("queryUsersOnlineStatus res=", res);
          this.queryUsersOnlineStatusRes = JSON.stringify(res);
        } catch(e) {
          console.error("queryUsersOnlineStatus err:", e);
          this.queryUsersOnlineStatusRes = JSON.stringify(e);
        }
      },
      async getInstanceInfo() {
        if (!this.hummer)
          return;

        try {
          this.result = '';
          const res = await this.hummer.getInstanceInfo();
          console.log("getInstanceInfo res=", res);
          this.result = JSON.stringify(res);
        } catch(e) {
          console.error("getInstanceInfo err:", e);
          this.result = JSON.stringify(e); 
        }
      },
      clearMqData() {
        this.mq_data = [];
        this.mq_room_data = [];
      },

      /* 消息接收模块 */
      onReceiveMessage() {
        const eventName = "MessageFromUser";
        this.client.on(eventName, (data) => {
          data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
          console.log(`接收消息${eventName}: ` + JSON.stringify(data));
          this.mq_data.push(data);

          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });

          console.log("MQ队列mq_data: " + JSON.stringify(this.mq_data));
        });
      },

      subscribeRoomEvents(rtsRoom) {
        const roomEvents = [
          "MemberJoined",
          "MemberLeft",
          "MemberCountUpdated",
        ];
        roomEvents.forEach(eventName => {
          rtsRoom.room.on(eventName, (data) => {
            console.log(`接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data));
            this.$message({
              duration: 3000,
              message: `${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data),
              type: 'success'
            });
          });
        });
      },
      /* 组播消息接收模块 */
      onReceiveRoomMessage(rtsRoom) {
        const eventName = 'RoomMessage';
        rtsRoom.room.on(eventName, (data) => {
          data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
          console.log(`接收组播消息${eventName}: [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data));
          this.mq_room_data.push(data);

          this.$message({
            duration: 3000,
            message: `${eventName}: [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data),
            type: 'success'
          });

          console.log("组播MQ队列mq_room_data: " + JSON.stringify(this.mq_room_data));
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
        const eventName = "RoomMemberOffline";
        rtsRoom.room.on(eventName, () => {
          console.log(`接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]`);
          this.$message({
            duration: 3000,
            message: `${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]`,
            type: 'success'
          });
        });
      },
      onConnectStatusChange() {
        const eventName = "ConnectionStateChanged";
        this.hummer.on(eventName, (data) => {
          console.log(`=== ${eventName} ===:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });

          console.log('hummer state=' + this.hummer.getState());
        });
      },
      onTokenExpired() {
        const eventName = "TokenExpired";
        this.hummer.on(eventName, () => {
          console.log(`=== ${eventName} ===`);
          this.$message({
            duration: 3000,
            message: `${eventName}`,
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
