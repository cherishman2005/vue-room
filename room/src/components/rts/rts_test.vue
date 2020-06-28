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

    <!-- 房间消息 -->
    <el-divider content-position="left">房间消息</el-divider>

    <p class="text-unit">创建房间实例</p>
    <el-row type="flex">
      <el-col :span="24" style="height:35px;text-align:left;">
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="showCreateRoomModel" style="border-radius: 4px">createRoom</el-button>
          </el-form-item>
          <el-form-item label="房间列表[region:roomId](用于选择房间)">
            <template>
              <el-select v-model="regionRoomId" placeholder="" style="width: 200px;">
                <el-option
                  v-for="item in regionRoomIds"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <span v-if="item.hasJoin" style="float: right; color: #00FF7F; font-size: 13px">已加入</span>
                  <span v-else style="float: right; color: #8492a6; font-size: 13px">未加入</span>
                </el-option>
              </el-select>
            </template>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog align="left" title="创建房间实例" :visible="createRoomModelVisible" @close="closeCreateRoomModel" customClass="customWidth">
      <create-room :client="client" @onGetRoom=getRoom></create-room>
    </el-dialog>

    <p class="text-unit">房间事件监听设置</p>
    <el-row type="flex" class="row-bg">
      <el-button type="primary" @click="addRoomEventMonitor">+ 添加房间事件监听</el-button>
      <el-button type="primary" @click="removeRoomEventMonitor">- 移除房间事件监听</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height: 20px" type="textarea" contenteditable="false">{{monitorRoomEventRes}}</p>
    </div>
    <el-row type="flex" class="row-bg">
      <el-button type="primary" @click="addRoomNumberEventMonitor">+ 添加成员事件监听</el-button>
      <el-button type="primary" @click="removeRoomNumberEventMonitor">- 移除成员事件监听</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height: 20px" type="textarea" contenteditable="false">{{monitorRoomNumberEventRes}}</p>
    </div>

    <p class="text-unit">加入/退出Room</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px; text-align:left;" >
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
      <p class="rsp-text" type="textarea" contenteditable="false">{{joinOrLeaveRes}}</p>
    </div>

    <p class="text-unit">A给房间发消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-button @click="showCreateRoomAppExtrasModel" style="border-radius:4px">appExtras</el-button>
          </el-form-item>
          <el-form-item label="content">
            <el-input v-model="sendMessageReq.content" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="sendMessage" style="border-radius:4px">sendMessage</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{sendMessageRes}}</p>
    </div>

    <el-dialog align="left" title="AppExtras" :visible="createRoomAppExtrasVisible" @close="closeCreateRoomAppExtrasModel">
      <editable-table :tableData="roomAppExtras" @onGetPlainObject=getRoomAppExtras></editable-table>
    </el-dialog>

    <p class="text-unit">设置用户属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px; text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="enableNotification">
            <template>
              <el-select v-model="setUserAttributesReq.options.enableNotification" placeholder="false" style="width:120px;">
                <el-option
                  v-for="item in enableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button @click="showSetUserAttributesModel" style="border-radius:4px">attribtes</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="setUserAttributes" style="border-radius:4px">setUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{setUserAttributesRes}}</p>
    </div>

    <el-dialog align="left" title="atrributes" :visible="setUserAttributesVisible" @close="closeSetUserAttributesModel">
      <editable-table
      :tableData="setUserAttributesReq.attributes" @onGetPlainObject="onSetUserAttributes"></editable-table>
    </el-dialog>

    <p class="text-unit">删除用户某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="enableNotification">
            <template>
              <el-select v-model="deleteUserAttributesReq.options.enableNotification" placeholder="false" style="width:120px;">
                <el-option
                  v-for="item in enableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="keys">
            <el-input v-model="deleteUserAttributesReq.keys"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="deleteUserAttributesByKeys" style="border-radius:4px">deleteUserAttributesByKeys</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{deleteUserAttributesRes}}</p>
    </div>

    <p class="text-unit">清空用户属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="enableNotification">
            <template>
              <el-select v-model="clearUserAttributesReq.options.enableNotification" placeholder="false" style="width:120px;">
                <el-option
                  v-for="item in enableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="clearUserAttributes" style="border-radius: 4px">clearUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{clearUserAttributesRes}}</p>
    </div>

    <p class="text-unit">添加或更新本地用户的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="enableNotification">
            <template>
              <el-select v-model="addOrUpdateUserAttributesReq.options.enableNotification" placeholder="false" style="width:120px;">
                <el-option
                  v-for="item in enableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button @click="showAddOrUpdateUserAttributesModel" style="border-radius:4px">attributes</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="addOrUpdateUserAttributes" style="border-radius:4px">addOrUpdateUserAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{addOrUpdateUserAttributesRes}}</p>
    </div>

    <el-dialog align="left" title="atrributes" :visible="addOrUpdateUserAttributesVisible" @close="closeAddOrUpdateUserAttributesModel">
      <editable-table
      :tableData="addOrUpdateUserAttributesReq.attributes" @onGetPlainObject="onAddOrUpdateUserAttributes"></editable-table>
    </el-dialog>


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
      <p class="rsp-text" type="textarea" contenteditable="false">{{getUserAttributesByKeysRes}}</p>
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
      <p class="rsp-text" type="textarea" contenteditable="false">{{getUserAttributesRes}}</p>
    </div>

    <p class="text-unit">查询房间用户列表</p>
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
      <p class="rsp-text" type="textarea" contenteditable="false">{{getMembersRes}}</p>
    </div>

    <p class="text-unit">查询单个或多个房间的成员人数</p>
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
      <p class="rsp-text" type="textarea" contenteditable="false">{{getRoomMemberCountRes}}</p>
    </div>

    <p class="text-unit">设置房间属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="enableNotification">
            <template>
              <el-select v-model="setRoomAttributesReq.options.enableNotification" placeholder="false" style="width:120px;">
                <el-option
                  v-for="item in enableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button @click="showSetRoomAttributesModel" style="border-radius:4px">attribtes</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="setRoomAttributes" style="border-radius: 4px">setRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{setRoomAttributesRes}}</p>
    </div>

    <el-dialog align="left" title="atrributes" :visible="setRoomAttributesVisible" @close="closeSetRoomAttributesModel">
      <editable-table
      :tableData="setRoomAttributesReq.attributes" @onGetPlainObject="onSetRoomAttributes"></editable-table>
    </el-dialog>

    <p class="text-unit">删除房间某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="enableNotification">
            <template>
              <el-select v-model="deleteRoomAttributesByKeysReq.options.enableNotification" placeholder="false" style="width:120px;">
                <el-option
                  v-for="item in enableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
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
      <p class="rsp-text" type="textarea" contenteditable="false">{{deleteRoomAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">清空房间属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="enableNotification">
            <template>
              <el-select v-model="clearRoomAttributesReq.options.enableNotification" placeholder="false" style="width:120px;">
                <el-option
                  v-for="item in enableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="clearRoomAttributes" style="border-radius:4px">clearRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{clearRoomAttributesRes}}</p>
    </div>

    <p class="text-unit">增加或更新房间某些属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px;text-align:left;" >
        <el-form :inline="true" size="small">
          <el-form-item label="enableNotification">
            <template>
              <el-select v-model="addOrUpdateRoomAttributesReq.options.enableNotification" placeholder="false" style="width:120px;">
                <el-option
                  v-for="item in enableOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button @click="showAddOrUpdateRoomAttributesModel" style="border-radius:4px">attributes</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="addOrUpdateRoomAttributes" style="border-radius:4px">addOrUpdateRoomAttributes</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{addOrUpdateRoomAttributesRes}}</p>
    </div>

    <el-dialog align="left" title="atrributes" :visible="addOrUpdateRoomAttributesVisible" @close="closeAddOrUpdateRoomAttributesModel">
      <editable-table
      :tableData="addOrUpdateRoomAttributesReq.attributes" @onGetPlainObject="onAddOrUpdateRoomAttributes"></editable-table>
    </el-dialog>


    <p class="text-unit">查询某指定房间指定属性名的属性</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24" style="height:35px; text-align:left;" >
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
      <p class="rsp-text" type="textarea" contenteditable="false">{{getRoomAttributesByKeysRes}}</p>
    </div>

    <p class="text-unit">查询某指定房间的全部属性</p>
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
      <p class="rsp-text" type="textarea" contenteditable="false">{{getRoomAttributesRes}}</p>
    </div>

    <!-- P2P消息 -->
    <el-divider content-position="left">P2P消息</el-divider>
    <p class="text-unit">事件监听设置</p>
    <el-row type="flex" class="row-bg">
      <el-button @click="addP2PEventMonitor" type="primary">+ 添加Peer事件监听</el-button>
      <el-button @click="removeP2PEventMonitor" type="primary">- 移除Peer事件监听</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height: 20px" type="textarea" contenteditable="false">{{p2pEventMonitorRes}}</p>
    </div>

    <p class="text-unit">A给B发送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item>
            <el-button @click="showCreateAppExtrasModel" style="border-radius:4px">appExtras</el-button>
          </el-form-item>
          <el-form-item label="content">
            <el-input v-model="sendMessageToUserReq.content" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="sendMessageToUserReq.receiver" style="width:150px;"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="sendMessageToUser" style="border-radius:4px">sendMessageToUser</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{sendMessageToUserRes}}</p>
    </div>

    <el-dialog align="left" title="AppExtras" :visible="createAppExtrasVisible" @close="closeCreateAppExtrasModel">
      <editable-table :tableData="appExtras" @onGetPlainObject=getAppExtras></editable-table>
    </el-dialog>

    <p class="text-unit">批量查询登录在线状态</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px; text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item label="uids">
            <el-input v-model="queryUsersOnlineStatusReq.uids"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="queryUsersOnlineStatus" style="border-radius:4px">queryUsersOnlineStatus</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{queryUsersOnlineStatusRes}}</p>
    </div>

    <el-divider content-position="left">特殊案例</el-divider>
    <p class="text-unit">房间消息</p>
    <el-row type="flex" class="row-bg">
      <el-button @click="send32KMessage" type="primary">发32K内容的房间消息</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{send32KMessageRes}}</p>
    </div>

    <el-row type="flex" class="row-bg">
      <el-button @click="sendMessageWith1KExtras" type="primary">发1K扩展字段的房间消息</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{sendMessageWith1KBExtrasRes}}</p>
    </div>

    <p class="text-unit">P2P消息</p>
    <el-row type="flex" class="row-bg">
      <el-button @click="send32KBMessageToUser" type="primary">发32K内容的P2P消息</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{send32KBMessageToUserRes}}</p>
    </div>

    <el-row type="flex" class="row-bg">
      <el-button @click="sendMessageWith1KBExtraToUser" type="primary">发1K扩展字段的P2P消息</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{sendMessageWith1KBExtraToUserRes}}</p>
    </div>

    <p class="text-unit">属性设置</p>
    <el-row type="flex" class="row-bg">
      <el-button @click="set8KBRoomAttributes" type="primary">设置8K的房间属性</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{set8KBRoomAttributesRes}}</p>
    </div>

    <el-row type="flex" class="row-bg">
      <el-button @click="set8KBUserAttributes" type="primary">设置8K的用户属性</el-button>
    </el-row>
    <div class="text">
      <p class="rsp-text" style="height:20px" type="textarea" contenteditable="false">{{set8KBUserAttributesRes}}</p>
    </div>
    <!-- 辅助工具 -->
    <!--
    <el-divider></el-divider>

    <p class="text-unit">获取实例信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:35px; text-align:left;" >
        <el-form :inline="true"  size="small">
          <el-form-item class="search">
            <el-button type="primary" @click="getInstanceInfo" style="border-radius:4px">getInstanceInfo</el-button>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary" @click="clearMqData" style="border-radius:4px">清除MQ队列</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="text">
      <p class="rsp-text" type="textarea" contenteditable="false">{{result}}</p>
    </div>
    -->

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getStorage, setStorage , log4test, generateDataInKB} from '@/utils/BaseUtil';
  import { getRegions, getRegionRoomId } from '@/components/room_config.js';
  import RefreshToken from '@/components/token/refresh_token.vue';
  import CreateRoom from './create_room.vue';
  import EditableTable from '@/components/units/editable_table.vue';
  //import Hummer from 'hummer-rts-sdk';

  const UID = getStorage('uid');
  const REGION = getStorage('region');
  const APPID = getStorage('appid');
  const TOKEN = getStorage('token');

  // test parameters
  const TEST_ROOM_ID = 'test123456';
  const TEST_ROLE_KEY = 'room_role_name';
  const TEST_ROOM_NAME_KEY = 'room_name';

  const SYMBOL_P2P_EV = Symbol("p2pEvent");
  const SYMBOL_ROOM_EV = Symbol("roomEvent");
  const SYMBOL_ROOM_NUMBER_EV = Symbol("roomNumberEvent");

  const EVENT_MESSAGE_FROM_USER = "MessageFromUser"

  //房间事件
  const EVENT_ROOM = [
    ["RoomMessage", Symbol("RoomMessage")],
    ["RoomAttributesSet", Symbol("RoomAttributesSet")],
    ["RoomAttributesDeleted", Symbol("RoomAttributesDeleted")],
    ["RoomAttributesCleared", Symbol("RoomAttributesCleared")],
    ["RoomAttributesAddedOrUpdated", Symbol("RoomAttributesAddedOrUpdated")]
  ]
  //房间成员事件
  const EVENT_ROOM_NUMBER = [
    ["MemberJoined", Symbol("MemberJoined")],
    ["MemberLeft", Symbol("MemberLeft")],
    ["MemberCountUpdated", Symbol("MemberCountUpdated")],
    ["MemberAttributesSet", Symbol("MemberAttributesSet")],
    ["MemberAttributesDeleted", Symbol("MemberAttributesDeleted")],
    ["MemberAttributesCleared", Symbol("MemberAttributesCleared")],
    ["MemberAttributesAddedOrUpdated", Symbol("MemberAttributesAddedOrUpdated")],
    ["RoomMemberOffline", Symbol("RoomMemberOffline")],
  ]

  export default {
    name : 'rts-test',
    data() {
      return {
        hummer: null,
        client: null,
        rooms: [],
        appid: Number(APPID),
        uid: UID,
        token: TOKEN,
        region: REGION || 'cn',
        regions: getRegions(),
        userRegionFlag: false,
        regionRoomId: null,
        regionRoomIds: [],
        rtsRoom: null,
        appExtras: {},
        roomAppExtras: {},
        mq_data: [],
        mq_room_data: [],
        enableOptions: [{
          value: false,
          label: 'false'
        }, {
          value: true,
          label: 'true'
        }],
        // }, {
        //   value: undefined,
        //   label: '不设置'
        // }],
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
          //key: TEST_ROLE_KEY,
          //prop: 'teacher',
          attribtes: {},
          options: {},
        },
        setUserAttributesRes: '',
        set8KBUserAttributesRes: "",
        deleteUserAttributesReq: {
          keys: TEST_ROLE_KEY,
          options: {},
        },
        deleteUserAttributesRes: '',
        clearUserAttributesReq: {
          options: {},
        },
        clearUserAttributesRes: '',
        addOrUpdateUserAttributesReq: {
          //key: TEST_ROLE_KEY,
          //prop: 'student',
          attribtes: {},
          options: {},
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
        send32KMessageRes: "",
        sendMessageWith1KBExtrasRes: "",
        sendMessageToUserReq: {
          content: 'js_sdk sendMessageToUser',
          receiver: UID,
        },
        monitorRoomEventRes: "",
        monitorRoomNumberEventRes: "",
        p2pEventMonitorRes: "",
        sendMessageToUserRes: "",
        send32KBMessageToUserRes: "",
        sendMessageWith1KBExtraToUserRes: "",
        getRoomMemberCountReq: {
          region: 'cn',
          roomIds: TEST_ROOM_ID
        },
        getRoomMemberCountRes: '',
        setRoomAttributesReq: {
          //key: TEST_ROOM_NAME_KEY,
          //prop: 'nginx大讲堂',
          attributes: {},
          options: {},
        },
        setRoomAttributesRes: '',
        set8KBRoomAttributesRes: "",
        deleteRoomAttributesByKeysReq: {
          keys: TEST_ROOM_NAME_KEY,
          options: {},
        },
        deleteRoomAttributesByKeysRes: '',
        clearRoomAttributesReq: {
          options: {},
        },
        clearRoomAttributesRes: '',
        addOrUpdateRoomAttributesReq: {
          //key: TEST_ROOM_NAME_KEY,
          //prop: 'nginx大讲堂',
          attributes: {},
          options: {},
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
      EditableTable,
    },
    computed: {
      ...mapState({
        createRoomModelVisible: state => state.room.createRoomModelVisible,
        refreshTokenModelVisible: state => state.refreshToken.refreshTokenModelVisible,
        createAppExtrasVisible: state => state.appExtras.createAppExtrasVisible,
        createRoomAppExtrasVisible: state => state.roomAppExtras.createRoomAppExtrasVisible,
        setUserAttributesVisible: state => state.setUserAttributes.setUserAttributesVisible,
        addOrUpdateUserAttributesVisible: state => state.addOrUpdateUserAttributes.addOrUpdateUserAttributesVisible,
        setRoomAttributesVisible: state => state.setRoomAttributes.setRoomAttributesVisible,
        addOrUpdateRoomAttributesVisible: state => state.addOrUpdateRoomAttributes.addOrUpdateRoomAttributesVisible,
      })
    },
    watch: {
      regionRoomId(val) {
        this.rtsRoom = this.rooms[val];
      }
    },
    created() {
      log4test('Hummer Version = ', Hummer.VERSION);

      // 初始化Hummer
      this.hummer = Hummer.createHummer({appid: this.appid});

      this.hummer.setLogLevel(-1);

      log4test('hummer state=', this.hummer.getState());

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
      showCreateAppExtrasModel() {
        this.$store.commit('updateCreateAppExtrasVisible', true);
      },
      closeCreateAppExtrasModel() {
        this.$store.commit('updateCreateAppExtrasVisible', false)
      },
      showCreateRoomAppExtrasModel() {
        this.$store.commit('updateCreateRoomAppExtrasVisible', true);
      },
      closeCreateRoomAppExtrasModel() {
        this.$store.commit('updateCreateRoomAppExtrasVisible', false)
      },
      showSetUserAttributesModel() {
        this.$store.commit('updateSetUserAttributesVisible', true);
      },
      closeSetUserAttributesModel() {
        this.$store.commit('updateSetUserAttributesVisible', false)
      },
      showAddOrUpdateUserAttributesModel() {
        this.$store.commit('updateAddOrUpdateUserAttributesVisible', true);
      },
      closeAddOrUpdateUserAttributesModel() {
        this.$store.commit('updateAddOrUpdateUserAttributesVisible', false)
      },
      showSetRoomAttributesModel() {
        console.log('showSetRoomAttributesModel');
        this.$store.commit('updateSetRoomAttributesVisible', true);
      },
      closeSetRoomAttributesModel() {
        this.$store.commit('updateSetRoomAttributesVisible', false)
      },
      showAddOrUpdateRoomAttributesModel() {
        this.$store.commit('updateAddOrUpdateRoomAttributesVisible', true);
      },
      closeAddOrUpdateRoomAttributesModel() {
        this.$store.commit('updateAddOrUpdateRoomAttributesVisible', false)
      },
      async login() {
        if (!this.hummer)
          return;

        try {
          this.loginRes = '';
          let req = {
            region: this.userRegion,
            uid: this.uid,
            token: this.token
          }
          log4test("login req ", req)
          let res = await this.hummer.login(req);
          log4test("login res ", res);
          this.loginRes = JSON.stringify(res);
        } catch(e) {
          log4test("login err", e);
          this.loginRes = JSON.stringify(e);
        }
      },
      async logout() {
        if (!this.hummer)
          return;

        try {
          this.loginRes = '';
          const res = await this.hummer.logout();
          log4test("logout res" ,res);
          this.loginRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.rooms = [];
            this.regionRoomIds = [];
          }
        } catch(e) {
          log4test("logout err:", e);
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
        // this.onReceiveMessage();
      },
      updateRoomJoinStatus(join) {
        if (!this.rtsRoom)
          return;
        let region = this.rtsRoom.region;
        let roomId = this.rtsRoom.roomId;
        this.updateRoomJoinStatusByRegionAndRoomId(region, roomId, join)
      },
      updateRoomJoinStatusByRegionAndRoomId(region, roomId, join) {
        let regionRoomId = getRegionRoomId(region, roomId);
        if (this.rooms[this.regionRoomId]) {
          let target = this.regionRoomIds.find( (value, index, arr) => {
            return value.label === regionRoomId
          })
          if (target) {
            target.hasJoin = join
          }
        }
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

        // todo
        if (Object.keys(this.rooms).indexOf(this.regionRoomId) > -1) {
          return;
        }

        this.rooms[this.regionRoomId] = data;
        this.regionRoomIds.push({value: this.regionRoomId, label: this.regionRoomId, hasJoin: false});

        console.log('rooms=', this.rooms);

        let rtsRoom = this.rooms[this.regionRoomId];
        // this.subscribeRoomEvents(rtsRoom);
        // this.onReceiveRoomMessage(rtsRoom);
        // // 用户属性变更
        // this.onMemberAttributesUpdated(rtsRoom);
        // // 房间属性变更
        // this.onRoomAttributesUpdated(rtsRoom);
        //
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
          log4test("自己进入房间join res:", res);
          this.joinOrLeaveRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.updateRoomJoinStatus(true)
          }
        } catch(e) {
          log4test("join err:", e);
          this.joinOrLeaveRes = JSON.stringify(e);
        }
      },
      async leave() {
        if (!this.rtsRoom)
          return;

        try {
          this.joinOrLeaveRes = '';
          const res = await this.rtsRoom.room.leave();
          log4test("自己离开房间leave: res=", res);
          this.joinOrLeaveRes = JSON.stringify(res);
          if (res.rescode === 0) {
            this.updateRoomJoinStatus(false)
          }
        } catch(e) {
          log4test("leave err:", e);
          this.joinOrLeaveRes = JSON.stringify(e);
        }
      },
      getRoomAppExtras(data) {
        console.log('getRoomAppExtras roomAppExtras=', data);
        this.roomAppExtras = data;
      },
      async sendMessage() {
        if (!this.rtsRoom)
          return;

        try {
          let content = this.sendMessageReq.content;
          //let appExtras = {nickname: "awu", rtc: 'sfu/mcu'};

          this.sendMessageRes = '';
          const res = await this.rtsRoom.room.sendMessage({
            type: "100",
            content: Hummer.Utify.encodeStringToUtf8Bytes(content),
            appExtras: this.roomAppExtras
          });
          console.log("sendMessage res=" + JSON.stringify(res));
          this.sendMessageRes = JSON.stringify(res);

          //console.log("消息队列mq_room_data: " + JSON.stringify(this.mq_room_data));
        } catch(e) {
          console.error("sendMessage err:", e);
          this.sendMessageRes = JSON.stringify(e);
        }
      },
      onSetUserAttributes(data) {
        console.log('onSetUserAttributes attributes=', data);
        this.setUserAttributesReq.attributes = data;
      },
      async send32KMessage() {
        if (!this.rtsRoom)
          return;

        try {
          let content = generateDataInKB(32)
          this.send32KMessageRes = '';
          const res = await this.rtsRoom.room.sendMessage({
            type: "100",
            content: Hummer.Utify.encodeStringToUtf8Bytes(content),
            appExtras: {}
          });
          log4test("send32KMessage res=" ,res);
          this.send32KMessageRes = JSON.stringify(res);
        } catch(e) {
          log4test("send32KMessage err:", e);
          this.send32KMessageRes = JSON.stringify(e);
        }
      },
      async sendMessageWith1KExtras() {
        if (!this.rtsRoom)
          return;
        try {
          let content = "房间消息"
          this.sendMessageWith1KBExtrasRes = '';
          const res = await this.rtsRoom.room.sendMessage({
            type: "100",
            content: Hummer.Utify.encodeStringToUtf8Bytes(content),
            appExtras: {key1 : generateDataInKB(1)}
          });
          log4test("sendMessage with 1K extras" ,res)
          this.sendMessageWith1KBExtrasRes = JSON.stringify(res)
        } catch(e) {
          log4test("sendMessage with 1k extras, err:", e);
          this.sendMessageWith1KBExtrasRes = JSON.stringify(e)
        }
      },
      async setUserAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          /*
          let key = this.setUserAttributesReq.key;
          let prop = this.setUserAttributesReq.prop;
          attributes[key] = prop;
          */

          let enableNotification = this.setUserAttributesReq.options.enableNotification;
          let attributes = this.setUserAttributesReq.attributes || {};
          let req;
          if (enableNotification === undefined) {
            req = { attributes };
          } else {
            req = { attributes, options: { enableNotification: enableNotification } };
          }

          log4test('setUserAttributes: req=', req);

          this.setUserAttributesRes = '';
          const res = await this.rtsRoom.room.setUserAttributes(req);
          log4test("setUserAttributes Res: ", res);
          this.setUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("setUserAttributes err:", e);
          this.setUserAttributesRes = JSON.stringify(e);
        }
      },
      async set8KBUserAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          let enableNotification = this.setUserAttributesReq.options.enableNotification;
          let attributes = {"key1": generateDataInKB(8)}
          let req;
          if (enableNotification === undefined) {
            req = { attributes };
          } else {
            req = { attributes, options: { enableNotification: enableNotification } };
          }
          log4test("set 8KB UserAttributes")
          this.set8KBUserAttributesRes = '';
          const res = await this.rtsRoom.room.setUserAttributes(req)
          log4test("set 8KB UserAttributes, Res= ", res);
          this.set8KBUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("set 8KB UserAttributes, err=", e);
          this.set8KBUserAttributesRes = JSON.stringify(e);
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
            if (k.length > 0) {
              keys.push(k);
            }
          }

          let enableNotification = this.deleteUserAttributesReq.options.enableNotification;
          let req;
          if (enableNotification === undefined) {
            req = { keys };
          } else {
            req = { keys, options: { enableNotification: enableNotification } };
          }

          log4test('deleteUserAttributesByKeys: req=', req);

          this.deleteUserAttributesRes = '';

          const res = await this.rtsRoom.room.deleteUserAttributesByKeys(req);
          log4test("deleteUserAttributesByKeys res=", res);
          this.deleteUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("deleteUserAttributesByKeys err:", e);
          this.deleteUserAttributesRes = JSON.stringify(e);
        }
      },
      async clearUserAttributes() {
        if (!this.rtsRoom)
          return;

        try {

          let enableNotification = this.clearUserAttributesReq.options.enableNotification;
          let req;
          if (enableNotification === undefined) {
            req = {};
          } else {
            req = {options: { enableNotification: enableNotification } };
          }

          log4test('clearUserAttributes: req=', req);

          this.clearUserAttributesRes = '';
          const res = await this.rtsRoom.room.clearUserAttributes(req);
          log4test("clearUserAttributes res=", res);
          this.clearUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("clearUserAttributes err:", e);
          this.clearUserAttributesRes = JSON.stringify(e);
        }
      },
      onAddOrUpdateUserAttributes(data) {
        console.log('onAddOrUpdateUserAttributes attributes=', data);
        this.addOrUpdateUserAttributesReq.attributes = data;
      },
      async addOrUpdateUserAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          /*
          let key = this.addOrUpdateUserAttributesReq.key;
          let prop = this.addOrUpdateUserAttributesReq.prop;
          attributes[key] = prop;
          */

          let enableNotification = this.addOrUpdateUserAttributesReq.options.enableNotification;
          let attributes = this.addOrUpdateUserAttributesReq.attributes || {};
          let req;
          if (enableNotification === undefined) {
            req = { attributes };
          } else {
            req = { attributes, options: { enableNotification: enableNotification } };
          }

          log4test('addOrUpdateUserAttributes: req=', req);

          this.addOrUpdateUserAttributesRes = '';
          const res = await this.rtsRoom.room.addOrUpdateUserAttributes(req);
          log4test("addOrUpdateUserAttributes res=", res);
          this.addOrUpdateUserAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("addOrUpdateUserAttributes err:", e);
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
      onSetRoomAttributes(data) {
        console.log('onSetRoomAttributes attributes=', data);
        this.setRoomAttributesReq.attributes = data;
      },
      // Room Attributes
      async setRoomAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          /*
          let attributes = {
            "Name": "awu",
            "Description": "js_sdk测试",
            "Bulletin": "bull",
            "Extention": "ex"
          };

          let key = this.setRoomAttributesReq.key;
          let prop = this.setRoomAttributesReq.prop;
          attributes[key] = prop;
          */

          let enableNotification = this.setRoomAttributesReq.options.enableNotification;
          let attributes = this.setRoomAttributesReq.attributes || {};
          let req;
          if (enableNotification === undefined) {
            req = { attributes };
          } else {
            req = { attributes, options: { enableNotification: enableNotification } };
          }
          log4test('setRoomAttributes: req=', req);

          this.setRoomAttributesRes = '';
          const res = await this.rtsRoom.room.setRoomAttributes(req);
          log4test("setRoomAttributes res=" , res);
          this.setRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("setRoomAttributes err:" , e);
          this.setRoomAttributesRes = JSON.stringify(e);
        }
      },
      async set8KBRoomAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          let enableNotification = this.setRoomAttributesReq.options.enableNotification;
          let attributes = {"key1": generateDataInKB(8)}
          let req;
          if (enableNotification === undefined) {
            req = { attributes };
          } else {
            req = { attributes, options: { enableNotification: enableNotification } };
          }
          log4test("set 8KB RoomAttributes");
          this.set8KBRoomAttributesRes = '';
          const res = await this.rtsRoom.room.setRoomAttributes(req);
          log4test("set 8KB RoomAttributes, res=", res);
          this.set8KBRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("set 8KB RoomAttributes, err=", e);
          this.set8KBRoomAttributesRes = JSON.stringify(e);
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
            if (k.length > 0) {
              keys.push(k);
            }
          }

          let enableNotification = this.deleteRoomAttributesByKeysReq.options.enableNotification;
          let req;
          if (enableNotification === undefined) {
            req = { keys };
          } else {
            req = { keys, options: { enableNotification: enableNotification } };
          }

          log4test('deleteRoomAttributesByKeys: req=', req);

          this.deleteRoomAttributesByKeysRes = '';
          const res = await this.rtsRoom.room.deleteRoomAttributesByKeys(req);
          log4test("deleteRoomAttributesByKeys res=", res);
          this.deleteRoomAttributesByKeysRes = JSON.stringify(res);
        } catch(e) {
          log4test("deleteRoomAttributesByKeys err:", e);
          this.deleteRoomAttributesByKeysRes = JSON.stringify(e);
        }
      },
      async clearRoomAttributes() {
        if (!this.rtsRoom)
          return;

        try {

          let enableNotification = this.clearRoomAttributesReq.options.enableNotification;
          let req;
          if (enableNotification === undefined) {
            req = {};
          } else {
            req = { options: { enableNotification: enableNotification } };
          }
          log4test('clearRoomAttributes: req=', req);

          this.clearRoomAttributesRes = '';
          const res = await this.rtsRoom.room.clearRoomAttributes(req);
          log4test("clearRoomAttributes res=", res);
          this.clearRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("clearRoomAttributes err:", e);
          this.clearRoomAttributesRes = JSON.stringify(e);
        }
      },
      onAddOrUpdateRoomAttributes(data) {
        console.log('onAddOrUpdateRoomAttributes attributes=', data);
        this.addOrUpdateRoomAttributesReq.attributes = data;
      },
      async addOrUpdateRoomAttributes() {
        if (!this.rtsRoom)
          return;

        try {
          /*
          let attributes = {};
          let key = this.addOrUpdateRoomAttributesReq.key;
          let prop = this.addOrUpdateRoomAttributesReq.prop;
          attributes[key] = prop;
          */

          let enableNotification = this.addOrUpdateRoomAttributesReq.options.enableNotification;
          let attributes = this.addOrUpdateRoomAttributesReq.attributes || {};
          let req;
          if (enableNotification === undefined) {
            req = { attributes };
          } else {
            req = { attributes, options: { enableNotification: enableNotification } };
          }

          log4test('addOrUpdateRoomAttributes: req=', req);

          this.addOrUpdateRoomAttributesRes = '';
          const res = await this.rtsRoom.room.addOrUpdateRoomAttributes(req);
          log4test("addOrUpdateRoomAttributes res=", res);
          this.addOrUpdateRoomAttributesRes = JSON.stringify(res);
        } catch(e) {
          log4test("addOrUpdateRoomAttributes err:", e);
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
      getAppExtras(data) {
        console.log('getAppExtras appExtras=', data);
        this.appExtras = data;
      },
      async sendMessageToUser() {
        if (!this.client)
          return;

        try {
          let content = this.sendMessageToUserReq.content;
          let receiver = this.sendMessageToUserReq.receiver;
          //let appExtras = {nickname: "awu", rtc: 'p2p'}

          this.sendMessageToUserRes = '';
          const res = await this.client.sendMessageToUser({
            receiver: receiver,
            type: "100",
            content: Hummer.Utify.encodeStringToUtf8Bytes(content),
            appExtras: this.appExtras
          });
          log4test("sendMessageToUser res=", res);
          this.sendMessageToUserRes = JSON.stringify(res);

        } catch(e) {
          log4test("sendMessageToUser err:", e);
          this.sendMessageToUserRes = JSON.stringify(e);
        }
      },
      async send32KBMessageToUser() {
        if (!this.client)
          return;

        try {
          let content = generateDataInKB(32)
          let receiver = this.sendMessageToUserReq.receiver;
          this.send32KBMessageToUserRes = '';
          const res = await this.client.sendMessageToUser({
            receiver: receiver,
            type: "100",
            content: Hummer.Utify.encodeStringToUtf8Bytes(content),
            appExtras: {}
          });
          log4test("send 32 KB MessageToUser res=", res);
          this.send32KBMessageToUserRes = JSON.stringify(res);

        } catch(e) {
          log4test("send 32 KB MessageToUser err:", e);
          this.send32KBMessageToUserRes = JSON.stringify(e);
        }
      },
      async sendMessageWith1KBExtraToUser() {
        if (!this.client)
          return;

        try {
          let content = "测试"
          let receiver = this.sendMessageToUserReq.receiver;
          this.sendMessageWith1KBExtraToUserRes = '';
          const res = await this.client.sendMessageToUser({
            receiver: receiver,
            type: "100",
            content: Hummer.Utify.encodeStringToUtf8Bytes(content),
            appExtras: {key1 : generateDataInKB(1)}
          });
          log4test("sendMessageWith1KBExtraToUser res= ", res);
          this.sendMessageWith1KBExtraToUserRes = JSON.stringify(res);

        } catch(e) {
          log4test("sendMessageWith1KBExtraToUser err:", e);
          this.sendMessageWith1KBExtraToUserRes = JSON.stringify(e);
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
          console.log(`rts-demo 接收消息${eventName}: ` + JSON.stringify(data));
          //this.mq_data.push(data);

          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });

          //console.log("MQ队列mq_data: " + JSON.stringify(this.mq_data));
        });
      },
      /* 添加P2P消息的监听 */
      addP2PEventMonitor() {
        if (!this.client) {
          this.p2pEventMonitorRes = "rts client还没有初始化"
          return
        }
        if (!this.client[SYMBOL_P2P_EV]) {
          log4test("开始监听P2P消息")
          this.client[SYMBOL_P2P_EV] = (data) => {
            data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
            log4test(`接收消息:${EVENT_MESSAGE_FROM_USER}:` ,data);
            this.$message({
              duration: 3000,
              message: `${EVENT_MESSAGE_FROM_USER}: ` + JSON.stringify(data),
              type: 'success'
            });
          }
        }
        this.client.on(EVENT_MESSAGE_FROM_USER, this.client[SYMBOL_P2P_EV])
        this.p2pEventMonitorRes = "开始监听P2P消息"
      },
      /* 移除P2P消息的监听 */
      removeP2PEventMonitor() {
        if (!this.client) return
        if (!this.client[SYMBOL_P2P_EV]) return
        log4test("移除监听P2P消息")
        this.client.off(EVENT_MESSAGE_FROM_USER, this.client[SYMBOL_P2P_EV])
        this.client[SYMBOL_P2P_EV] = null
        this.p2pEventMonitorRes = "移除P2P消息的监听"
      },
      addRoomEventMonitor() {
        if (!this.rtsRoom) return
        let room = this.rtsRoom.room
        this.addEventMonitorImpl(room, EVENT_ROOM)
        this.monitorRoomEventRes = `添加房间事件监听, [${room.region}:${room.roomId}]`
      },
      removeRoomEventMonitor() {
        if (!this.rtsRoom) return
        let room = this.rtsRoom.room
        this.removeEventMonitorImpl(room, EVENT_ROOM)
        this.monitorRoomEventRes = `移除房间事件监听, [${room.region}:${room.roomId}]`
      },
      addRoomNumberEventMonitor() {
        if (!this.rtsRoom) return
        let room = this.rtsRoom.room
        this.addEventMonitorImpl(room, EVENT_ROOM_NUMBER)
        this.monitorRoomNumberEventRes = `添加房间成员事件监听, [${room.region}:${room.roomId}]`
      },
      removeRoomNumberEventMonitor() {
        if (!this.rtsRoom) return
        let room = this.rtsRoom.room
        this.removeEventMonitorImpl(this.rtsRoom.room, EVENT_ROOM_NUMBER)
        this.monitorRoomNumberEventRes = `移除房间成员事件监听, [${room.region}:${room.roomId}]`
      },
      addEventMonitorImpl(rtsRoom, eventInfo) {
        eventInfo.forEach((event) => {
          let eventName = event[0]
          let eventId = event[1]
          if (rtsRoom[eventId]) {
            return
          }
          log4test(`监听消息: ${eventName}, [${rtsRoom.region}:${rtsRoom.roomId}]`);
          let eventListener = (data) => {
            if ("RoomMessage" === eventName) {
              data.message.data = Hummer.Utify.decodeUtf8BytesToString(data.message.data);
            }
            log4test(`接收消息: ${eventName}, [${rtsRoom.region}:${rtsRoom.roomId}], data:`, data);
            this.$message({
              duration: 3000,
              message: `${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data),
              type: 'success'
            });
          }
          rtsRoom[eventId] = eventListener
          rtsRoom.on(eventName, eventListener)
        })
      },
      removeEventMonitorImpl(rtsRoom, eventInfo) {
        eventInfo.forEach((event) => {
          let eventName = event[0]
          let eventId = event[1]
          if (rtsRoom[eventId]) {
            log4test(`移除消息: ${eventName}, [${rtsRoom.region}:${rtsRoom.roomId}]`);
            rtsRoom.off(eventName, rtsRoom[eventId])
            rtsRoom[eventId] = null
          }
        })
      },
      subscribeRoomEvents(rtsRoom) {
        const roomEvents = [
          "MemberJoined",
          "MemberLeft",
          "MemberCountUpdated",
        ];
        roomEvents.forEach(eventName => {
          rtsRoom.room.on(eventName, (data) => {
            console.log(`rts-demo 接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data));
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
          console.log(`rts-demo 接收组播消息${eventName}: [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data));
          //this.mq_room_data.push(data);

          this.$message({
            duration: 3000,
            message: `${eventName}: [${rtsRoom.region}:${rtsRoom.roomId}]:` + JSON.stringify(data),
            type: 'success'
          });

          //console.log("组播MQ队列mq_room_data: " + JSON.stringify(this.mq_room_data));
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
            console.log(`rts-demo 接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data));
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
            console.log(`rts-demo 接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]: ` + JSON.stringify(data));
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
          console.log(`开发日志, 接收消息${eventName} [${rtsRoom.region}:${rtsRoom.roomId}]`);
          this.updateRoomJoinStatusByRegionAndRoomId(rtsRoom.region, rtsRoom.roomId, false)
        });
      },
      onConnectStatusChange() {
        const eventName = "ConnectionStateChanged";
        this.hummer.on(eventName, (data) => {
          console.log(`rts-demo === ${eventName} ===:` + JSON.stringify(data));
          this.$message({
            duration: 3000,
            message: `${eventName}: ` + JSON.stringify(data),
            type: 'success'
          });

          log4test('hummer state=', this.hummer.getState());
        });
      },
      onTokenExpired() {
        const eventName = "TokenExpired";
        this.hummer.on(eventName, () => {
          console.log(`rts-demo === ${eventName} ===`);
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
