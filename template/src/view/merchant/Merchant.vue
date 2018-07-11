<template>
   <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 基础配置</el-breadcrumb-item>
                <el-breadcrumb-item>场景管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <label class="input-label">场景名称</label>
                            <el-input class="search-input" v-model="scenario_name_search" clearable placeholder="机构名称" ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <label class="input-label">场景编码</label>
                            <el-input class="search-input" v-model="scenario_code_search" clearable placeholder="机构编码" ></el-input>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                          <label class="input-label">是否有效</label>
                           <el-select class="search-input" v-model="enabled_search" clearable placeholder="请选择">
                                <el-option key=true label="是" value=true></el-option>
                                <el-option key=false label="否" value=false></el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" justify="end">
                  <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                            <el-button type="warning" icon="el-icon-refresh" @click="reset">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
          <div class="container">
          <el-header>
            <el-row type="flex" justify="space-between">
              <el-col :span="2">
                <label class="datagrid-label">场景列表</label>
              </el-col>
              <el-col :span="2">
                <el-button type="success" icon="el-icon-plus" @click="add">新增</el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-main>
            <el-table :data="getlist" border style="width: 100%" ref="multipleTable">
                <el-table-column type="index" align="center" width="50"> </el-table-column>
                <el-table-column prop="merchantName" label="场景名称" sortable header-align="center" width="200"></el-table-column>
                <el-table-column prop="merchantCode" label="场景编码" sortable header-align="center" width="200"> </el-table-column>
                <el-table-column prop="enabled" :formatter="enabledFormat" label="是否有效" sortable header-align="center" width="200"> </el-table-column>
                <el-table-column prop="desc" label="描述" sortable header-align="center" width="200"> </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="handleEidt(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
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
        </el-main>
      </div>
    </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="tiltemsg" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="100px">
                <input type="hidden"  v-model="form.id">
                <input  v-model="form.version"  type="text" hidden="true">
                <input  v-model="form.createTime"  type="text" hidden="true">
                <input  v-model="form.creator"  type="text" hidden="true">
                <el-form-item label="场景名称" prop="merchantName" :rules="[{ required: true, message: '场景名称不能为空'}]">
                    <el-input type="text" v-model="form.merchantName" clearable></el-input>
                </el-form-item>
                <el-form-item label="场景编码" prop="merchantCode" :rules="[{ required: true, message: '场景编码不能为空'}]">
                    <el-input type="text" v-model="form.merchantCode" clearable></el-input>
                </el-form-item>
                <el-form-item label="是否有效">
                  <el-select v-model="form.enabled" clearable placeholder="是否有效" class="handle-select">
                    <el-option key="true" label="是" value="true"></el-option>
                    <el-option key="false" label="否" value="false"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" :autosize="{ minRows: 5, maxRows:50}" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="saveEdit" type="primary">保 存</el-button>
                <el-button @click="cancelEdit">取 消</el-button>
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
  import merchant from  './merchant.js'
    export default {
      ...merchant
    }
</script>

