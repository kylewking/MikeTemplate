    export default {
      data() {
          return {
          listurl: "/message/notify/list",
          tableData: [],
          pageNo: 1,
          pageSizesList: [10, 20, 50, 100],
          pageSize: 10,
          totalDataNumber: 1,
          editVisible: false,

          serviceName:[],
          service_search: null,
          messageBody:"",
          tiltemsg:"",
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
    mounted: function() {
      let self = this;
      this.$axios({
        method: "GET",
        url: "/service/listAll"
      })
        .then(function(response) {
          self.serviceName = response.data.data;
        })
        .catch(function(error) {
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
            serviceCode: this.service_search
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
        this.service_search= null;
      },
      handleReview(index, row) {
          const item = this.tableData[index];
              this.messageBody = item.message;
              this.editVisible = true;
      },
    }
  };
