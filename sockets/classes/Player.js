class Player {
    constructor(socketId, data, config) {
        this.socketId = socketId;
        this.playerData = data;
        this.playerConfig = config;
    }
}

module.exports = Player;