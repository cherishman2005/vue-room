<template>
  <div>
    <el-col :span="24" style="text-align:left;">
      <el-form size="small" :model="form" ref="selectTokenForm" :label-width="formLabelWidth">
        <el-form-item label="tokenType">
          <template>
            <el-select v-model="form.tokenType" placeholder="Token登录模式">
              <el-option
                v-for="item in tokenTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="token" :label-width="formLabelWidth" v-if="isDisplay()">
          <el-input v-model="form.token" autocomplete="off" style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <div slot="footer" align="right" class="dialog-footer">
      <el-button size="small" @click="closeSelectTokenModel">取 消</el-button>
      <el-button size="small" type="primary" @click="onSubmit('selectTokenForm')">确 定</el-button>
    </div>
  </div>
  
</template>

<script>
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
    props:["client"],
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
          tokenType: TOKEN_TYPES.TOKEN_MODE,
          token: '',
        },
        options: [],
        loading: false,
        tokenTypes: tokenTypes,
        tokenTypeLabel: 'Token模式',
        formLabelWidth: '120px',
      }
    },
    computed: {
    },
    watch: {
      'form.tokenType': function(val) {
        tokenTypes.forEach(e => {
          if (val == e.value) {
            this.tokenTypeLabel = e.label
          }
        })
      }
    },
    methods: {
      onSubmit(ref) {
        this.$refs[ref].validate(valid => {
          if (!valid) {
            return false;
          }
          this.selectToken();
        })
      },
      getTokenTypeLabel(tokenType) {
        for (let e of tokenTypes) {
          if (e.value == tokenType) {
            return e.label;
          }
        }

        return '';
      },
      selectToken() {
        let data = {
          tokenType: this.form.tokenType,
          token: this.form.token,
          tokenTypeLabel:  this.tokenTypeLabel //this.getTokenTypeLabel(this.form.tokenType)
        };

        this.$emit('onConfirm', data);
        this.closeSelectTokenModel();
      },
      closeSelectTokenModel() {
        this.$store.commit('updateSelectTokenModelVisible', false);
      },
      isDisplay() {
        return this.form.tokenType == TOKEN_TYPES.TEMP_TOKEN;
      },
    }
  }
</script>

<style>
</style>
