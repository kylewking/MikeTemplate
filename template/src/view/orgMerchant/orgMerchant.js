export default {
  data() {
    return {
      listurl: "/org/merchant/list",
      saveurl: "/org/merchant/save",
      deleteurl: "/org/merchant/delete_org_merchant/",
      tableData: [],
      pageNo: 1,
      pageSizesList: [10, 20, 50, 100],
      pageSize: 10,
      totalDataNumber: 1,
      orgName: [],
      merchantName: [],
      org_search: null,
      merchant_search: null,

      tiltemsg: "",
      editVisible: false,
      delVisible: false,
      form: {
        orgName: null,
        merchantName: null
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
  mounted: function () {
    let self = this;
    this.$axios({
        method: "GET",
        url: "/org/listAll"
      })
      .then(function (response) {
        self.orgName = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.$axios({
        method: "GET",
        url: "/merchant/listAll"
      })
      .then(function (response) {
        self.merchantName = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
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
          orgId: this.org_search,
          merchantId: this.merchant_search
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
      this.org_search = null;
      this.merchant_search = null;
    },
    add() {
      this.tiltemsg = "新增";
      this.editVisible = true;
    },
    saveEdit() {
      this.$axios.post(this.saveurl, this.form).then(res => {
        if (res.data.statusCode == 200) {
          this.formReset();
          this.editVisible = false;
          this.$message.success(`添加成功`);
          this.getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    orgNormalizer(node) {
      return {
        id: node.id,
        label: node.orgName,
      }
    },
    merchantNormalizer(node) {
      return {
        id: node.id,
        label: node.merchantName,
      }
    },
    formReset() {
      this.$refs.form.resetFields();
    },
    cancelEdit() {
      this.formReset();
      this.editVisible = false;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
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
    // 确定删除
    deleteRow() {
      const item = this.tableData[this.idx];
      this.$axios.get(this.deleteurl + item.orgId + "/" + item.merchantId, this.form).then(res => {
        this.tableData.splice(this.idx, 1);
        this.$message.success("删除成功");
        this.delVisible = false;
      });
    }
  }
};
