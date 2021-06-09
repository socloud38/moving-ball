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
    constructor() {
        this.speed = 30;
        this.force = 250;
        this.inertie = 50;
        this.onAir = false;

        this.perso = document.createElement('div');
        this.perso.style.position = "absolute";
        this.perso.style.bottom = "12px";
        this.perso.style.left = "25px";
        this.perso.style.width = "50px";
        this.perso.style.height = "50px";
        this.perso.style.backgroundImage = "url(./images/player/mario2.png)";
        this.perso.style.backgroundPosition = "center";
        this.perso.style.backgroundSize = "contain";
        this.perso.style.backgroundRepeat = "no-repeat";
        this.perso.style.borderRadius = "10px";
        this.perso.style.transition = "0.3s";
        screen.appendChild(this.perso);
    }

    initialized() {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 39:
                    this.perso.style.left = `${parseInt(this.perso.style.left) + this.speed}px`;
                    this.perso.style.transform = 'scaleX(1)';
                    break;
                case 37:
                    this.perso.style.left = `${parseInt(this.perso.style.left) - this.speed}px`;
                    this.perso.style.transform = 'scaleX(-1)';
                    break;
                case 32:
                    if(!this.onAir) {
                        this.perso.style.bottom = `${parseInt(this.perso.style.bottom) + this.force}px`;
                        this.onAir = true;
                    }
                    break;
            }
        })

        setInterval(() => {
            if(parseInt(this.perso.style.bottom) > 12) {
                this.perso.style.bottom = `${parseInt(this.perso.style.bottom) - this.inertie }px`;
            } else {
                this.onAir = false;
            }
        }, 100)
    }
}

root.appendChild(screen);

// Make the character move and jump!
const perso = new Player();
perso.initialized();


