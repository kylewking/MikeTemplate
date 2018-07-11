<template>
  <div> 
    <el-dialog :title="tiltemsg" :visible.sync="editVisible" @close="doClose" width="40%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <input v-model="form.id" type="text" hidden="true">
        <input v-model="form.version" type="text" hidden="true">
        <input v-model="form.createTime" type="text" hidden="true">
        <input v-model="form.creator" type="text" hidden="true">

        <el-form-item label="服务名称" prop="serviceName">
          <el-input v-model="form.serviceName"></el-input>
        </el-form-item>
        <el-form-item label="服务编码" prop="serviceCode">
          <el-input v-model="form.serviceCode"></el-input>
        </el-form-item>
        <el-form-item label="服务地址" prop="serviceUrl">
          <el-input v-model="form.serviceUrl"></el-input>
        </el-form-item>
        <el-form-item label="HTTP方法">
          <treeselect v-model="form.httpMethod" :options="httpMethod" placeholder="HTTP方法" />
        </el-form-item>
        <el-form-item label="是否启用">
          <treeselect v-model="form.enabled" :options="enabled" placeholder="是否启用" :clearable="false" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows:6}" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveEdit" type="primary">保 存</el-button>
        <el-button @click="cancelEdit">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'serviceModel',
    props: {
      myeditVisible: {
        type: Boolean
      },
      tiltemsg: String,
      merchants: Array,
      form: {
        type: Object,
        default: function () {
          return {
            id: "",
            version: "",
            channelName: "",
            channelCode: "",
            channelUser: "",
            channelPwd: "",
            merchant: {
              id: "",
              merchantCode: "",
              merchantName: "",
              enabled: "",
              desc: ""
            },
            enabled: "true",
            sendTimes: "",
            timeLimit: "",
            requestUrl: "",
            notifyUrl: "",
            isEncrypt: "true",
            publicKey: "",
            privateKey: "",
            desc: ""
          }
        }
      },
    },
    data() {
      return {
        saveurl: "/channel/save",
        editVisible: this.myeditVisible,
        updateform: false,

        enabled: [{
          id: "true",
          label: "是"
        }, {
          id: "false",
          label: "否"
        }],

        httpMethod: [{
          id: "GET",
          label: "GET"
        }, {
          id: "POST",
          label: "POST"
        }, {
          id: "PUT",
          label: "PUT"
        }, {
          id: "PATCH",
          label: "PATCH"
        }, {
          id: "DELETE",
          label: "DELETE"
        }],

        rules: {
          serviceName: [{
            required: true,
            message: "请输入服务名称",
            trigger: "blur"
          }],
          serviceCode: [{
            required: true,
            message: "请输入服务编码",
            trigger: "blur"
          }],
          serviceUrl: [{
            required: true,
            message: "请输入服务地址",
            trigger: "blur"
          }]
        },
      }
    },
    watch: {
      myeditVisible(val) {
        this.editVisible = val
      },
    },
    methods: {
      normalizer(node) {
        return {
          id: node.id,
          label: node.merchantName,
        }
      },

      doClose() {
        this.$emit('closeDialog', this.editVisible) //子组件对editVisible修改后向父组件发送事件通知
        if (this.updateform) {
          this.$emit('updateData', this.form) //子组件对frmm修改后向父组件发送事件通知
        }
      },

      cancelEdit() {
        this.editVisible = false;
        this.doClose();
      },

      saveEdit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$axios.post(this.saveurl, this.form).then(res => {
              if (res.data.statusCode == 200) {
                this.editVisible = false;
                this.$message.success(`保存成功`);
                this.updateform = true;
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        });
      },
    }
  };

</script>
