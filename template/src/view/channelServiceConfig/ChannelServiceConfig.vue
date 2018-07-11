<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>渠道服务配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="5">
            <div style="height: 25px;"></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">渠道名称</label>
              <treeselect v-model="channel_search" class="query-select mr10" :normalizer="channelNormalizer" :options="channelName" placeholder="渠道名称" />
            </div>
          </el-col>
           <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">服务名称</label>
              <treeselect v-model="service_search" class="query-select mr10" :normalizer="serviceNormalizer" :options="serviceName" placeholder="服务名称" />
            </div>
          </el-col>
        </el-row>
         <el-row :gutter="20">
          <el-col :span="5">
            <div style="height: 25px;"></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">处理方式</label>
              <treeselect v-model="handleMode_search" class="query-select mr10"  :options="handleMode" placeholder="处理方式" />
            </div>
          </el-col>
           <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">是否有效</label>
              <treeselect v-model="enabled_search" class="query-select mr10"  :options="enabled" placeholder="是否有效" />
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
        <div class="tableTitle">渠道服务列表</div>
        <div class="tableButton">
          <el-button type="toolbar" icon="el-icon-plus" size="mini" @click="add">新增</el-button>
        </div>
      </div>
      <div class="tableDiv" style="">
        <el-table :data="getlist" style="" :fit="false" border tooltip-effect="dark" ref="multipleTable">
            <el-table-column type="index" align="center" width="50"> </el-table-column>
            <el-table-column prop="channel.channelName" label="渠道名称" sortable header-align="center" width="200"></el-table-column>
            <el-table-column prop="service.serviceName" label="服务名称" sortable header-align="center" width="200"></el-table-column>
            <el-table-column prop="handleMode" label="处理方式" sortable align="center" width="100" :formatter="formatterHandleMode"></el-table-column>
            <el-table-column prop="enabled" label="是否有效" sortable align="center" width="100" :formatter="formatterEnabled"></el-table-column>
            <el-table-column prop="sendTimes" label="重发次数" sortable header-align="center" width="150"></el-table-column>
            <el-table-column prop="timeLimt" label="超时时间" sortable header-align="center" width="150"></el-table-column>
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

    <channelServiceConfig-model :show="editVisible" :myeditVisible.sync="editVisible"  :form="form"
    :tiltemsg="tiltemsg" :handleMode="handleMode"
    :enabled="enabled" @closeDialog="closeDialog" @updateData="getData"  ></channelServiceConfig-model>

  </div>
</template>

<script>
    import channelServiceConfig from  './ini/channelServiceConfig.js'
    export default {
      ...channelServiceConfig
    }
</script>
