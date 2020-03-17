<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">输入UID</h2>
    <el-col :span="24"  style="height: 45px;text-align:left;" >
      <el-form :inline="true" size="small">
        <el-form-item label="appid">
          <template>
            <el-select v-model="appid" placeholder="appid">
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
          <el-button type="text" @click="dialogFormVisible = true">选择token模式</el-button>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary"  @click="login" style="border-radius: 4px">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- Form -->
    <el-dialog title="Token" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="" :label-width="formLabelWidth">
          <el-select v-model="tokenType" placeholder="请token登录模式">
              <el-option
                v-for="item in tokenTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="token" :label-width="formLabelWidth" v-if="tokenType == 3">
          <el-input v-model="token" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
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
          tokenTypes: [
            {label: 'AppId模式', value: 1},
            {label: 'Token模式', value: 2},
            {label: '临时Token模式', value: 3},
          ],
          tokenType: 2,
          formLabelWidth: '120px',
      }
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
        /*let token = 'ADp4VYnqABhfObBXLeUAAAFtQoNAaAAAC7gACnthOumbhue-pH26R8M3HCw2oPLBqZQExg9PIVQTqQ';
        let uid = '6860100817333733';
        setStorage("uid", uid);
        setStorage("token", token);
        */
      }
    },
    beforeDestroy() {

    },
    methods: {
      login() {
        let redirect;

        switch(this.tokenType) {
          case 1:
              this.token = null;
              setStorage("uid", this.uid);
              setStorage("token", this.token);
              setStorage("appid", this.appid);
              console.log('appid=' + this.appid + ', uid=' + this.uid + ', token=' + this.token);

              redirect = getBeforeLoginUrl() || '/';
              this.$router.push({ path: redirect });
              removeBeforeLoginUrl();
            break;
          case 2:
            this.getUserToken();
            break;
          case 3:
              setStorage("uid", this.uid);
              setStorage("token", this.token);
              setStorage("appid", this.appid);
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
                setStorage("uid", body.uid.toString());
                setStorage("token", body.token);
                //setStorage("area", this.area);
                setStorage("appid", appid);
                //setStorage("region", this.region);
                
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
