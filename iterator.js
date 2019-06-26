/* 迭代器模式 */

// 外部迭代器
var Iterator = function(obj) {
    var current = 0
    var next = function() {
        current += 1
    }

    var isDone = function() {
        return current >= obj.length
    }

    var getCurrItem = function() {
        return obj[current]
    }

    return {
        next: next,
        isDone: isDone,
        getCurrItem: getCurrItem,
        length: obj.length
    }
}

/* 使用 */
var compare = function(iterator1, iterator2) {
    if (iterator1.length != iterator2.length) {
        console.log('不相等')
        return
    }

    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem) {
            console.log('不相等')
            return
        }

        iterator1.next()
        iterator2.next()
    }

    console.log('相等')
}