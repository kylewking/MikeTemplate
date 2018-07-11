<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">渠道名称</label>
              <el-input class="query-input" v-model="channel_name_search" clearable placeholder="渠道名称"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">渠道编码</label>
              <el-input class="query-input" v-model="channel_code_search" clearable placeholder="渠道编码"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">场景名称</label>
              <treeselect v-model="merchant_search" class="query-select" :options="merchants" :normalizer="normalizer" placeholder="场景名称"
              />
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
          <el-col :span="3">
            <el-button type="search" icon="el-icon-search" @click="search">查 询</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="search" icon="el-icon-refresh" @click="reset">重 置</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="tableBar">
        <div class="tableTitle">渠道列表</div>
        <div class="tableButton">
          <el-button type="toolbar" icon="el-icon-plus" size="mini" @click="add">新 增</el-button>
        </div>
      </div>
      <div class="tableDiv" style="">
        <el-table :data="getlist" border style="width: 100%" ref="multipleTable">
          <el-table-column type="index" align="center" width="50"> </el-table-column>
          <el-table-column prop="channelName" label="渠道名称" sortable header-align="center" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="channelCode" label="渠道编码" sortable header-align="center" width="150" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="merchant.merchantName" label="场景名称" sortable header-align="center" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="enabled" :formatter="enabledFormat" label="是否有效" sortable align="center" width="100" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="desc" label="描述" sortable header-align="center" width="150" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="sendTimes" label="重发次数" sortable header-align="center" width="100" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="timeLimit" label="超时时间" sortable header-align="center" width="100" show-overflow-tooltip> </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
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

    <channel-model :show="editVisible" :myeditVisible.sync="editVisible" :form="form" :tiltemsg="tiltemsg" :merchants="merchants"
      @closeDialog="closeDialog" @updateData="getData"></channel-model>

  </div>
</template>

<script>
  import channel from "./ini/channel.js";
  export default {
    ...channel
  };

</script>
