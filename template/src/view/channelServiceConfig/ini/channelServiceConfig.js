import channelServiceConfigModel from "../ChannelServiceConfigModel";
export default {
  components: {
    channelServiceConfigModel
  },
  data() {
    return {
      listurl: "/service/config/list",
      saveurl: "/service/config/save",
      deleteurl: "/service/config/delete/",
      tableData: [],
      pageNo: 1,
      pageSizesList: [10, 20, 50, 100],
      pageSize: 10,
      totalDataNumber: 1,

      channelName: [],
      serviceName: [],

      channel_search: null,
      service_search: null,
      handleMode_search: null,
      enabled_search: null,

      tiltemsg: "",
      editVisible: false,
      delVisible: false,

      handleMode: [{
        id: "sync",
        label: "同步"
      }, {
        id: "async",
        label: "异步"
      }],
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
        channelName: null,
        serviceName: null,
        handleMode: null,
        enabled: null,
        sendTimes: "",
        timeLimt: ""
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
        console.log(response.data.data)
        self.channelName = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.$axios({
        method: "GET",
        url: "/service/listAll"
      })
      .then(function (response) {
        console.log(response.data.data)
        self.serviceName = response.data.data;
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
    getData() {
      this.$axios
        .post(this.listurl, {
          size: this.pageSize,
          page: this.pageNo,
          "channel.id": this.channel_search,
          "service.id": this.service_search,
          handleMode: this.handleMode_search,
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
      this.channel_search = null;
      this.service_search = null;
      this.handleMode_search = null;
      this.enabled_search = null;
    },
    add() {
      this.tiltemsg = "新增";
      this.form = {
        enabled:true
      };
      this.editVisible = true;
    },

    formReset() {
      this.$refs.form.resetFields();
    },

    handleEdit(index, row) {
      this.tiltemsg = "编辑";
      this.idx = index;
      const item = this.tableData[index];
      console.log(item)
      this.form = {
        id: item.id,
        version: item.version,
        createTime: item.createTime,
        creator: item.creator,
        "form.channelName": item.channel.id,
        "form.serviceName": item.service.id,
        handleMode: item.handleMode,
        enabled: item.enabled + "",
        sendTimes: item.sendTimes,
        timeLimt: item.timeLimt
      };
      this.editVisible = true;
    },
    channelNormalizer(node) {
      return {
        id: node.id,
        label: node.channelName,
      }
    },
    serviceNormalizer(node){
      return {
        id: node.id,
        label: node.serviceName,
      }
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
    closeDialog(data) {
      this.editVisible = data; //子组件触发父组件事件，进行数据变更，同步result数据
    },
    formatterHandleMode(row, column) {
      switch (row.handleMode) {
        case "sync":
          return '同步';
          break;

        case "async":
          return '异步';
          break;

        default:
          return '';
      }
    },
    formatterEnabled(row, column) {
      switch (row.enabled) {
        case true:
          return '是';
          break;

        case false:
          return '否';
          break;

        default:
          return '';
      }
    },
  }
};

