<template>
  <div>
    <el-dialog :title="tiltemsg" :visible.sync="editVisible" :show="editVisible" @close="doClose" width="40%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <input v-model="form.id" type="text" hidden="true">
        <input v-model="form.version" type="text" hidden="true">
        <input v-model="form.createTime" type="text" hidden="true">
        <input v-model="form.creator" type="text" hidden="true">
        <el-form-item label="渠道名称" prop="channelName">
          <el-input type="text" v-model="form.channelName" placeholder="渠道名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道编码" prop="channelCode">
          <el-input type="text" v-model="form.channelCode" placeholder="渠道编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道用户" prop="channelUser">
          <el-input type="text" v-model="form.channelUser" placeholder="渠道用户" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="channelPwd">
          <el-input type="text" v-model="form.channelPwd" placeholder="用户密码" clearable></el-input>
        </el-form-item>
        <el-form-item label="场景编码">
          <treeselect v-model="form.merchant" class="handle-select" :options="merchants" :normalizer="normalizer" placeholder="场景名称"
          />
        </el-form-item>
        <el-form-item label="是否有效">
          <treeselect v-model="form.enabled" :options="enabled" placeholder="是否有效" :clearable="false" />
        </el-form-item>
        <el-form-item label="请求地址">
          <el-input type="text" v-model="form.requestUrl" placeholder="请求地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="回调地址">
          <el-input type="text" v-model="form.notifyUrl" placeholder="回调地址" clearable></el-input>
        </el-form-item>
        <el-form-item label="发送次数">
          <el-input type="text" v-model="form.sendTimes" placeholder="发送次数" clearable></el-input>
        </el-form-item>
        <el-form-item label="超时时间">
          <el-input type="text" v-model="form.timeLimit" placeholder="超时时间" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否加密">
          <treeselect v-model="form.isEncrypt" :options="enabled" placeholder="是否加密" :clearable="false" />
        </el-form-item>
        <el-form-item label="公钥">
          <el-input type="text" v-model="form.publicKey" placeholder="公钥" clearable></el-input>
        </el-form-item>
        <el-form-item label="私钥">
          <el-input type="text" v-model="form.privateKey" placeholder="私钥" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows:50}" v-model="form.desc"></el-input>
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
    name: 'channelModel',
    props: {
      myeditVisible: Boolean,
      tiltemsg: String,
      merchants: Array,
      form: Object,
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

        rules: {
          channelName: [{
            required: true,
            message: "请输入渠道名称",
            trigger: "blur"
          }],
          channelCode: [{
            required: true,
            message: "请输入渠道编码",
            trigger: "blur"
          }],
          channelUser: [{
            required: true,
            message: "请输入渠道用户",
            trigger: "blur"
          }],
          channelPwd: [{
            required: true,
            message: "请输入用户密码",
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
          children: node.children,
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
