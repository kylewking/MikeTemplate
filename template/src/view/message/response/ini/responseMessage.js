export default {
  data() {
    return {
      listurl: "/message/response/list",
      tableData: [],
      pageNo: 1,
      pageSizesList: [10, 20, 50, 100],
      pageSize: 10,
      totalDataNumber: 1,

      serviceName:[],
      service_search: null,

      tiltemsg: "",
      viewVisible: false,
      form: {
        desc: "",
        message: ""
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
        url: "/service/listAll"
      })
      .then(function (response) {
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
          serviceCode: this.service_search
        })
        .then(res => {
          this.tableData = res.data.data.content;
          this.totalDataNumber = res.data.data.totalElements;
        });
    },
    serviceNormalizer(node){
      return {
        id: node.serviceCode,
        label: node.serviceName,
      }
    },
    search() {
      this.getData();
    },
    reset() {
      this.service_search = null;
    },
    handleDetail(index, row) {
      this.tiltemsg = "报文详情"
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        desc: item.desc,
        message: item.message,
      };
      this.viewVisible = true;
    }
  }
};
