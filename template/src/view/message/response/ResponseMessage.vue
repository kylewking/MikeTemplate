<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 流水统计</el-breadcrumb-item>
        <el-breadcrumb-item>响应报文</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
       <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">服务名称</label>
              <treeselect v-model="service_search" class="query-select mr10" :normalizer="serviceNormalizer" :options="serviceName" placeholder="服务名称" />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="5">
              <div class="grid-content">
              <el-button type="search" icon="el-icon-search" @click="search">查 询</el-button>
              <el-button type="search" icon="el-icon-refresh" @click="reset">重 置</el-button>
            </div>
            </el-col>
        </el-row>
      </div>
      <div class="tableBar">
        <div class="tableTitle">响应报文列表</div>
      </div>
      <div class="tableDiv" style="">
      <el-table :data="getlist" style="" :fit="false" border tooltip-effect="dark" ref="multipleTable">
          <el-table-column type="index" align="center" width="50"> </el-table-column>
          <el-table-column prop="orgCode" label="机构编码" sortable header-align="center" width="150"></el-table-column>
          <el-table-column prop="serviceCode" label="服务编码" sortable header-align="center" width="350"> </el-table-column>
          <el-table-column prop="status" label="响应状态" sortable align="center" width="150"></el-table-column>
          <el-table-column prop="createTime" label="发送时间" sortable align="center" width="150"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleDetail(scope.$index, scope.row)" type="text" size="small">详情</el-button>
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
        <!-- 报文详情弹出框 -->
        <el-dialog :title="tiltemsg" :visible.sync="viewVisible" width="50%">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="message">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="body">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows:6}" v-model="form.message"></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
    </div>
</template>

<script>
  import responseMessage from  './ini/responseMessage.js'
    export default {
      ...responseMessage
    }
</script>
