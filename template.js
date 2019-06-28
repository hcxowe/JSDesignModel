/* 模板方法模式 */

/* 咖啡和茶 */

// 父类
var Beverage = function() {

}

Beverage.prototype.boilWater = function() {
    console.log('把水煮开')
}

Beverage.prototype.brew = function() {
    throw new Error('子类需要重写brew方法')
}

Beverage.prototype.pourInCup = function() {
    throw new Error('子类需要重写pourInCup方法')
}

Beverage.prototype.addCondiments = function() {
    throw new Error('子类需要重写addCondiments方法')
}

Beverage.prototype.init = function() {
    this.boilWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()
}

// 咖啡
var Coffee = function() {}

Coffee.prototype = new Beverage()

Coffee.prototype.brew = function() {
    console.log('用水冲泡咖啡')
}

Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子')
}

Coffee.prototype.addCondiments = function() {
    console.log('添加牛奶和糖')
}

var coffee = new Coffee()
coffee.init()

// 茶
var Tea = function() {}

Tea.prototype = new Beverage()

Tea.prototype.brew = function() {
    console.log('用水冲泡茶')
}

Tea.prototype.pourInCup = function() {
    console.log('把茶倒进杯子')
}

Tea.prototype.addCondiments = function() {
    console.log('添加柠檬')
}

var tea = new Tea()
tea.init()