import treeTable from "@/components/common/TreeTable";
import resourceModel from "../ResourceModel";
export default {

  components: {
    treeTable,
    resourceModel
  },
  data() {
    return {
      iconClass: true,
      listurl: "/resource/list_resource",
      parenturl: "/resource/list_parent",
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

      enabled: [{
        id: "true",
        label: "是"
      }, {
        id: "false",
        label: "否"
      }],

      form: {},

      idx: -1,

      args: [null, null, null],
      columns: [{
        text: '资源名称',
        value: 'name',
        width: 200,
        align: "center" 
      }]
    };

  },
  created() {
    this.getData();
  },

  computed: {},
  methods: {
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
      this.enabled_search = null;
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

    add() {debugger;
      this.tiltemsg = "新增";
      this.form = {
        enabled: "true",
      };
      this.editVisible = true;
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
          path: row.path,
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

    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
      this.currentitem = row;
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
    },

    closeDialog(data) {
      this.editVisible = data; //子组件触发父组件事件，进行数据变更，同步result数据
    }
  }
};
