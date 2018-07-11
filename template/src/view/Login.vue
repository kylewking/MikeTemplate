<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips :欢迎使用XX后台管理系统。</p>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            ruleForm: {
                username: "",
                password: ""
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    // computed: { 
    //    ...mapGetters([ 
    //     'menuitems', 
    //     'isLoadRoutes' 
    //     // ... 
    //    ]) 
    // }, 

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$axios({
                        method: "post",
                        url: "/logindemo",
                        data: this.ruleForm
                    })
                        .then(res => {
                            let {statusCode,message, data} = res.data
                            if (statusCode == 200) {
                                if (data.state == true) {
                                    localStorage.setItem('ms_username',data.user.userRealName);

                                    window.sessionStorage.setItem('user', JSON.stringify(data.user)) 
                                    window.sessionStorage.setItem('permission', JSON.stringify(data.permission))
                                    
                                    this.$store.commit("changetype", "1");
                                     let redirect = decodeURIComponent(this.$route.query.redirect || '/');  //获取登录成功后要跳转的路由。
                                    this.$router.push({ path: redirect  })
                                } else {
                                     this.$message.error(data.msg);
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    return false;
                }
            });
        },
    //   ...mapActions([
    //     'addMenu',
    //     'loadRoutes'
    //   ])

    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
}
</style>