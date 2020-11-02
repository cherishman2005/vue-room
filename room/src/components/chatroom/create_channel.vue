<template>
  <div>
    <el-col :span="24" style="text-align:left;">
      <el-form size="small" :model="form" :rules="rules" ref="createChannelForm" label-width="100px">
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
        <el-form-item label="channelId">
          <el-input v-model="form.channelId" style="width:250px;"></el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <div slot="footer" align="right">
      <el-button size="small" @click="closeCreateChannelModel">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit('createChannelForm')">立即创建</el-button>
    </div>
  </div>
</template>

<script>
  import { getRegions } from '@/components/room_config.js';
  const TEST_ROOM_ID = 'channel123456';

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
      client: {
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
          channelId: TEST_ROOM_ID,
        },
        options: [],
        loading: false,
        rules: {
          channelId: [{ required: true, message: '请输入channelId', trigger: 'blur' }]
        }
      }
    },
    computed: {
    },
    watch: {
    },
    methods: {
      onSubmit(ref) {
        this.$refs[ref].validate(valid => {
          if (!valid) {
            return false;
          }
          this.createChannel();
        })
      },
      closeCreateChannelModel() {
        this.$store.commit('updateCreateRoomModelVisible', false);
      },
      createChannel() {
        if (!this.client) {
          console.warn('hummer is null');
          this.closeCreateChannelModel();
          return;
        }
        let channel = this.client.createChannelInstance({
          region: this.form.region,
          channelId: this.form.channelId
        });
        if (!channel) {
          this.closeCreateChannelModel();
          return;
        }

        let data = {
          channel: channel,
          region: this.form.region,
          channelId: this.form.channelId
        };
        this.$emit('onGetChannel', data);

        this.closeCreateChannelModel();
      }
    }
  }
</script>

<style>
</style>
