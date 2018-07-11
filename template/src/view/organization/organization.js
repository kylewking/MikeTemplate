
    export default {
      data() {
        return {
          listurl: "/org/list",
          saveurl: "/org/save",
          deleteurl: "/org/delete/",
          tableData: [],
          pageNo: 1,
          pageSizesList: [10, 20, 50, 100],
          pageSize: 10,
          totalDataNumber: 1,

          org_name_search: "",
          org_code_search: "",
          tiltemsg:"",
          editVisible: false,
          delVisible: false,
          form: {
            orgCode: "",
            orgName: "",
            desc:"",
          },

          rules: {
            orgName: [{
                required: true,
                message: "请输入机构名称",
                trigger: "blur"
              }
            ],
            orgCode: [{
                required: true,
                message: "请输入机构编码",
                trigger: "blur"
              }
            ],
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
        // 获取 easy-mock 的模拟数据
        getData() {
          this.$axios
            .post(this.listurl, {
              size: this.pageSize,
              page: this.pageNo,
              orgName: this.org_search,
              orgCode: this.merchant_search
            })
            .then(res => {
              this.tableData = res.data.data.content;
              this.totalDataNumber = res.data.data.totalElements;
            });
        },
        search() {
          this.getData();
        },
        reset() {
          this.org_search="";
          this.merchant_search="";
        },
        add(){
          this.tiltemsg="新增机构";
          this.editVisible = true;
        },
        callOff() {
          this.editVisible = false;
          this.$refs["form"].resetFields();
        },
        closeDialog(done) {
          done();
          this.$refs["form"].resetFields();
        },
        saveEdit() {
          this.$refs.form.validate(valid => {
              if (valid) {
                this.$axios.post(this.saveurl, this.form).then(res => {
                  if (res.data.statusCode == 200) {
                    this.resetEdit();
                    this.editVisible = false;
                    this.$message.success(`保存成功`);
                    this.getData();
                  } else {
                    this.$message.aerror(res.data.message);
                }
              });
            }
          });
        },
        handleEidt(index, row) {
            const item = this.tableData[index];
                this.form.id = item.id
                this.form.orgName = item.orgName;
                this.form.orgCode = item.orgCode;
                this.form.desc = item.desc;
                this.editVisible = true;
                this.tiltemsg="编辑机构";
        },
        handleDelete(index, row) {
          this.idx = index;
          this.delVisible = true;
        },
        // 确定删除
        deleteRow() {
          const item = this.tableData[this.idx];
          this.$axios.get(this.deleteurl + item.id, this.form).then(res => {
            this.tableData.splice(this.idx, 1);
            this.$message.success("删除成功");
            this.delVisible = false;
          });
        }
      }
    };
