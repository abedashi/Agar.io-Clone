// Sockets Stuff
const io = require('../server').io;

// const checkForOrbCollisions = require('./checkCollisions').checkForOrbCollisions;
// const checkForPlayerCollisions = require('./checkCollisions').checkForPlayerCollisions;

const Orb = require('./classes/Orb');
// classes
const Player = require('./classes/Player');
const PlayerConfig = require('./classes/PlayerConfig');
const PlayerData = require('./classes/PlayerData');

let orbs = [];
let players = [];

let settings = {
    defaultOrbs: 500,
    defaultSpeed: 6,
    defaultSize: 6,
    defaultZoom: 1.5,
    worldWidth: 500,
    worldHeight: 500
}

// At beginning of a new game
const initGame = () => {
    for (let i = 0; i < settings.defaultOrbs; i++) {
        orbs.push(new Orb(settings.worldWidth, settings.worldHeight));
    }
}

initGame();

io.sockets.on('connect', (socket) => {
    let player = {};
    socket.on('init', (data) => {
        socket.join('game');
        let playerConfig = new PlayerConfig(settings);
        let playerData = new PlayerData(data.playerName, settings);
        player = new Player(socket.id, playerData, playerConfig);
        console.log(player);
        // issue a message to THIS client with it's loc 30/sec
        setInterval(() => {
            io.to('game').emit('tock', {
                players,
                playerX: player.playerData.locX,
                playerY: player.playerData.locY,
            });
        }, 33); //there are 30 33s in 1000 milliseconds, or 1/30th of a second, or 1 of 30fps

        socket.emit('initReturn', {
            orbs
        });
        players.push(playerData);
    })

    socket.on('tick', (data) => {
        speed = player.playerConfig.speed;
        xV = player.playerConfig.xVector = data.xVector;
        yV = player.playerConfig.yVector = data.yVector;

        if ((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > 500) && (xV > 0)) {
            player.playerData.locY -= speed * yV;
        } else if ((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)) {
            player.playerData.locX += speed * xV;
        } else {
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        }
    })
});

module.exports = io;
