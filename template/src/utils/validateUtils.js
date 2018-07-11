//身份证校验
export  var validateIdNum = (rule, value, callback) => {
    if (!value) {
      return callback(new Error("身份证号不能为空!"));
    } else {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(value) === false) {
        return callback(new Error("请输入正确的身份证格式!"));
      } else {
        return callback();
      }
    }
  };
//手机号码校验
  export var validatePhone = (rule, value, callback) => {
    if (value != "" && value != null && value != undefined) {
      var reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error("请输入有效的手机号码"));
      }
    }
    callback();
  };
  //邮箱格式校验
  export var validateEmail = (rule, value, callback) => {
    if (value != "" && value != null && value != undefined) {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error("请输入有效的邮箱"));
      }
    }
    callback();
  };

