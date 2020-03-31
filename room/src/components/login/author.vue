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
          <el-button type="text" @click="showSelectTokenModel">{{tokenTypeLabel}}</el-button>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary"  @click="login" style="border-radius: 4px">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- Token登录模式 -->
    <el-dialog align="left" title="Token" :visible="selectTokenModelVisible" @close="closeSelectTokenModel">
      <select-token :client="client" @onConfirm = getToken></select-token>
    </el-dialog>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { authURL, redirectURL } from '@/global.js';
  import { areas, getAppids, getRegions, getRegionChannelId } from '@/components/room.js';
  import { getBeforeLoginUrl, removeBeforeLoginUrl } from '@/utils/auth'
  import { getStorage, setStorage } from '@/utils/BaseUtil'
  import SelectToken from './select_token.vue'

  const TOKEN_TYPES = {
    APPID_MODE: 1,
    TOKEN_MODE: 2,
    TEMP_TOKEN: 3,
  }

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
          tokenType: TOKEN_TYPES.TOKEN_MODE,
          tokenTypeLabel: 'Token模式',
          formLabelWidth: '120px',
      }
    },
    components: {
      SelectToken
    },
    computed: {
      ...mapState({
        selectTokenModelVisible: state => {
          return state.token.selectTokenModelVisible
        }
      })
    },
    watch: {
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
      showSelectTokenModel() {
        this.$store.commit('updateSelectTokenModelVisible', true);
      },
      closeSelectTokenModel() {
        this.$store.commit('updateSelectTokenModelVisible', false)
      },
      getToken(data) {
        console.log('getToken: data=', data);
        this.token = data.token;
        this.tokenType = data.tokenType;
        this.tokenTypeLabel = data.tokenTypeLabel;
      },
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
