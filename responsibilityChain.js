/* 职责链模式 */

/*  
500定金返回 100优惠券 
200定金返回 50优惠券
没有定金没有优惠券
有定金不受库存影响
*/

// orderType 订单类型
// pay 是否已付定金
// stock 无定金库存数量
var order500 = function(orderType, pay, stock) {
    if (orderType == 1 && pay) {
        console.log('500定金已付款, 得到100优惠券')
        return
    }

    return 'nextSuccessor'
}

var order200 = function(orderType, pay, stock) {
    if (orderType == 2 && pay) {
        console.log('200定金已付款, 得到50优惠券')
        return
    }

    return 'nextSuccessor'
}

var orderNormal = function(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买, 无优惠券')
        return
    }

    console.log('库存不足')
}

var Chain = function(fn) {
    this.fn = fn
    this.successor = null
}

Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor
}

Chain.prototype.passRequest = function() {
    var ret = this.fn.apply(this, arguments)

    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }

    return ret
}

// 异步职责链
Chain.prototype.next = function() {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(2, true, 500)
chainOrder500.passRequest(3, true, 500)
chainOrder500.passRequest(1, false, 0)


// AOP 实现职责链
Function.prototype.after = function() {
    var self = this

    return function() {
        var ret = self.apply(this, arguments)

        if (ret === 'nextSuccessor') {
            return fn.apply(this, arguments)
        }

        return ret
    }
}

var order = order500.after(order200).after(orderNormal)

order(1, true, 500)
order(2, true, 500)
order(3, true, 500)
order(1, false, 0)