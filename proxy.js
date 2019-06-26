/* 代理模式 */

/* 图片预加载 */
var myImage = (function() {
    var imgNode = document.createElement('img')
    document.body.appendChild(imgNode)

    return {
        setSrc: function(src) {
            imgNode.src = src
        }
    }
})

var proxyImage = (function() {
    var img = new Image
    img.onload = function() {
        myImage.setSrc(this.src)
    }

    return {
        setSrc: function(src) {
            // 设置占位图片
            myImage.setSrc('loading.gif') 

            img.src = src
        }
    }
})


/* 虚拟代理的惰性加载应用 */

// 虚拟代理
var miniConsole = (function() {
    var cache = []

    var handler = function(ev) {
        if (ev.keyCode === 113) {
            var script = document.createElement('script')
            script.onload = function() {
                for (var i = 0, fn; fn = cache[i]; i++) {
                    fn()
                }
            }

            script.src = 'miniConsole.js'
            document.getElementsByTagName('head')[0].appendChild(script)

            // 只加载一次脚本
            document.body.removeEventListener('keydown', handler) 
        }
    }

    // 监听按键触发加载 miniConsole 本体
    document.body.addEventListener('keydown', handler, false)

    return {
        log: function() {
            var args = arguments

            cache.push(function() {
                return miniConsole.log.apply(miniConsole, args)
            })
        }
    }
}())

miniConsole.log(11)  // 打印调用, 虚拟代理处理, 将打印请求缓存在cache

// miniConsole.js 

// 覆盖虚拟代理
miniConsole = {
    log: function() {
        console.log([].slice.call(arguments))
    }
}

/* 高阶函数动态创建代理 */
var mult = function() {
    var a = 1

    for (var i = 0, l = arguments.length; i < l; i++) {
        a *= arguments[i]
    }

    return a
}

var plus = function() {
    var a = 0

    for (var i = 0, l = arguments.length; i < l; i++) {
        a += arguments[i]
    }

    return a
}

// 创建缓存代理的工厂
var createProxyFactory = function(fn) {
    var cache = {}

    return function() {
        var args = Array.prototype.join.call(arguments, ',')

        if (args in cache) {
            return cache[args]
        }

        return cache[args] = fn.apply(this, arguments)
    }
}

// 使用
var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus)

console.log(proxyMult(1,2,3,4)) // 24
console.log(proxyMult(1,2,3,4)) // 23
console.log(proxyPlus(1,2,3,4)) // 10
console.log(proxyPlus(1,2,3,4)) // 10