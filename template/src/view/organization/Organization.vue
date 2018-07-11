<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 基础配置</el-breadcrumb-item>
        <el-breadcrumb-item>机构管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="8">
            <div>
              <label class="input-label">机构名称</label>
              <el-input v-model="org_name_search" class="query-input mr10" placeholder="机构名称"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">机构编码</label>
              <el-input v-model="org_code_search" class="query-input mr10" placeholder="机构编码"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button type="search" icon="el-icon-search" @click="search">查 询</el-button>
              <el-button type="search" icon="el-icon-refresh" @click="reset">重 置</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="tableBar">
        <div class="tableTitle">机构列表</div>
        <div class="tableButton">
          <el-button type="toolbar" icon="el-icon-plus" size="mini" @click="add">新 增</el-button>
        </div>
      </div>
      <div class="tableDiv" style="">
          <el-table :data="getlist" border style="width: 100%" ref="multipleTable">
            <el-table-column type="index" align="center" width="50"> </el-table-column>
            <el-table-column prop="orgName" label="机构名称" sortable header-align="center"></el-table-column>
            <el-table-column prop="orgCode" label="机构编码" sortable header-align="center"> </el-table-column>
            <el-table-column prop="desc" label="描述" sortable header-align="center"> </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
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
    <el-dialog :title="tiltemsg" :visible.sync="editVisible" width="40%">
      <el-form ref="form" :model="form" name="form" :rules="rules" label-width="100px">
        <input type="hidden" v-model="form.id">
        <el-form-item label="机构名称" prop="orgName">
          <el-input type="text" v-model="form.orgName"></el-input>
        </el-form-item>
        <el-form-item label="机构编码" prop="orgCode">
          <el-input type="text" v-model="form.orgCode"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows:50}" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="saveEdit" type="primary">保 存</el-button>
        <el-button @click="callOff">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import organization from './organization.js'
  export default {
    ...organization
  }

</script>
