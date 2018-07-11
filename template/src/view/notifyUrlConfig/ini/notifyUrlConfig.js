export default {
  data() {
    return {
      listurl: "/url/config/list",
      saveurl: "/url/config/save",
      deleteurl: "/url/config/delete/",
      tableData: [],
      pageNo: 1,
      pageSizesList: [10, 20, 50, 100],
      pageSize: 10,
      totalDataNumber: 1,

      channel_search: null,
      serviceCode_search: "",
      serviceName_search: "",
      channelName:[],
      tiltemsg: "",
      editVisible: false,
      delVisible: false,

      httpMethod: [{
        id: "GET",
        label: "GET"
      }, {
        id: "POST",
        label: "POST"
      },{
        id: "PUT",
        label: "PUT"
      },{
        id: "PATCH",
        label: "PATCH"
      },{
        id: "DELETE",
        label: "DELETE"
      }],
      type: [{
        id: "http",
        label: "http"
      }, {
        id: "callback",
        label: "callback"
      }],
      form: {
        id: "",
        version: "",
        createTime: "",
        creator: "",
        channelName: null,
        serviceName: "",
        serviceCode: "",
        httpMethod: null,
        type: null,
        notifyUrl: "",
        desc: ""
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
        url: "/channel/listAll"
      })
      .then(function (response) {
        self.channelName = response.data.data;
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
          "channel.id": this.channel_search,
          serviceCode: this.serviceCode_search,
          serviceName: this.serviceName_search
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
      this.channel_search = null;
      this.serviceCode_search = "";
      this.serviceName_search = "";
    },
    add() {
      this.tiltemsg = "新增";
      this.editVisible = true;
    },
    saveEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios.post(this.saveurl, this.form).then(res => {
            if (res.data.statusCode == 200) {
              this.editVisible = false;
              this.$message.success(`保存成功`);
              this.formReset();
              this.getData();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    formReset() {
      this.$refs.form.resetFields();
    },
    cancelEdit() {
      this.formReset();
      this.editVisible = false;
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
        channelName: item.channel.id,
        serviceName: item.serviceName,
        serviceCode: item.serviceCode,
        httpMethod: item.httpMethod,
        type: item.type,
        notifyUrl: item.notifyUrl,
        desc: item.desc
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    channelNormalizer(node) {
      return {
        id: node.id,
        label: node.channelName,
      }
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
    }
  }
};
