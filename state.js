/* 状态模式 */

/* 点灯按钮切换 */

// 灯
var Light = function() {
    this.offLightState = new OffLightState(this)
    this.weakLightState = new WeakLightState(this)
    this.strongLightState = new StrongLightState(this)

    this.button = null
}

Light.prototype.init = function() {
    var button = document.createElement('button')
    var self = this

    this.button = document.appendChild(button)
    this.button.innerHTML = '开关'
    this.currState = this.offLightState

    this.button.onclick = function() {
        self.currState.buttonWasPressed()
    }
}

Light.prototype.setState = function(newState) {
    this.currState = newState
}

// 定义关灯状态
var offLightState = function(light) {
    this.light = light
}

offLightState.prototype.buttonWasPressed = function() {
    console.log('弱光')
    this.light.setState(this.light.weakLightState)
}

// 定义弱光光状态
var weakLightState = function(light) {
    this.light = light
}

weakLightState.prototype.buttonWasPressed = function() {
    console.log('强光')
    this.light.setState(this.light.weakLightState)
}

// 定义强光状态
var strongLightState = function(light) {
    this.light = light
}

strongLightState.prototype.buttonWasPressed = function() {
    console.log('强光')
    this.light.setState(this.light.offLightState)
}