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
              <el-button type="search" icon="el-icon-search" @click="search">查 询</el-button>
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
          <el-table-column label="资源内容" min-width="160" header-align="center">
            <template slot-scope="scope">
              <span>\{{scope.row.url}}</span>
            </template>
          </el-table-column>
          <el-table-column label="菜单顺序" min-width="60" align="center">
            <template slot-scope="scope">
              <span>\{{scope.row.order}}</span>
            </template>
          </el-table-column>
          <el-table-column label="资源图标" min-width="100" header-align="center">
            <template slot-scope="scope">
              <span>
                <span class="icon" :class="scope.row.icon" :formatter="getIconName">\{{scope.row.icon}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="描 述" min-width="140" header-align="center">
            <template slot-scope="scope">
              <span>\{{scope.row.desc}}</span>
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
    </div>
        <resource-model :show="editVisible" :myeditVisible.sync="editVisible" :form="form" :tiltemsg="tiltemsg"  :tableData="tableData" @closeDialog="closeDialog"
      @updateData="getData"></resource-model>
  </div>
</template>

<script>
  import resource from './ini/resource.js'
  export default {
    ...resource
  }

</script>
