// 鸭子模型
// 如果它走起来像鸭子，叫起来也像鸭子，那么它就是鸭子
var duck = {
    duckSinging: function() {
        console.log('gagaga')
    }
}

var chicken = {
    duckSinging: function() {
        console.log('gagaga')
    }
}

function isDuck(duck) {
    return duck.duckSinging
}


// 多态


// 封装
var myObj = (function() {
    var _name = 'hcxowe' // private

    return {
        // public method
        getName: function() {
            return _name
        }
    }
}())


// 简易的 bind
Function.prototype.bind = function(context) {
    var self = this
    return function() {
        return self.apply(context, arguments)
    }
}

// img 数据上报
var report = (function() {
    var imgs = []
    return function(src) {
        var img = new Image()
        imgs.push(img)
        img.src = src
    }
}())


// AOP 面向切面编程
Function.prototype.before = function(beforeFn) {
    var self = this

    return function() {
        var args = [].slice.apply(arguments)
        beforeFn.apply(this, args)
        
        return self.apply(this, args)
    }
}

Function.prototype.after = function(afterFn) {
    var self = this

    return function() {
        var args = [].slice.apply(arguments)
        afterFn.apply(this, args)
        
        return self.apply(this, args)
    }
}

// 函数柯里化
var currying = function(fn) {
    var args = []

    return function() {
        var arg = [].slice.apply(arguments)

        if (arg.length == 0) {
            return fn.apply(this, args)
        }

        [].push.apply(args, arg)
        return arguments.callee // 返回函数自身, ES6废弃
    }
}

var cost = function() {
    return [].reduce.call(arguments, function(x, y) { return x + y})
}

// 反柯里化
Function.prototype.uncurrying = function() {
    var self = this

    return function() {
        /* var obj = [].shift.call(arguments)

        return self.apply(obj, arguments) */

        return Function.prototype.call.apply(self, arguments)
    }
}

var push = Array.prototype.push.uncurrying()

var ary = [1,2,3]
push(ary, 4)
console.log(ary) // [1,2,3,4]


// 函数节流
var throttle = function(fn, interval) {
    var self = fn,
        timer,
        firstTime = true

    return function() {
        var args = arguments,
            that = this

        // 第一次立即触发
        if (firstTime) {
            self.apply(that, args)
            firstTime = false
            return
        }

        if (timer) {
            return false
        }

        timer = setTimeout(function() {
            clearTimeout(timer)
            timer = null

            self.apply(that, args)
        }, interval || 500)
    }
}

// 函数防抖
var debounce = function(method, delay) {
    let timer = null

    return function() {
        let self = this,
            args = arguments

        timer && clearTimeout(timer)
        timer = setTimeout(function () {
            method.apply(self,args)
        }, delay)
    }
}

// 分时函数
var timeChunk = function(ary, fn, count) {
    var obj, 
        t,
        len = ary.length

    var start = function() {
        for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift()
            fn(obj)
        }
    }

    return function() {
        t = setInterval(function() {
            if (ary.length === 0) {
                return clearInterval(t)
            }

            start()
        }, 200)
    }
}

// 惰性加载函数
var addEvent = function(elem, type, handler) {
    if (window.addEventListener) {
        addEvent = function(elem, type, handler) {
            elem.addEventListener(type, handler, false)
        }
    }
    else if(window.attachEvent) {
        addEvent = function(elem, type, handler) {
            elem.attachEvent('on' + type, handler)
        }
    }

    addEvent(elem, type, handler)
}