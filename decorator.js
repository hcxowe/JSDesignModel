/* 装饰者模式 */

/* 表单校验 */
Function.prototype.before = function(beforefn) {
    var _self = this

    return function() {
        if (beforefn.apply(this, arguments) === false) {
            return
        }

        _self.apply(this, arguments)
    }
}

// 校验方法
var validate = function() {
    if (username.value === '') {
        console.log('用户名不能为空')
        return false
    }

    if (password.value === '') {
        console.log('密码不能为空')
        return false
    }

    return true
}

var formSubmit = function() {
    var param = {
        username: username.value,
        password: password.value
    }

    ajax('htpp://xxx.com/login', param)
}

formSubmit = formSubmit.before(validate)

btn.onclick = function() {
    formSubmit()
}