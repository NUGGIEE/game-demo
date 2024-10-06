// JavaScript source code
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 800;
const HEIGHT = 800;

// Colors
const BLACK = 'black';
const YELLOW = 'yellow';
const BLUE = '#6495ED'; // Earth color
const RED = 'red';      // Mars color

// Class for a planet
class Planet {
    constructor(x, y, radius, color, distanceFromSun, orbitalPeriod) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.distanceFromSun = distanceFromSun;
        this.angle = 0;
        this.orbitalPeriod = orbitalPeriod; // In frames
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    updatePosition(sunX, sunY) {
        // Calculate orbital angle increment (makes planets move)
        this.angle += 2 * Math.PI / this.orbitalPeriod;

        // Update the x and y based on the new angle
        this.x = sunX + this.distanceFromSun * Math.cos(this.angle);
        this.y = sunY + this.distanceFromSun * Math.sin(this.angle);
    }
}

// Sun in the center
const sunX = WIDTH / 2;
const sunY = HEIGHT / 2;

// Create planets (x, y, radius, color, distance_from_sun, orbital_period in frames)
const earth = new Planet(sunX, sunY, 10, BLUE, 150, 360);
const mars = new Planet(sunX, sunY, 8, RED, 250, 680);

// List of planets
const planets = [earth, mars];

// Game loop
function gameLoop() {
    ctx.fillStyle = BLACK; // Clear screen with black
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw the Sun
    ctx.beginPath();
    ctx.arc(sunX, sunY, 20, 0, Math.PI * 2);
    ctx.fillStyle = YELLOW;
    ctx.fill();
    ctx.closePath();

    // Update and draw each planet
    for (const planet of planets) {
        planet.updatePosition(sunX, sunY);
        planet.draw();
    }

    requestAnimationFrame(gameLoop); // Call gameLoop again for the next frame
}

// Start the game loop
gameLoop();
