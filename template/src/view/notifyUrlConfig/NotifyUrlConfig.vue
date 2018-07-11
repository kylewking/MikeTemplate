<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>回调地址配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">渠道名称</label>
              <treeselect v-model="channel_search" class="query-select mr10" :normalizer="channelNormalizer" :options="channelName" placeholder="渠道名称" />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">服务名称</label>
              <el-input v-model="serviceName_search" placeholder="服务名称" class="query-input mr10"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">服务编码</label>
              <el-input v-model="serviceCode_search" placeholder="服务编码" class="query-input mr10"></el-input>
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
        <div class="tableTitle">回调地址列表</div>
        <div class="tableButton">
          <el-button type="toolbar" icon="el-icon-plus" size="mini" @click="add">新 增</el-button>
        </div>
      </div>
      <div class="tableDiv" style="">
        <el-table :data="getlist" style="" :fit="false" border tooltip-effect="dark" ref="multipleTable">
            <el-table-column type="index" align="center" width="50"> </el-table-column>
            <el-table-column prop="channel.channelName" label="渠道名称" sortable header-align="center" width="100"></el-table-column>
            <el-table-column prop="serviceName" label="服务名称" sortable header-align="center" width="150"> </el-table-column>
            <el-table-column prop="serviceCode" label="服务编码" sortable header-align="left" width="300"></el-table-column>
            <el-table-column prop="notifyUrl" label="回调地址" header-align="left" width="400"> </el-table-column>
            <el-table-column prop="desc" label="描述" header-align="left" width="300"></el-table-column>
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
          <el-input v-model="form.serviceName"></el-input>
        </el-form-item>
        <el-form-item label="服务编码" prop="serviceCode" :rules="[{ required: true, message: '服务编码不能为空'}]">
          <el-input v-model="form.serviceCode"></el-input>
        </el-form-item>
        <el-form-item label="HTTP方法">
          <treeselect v-model="form.httpMethod" :options="httpMethod" placeholder="请选择" :clearable="true" />
        </el-form-item>
        <el-form-item label="TYPE方法" prop="type">
          <treeselect v-model="form.type" :options="type" placeholder="请选择" :clearable="true" />
        </el-form-item>
        <el-form-item label="回调地址" prop="notifyUrl" :rules="[{ required: true, message: '回调地址不能为空'}]">
          <el-input v-model="form.notifyUrl"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows:6}" v-model="form.desc"></el-input>
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
  import notifyUrlConfig from  './ini/notifyUrlConfig.js'
    export default {
      ...notifyUrlConfig
    }
</script>
