/* 策略模式 */
var strategies = {
    'S': function(salary) {
        return salary * 4
    },
    'A': function(salary) {
        return salary * 3
    },
    'B': function(salary) {
        return salary * 2
    }
}

var calculateBonus = function(level, salary) {
    return strategies[level](salary)
}

calculateBonus('S', 10000) // 40000


/* 缓动算法 */
var tween = {
    linear: function(time, start, end, duration) {
        return start + (end - start) * (time / duration)
    },
    easeIn: function(time, start, end, duration) {
        return end * (time /= duration) * time + start
    }
}

var Animate = function(dom) {
    this.dom = dom
    this.startTime = 0
    this.startPos = 0
    this.endPos = 0
    this.propertyName = null
    this.easing = null
    this.duration = null
}

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
    this.startTime = +new Date
    this.startPos = this.dom.getBoundingClientRect()[propertyName]
    this.propertyName = propertyName
    this.endPos = endPos
    this.duration = duration
    this.easing = tween[easing]

    var self = this
    var timeId = setInterval(function() {
        if (self.step() === false) {
            clearInterval(timeId)
        }
    }, 19)
}

Animate.prototype.step = function() {
    var t = +new Date
    if (t >= this.startTime + this.duration) {
        this.update(this.endPos)
        return false
    }

    var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
    this.update(pos)
}

Animate.prototype.update = function(pos) {
    this.dom.style[this.propertyName] = pos + 'px'
}