<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.children">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">\{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.url">
                        <i :class="subItem.icon"></i><span slot="title">\{{ subItem.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i><span slot="title">\{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data(){
            return {
                collapse : false, 
                items:[  {
                        "id":1,
                        "icon": "el-icon-setting",
                        "url": "/dashboard",
                        "name": "系统首页"
                    } ],
            }
        },
        mounted :function(){
            this.getData();
        },
        methods:{
            getData(){
                this.items = JSON.parse(sessionStorage.getItem('permission')); 

                // let vm = this;
                // this.$axios.get("../../static/Sidebardata.json").then(function (response) {
                //     vm.items=response.data.items;
                // }).catch(function (error) {
                //     console.log(error);
                // });
               
            }
        },
        
       
        computed:{
            onRoutes(){
                // return this.$route.path.replace('/','');
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
         overflow-x: hidden!important;
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
