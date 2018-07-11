import Vue from 'vue';
import treeTable from "@/components/common/TreeTable";

export default {

  components: {
    treeTable,
  },
  data() {
    return {
      iconClass: true,
      listurl: "/resource/list_resource",
      parenturl: "/resource/list_parent",
      saveurl: "/resource/save_resource",
      deleteurl: "/resource/delete_resource/",
      currentitem: Object,
      tableData: [],

      name_search: "",
      enabled_search: null,
      tiltemsg: "",
      editVisible: false,
      delVisible: false,

      iconmap: [{
          label: "菜单",
          id: "el-icon-setting"
        },
        {
          label: "子菜单",
          id: "el-icon-caret-right"
        },
        {
          label: "搜索",
          id: "el-icon-search"
        },
        {
          label: "新增",
          id: "el-icon-plus"
        },
        {
          label: "编辑",
          id: "el-icon-edit"
        },
        {
          label: "删除",
          id: "el-icon-delete"
        },
        {
          label: "重置",
          id: "el-icon-refresh"
        }
      ],

      resourceType: [{
        id: "MAINMENU",
        label: "导航菜单"
      }, {
        id: "MENU",
        label: "非导航菜单"
      }, {
        id: "DATA",
        label: "数据"
      }, {
        id: "BUTTON",
        label: "按钮"
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
        createTime: "",
        creator: "",
        updateTime: "",
        updator: "",
        name: "",
        resourceType: "",
        url: "",
        order: "",
        parentPermission: "",
        parentId: [],
        children: null,
        enabled: "",
        icon: "",
        desc: ""
      },

      rules: {
        name: [{
            required: true,
            message: "请输入资源名称",
            trigger: "blur"
          }
        ],
        url: [{
            required: true,
            message: "请输入资源路径",
            trigger: "blur"
          }
        ],
        enabled: [{
            required: true,
            message: "请选择是否启用",
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
      idx: -1,

      args: [null, null, null],
      columns:[{
        text: '资源名称',
        value: 'name',
        width: 200,
        align:"center"
        }]
    };

  },
  created() {
    this.getData();
  },

  computed: {},
  methods: {
    callOff() {
      this.editVisible = false;
      this.$refs["form"].resetFields();
    },
    closeDialog(done) {
      done();
      this.$refs["form"].resetFields();
    },
    getIconName(row, column) {
      let name = "";
      this.iconmap.forEach(item => {
        if (item["id"] === row.icon) {
          name = item["label"];
        }
      });
      return name;
    },
    search() {
      this.getData();
    },
    reset() {
      this.name_search = "";
      this.enabled_search = "";
    },
    add() {
      this.tiltemsg = "添加";
      this.form = {
        enabled: "true",
      };
      this.editVisible = true;
    },
    getData() {
      this.$axios.post(this.listurl, {
        size: 20,
        page: 1,
        name: this.name_search,
        enabled: this.enabled_search
      }).then(res => {
        this.tableData = res.data.data.content;
      });
    },
    handleEdit(index, row) {
      this.tiltemsg = "编辑";
      this.idx = index;
      this.currentitem = row;
      if (row.parentId) {
        this.form = {
          id: row.id,
          createTime: row.createTime,
          creator: row.creator,
          updateTime: row.updateTime,
          updator: row.updator,
          name: row.name,
          resourceType: row.resourceType,
          url: row.url,
          order: row.order,
          parentPermission: row.parentPermission,
          icon: row.icon,
          enabled: row.enabled + "",
          children: row.children,
          desc: row.desc,
          parentId: [row.parentId],
        };
      } else {
        this.form = {
          id: row.id,
          createTime: row.createTime,
          creator: row.creator,
          updateTime: row.updateTime,
          updator: row.updator,
          name: row.name,
          resourceType: row.resourceType,
          url: row.url,
          order: row.order,
          parentPermission: row.parentPermission,
          icon: row.icon,
          enabled: row.enabled + "",
          children: row.children,
          desc: row.desc
        };
      }
      this.editVisible = true;
    },
    normalizer(node) {
      if (node.children && node.children.length == 0) {
        Vue.delete(node, 'children');
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      }
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
      this.currentitem = row;
    },
    saveEdit() {
      console.log(this.saveurl)
      console.log(this.form)
      var qs = require('querystring')
     
      console.log( qs.stringify(this.form))
      return;
      this.$axios.post(this.saveurl, this.form).then(res => {
        if (res.data.statusCode == 200) {
          if (this.tiltemsg == "添加") {
            this.editVisible = false;
            this.$message.success(`添加成功`);
            this.getData();
          } else if (this.tiltemsg == "编辑") {
            this.editVisible = false;
            this.$message.success(`修改成功`);
            this.getData();
          }
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    deleteRow() {
      this.$axios.get(this.deleteurl + this.currentitem.id, this.form).then(res => {
        if (res.data.statusCode == 200) {
          this.$message.success("删除成功");
          this.delVisible = false;
          this.getData();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
