import {validateIdNum,validatePhone,validateEmail} from "../../utils/validateUtils.js"
export default {
  data() {
    return {
      listurl: "/user/list_user",
      saveurl: "/user/save_user",
      deleteurl: "/user/delete_user/",
      tableData: [],
      pageNo: 1,
      pageSizesList: [1, 10, 20, 50],
      pageSize: 10,
      totalDataNumber: 1,

      multipleSelection: [],

      name_search: "",
      username_search: "",
      idNum_search: "",
      enabled_search: null,

      tiltemsg: "",
      editVisible: false,
      enabled: [{
        id: "true",
        label: "是"
      }, {
        id: "false",
        label: "否"
      }],

      form: {
        id: "",
        version: "",
        createTime: "",
        creator: "",
        name: "",
        username: "",
        password: "",
        idNum: "",
        empNum: "",
        sex: "1",
        phone: "",
        email: "",
        enabled: "true",
        desc: ""
      },

      rules: {
        name: [{
            required: true,
            message: "请输入登录名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度最多 20 个字符",
            trigger: "blur"
          }
        ],
        username: [{
            required: true,
            message: "请输入用户名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度最多 20 个字符",
            trigger: "blur"
          }
        ],
        password: [{
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "密码最多 50 个字符",
            trigger: "blur"
          }
        ],
        idNum: [{
          required: true,
          validator: validateIdNum,
          trigger: "blur"
        }],
        empNum: [{
          required: true,
          message: "请输入员工号",
          trigger: "blur"
        }],
        phone: [{
          validator: validatePhone,
          trigger: "blur"
        }],
        email: [{
          validator: validateEmail,
          trigger: "blur"
        }],
        desc: [{
          min: 0,
          max: 500,
          message: "长度最多 500 个字符",
          trigger: "blur"
        }]
      },
      idx: -1
    };
  },
  created() {
    this.getData();
  },
  computed: {
    getlist() {
      return this.tableData;
    }
  },
  methods: {
    reset() {
      this.name_search = "";
      this.username_search = "";
      this.idNum_search = "";
      this.enabled_search = null;
    },
    // 分页导航
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 分页导航
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getData();
    },
    getData() {
      if(this.enabled_search == undefined){
        this.enabled_search = null;
      }
      this.$axios
        .post(this.listurl, {
          size: this.pageSize,
          page: this.pageNo,
          name: this.name_search,
          username: this.username_search,
          idNum: this.idNum_search,
          enabled: this.enabled_search
        })
        .then(res => {
          this.tableData = res.data.data.content;
          this.totalDataNumber = res.data.data.totalElements;
        });
    },
    search() {
      this.getData();
    },
    add() {
      this.tiltemsg = "添加";
      this.editVisible = true;
    },
    callOff() {
      this.editVisible = false;
      this.$refs.form.resetFields();
    },
    closeDialog(done) {
      done();
      this.$refs.form.resetFields();
    },
    handleEdit(index, row) {
      this.tiltemsg = "编辑";
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        id: item.id,
        version: item.version,
        createTime: item.createTime,
        creator: item.creator,
        name: item.name,
        username: item.username,
        password: item.password,
        idNum: item.idNum,
        empNum: item.empNum,
        sex: item.sex,
        phone: item.phone,
        email: item.email,
        enabled: item.enabled + "",
        desc: item.desc
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.$confirm('确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRow();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$axios.post(this.saveurl, this.form).then(res => {
            if (res.data.statusCode == 200) {
              if (this.tiltemsg == "添加") {
                this.editVisible = false;
                this.$message.success(`添加成功`);
                this.getData();
              } else if (this.tiltemsg == "编辑") {
                this.$set(
                  this.tableData,
                  this.idx,
                  res.data.data
                );
                this.editVisible = false;
                this.$message.success(`修改成功`);
              }
            } else {
              this.$message.error(res.data.message);
            }
            //   {"statusCode":10001,"message":"名称和编码机构下已存在！","data":null}
          });
        }
      });
    },
    // 确定删除
    deleteRow() {
      const item = this.tableData[this.idx];
      this.$axios.get(this.deleteurl + item.id, this.form).then(res => {
        this.tableData.splice(this.idx, 1);
        this.$message.success("删除成功");
        // this.delVisible = false;
      });
    },
    formatterSex(row, column) {
      if (row.sex == 1) {
        return "男";
      } else {
        return "女";
      }
    }
  }
};
