<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <!--  <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <el-row :gutter="20">
          <el-col :span="5">
            <div style="height: 25px;"></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">用户名称</label>
              <el-input v-model="name_search" placeholder="用户名称" class="query-input mr10" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">登陆名称</label>
              <el-input v-model="username_search" placeholder="登陆名称" class="query-input mr10" clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <div style="height: 25px;"></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="input-label">身份证号</label>
              <el-input v-model="idNum_search" placeholder="身份证号" class="query-input mr10" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <label class="select-label">是否启用</label>
              <treeselect v-model="enabled_search" class="query-select mr10" :options="enabled" placeholder="是否启用" />
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
        <div class="tableTitle">用户列表</div>
        <div class="tableButton">
          <el-button type="toolbar" icon="el-icon-plus" size="mini" @click="add">新 增</el-button>
        </div>
      </div>
      <div class="tableDiv" style="">
        <el-table :data="getlist" style="" :fit="false" border tooltip-effect="dark" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="index" align="center"> </el-table-column>
          <el-table-column prop="name" align="center" label="用户名称" width="180px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="username" align="center" label="登陆名称" width="180px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="idNum" align="center" label="身份证" width="180px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="empNum" align="center" label="员工号" width="150px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sex" align="center" label="性别" width="50px" :formatter="formatterSex" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" align="center" label="手机号" width="120px" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="email" align="center" label="Email" width="180px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="desc" align="center" label="描述" width="200px" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center" width="100px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination class="pull-right clearfix pageSelect" @size-change="handleSizeChange" background :current-page.sync="pageNo" :page-sizes="pageSizesList"
            :page-size="pageSize" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="totalDataNumber">
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :title="tiltemsg" :visible.sync="editVisible" :before-close="closeDialog" width="30%">
      <el-form ref="form" :model="form" status-icon :rules="rules" name="form" label-width="100px">
        <input v-model="form.id" type="text" hidden="true">
        <input v-model="form.version" type="text" hidden="true">
        <input v-model="form.createTime" type="text" hidden="true">
        <input v-model="form.creator" type="text" hidden="true">

        <el-form-item label="用户名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登陆名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idNum">
          <el-input v-model="form.idNum"></el-input>
        </el-form-item>
        <el-form-item label="员工号" prop="empNum">
          <el-input v-model="form.empNum"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <treeselect v-model="form.enabled" :options="enabled" placeholder="是否启用" :clearable="false" />
        </el-form-item>
        <el-form-item label="描 述" prop="desc">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows:6}" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEdit">确 定</el-button>
        <el-button @click="callOff">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import userList from './userList.js'
  export default {
    ...userList
  }

</script>
