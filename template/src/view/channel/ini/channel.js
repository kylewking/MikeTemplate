import channelModel from "../ChannelModel";
export default {
  components: {
    channelModel
  },
  data() {
    return {
      listurl: "/channel/list",
      saveurl: "/channel/save",
      deleteurl: "/channel/delete/",
      tableData: [],
      pageNo: 1,
      pageSizesList: [10, 20, 50, 100],
      pageSize: 10,
      totalDataNumber: 1,

      channel_name_search: "",
      channel_code_search: "",
      merchant_search: null,
      enabled_search: null,

      merchants: [],
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
  mounted: function () {
    let self = this;

    this.$axios({
        method: "GET",
        url: "/merchant/listAll"
      })
      .then(function (response) {
        self.merchants = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
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
      if (this.merchant_search == undefined) {
        this.merchant_search = null;
      }
      if (this.enabled_search == undefined) {
        this.enabled_search = null;
      }
      this.$axios
        .post(this.listurl, {
          size: this.pageSize,
          page: this.pageNo,
          channelName: this.channel_name_search,
          channelCode: this.channel_code_search,
          enabled: this.enabled_search,
          "merchant.id": this.merchant_search
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
      this.channel_name_search = "";
      this.channel_code_search = "";
      this.enabled_search = null;
      this.merchant_search = null;
    },

    add() {
      this.tiltemsg = "新增场景";
      this.form = {};
      this.editVisible = true;
    },

    handleEidt(index, row) {
      this.editVisible = true;
      const item = this.tableData[index];
      this.form.id = item.id;
      this.form.version = item.version;
      this.form.channelName = item.channelName;
      this.form.channelCode = item.channelCode;
      this.form.channelUser = item.channelUser,
      this.form.channelPwd = item.channelPwd,
      this.form.merchant = item.merchant.id,
      this.form.enabled = item.enabled + "",
      this.form.sendTimes = item.sendTimes,
      this.form.timeLimit = item.timeLimit,
      this.form.requestUrl = item.requestUrl,
      this.form.notifyUrl = item.notifyUrl,
      this.form.isEncrypt = item.isEncrypt + "",
      this.form.publicKey = item.publicKey,
      this.form.privateKey = item.privateKey,
      this.form.desc = item.desc;
      this.tiltemsg = "编辑场景";
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

    normalizer(node) {
      return {
        id: node.id,
        label: node.merchantName,
        children: node.children,
      }
    },

    closeDialog(data) {
      this.editVisible = data; //子组件触发父组件事件，进行数据变更，同步result数据
    }
  }
};
