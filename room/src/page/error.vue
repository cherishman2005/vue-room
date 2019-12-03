<template>
  <div id="page" style="border-style:dashed;border-color:#e4e4e4;line-height:30px;background:url(sorry.png) no-repeat right;">
    <h1>抱歉，找不到此页面~</h1>
    <h2>Sorry, the site now can not be accessed. </h2>
    <p style="color:#666666; font-size: 0.3rem">你请求访问的页面，暂时找不到，我们建议你返回主页进行浏览，谢谢！</p>
    <br />
    <br />
    <div class="button">
      <a href="" title="主页">进入主页</a>
    </div>
  </div>
</template>

<script>
  import { redirectURL } from '@/global.js';
  
  export default {
    name: 'error',
    data() {
      return {
      }
    },
    created() {
      this.$router.push({ path: redirectURL });
    },
  }
</script>

<style scoped>
  body {
    margin: 0px;
    padding:0px;
  }
  div{
    margin-left:auto;
    margin-right:auto;
  }
  a {
    text-decoration: none;
    color: #1064A0;
  }
  a:hover {
    color: #0078D2;
  }
  img {
    border:none;
  }
  h1,h2,h3,h4 {
    margin:0;
    font-weight:normal;
  }
  h1{
    font-size:0.5rem;
    color:#0188DE;
    padding:20px 0px 10px 0px;
  }
  h2{
    color:#0188DE;
    font-size:16px;
    padding:10px 0px 40px 0px;
  }

  #page{
    max-width: 600px;
    margin: 0 auto;
    font-size: 0.5rem;
    padding:20px 20px 40px 20px;
    margin-top:80px;}

  .button{
    width:180px;
    height:28px;
    margin-left:0px;
    margin-top:10px;
    background:#009CFF;
    border-bottom:4px solid #0188DE;
    text-align:center;}
  .button a{
    width:180px;
    height:28px;
    display:block;
    font-size:14px;
    color:#fff;
  }
  .button a:hover{
    background:#5BBFFF;
  }
</style>
