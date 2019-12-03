<template>
  <div class="dashboard-container">
    <!--<iframe src="javascript:void(0);" ref="regIframe"  frameborder="0" class="app-login"  style="width: 100%;height: 302px;" scrolling=auto></iframe>-->
    <h2 style="text-align:left;">输入UID</h2>
    <el-col :span="24"  style="height: 45px;text-align:left;" >
      <el-form :inline="true" :model="filters" size="small">
        <el-form-item label="uid">
          <el-input v-model="uid"></el-input>
        </el-form-item>
        <el-form-item class="search">
          <el-button type="primary"  @click="getUserToken" style="border-radius: 4px"><span class="el-icon-search margin"></span>进入聊天室</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  </div>
</template>

<script>
  import { APPID, authURL, redirectURL } from '@/global.js';
  import { getBeforeLoginUrl, removeBeforeLoginUrl } from '@/utils/auth'
  import { getStorage, setStorage } from '@/utils/BaseUtil'

  export default {
    name: 'author',
    data() {
        return {
          uid: '',
          token: '',
          reportType: 0,
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
      getUserToken(uid) {
        const appid = APPID;
        this.$axios.get(authURL + '/user/token?uid=' + this.uid+'&appid=' + appid)
          .then(res => {
            if (res.status === 200) {
              console.log("res.data: " + JSON.stringify(res.data));
              let body = res.data;
              if (body.uid && body.token) {
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
