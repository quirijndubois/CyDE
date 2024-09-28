const backgroundCanvas = document.getElementById('canvas');
const ctx = backgroundCanvas.getContext('2d');

// Set the canvas size to full screen
function resizeCanvas() {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;
}

// Resize the canvas when the window is resized
window.addEventListener('resize', resizeCanvas);

// Function to generate random circles
function drawCircle(x, y, radius, r, g, b) {
    x = backgroundCanvas.width * x;
    y = backgroundCanvas.height * y;
    radius = radius * 50 + 10; // Circle radius between 10 and 60
    r = Math.floor(r * 256);
    g = Math.floor(g * 256);
    b = Math.floor(b * 256);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fill();
}

// Function to animate and draw random circles continuously
function drawCircles() {
    for (let i = 0; i < 30; i++) {
        drawCircle(
            Math.random(),
            Math.random(),
            Math.random() * 10,
            Math.random(),
            Math.random(),
            Math.random(),
        ); // Draw 10 random circles
    }
    // requestAnimationFrame(drawCircles); // Keep animating
}

resizeCanvas();

drawCircles();

// make canvas background transparent
backgroundCanvas.style.backgroundColor = 'rgba(0, 0, 0, 0)';

// on load
window.onload = function () {
    drawCircles();
}

// on resize
window.onresize = function () {
    resizeCanvas();
    drawCircles();
}