const draw = () => {
    // Default translation
    context.setTransform(1, 0, 0, 1, 0, 0);
    // Clear old stuff
    context.clearRect(0, 0, canvas.width, canvas.height);

    const camX = -player.locX + canvas.width / 2;
    const camY = -player.locY + canvas.height / 2;
    context.translate(camX, camY);

    players.forEach((p) => {
        context.beginPath();
        context.fillStyle = p.color;
        // x, y, radius, sAngle, eAngle, counterClockWise
        context.arc(p.locX, p.locY, 10, 0, Math.PI * 2);
        // context.arc(200, 200, 10, 0, 2 * Math.PI);
        context.fill();
        context.lineWidth = 3; // border size
        context.strokeStyle = 'rgb(0, 255, 0)';
        context.stroke();
    });

    orbs.forEach((orb) => {
        context.beginPath();
        context.fillStyle = orb.color;
        context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
        context.fill();
    });

    requestAnimationFrame(draw);
};

canvas.addEventListener('mousemove', (event) => {
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height / 2), mousePosition.x - (canvas.width / 2)) * 180 / Math.PI;
    if (angleDeg >= 0 && angleDeg < 90) {
        console.log('Bottom Rigth');
        xVector = 1 - (angleDeg / 90);
        yVector = -(angleDeg / 90);
    } else if (angleDeg >= 90 && angleDeg <= 180) {
        console.log('Bottom Left');
        xVector = -(angleDeg - 90) / 90;
        yVector = -(1 - ((angleDeg - 90) / 90));
    } else if (angleDeg >= -180 && angleDeg < -90) {
        console.log('Top Left');
        xVector = (angleDeg + 90) / 90;
        yVector = (1 + ((angleDeg + 90) / 90));
    } else if (angleDeg < 0 && angleDeg >= -90) {
        console.log('Top Right');
        xVector = (angleDeg + 90) / 90;
        yVector = (1 - ((angleDeg + 90) / 90));
    }

    player.xVector = xVector;
    player.yVector = yVector;
});