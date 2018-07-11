import serviceModel from "../ServiceModel";
export default {
  components: {
    serviceModel
  },
  data() {
    return {
      listurl: "/service/list",
      saveurl: "/service/save",
      deleteurl: "/service/delete/",
      tableData: [],
      pageNo: 1,
      pageSizesList: [10, 20, 50, 100],
      pageSize: 10,
      totalDataNumber: 1,

      serviceCode_search: "",
      serviceName_search: "",
      enabled_search: null,

      enabled: [{
        id: "true",
        label: "是"
      }, {
        id: "false",
        label: "否"
      }],

      tiltemsg: "",
      editVisible: false,
      delVisible: false,
      form: {},
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getData();
    },

    getData() {
      if (this.enabled_search == undefined) {
        this.enabled_search = null;
      }
      this.$axios
        .post(this.listurl, {
          size: this.pageSize,
          page: this.pageNo,
          serviceCode: this.serviceCode_search,
          serviceName: this.serviceName_search,
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
      this.channel_search = "";
      this.serviceCode_search = "";
      this.serviceName_search = "";
      this.enabled_search = null;
    },

    add() {
      this.tiltemsg = "新增";
      this.form = {
        enabled: "true"
      };
      this.editVisible = true;
    },

    handleEdit(index, row) {
      this.tiltemsg = "编辑";
      const item = this.tableData[index];
      this.form.id = item.id;
      this.form.version = item.version;
      this.form.createTime = item.createTime;
      this.form.creator = item.creator;
      this.form.serviceName = item.serviceName;
      this.form.serviceCode = item.serviceCode;
      this.form.serviceUrl = item.serviceUrl;
      this.form.httpMethod = item.httpMethod;
      this.form.enabled = item.enabled + "";
      this.form.desc = item.desc;
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
    // 确定删除
    deleteRow() {
      const item = this.tableData[this.idx];
      this.$axios.get(this.deleteurl + item.id, this.form).then(res => {
        this.tableData.splice(this.idx, 1);
        this.$message.success("删除成功");
        this.delVisible = false;
      });
    },

    enabledFormat: function (row, column, cellValue, index) {
      var value = cellValue;
      if (value == true) {
        return "是";
      }
      return "否";
    },

    closeDialog(data) {
      this.editVisible = data; //子组件触发父组件事件，进行数据变更，同步result数据
    }
  }
};
