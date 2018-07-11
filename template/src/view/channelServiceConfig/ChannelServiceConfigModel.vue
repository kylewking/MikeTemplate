<template>
  <div>
   <!-- 编辑弹出框 -->
    <el-dialog :title="tiltemsg" :visible.sync="editVisible" width="40%" :before-close="cancelEdit">
      <el-form ref="form" :model="form" label-width="100px">
        <input v-model="form.id" prop="id" type="text" hidden="true">
        <input v-model="form.version" prop="version" type="text" hidden="true">
        <input v-model="form.createTime" prop="createTime" type="text" hidden="true">
        <input v-model="form.creator" prop="creator" type="text" hidden="true">
        <el-form-item label="渠道名称" prop="channelName" :rules="[{ required: true, message: '渠道名称不能为空'}]">
          <treeselect v-model="form.channelName" :normalizer="channelNormalizer" :options="channelName" placeholder="渠道名称" :clearable="false" />
        </el-form-item>
        <el-form-item label="服务名称" prop="serviceName" :rules="[{ required: true, message: '服务名称不能为空'}]">
          <treeselect v-model="form.serviceName" :normalizer="serviceNormalizer" :options="serviceName" placeholder="服务名称" :clearable="false" />
        </el-form-item>
        <el-form-item label="处理方式" prop="handleMode" :rules="[{ required: true, message: '渠道名称不能为空'}]">
            <treeselect v-model="form.handleMode" :options="handleMode" placeholder="处理方式" :clearable="false" />
        </el-form-item>
        <el-form-item label="是否有效">
          <treeselect v-model="form.enabled" :options="enabled" placeholder="是" :clearable="true" />
        </el-form-item>
        <el-form-item label="重发次数" prop="sendTimes">
          <el-input v-model="form.sendTimes" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="超时时间" prop="timeLimt">
          <el-input v-model="form.timeLimt" placeholder="请输入（毫秒）"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveEdit" type="primary">保 存</el-button>
        <el-button @click="cancelEdit()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
   export default {
    name: 'channelServiceConfigModel',
    props: {
      myeditVisible:Boolean,
      tiltemsg:String,
      handleMode:String,
      enabled:Boolean,
      form: Object,
    },
    data() {
      return {
        saveurl: "/service/config/save",
        editVisible: this.myeditVisible,
        updateform:false,
      }
    },
    watch: {
      myeditVisible(val) {
        this.editVisible = val
      },
    },
    methods: {
      doClose() {
        this.$emit('closeDialog', this.editVisible) //子组件对editVisible修改后向父组件发送事件通知
        if(this.updateform){
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
                this.updateform=true;
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
