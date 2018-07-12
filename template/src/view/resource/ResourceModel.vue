<template>
  <div>
    <el-dialog :title="tiltemsg" :visible.sync="editVisible" @close="doClose" width="40%">
      <el-form ref="form" :model="form" name="form" :rules="rules" label-width="100px">
        <input v-model="form.id" type="text" hidden="true">
        <input v-model="form.createTime" type="text" hidden="true">
        <input v-model="form.creator" type="text" hidden="true">

        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="文件路径" prop="path">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="父菜单" prop="parentId">
          <treeselect v-model="form.parentId" :options="tableData" :normalizer="normalizer" placeholder="父菜单" />
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon">
          <treeselect v-model="form.icon" :options="iconmap" placeholder="菜单图标">
            <label slot="option-label" slot-scope="{node}">
              <span class="icon" :class="node.id"> /{{ node.label }}</span>
            </label>
          </treeselect>
        </el-form-item>
        <el-form-item label="资源类型" prop="resourceType">
          <treeselect v-model="form.resourceType" :options="resourceType" placeholder="资源类型" />
        </el-form-item>
        <el-form-item label="资源排序" prop="order">
          <el-input v-model="form.order"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="enabled">
          <treeselect v-model="form.enabled" :options="enabled" placeholder="是否启用" :clearable="false" />
        </el-form-item>
        <el-form-item label="描 述" prop="desc">
          <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 2, maxRows:6}"></el-input>
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
  import Vue from 'vue';
  export default {
    name: 'resourceModel',
    props: {
      myeditVisible: Boolean,
      tiltemsg: String,
      form: Object,
      tableData: Array,
    },
    data() {
      return {
        iconClass: true,
        saveurl: "/resource/save_resource",
        editVisible: this.myeditVisible,
        updateform: false,

        iconmap: [{
            label: "菜单",
            id: "el-icon-setting"
          },
          {
            label: "子菜单",
            id: "el-icon-caret-right"
          },
          {
            label: "搜索",
            id: "el-icon-search"
          },
          {
            label: "新增",
            id: "el-icon-plus"
          },
          {
            label: "编辑",
            id: "el-icon-edit"
          },
          {
            label: "删除",
            id: "el-icon-delete"
          },
          {
            label: "重置",
            id: "el-icon-refresh"
          }
        ],

        resourceType: [{
          id: "MAINMENU",
          label: "导航菜单"
        }, {
          id: "MENU",
          label: "非导航菜单"
        }, {
          id: "DATA",
          label: "数据"
        }, {
          id: "BUTTON",
          label: "按钮"
        }],

        enabled: [{
          id: "true",
          label: "是"
        }, {
          id: "false",
          label: "否"
        }],

        rules: {
          name: [{
            required: true,
            message: "请输入资源名称",
            trigger: "blur"
          }],
          url: [{
            required: true,
            message: "请输入资源路径",
            trigger: "blur"
          }],
          enabled: [{
            required: true,
            message: "请选择是否启用",
            trigger: "blur"
          }],
          desc: [{
            min: 0,
            max: 500,
            message: "长度最多 500 个字符",
            trigger: "blur"
          }]
        },

      };
    },
    watch: {
      myeditVisible(val) {
        this.editVisible = val
      },
    },
    methods: {
      normalizer(node) {
        if (node.children && node.children.length == 0) {
          Vue.delete(node, 'children');
        }
        return {
          id: node.id,
          label: node.name,
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
      },

      saveEdit() {
        var qs = require('querystring')

        this.$axios.post(this.saveurl, this.form).then(res => {
          if (res.data.statusCode == 200) {
            this.editVisible = false;
            this.$message.success(`保存成功`);
            this.getData();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    }
  };

</script>
