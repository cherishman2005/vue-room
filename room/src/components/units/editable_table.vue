<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-table size="mini" :data="key_value.data" border style="width: 100%" highlight-current-row>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column v-for="(v,i) in key_value.columns" :prop="v.field" :label="v.title" :width="v.width" :key="i">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="key_value.sel[v.field]">
                                </el-input>
                            </span>
                            <span v-else>{{scope.row[v.field]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                                {{scope.row.isSet?'保存':"修改"}}
                            </span>
                            <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="deleteTableData(scope.row, scope.$index)">
                                删除
                            </span>
                            <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                                取消
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">
                <div class="el-table-add-row" style="width: 99.2%;" @click="addTableData()"><span>+ 添加</span></div>
            </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="createPlainObject()">创 建</el-button>
        </span>
    </div>
</template>

<script>
    import {
        Form,
        FormItem,
        Input,
        Select,
        Option,
        Radio,
        RadioGroup
    } from 'element-ui'

    //id生成工具 这个不用看 示例而已 模拟后台返回的id
    const generateId = {
        _count: 1,
        get(){return ((+new Date()) + "_" + (this._count++))}
    };

    //主要内容
    export default {
        name : 'editable-table',
        props: {
            tableData: {
                type: Object,
                required: true,
                default () {
                  return {}
                }
            }
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
                key_value: {
                    sel: null,//选中行
                    columns: [
                        { field: "key", title: "key", width: 120 },
                        { field: "value", title: "value", width: 220 },
                    ],
                    data: [],
                },
            }
        },
        created() {
            if (!this.tableData) {
                return;
            }

            for (let key of Object.keys(this.tableData)) {
                console.log('editable-table key=', key, ' value=', this.tableData[key]);
                let j = { id: 0, "key": key, "value": this.tableData[key], "isSet": false, "_temporary": true };
                this.key_value.data.push(j);
                this.key_value.sel = JSON.parse(JSON.stringify(j));
            }
            console.log('editable-table key_value=', this.key_value.data);
        },
        watch: {
            /*
            'tableData': function(val) {
                for (let key in this.tableData) {
                    let j = { id: 0, "key": tableData[key].key, "value": tableData[key].value, "isSet": true, "_temporary": true };
                    this.key_value.data.push(j);
                    this.key_value.sel = JSON.parse(JSON.stringify(j));
                }
            }
            */
        },
        methods: {
            closeModel() {
                this.$store.commit('updateCreateRoomAppExtrasVisible', false);
                this.$store.commit('updateCreateAppExtrasVisible', false);
                this.$store.commit('updateSetRoomAttributesVisible', false);
                this.$store.commit('updateAddOrUpdateRoomAttributesVisible', false);
                this.$store.commit('updateSetUserAttributesVisible', false);
                this.$store.commit('updateAddOrUpdateUserAttributesVisible', false);
                this.$store.commit('updateSetGroupAttributesVisible', false);
                this.$store.commit('updateUpdateGroupAttributesVisible', false);
                this.$store.commit('updateSetGroupUserAttributesVisible', false);
                this.$store.commit('updateJoinChatRoomPropsVisible', false);
                this.$emit('close')
            },
            createPlainObject() {
                //console.log('key_value.data=', this.key_value.data);

                if (!this.key_value.data.every(e => (e.isSet === false))) {
                    this.$message.warning("请先保存编辑项");
                    return;
                }

                let data = {};
                this.key_value.data.forEach(element => {
                    data[element.key] = element.value;
                });
                console.log('createPlainObject: data=', data);
                this.$emit('onGetPlainObject', data);
                this.closeModel();
            },
            //读取表格数据
            readTableData() {
                //根据实际情况，自己改下啊
                this.key_value.data.map(i => {
                    //i.id = generateId.get();//模拟后台插入成功后有了id
                    i.isSet = false;//给后台返回数据添加`isSet`标识
                    return i;
                });
            },
            //删除
            deleteTableData(row, index) {
                for (let i of this.key_value.data) {
                    if (i.isSet && i.id != row.id) {
                        this.$message.warning("请先保存当前编辑项");
                        return false;
                    }
                }
                if (!this.key_value.sel.id) this.key_value.data.splice(index, 1);
                console.log('key_value =', this.key_value);
            },
            //添加
            addTableData(row, index) {
                for (let i of this.key_value.data) {
                    if (i.isSet) return this.$message.warning("请先保存当前编辑项");
                }
                let j = { id: 0, "key": "", "value": "", "isSet": true, "_temporary": true };
                this.key_value.data.push(j);
                this.key_value.sel = JSON.parse(JSON.stringify(j));
            },
            //修改
            pwdChange(row, index, cg) {
                //点击修改 判断是否已经保存所有操作
                for (let i of this.key_value.data) {
                    if (i.isSet && i.id != row.id) {
                        this.$message.warning("请先保存当前编辑项");
                        return false;
                    }
                }
                //是否是取消操作
                if (!cg) {
                    if (!this.key_value.sel.id) this.key_value.data.splice(index, 1);
                    return row.isSet = !row.isSet;
                }
                //提交数据
                if (row.isSet) {
                    //项目是模拟请求操作  自己修改下
                    (() => {
                        let data = JSON.parse(JSON.stringify(this.key_value.sel));
                        for (let k in data) row[k] = data[k];
                        /*
                        this.$message({
                            type: 'success',
                            message: "保存成功!"
                        });
                        */
                        //然后这边重新读取表格数据
                        this.readTableData();
                        row.isSet = false;
                    })();
                } else {
                    this.key_value.sel = JSON.parse(JSON.stringify(row));
                    row.isSet = true;
                }
            }
        }
    }
</script>

<style lang='less'>
.el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
}
</style>
