export default {
  data() {
      return {
          show: false,
          listurl: "/message/request/list",
          initSelectUrl: "/service/listAll",

          tableData: [],
          pageNo: 1,
          pageSizesList: [1, 10, 20, 50],
          pageSize: 10,
          totalDataNumber: 1,
          messageBody: "",
          multipleSelection: [],
          serviceName:[],
          service_search: null,
          name_search: "",
          editVisible: false,
          delVisible: false,
          idx: -1
      };
  },
  created() {
      this.getData();
      this.initSelect();
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
      serviceNormalizer(node){
        return {
          id: node.serviceCode,
          label: node.serviceName,
        }
      },
      // 获取 easy-mock 的模拟数据
      getData() {
          // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
          //   if (process.env.NODE_ENV === "development") {
          //     this.url = "/ms/table/list";
          //   }
          this.$axios
              .post(this.listurl, {
                  size: this.pageSize,
                  page: this.pageNo,
                  channelUser: this.name_search,
                  serviceCode: this.service_search
              })
              .then(res => {
                  this.tableData = res.data.data.content;
                  this.totalDataNumber = res.data.data.totalElements;
              });
      },
      initSelect() {
          //初始化下来框
          this.$axios.get(this.initSelectUrl).then(res => {
              let datas = res.data.data;
              for (let i = 0; i < datas.length; i++) {
                  var item = {
                      value: datas[i].serviceCode,
                      label: datas[i].serviceName
                  };
                  this.multipleSelection.push(item);
              }
          });
      },
      search() {
          this.getData();
      },
      reset() {
          this.service_search = null;
          this.name_search = "";
      },
      opendDiglog(index, row) {
          const item = this.tableData[index];
          this.messageBody = item.message;
          this.editVisible = true;
      }
  }
};
