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