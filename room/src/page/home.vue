<template lang="html">
  <div class="wrapper">
    <div class="mod_nav">
      <a v-for="items in navList" href="javascript:;" :data-nav="items['type']" @click="toggle($event)"
      :class="{ active : active == items['type'] }">{{items['text']}}</a>
    </div>
    <!--页面子路由-->
    <router-view></router-view>
  </div>
</template>

<script type="es6">
  //引入推荐模块
  export default {
    data() {
      return {
        selected: '1',
        item: [],
        active: '',
        navList: [
          {type: 'map', text: '3D地图'},
          {type: 'viewer', text: '360全景图'},
          {type: 'video', text: '小视频'},
        ]
      }
    },
    methods: {
      //菜单栏切换
      toggle: function (e) {
        this.active = e.srcElement.dataset.nav;
        this.$router.push('/' + this.active);
        // this.toggleBackgroundColor();
      }
    },
    beforeMount: function () {
      //获取当前的菜单栏
      this.active = this.$route.path.replace('/', '');
      // this.toggleBackgroundColor();
    }
    // mounted() {
    //   this.$router.push('/sort');
    //   // this.toggleBackgroundColor();
    // }
  }
</script>

<style scoped>
  .mod_header {
    position: relative;
    height: 44px;
    background: white;
    max-width: 600px;
    margin: 0 auto;
  }

  .mod_header .hlogo {
    float: left;
    display: block;
    width: 120px;
    height: 25px;
    margin: 9px 0 0 10px;
    background: url("../assets/img/logo.png") no-repeat;
    background-size: cover;
    text-indent: -9999px;
  }

  .mod_nav {
    display: -webkit-box;
    background: #fff;
    max-width: 600px;
    margin: 0 auto;
    /*font-weight: bold;*/
  }

  .mod_nav a {
    -webkit-box-flex: 1;
    position: relative;
    display: block;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-align: center;
    font-size: 16px;
    color: rgba(0, 0, 0, .6);
    -webkit-box-sizing: border-box;
  }

  .mod_nav a.active {
    color: #31c27c;
    /*font-weight:lighter;*/
  }

  .mod_nav a.active:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #31c27c;
  }

</style>

