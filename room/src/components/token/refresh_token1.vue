<template>
  <div>
    <el-col :span="24" style="text-align:left;">
      <el-form size="small" :model="form" :rules="rules" ref="refreshToken1Form" label-width="100px">
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
      <el-button size="small" @click="closeRefreshToken1Model">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit('refreshToken1Form')">刷新Token</el-button>
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
        this.$store.commit('updateRefreshToken1ModelVisible', false);
      },
      refreshToken() {
        console.log('refreshToken1');
        if (!this.hummer) {
          console.warn('hummer is null');
          this.closeRefreshTokenModel();
          return;
        }
        
        let req = {
          uid: this.form.uid, 
          token: this.form.token
        };

        console.log('refreshToken1: req=', req);

        this.hummer.refreshToken1(req).then(res => {
          console.log("refreshToken1 res=" + JSON.stringify(res));

          if (res.rescode == 0) {
              setStorage("uid", this.form.uid);
              setStorage("token", this.form.token);
          }
          this.$emit('onRefreshToken1', res);
        }).catch(err => {
          console.error("refreshToken1 err=", err);
          this.$emit('onRefreshToken1', err);
        });

        this.closeRefreshTokenModel();
      }
    }
  }
</script>

<style>
</style>
