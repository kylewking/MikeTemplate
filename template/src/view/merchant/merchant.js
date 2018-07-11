    export default {
      data() {
        return {
          listurl: "/merchant/list",
          saveurl: "/merchant/save",
          deleteurl: "/merchant/delete/",
          tableData: [],
          pageNo: 1,
          pageSizesList: [10, 20, 50, 100],
          pageSize: 10,
          totalDataNumber: 1,
          orgs: [],
          scenario_name_search: "",
          merchants: [],
          scenario_code_search: "",
          enabled_search:"",
          desc: "",
          merchantName: "",
          merchantCode: "",
          tiltemsg:"",
          editVisible: false,
          delVisible: false,
          form: {
            merchantName: "",
            merchantCode: "",
            enabled: "",
            desc:"",
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
              merchantName: this.scenario_name_search,
              merchantCode: this.scenario_code_search,
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
        reset() {
          this.scenario_name_search="";
          this.scenario_code_search="";
          this.enabled_search="";
        },
        add(){
          this.tiltemsg="新增场景";
          this.resetEdit();
          this.editVisible = true;
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
        resetEdit() {
          this.form.id="";
          this.form.merchantName="";
          this.form.merchantCode="";
          this.form.enabled="";
          this.form.desc="";
        },
        cancelEdit() {
          this.resetEdit();
          this.editVisible = false;
        },
        handleEidt(index, row) {
            const item = this.tableData[index];
                this.form.id = item.id;
                this.form.version = item.version;
                this.form.merchantName = item.merchantName;
                this.form.merchantCode = item.merchantCode;
                this.form.enabled = item.enabled+"";
                this.form.desc = item.desc;
                this.editVisible = true;
                this.tiltemsg="编辑场景";
        },
        handleDelete(index, row) {
          this.idx = index;
          this.delVisible = true;
        },
        enabledFormat: function(row, column, cellValue, index){
          var value = cellValue;
          if (value == true) {
            return "是";
            }
            return "否";
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
