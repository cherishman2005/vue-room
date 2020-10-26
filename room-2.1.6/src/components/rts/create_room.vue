<template>
  <div>
    <el-col :span="24" style="text-align:left;">
      <el-form size="small" :model="form" :rules="rules" ref="createRoomForm" label-width="100px">
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
        <el-form-item label="roomId">
          <el-input v-model="form.roomId" style="width:250px;"></el-input>
        </el-form-item>
      </el-form>
    </el-col>

    <div slot="footer" align="right">
      <el-button size="small" @click="closeCreateRoomModel">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit('createRoomForm')">立即创建</el-button>
    </div>
  </div>
</template>

<script>
  import { getRegions } from '@/components/room_config.js';
  const TEST_ROOM_ID = 'test123456';

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
          roomId: TEST_ROOM_ID,
        },
        options: [],
        loading: false,
        rules: {
          roomId: [{ required: true, message: '请输入roomId', trigger: 'blur' }]
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
          this.createRoom();
        })
      },
      closeCreateRoomModel() {
        this.$store.commit('updateCreateRoomModelVisible', false);
      },
      createRoom() {
        if (!this.client) {
          console.warn('client is null');
          this.closeCreateRoomModel();
          return;
        }
        let room = this.client.createRoom({
          region: this.form.region,
          roomId: this.form.roomId
        });
        if (!room) {
          this.closeCreateRoomModel();
          return;
        }

        let data = {
          room: room,
          region: this.form.region,
          roomId: this.form.roomId
        };
        this.$emit('onGetRoom', data);

        this.closeCreateRoomModel();
      }
    }
  }
</script>

<style>
</style>
