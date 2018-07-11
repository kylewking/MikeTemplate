<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i>权限管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>资源管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">资源名称</label>
              <el-input v-model="name_search" class="query-input mr10" placeholder="资源名称"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">是否启用</label>
              <treeselect v-model="enabled_search" class="query-select mr10" :options="enabled" placeholder="是否启用" />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button type="search" icon="el-icon-search" @click="search">搜 索</el-button>
              <el-button type="search" icon="el-icon-refresh" @click="reset">重 置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="tableBar">
        <div class="tableTitle">资源列表</div>
        <div class="tableButton">
          <el-button type="toolbar" icon="el-icon-plus" size="mini" @click="add">新 增</el-button>
        </div>
      </div>
      <div class="tableDiv" style="">
        <tree-table :data="tableData" :columns="columns" border>
          <!-- <el-table-column label="资源名称" min-width="100" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="资源内容" min-width="160" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.url}}</span>
            </template>
          </el-table-column>
          <el-table-column label="菜单顺序" min-width="60" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.order}}</span>
            </template>
          </el-table-column>
          <el-table-column label="资源图标" min-width="100" header-align="center">
            <template slot-scope="scope">
              <span>
                <span class="icon" :class="scope.row.icon" :formatter="getIconName">{{scope.row.icon}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="描 述" min-width="140" header-align="center">
            <template slot-scope="scope">
              <span>{{scope.row.desc}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </tree-table>
      </div>

      <!-- 编辑弹出框 -->
      <el-dialog :title="tiltemsg" :visible.sync="editVisible" width="40%">
        <el-form ref="form" :model="form" name="form" :rules="rules" label-width="100px">
          <input v-model="form.id" type="text" hidden="true">
          <input v-model="form.createTime" type="text" hidden="true">
          <input v-model="form.creator" type="text" hidden="true">
          <input v-model="form.updateTime" type="text" hidden="true">
          <input v-model="form.updator" type="text" hidden="true">

          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="父菜单" prop="parentId">
            <treeselect v-model="form.parentId" :options="tableData" :normalizer="normalizer" placeholder="父菜单" />
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <treeselect v-model="form.icon" :options="iconmap" placeholder="菜单图标">
              <label slot="option-label" slot-scope="{node}">
                <span class="icon" :class="node.id"> {{ node.label }}</span>
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
          <el-button @click="saveEdit" type="primary">确 定</el-button>
          <el-button @click="callOff">取 消</el-button>
        </span>
      </el-dialog>

      <!--删除提示框-->
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import resource from './resource.js'
  export default {
    ...resource
  }

</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;

  }

  .el-col {
    border-radius: 4px;
  }

</style>
