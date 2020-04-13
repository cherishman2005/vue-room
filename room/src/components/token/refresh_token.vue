<template>
  <div>
    <el-col :span="24" style="text-align:left;">
      <el-form size="small" :model="form" :rules="rules" ref="refreshTokenForm" label-width="100px">
        <el-form-item label="uid">
          <el-input v-model="form.uid" style="width:250px;" disabled></el-input>
        </el-form-item>
        <el-form-item label="token">
          <el-input
              type="textarea" 
              style="width:250px;"
              :autosize="{minRows: 1, maxRows: 2}" 
              placeholder="token"
              v-model="form.token"
              clearable>
            </el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <div slot="footer" align="right">
      <el-button size="small" @click="closeRefreshTokenModel">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit('refreshTokenForm')">刷新Token</el-button>
    </div>
  </div>
</template>

<script>
  import { setStorage } from '@/utils/BaseUtil';

  import {
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Radio,
    RadioGroup
  } from 'element-ui'

  export default {
    props: {
      hummer: {
        type: Object,
        required: true
      },
      uid: {
        type: String,
        required: true
      },
    },
    components: {
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElSelect: Select,
      ElOption: Option,
      ElRadioGroup: RadioGroup,
      ElRadio: Radio
    },
    data() {
      return {
        form: {
          uid: this.uid,
          token: '',
        },
        options: [],
        loading: false,
        rules: {
          token: [{ required: true, message: '请输入token', trigger: 'blur' }]
        }
      }
    },
    computed: {

    },
    watch: {
      uid(val) {
        this.form.uid = val;
      }
    },
    methods: {
      onSubmit(ref) {
        this.$refs[ref].validate(valid => {
          if (!valid) {
            return false;
          }
          this.refreshToken();
        })
      },
      closeRefreshTokenModel() {
        this.$store.commit('updateRefreshTokenModelVisible', false);
      },
      refreshToken() {
        console.log('refreshToken');
        if (!this.hummer) {
          console.warn('hummer is null');
          this.closeRefreshTokenModel();
          return;
        }
        
        let req = {
          uid: this.form.uid, 
          token: this.form.token
        };

        console.log('refreshToken: req=', req);

        this.hummer.refreshToken(req).then(res => {
          console.log("refreshToken res=" + JSON.stringify(res));

          if (res.rescode == 0) {
              setStorage("uid", this.form.uid);
              setStorage("token", this.form.token);
          }
          this.$emit('onRefreshToken', res);
        }).catch(err => {
          console.error("refreshToken err=", err);
          this.$emit('onRefreshToken', err);
        });

        this.closeRefreshTokenModel();
      }
    }
  }
</script>

<style>
</style>
