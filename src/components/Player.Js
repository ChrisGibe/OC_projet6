/** Class representing a Player */
class Player {
  /**
   * Create a player
   * @param {Sring} name - The name of the player
   * @param {Number} life - The life of the player
   * @param {String} img - The image of the player
   */
  
  constructor(name, life, img) {
    this.y = "";
    this.x = "";
    this.damage = 10;
    this.name = name;
    this.life = life;
    this.posture = "Attack";
    this.img = img;
    this.movement = 3;
    this.onBoard = false;
    this.equipedWeapon = {};
  }

  /**
   * Method for moving a player on the board
   * @param {Object} cell - The cell where the player have clicked to move
   * @param {Array<Object>} arrayOfCell - The array of all the cells
   * @param {Sring} direction - The diection where the player is moving
   */
  move(cell, arrayOfCell, direction) {
    let oldPosition = arrayOfCell.find((cell) => cell.player.name === this.name);

    if (cell.weapon.onBoard) {
      this.equipWeapon(cell, this);
    }

    if (direction === "right" || direction === "left") {
      let diff = Math.abs(oldPosition.y - cell.y);
      this.movement -= diff;
    } else if (direction === "top" || direction === "bottom") {
      let diff = Math.abs(oldPosition.x - cell.x);
      this.movement -= diff;
    }

    oldPosition.player = {};
    oldPosition.move = true;
    oldPosition.available = true;
    oldPosition.htmlElement.style.backgroundImage = "";
    oldPosition.htmlElement.classList.remove("false", "player");

    this.x = cell.x;
    this.y = cell.y;

    cell.player = { ...this };
    cell.move = false;
    cell.available = false;
    cell.htmlElement.classList.add("false", "player");
    cell.htmlElement.style.backgroundImage = `url(${this.img})`;

    if (oldPosition.weapon.onBoard) {
      oldPosition.htmlElement.style.backgroundImage = `url(${oldPosition.weapon.img})`;
    }

    arrayOfCell.map((cell) => cell.htmlElement.classList.remove("move"));
    arrayOfCell.filter((cell) => cell.htmlElement.onclick).map((cell) => (cell.htmlElement.onclick = null));
    arrayOfCell.map((cell) => (cell.move = false));
  }

  /**
   * Method for to equip or to unequip the player of a weapon.
   * @param {Object} cell - The cell where the player is 
   * @param {Object} player - The player who play his turn
   */
  equipWeapon(cell, player) {
    let damageHtmlPlayerOne = document.querySelector("#dmg-player-one");
    let damageHtmlPlayerTwo = document.querySelector("#dmg-player-two");

    let imgSpellHtmlPlayerOne = document.querySelector("#spell-player-one img");
    let imgSpellHtmlPlayerTwo = document.querySelector("#spell-player-two img");

    if (player.name === "Player one") {
      damageHtmlPlayerOne.innerHTML = "Damage : " + cell.weapon.damage;
      imgSpellHtmlPlayerOne.src = cell.weapon.img;
      imgSpellHtmlPlayerOne.style.display = "flex";
    } else if (player.name === "Player two") {
      damageHtmlPlayerTwo.innerHTML = "Damage : " + cell.weapon.damage;
      imgSpellHtmlPlayerTwo.src = cell.weapon.img;
      imgSpellHtmlPlayerTwo.style.display = "flex";
    }

    if (player.damage === 10) {
      player.equipedWeapon = { ...cell.weapon };
      player.damage = player.equipedWeapon.damage;

      cell.weapon = {};
      cell.htmlElement.style.backgroundImage = "none";
      cell.htmlElement.style.border = "none";
    } else if (player.damage > 10) {
      let currentWeapon = player.equipedWeapon;

      player.equipedWeapon = {};
      player.equipedWeapon = { ...cell.weapon };
      player.damage = player.equipedWeapon.damage;

      cell.weapon = { ...currentWeapon };
      cell.htmlElement.style.backgroundImage = "none";
      cell.htmlElement.style.border = "none";
    }
  }

  /**
   * Method to attack another player
   * @param {Array<Object>} arrayOfPlayers - The array of all the players 
   */
  attack(arrayOfPlayers) {
    let playerOne = arrayOfPlayers[0];
    let playerTwo = arrayOfPlayers[1];

    if (this === playerOne) {
      playerTwo.life = playerTwo.posture === "Attack" ? playerTwo.life - playerOne.damage : playerTwo.life - playerOne.damage / 2;

      document.querySelector("#life-player-two").innerHTML = `${playerTwo.life} : Life`;
      this.posture = "Attack";
      document.querySelector("#posture-player-one").innerHTML = `Posture : ${playerOne.posture}`;

      document.querySelector(".buttons-player-one").style.visibility = "hidden";
      document.querySelector(".buttons-player-two").style.visibility = "visible";
    } else if (this === playerTwo) {
      playerOne.life = playerOne.posture === "Attack" ? playerOne.life - playerTwo.damage : playerOne.life - playerTwo.damage / 2;

      document.querySelector("#life-player-one").innerHTML = `Life : ${playerOne.life}`;
      this.posture = "Attack";

      document.querySelector("#posture-player-two").innerHTML = `${playerTwo.posture} : Posture`;
      document.querySelector(".buttons-player-two").style.visibility = "hidden";
      document.querySelector(".buttons-player-one").style.visibility = "visible";
    }

    if (playerOne.life <= 0 || playerTwo.life <= 0) {
      document.querySelector(".buttons-player-one").style.visibility = "hidden";
      document.querySelector(".buttons-player-two").style.visibility = "hidden";
      alert("Fin de la partie !");
    }
  }

  /**
   * Method to choose a defensive posture.
   * @param {Array<Object>} arrayOfPlayers - The arrat of all the players 
   */
  defense(arrayOfPlayers) {
    let playerOne = arrayOfPlayers[0];
    let playerTwo = arrayOfPlayers[1];

    if (this === playerOne) {
      this.posture = "Defense";
      document.querySelector("#posture-player-one").innerHTML = `Posture : ${playerOne.posture}`;
      document.querySelector(".buttons-player-one").style.visibility = "hidden";
      document.querySelector(".buttons-player-two").style.visibility = "visible";
    } else if (this === playerTwo) {
      this.posture = "Defense";
      document.querySelector("#posture-player-two").innerHTML = `${playerTwo.posture} : Posture`;
      document.querySelector(".buttons-player-two").style.visibility = "hidden";
      document.querySelector(".buttons-player-one").style.visibility = "visible";
    }
  }
}

export default Player;
