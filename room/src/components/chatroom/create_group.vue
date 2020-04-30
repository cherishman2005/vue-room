<template>
  <div>
    <el-col :span="24" style="text-align:left;">
      <el-form size="small" :model="form" ref="createGroupForm" label-width="100px">
        <el-form-item label="region">
          <template>
            <el-select v-model="form.region" placeholder="region" style="width:250px;">
              <el-option
                v-for="item in regions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
    </el-col>

    <div slot="footer" align="right">
      <el-button size="small" @click="closeCreateGroupModel">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit('createGroupForm')">立即创建</el-button>
    </div>
  </div>
</template>

<script>
  import { getRegions, getRegionChannelId } from '@/components/room_config.js';

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
        regions: getRegions(),
        form: {
          region: 'cn',
        },
        options: [],
        loading: false,
      }
    },
    computed: {

    },
    methods: {
      onSubmit(ref) {
        this.$refs[ref].validate(valid => {
          if (!valid) {
            return false;
          }
          this.createChatRoom();
        })
      },
      closeCreateGroupModel() {
        this.$store.commit('updateCreateGroupModelVisible', false);
      },
      createChatRoom() {
        if (!this.hummer) {
          console.warn('hummer is null');
          this.closeCreateChannelModel();
          return;
        }

        let attributes = {
          "Name": "Hummer聊天室",
          "Description": "测试",
          "Bulletin": "公告",
          "Extention": "自定义",
        };
        
        let region = this.form.region;
        let params = {region, attributes};
        this.hummer.createChatRoom(params).then((res) => {
          console.log("createChatRoom res: ", res);
          if (res.rescode === 0) {
            let data = {
              region: this.form.region,
              roomid: res.roomid
            };
            this.$emit('onGetChatRoom', data);

            this.closeCreateGroupModel();
          }
        }).catch(err => {
          console.log(err)
          this.closeCreateGroupModel();
        });
      }
    }
  }
</script>

<style>
</style>
