<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">输入UID</h2>
    <el-col :span="24"  style="height: 45px;text-align:left;">
      <el-form :inline="true" size="small">
        <el-form-item label="appid">
          <template>
            <el-select v-model="appid" placeholder="appid" filterable @blur="selectBlur">
              <el-option
                v-for="item in appids"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="uid">
          <el-input v-model="uid"></el-input>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="text" @click="dialogFormVisible = true">{{tokenTypeLabel}}</el-button>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary"  @click="login" style="border-radius: 4px">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- Token登录模式 -->
    <el-dialog title="Token" :visible.sync="dialogFormVisible" style="text-align:left;">
      <el-col :span="24"  style="text-align:left;">
        <el-form :inline="true" size="small">
          <el-form-item label="" :label-width="formLabelWidth">
            <el-select v-model="tokenType" placeholder="Token登录模式">
                <el-option
                  v-for="item in tokenTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="token" :label-width="formLabelWidth" v-if="isDisplay()">
            <el-input v-model="token" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-col>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { authURL, redirectURL } from '@/global.js';
  import { areas, getAppids, getRegions, getRegionChannelId } from '@/components/room.js';
  import { getBeforeLoginUrl, removeBeforeLoginUrl } from '@/utils/auth'
  import { getStorage, setStorage } from '@/utils/BaseUtil'

  const TOKEN_TYPES = {
    APPID_MODE: 1,
    TOKEN_MODE: 2,
    TEMP_TOKEN: 3,
  }

  const tokenTypes = [
            {label: 'AppId模式', value: TOKEN_TYPES.APPID_MODE},
            {label: 'Token模式', value: TOKEN_TYPES.TOKEN_MODE},
            {label: '临时Token模式', value: TOKEN_TYPES.TEMP_TOKEN},
          ];

  export default {
    name: 'author',
    data() {
        return {
          uid: '',
          appid: 1504984159,
          area: 'cn',
          regions: getRegions(),
          region: 'cn',
          token: '',
          reportType: 0,
          appids: getAppids(),
          areas: areas,
          dialogFormVisible: false,
          tokenTypes: tokenTypes,
          tokenType: TOKEN_TYPES.TOKEN_MODE,
          tokenTypeLabel: 'Token模式',
          formLabelWidth: '120px',
      }
    },
    computed: {
    },
    watch: {
      tokenType: function(val) { 
        this.tokenTypes.forEach(e => {
          if (val == e.value) {
            this.tokenTypeLabel = e.label;
          }
        })
      },
    },
    filters:{   
    },
    created() {
    },
    mounted () {
      let uid = getStorage('uid');
      let token = getStorage('token');
      console.log("author uid=" + uid + ", token=" + token);
      if (uid && token) {
          this.reportType = 1;
          let redirect = getBeforeLoginUrl() || '/';
          this.$router.push({ path: redirect });
          removeBeforeLoginUrl();
      } else {
        this.reportType = 0;
        this.getUserToken(this.uid);
      }
    },
    beforeDestroy() {

    },
    methods: {
      login() {
        let redirect;

        switch(this.tokenType) {
          case TOKEN_TYPES.APPID_MODE:
              this.token = null;
              setStorage("appid", this.appid);
              setStorage("uid", this.uid);
              //setStorage("token", this.token);
              console.log('appid=' + this.appid + ', uid=' + this.uid + ', token=' + this.token);

              redirect = getBeforeLoginUrl() || '/';
              this.$router.push({ path: redirect });
              removeBeforeLoginUrl();
            break;
          case TOKEN_TYPES.TOKEN_MODE:
            this.getUserToken();
            break;
          case TOKEN_TYPES.TEMP_TOKEN:
              setStorage("appid", this.appid);
              setStorage("uid", this.uid);
              setStorage("token", this.token);
              console.log('appid=' + this.appid + ', uid=' + this.uid + ', token=' + this.token);

              redirect = getBeforeLoginUrl() || '/';
              this.$router.push({ path: redirect });
              removeBeforeLoginUrl();
            break;
          default:
            break;
        }
      },
      getUserToken() {
        const appid = this.appid;
        this.$axios.get(authURL + '/user/token?uid=' + this.uid+'&appid=' + appid)
          .then(res => {
            if (res.status === 200) {
              console.log("res.data: " + JSON.stringify(res.data));
              let body = res.data;
              if (body.uid && body.token) {
                setStorage("appid", appid);
                setStorage("uid", body.uid.toString());
                setStorage("token", body.token);

                let redirect = getBeforeLoginUrl() || '/';
                this.$router.push({ path: redirect });
                removeBeforeLoginUrl();
              }
            }
          })
          .catch(error => {
            console.log("error: " + JSON.stringify(error));
          });
      },
      selectBlur(e) {
        this.appid = e.target.value;
      },
      isDisplay() {
        return this.tokenType == TOKEN_TYPES.TEMP_TOKEN;
      },
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
