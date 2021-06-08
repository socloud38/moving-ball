// Create Scene
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = "700px";
screen.style.height = "400px";
screen.style.border = "solid 1px black";
screen.style.background = "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)";

const floor = document.createElement('div');
floor.style.position = "absolute";
floor.style.bottom = 0;
floor.style.width = "700px";
floor.style.height = "10px";
floor.style.border = "solid 1px green";
floor.style.backgroundColor = "green";
screen.appendChild(floor);

const box = document.createElement('div');
box.style.position = "absolute";
box.style.bottom = "12px";
box.style.right = "25px";
box.style.width = "80px";
box.style.height = "120px";
box.style.backgroundColor = "#eae060";
box.style.border = "solid 2px #bbb44f";
box.style.borderRadius = "5px";
screen.appendChild(box);

class Player {
    constructor(perso) {
        this.perso = document.createElement('div');
        this.perso.style.position = "absolute";
        this.perso.style.bottom = "12px";
        this.perso.style.left = "25px";
        this.perso.style.width = "30px";
        this.perso.style.height = "30px";
        this.perso.style.backgroundColor = "red";
        this.perso.style.border = "solid 2px black";
        this.perso.style.borderRadius = "20px";
        this.perso.style.transition = "0.3s";
        screen.appendChild(this.perso);
    }

    get jumpHeight() {
        return this.perso.style.bottom;
    }

    movementRight() {
        this.perso.style.width = "40px";
        this.perso.style.left = `${parseInt(this.perso.style.left) + speed}px`;
    }

    movementLeft() {
        this.perso.style.width = "40px";
        this.perso.style.left = `${parseInt(this.perso.style.left) - speed}px`;
    }

    jump() {
        this.perso.style.height = '40px';
        this.perso.style.bottom = `${parseInt(this.perso.style.bottom) + force}px`;
    }

    resetWidthRight() {
        this.perso.style.width = "30px";
        this.perso.style.left = `${parseInt(this.perso.style.left) + speed}px`;
    }

    resetWidthLeft() {
        this.perso.style.width = "30px";
        this.perso.style.left = `${parseInt(this.perso.style.left) - speed}px`;
    }

    resetHeight() {
        this.perso.style.height = '30px';
    }

    inertieAfterJumping() {
        this.perso.style.bottom = `${parseInt(this.perso.style.bottom) - inertie }px`;
    }
}

root.appendChild(screen);

const perso = new Player();

// Make the character move and jump!
const speed = 30;
const force = 250;
const inertie = 50;
let onAir = false;

PlayerManager();

function PlayerManager() {
    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 39:
                perso.movementRight();
                break;
            case 37:
                perso.movementLeft();
                break;
            case 32:
                if(!onAir) {
                    perso.jump();
                    onAir = true;
                }
                break;
        }
    })
}
document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 39:
            perso.resetWidthRight();
            break;
        case 37:
            perso.resetWidthLeft();
            break;
    }
})

setInterval(() => {
    if(parseInt(perso.jumpHeight) > 12) {
        perso.inertieAfterJumping();
    } else {
        perso.resetHeight();
        onAir = false;
    }
}, 100)