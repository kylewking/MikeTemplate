<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>服务管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">服务名称</label>
              <el-input v-model="serviceName_search" class="query-input" placeholder="服务名称"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">服务编码</label>
              <el-input v-model="serviceCode_search" class="query-input" placeholder="服务编码"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">是否有效</label>
              <treeselect v-model="enabled_search" class="query-select" :options="enabled" placeholder="是否有效" />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="5">
            <el-button type="search" icon="el-icon-search" @click="search">查 询</el-button>
            <el-button type="search" icon="el-icon-refresh" @click="reset">重 置</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="tableBar">
        <div class="tableTitle">服务列表</div>
        <div class="tableButton">
          <el-button type="toolbar" icon="el-icon-plus" size="mini" @click="add">新 增</el-button>
        </div>
      </div>
      <div class="tableDiv" style="">
        <el-table :data="getlist" border style="width: 100%" ref="multipleTable">
          <el-table-column type="index" align="center" width="50"> </el-table-column>
          <el-table-column prop="serviceName" label="服务名称" header-align="center" width="150" sortable show-overflow-tooltip> </el-table-column>
          <el-table-column prop="serviceCode" label="服务编码" header-align="center" width="300" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="serviceUrl" label="回调地址" header-align="center" width="300" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="enabled" label="是否有效" align="center" width="100" :formatter="enabledFormat" sortable show-overflow-tooltip></el-table-column>
          <el-table-column prop="desc" label="描述" header-align="center" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination class="pull-right clearfix" @size-change="handleSizeChange" background :current-page.sync="pageNo" :page-sizes="pageSizesList"
            :page-size="pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
          </el-pagination>
        </div>
      </div>
    </div>
    <service-model :show="editVisible" :myeditVisible.sync="editVisible" :form="form" :tiltemsg="tiltemsg" @closeDialog="closeDialog"
      @updateData="getData"></service-model>
  </div>
</template>

<script>
  import service from './ini/service.js'
  export default {
    ...service
  }

</script>
