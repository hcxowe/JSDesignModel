/* 命令模式 */

// 命令执行操作
var MeunBar = {
    refresh: function() {
        console.log('refresh')
    }
}

// 命令对象
var RefreshMeunBarCommand = function(receiver) {
    return {
        execute: function() {
            receiver.refresh()
        }
    }
}

// 发送命令
var setCommand = function(button, command) {
    button.onclick = function() {
        command.execute()
    }
}

var refreshMeunBarCommand = RefreshMeunBarCommand(MeunBar)
setCommand(document.getElementById('refresh'), refreshMeunBarCommand)