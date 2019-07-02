/* 中介者模式 */


/* 泡泡堂游戏 */

// 定义玩家
function Player(name, teamColor) {
    this.name = name
    this.teamColor = teamColor
    this.state = 'alive'
}

Player.prototype.win = function() {
    console.log(this.name + ' won')
}

Player.prototype.lose = function() {
    console.log(this.name + ' lose')
}

Player.prototype.die = function() {
    this.state = 'dead'
    playerDirector.ReceiveMessage('playerDead', this) // 向中介者发送消息, 玩家死亡
}

Player.prototype.remove = function() {
    playerDirector.ReceiveMessage('removePlayer', this) // 向中介者发送消息, 移除一个玩家
}

Player.prototype.changeTeam = function(color) {
    playerDirector.ReceiveMessage('changeTeam', this, color) // 向中介者发送消息, 玩家换队
}

// 玩家工厂
var PlayerFactory = function(name, teamColor) {
    var newPlayer = new Player(name, teamColor)
    playerDirector.ReceiveMessage('addPlayer', newPlayer)

    return newPlayer
}

// 定义中介者
var playerDirector = (function() {
    var players = {}
    var operations = {}

    operations.addPlayer = function(player) {
        var teamColor = player.teamColor
        players[teamColor] = players[teamColor] || []
        players[teamColor].push(player)
    }

    operations.removePlayer = function(player) {
        var teamColor = player.teamColor
        var teamPlayers = players[teamColor] || []

        for (var i = teamPlayers.length - 1; i >= 0; i--) {
            if (teamPlayers[i] === player) {
                teamPlayers.splice(i, 1)
            }
        }
    }

    operations.changeTeam = function(player, newTeamColor) {
        operations.removePlayer(player)
        player.teamColor = newTeamColor
        operations.addPlayer(player)
    }

    operations.playerDead = function(player) {
        var teamColor = player.teamColor
        var teamPlayers = players[teamColor]

        var all_dead = true

        for (var i = 0, player; player = teamPlayers[i++]; ) {
            if (player.state != 'dead') {
                all_dead = false
                break
            }
        }

        if (all_dead == true) {
            for (var i = 0, player; player = teamPlayers[i++]; ) {
                player.lose()
            }

            for (var color in players) {
                if (color != teamColor) {
                    var teamPlayers = players[color]
                    for (var i = 0, player; player = teamPlayers[i++]; ) {
                        player.win()
                    }
                }
            }
        }
    }

    var ReceiveMessage = function() {
        var message = Array.prototype.shift.call(arguments)

        operations[message].apply(this, arguments)
    }

    return {
        ReceiveMessage: ReceiveMessage
    }
}())