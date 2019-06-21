/* 单实例1 */
var Singleton = function(name) {
    this.name = name
}

Singleton.instance = null
Singleton.prototype.getName = function() {
    console.log(this.name)
}

Singleton.getInstance = function(name) {
    if (!this.instalce) {
        this.instance = new Singleton(name)
    }

    return this.instance
}

/* 单实例2 */
var Singleton = function(name) {
    this.name = name
}

Singleton.prototype.getName = function() {
    console.log(this.name)
}

Singleton.getInstance = (function() {
    var instance = null
    return function(name) {
        if (!instance) {
            instance = new Singleton(name)
        }

        return instance
    }
}())

/* 透明的单例模式 */
var CreateDiv = (function() {
    var instance

    var CreateDiv = function(html) {
        if (instance) {
            return instance
        }

        this.html = html
        this.init()
        return instance = this
    }

    CreateDiv.prototype.init = function() {
        var div = document.createElement('div')
        div.innerHTML = this.html
        document.body.appendChild(div)
    }

    return CreateDiv
}())

/* 使用代理实现单实例 */
var CreateDiv = function(html) {
    this.html = html
    this.init()
}

CreateDiv.prototype.init = function() {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
}

var ProxySingletonCreateDiv = (function() {
    var instance 
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html)
        }

        return instance
    }
}())

/* 惰性单实例 */
var getSingle = function(fn) {
    var result 
    return function() {
        return result || (result = fn.apply(this, arguments))
    }
}

// 创建 登陆浮窗 函数
var createLoginLayer = function() {
    var div = document.createElement('div')
    div.innerHTML = '我是登陆浮窗'
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
}

// 惰性获取单实例的 登陆浮窗
var createSingleLoginLayer = getSingle(createLoginLayer)

// 展示 登陆浮窗
document.getElementById('#loginBtn').onclick = function() {
    var loginLayer = createSingleLoginLayer()
    loginLayer.style.display = 'block'
}