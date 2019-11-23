'use strict';

// Super class which has the render method which is common to both Enemy and Player
class GameObject {
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
    }
}

// Enemies our player must avoid
class Enemy extends GameObject {
    
    constructor(x, y, speed) {
        super();
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks  
    update(dt) {
        let locX = Math.floor(Math.random() * 5) + 1;
        this.x += dt * 100 * this.speed * locX;
    
        // if enemy moves beyond the boundary, then reset to initial position
        if (this.x > 800) {
            this.x = -300;

            // use random starting row for the enemy
            let locY = Math.floor(Math.random() * 3) + 1;
            switch (locY) {
                case 1: 
                    this.y = 60;
                    break;
                case 2:
                    this.y = 145;
                    break;
                default:
                    this.y = 228;    
            }
    
        }
    }
}

// Player class 
class Player extends GameObject  {

    constructor(sprite, x , y) {
        super();
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x >= 100) {
                    this.x -= 100;
                }
                break;
            case 'up':
                if (this.y >= 60) {
                    this.y -= 85;
                }
                break;
            case 'right':
                if (this.x <= 300) {
                    this.x += 100;
                }
                break;
            case 'down':
                if (this.y <= 315) {
                    this.y += 85;
                }
                break;
        }
        // if player position is in top row then game is won
        if (this.y === -25) {
            state.textContent = "You Won!!!";
            this.x = 200;
            this.y = 400;
            gameOver = true;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var gameOver = false;
var enemy1 = new Enemy(-100, 60, 0.4);
var enemy2 = new Enemy(-200, 145, 0.6);
var enemy3 = new Enemy(-300, 228, 0.7);
var enemy4 = new Enemy(-400, 60, 0.5);
var enemy5 = new Enemy(-800, 145, 2.3);
var enemy6 = new Enemy(-600, 228, 0.8);
var state = document.querySelector(".state");

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);

var player = new Player('images/char-boy.png', 200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    state.textContent = "";
    player.handleInput(allowedKeys[e.keyCode]);
});
