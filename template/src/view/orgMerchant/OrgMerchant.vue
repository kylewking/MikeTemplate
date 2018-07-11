<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>机构场景关联配置</el-breadcrumb-item>
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
              <label class="select-label">机构名称</label>
              <treeselect v-model="org_search" class="query-select mr10" :normalizer="orgNormalizer" :options="orgName" placeholder="机构名称" />
            </div>
          </el-col>
           <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">场景名称</label>
              <treeselect v-model="merchant_search" class="query-select mr10" :normalizer="merchantNormalizer" :options="merchantName" placeholder="场景名称" />
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
        <div class="tableTitle">机构场景列表</div>
        <div class="tableButton">
          <el-button type="toolbar" icon="el-icon-plus" size="mini" @click="add">新增</el-button>
        </div>
      </div>
      <div class="tableDiv" style="">
        <el-table :data="getlist" style="" :fit="false" border tooltip-effect="dark" ref="multipleTable">
            <el-table-column type="index" align="center" width="50"> </el-table-column>
            <el-table-column prop="orgName" label="机构名称" sortable header-align="center" width="400"></el-table-column>
            <el-table-column prop="merchantName" label="场景名称" sortable header-align="center" width="400"> </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination class="pull-right clearfix" @size-change="handleSizeChange" background :current-page.sync="pageNo" :page-sizes="pageSizesList"
              :page-size="pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
              :total="totalDataNumber">
            </el-pagination>
          </div>
      </div>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog :title="tiltemsg" :visible.sync="editVisible" width="25%" :before-close="cancelEdit">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="渠道名称" prop="orgName" :rules="[{ required: true, message: '渠道名称不能为空'}]">
          <treeselect v-model="form.orgName" :normalizer="orgNormalizer" :options="orgName" placeholder="渠道名称" :clearable="false" />
        </el-form-item>
        <el-form-item label="场景名称" prop="merchantName" :rules="[{ required: true, message: '场景名称不能为空'}]">
          <treeselect v-model="form.merchantName" :normalizer="merchantNormalizer" :options="merchantName" placeholder="场景名称" :clearable="false" />
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
  import orgMerchant from  './orgMerchant.js'
  export default {
    ...orgMerchant
  }
</script>
