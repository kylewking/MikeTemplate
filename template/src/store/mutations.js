export default {
    getIsLogin() {
       return sessionStorage.isLogin;
    }, 
    changetype(state,type) {
       sessionStorage.setItem("isLogin",type+"");
        return;
    }
}
