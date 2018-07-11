<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-date"></i> 流水统计</el-breadcrumb-item>
                <el-breadcrumb-item>请求报文</el-breadcrumb-item>
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
                    <label class="input-label">用户名称:</label>
                    <el-input v-model="name_search" placeholder="用户名称" class="query-input mr10"></el-input>
                  </div>
                </el-col>
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
            <div class="tableTitle">请求报文列表</div>
          </div>
          <div class="tableDiv" style="">
          <el-table :data="getlist" style="" :fit="false" border tooltip-effect="dark" ref="multipleTable">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="id" v-if="show" label="id">
              </el-table-column>
              <el-table-column prop="channelUser" label="请求用户" sortable header-align="center" width="100">
              </el-table-column>
              <el-table-column prop="orgCode" label="机构编码" sortable header-align="center" width="100">
              </el-table-column>
              <el-table-column prop="merchantCode" label="商户编码" sortable header-align="center" width="100">
              </el-table-column>
              <el-table-column prop="channelCode" label="渠道编码" sortable header-align="center" width="100">
              </el-table-column>
              <el-table-column prop="serviceCode" label="服务编码" sortable header-align="center" width="200">
              </el-table-column>
              <el-table-column prop="createTime" label="发送时间" sortable header-align="center" width="200">
              </el-table-column>
              <el-table-column prop="message" v-if='show' label="报文">
              </el-table-column>
              <el-table-column label="操作"  align="center" width="100">
                <template slot-scope="scope">
                    <el-button  type="text" size="small" @click="opendDiglog(scope.$index, scope.row)" >详情</el-button>
                </template>
              </el-table-column>
          </el-table>
          <div class="pagination">
              <el-pagination  class="pull-right clearfix"  @size-change="handleSizeChange"
              background
              :current-page.sync="pageNo"
              :page-sizes="pageSizesList"
              :page-size="pageSize"
              @current-change="handleCurrentChange"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalDataNumber">
              </el-pagination>
          </div>
        </div>
      </div>
        <!-- 报文详情 -->
        <el-dialog title="报文详情" :visible.sync="editVisible" width="30%">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows:6}" placeholder="报文详情" v-model="messageBody">
            </el-input>
        </el-dialog>
    </div>
</template>

<script>
  import request from  './ini/request.js'
    export default {
      ...request
    }
</script>




