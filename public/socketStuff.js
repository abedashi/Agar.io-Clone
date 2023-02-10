let socket = io.connect('http://localhost:3001');

// This function is called whenever user clicked on play solo button
const init = () => {
    draw();
    socket.emit('init', {
        playerName: player.name
    });
};
// console.log(player)
socket.on('initReturn', (data) => {
    orbs = data.orbs;
    setInterval(() => {
        socket.emit('tick', {
            xVector: player.xVector,
            yVector: player.yVector
        });
    }, 33);
});

socket.on('tock', (data) => {
    console.log(data);
    players = data.players;
    player.locX = data.playerX;
    player.locY = data.playerY;
});

