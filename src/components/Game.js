/**Class representing the entire Game with the rules */
class Game {
  /**
   * Create a Game
   * @param {class} board - The Board Class
   * @param {array} weapons - Array of all the weapons
   * @param {array} players - Array of all the players
   */
  constructor(board, weapons, players) {
    this.board = board;
    this.weapons = weapons;
    this.players = players;
    this.numberOfCell = 0;
  }

  /**
   * Method to construct the board for the HTML page
   */
  showBoard() {
    let htmlBoard = document.getElementById("board");

    htmlBoard.style.visibility = "visible";

    for (let x = 0; x < this.board.cell_x; x += 1) {
      let line = document.createElement("tr");
      htmlBoard.appendChild(line);

      for (let y = 0; y < this.board.cell_y; y += 1) {
        let cell = document.createElement("td");
        cell.classList.add("cell");
        line.appendChild(cell);

        this.board.arrayOfCell[this.numberOfCell].htmlElement = cell;
        this.board.arrayOfCell[this.numberOfCell].htmlElement.style.zIndex = 9 - y;
        this.numberOfCell += 1;
      }
    }

    this.board.arrayOfCell
      .filter((cell) => !cell.available)
      .map((cell) => {
        cell.htmlElement.classList.add("false");
      });

    this.board.arrayOfCell
      .filter((cell) => cell.weapon.onBoard)
      .map((cell) => {
        cell.htmlElement.classList.add("weapon");
        cell.htmlElement.style.backgroundImage = `url(${cell.weapon.img})`;
      });

    this.board.arrayOfCell
      .filter((cell) => cell.player.onBoard)
      .map((cell) => {
        cell.htmlElement.classList.add("player");
        cell.htmlElement.style.backgroundImage = `url(${cell.player.img})`;
      });
  }

  /**
   * Method for start the Game
   */
  startGame() {
    let playerStart = this.players[Math.floor(Math.random() * this.players.length)];
    this.authorizedMovement(playerStart);
  }

  /**
   * Method for check where the player can move.
   * @param {Object} player - The player who play his turn
   */
  authorizedMovement(player) {
    if (player.movement === 0 && player.name === this.players[1].name) {
      player.movement = 3;
      player = this.players[0];
    }

    if (player.movement === 0 && player.name === this.players[0].name) {
      player.movement = 3;
      player = this.players[1];
    }

    for (let i = 1; i <= player.movement; i += 1) {
      let cell_Right = this.board.arrayOfCell.find((cell) => cell.y != 0 && cell.y === player.y + i && cell.x === player.x);
      if (cell_Right && cell_Right.available) {
        cell_Right.move = true;
        cell_Right.htmlElement.classList.add("move");
        cell_Right.htmlElement.onclick = () => {
          player.move(cell_Right, this.board.arrayOfCell, "right");
          if (this.board.checkPlayersPosition(this.players[0].x, this.players[0].y, this.players[1].x, this.players[1].y) === true) {
            this.fight(player);
          } else if (this.board.checkPlayersPosition(this.players[0].x, this.players[0].y, this.players[1].x, this.players[1].y) === false) {
            this.authorizedMovement(player);
          }
        };
      } else if (cell_Right && !cell_Right.available) {
        break;
      }
    }

    for (let i = 1; i <= player.movement; i += 1) {
      let cell_Left = this.board.arrayOfCell.find((cell) => cell.y != 9 && cell.y === player.y - i && cell.x === player.x);
      if (cell_Left && cell_Left.available) {
        cell_Left.move = true;
        cell_Left.htmlElement.classList.add("move");
        cell_Left.htmlElement.onclick = () => {
          player.move(cell_Left, this.board.arrayOfCell, "left");
          if (this.board.checkPlayersPosition(this.players[0].x, this.players[0].y, this.players[1].x, this.players[1].y) === true) {
            this.fight(player);
          } else if (this.board.checkPlayersPosition(this.players[0].x, this.players[0].y, this.players[1].x, this.players[1].y) === false) {
            this.authorizedMovement(player);
          }
        };
      } else if (cell_Left && !cell_Left.available) {
        break;
      }
    }

    for (let i = 1; i <= player.movement; i += 1) {
      let cell_Top = this.board.arrayOfCell.find((cell) => cell.x === player.x - i && cell.y === player.y);
      if (cell_Top && cell_Top.available) {
        cell_Top.move = true;
        cell_Top.htmlElement.classList.add("move");
        cell_Top.htmlElement.onclick = () => {
          player.move(cell_Top, this.board.arrayOfCell, "top");
          if (this.board.checkPlayersPosition(this.players[0].x, this.players[0].y, this.players[1].x, this.players[1].y) === true) {
            this.fight(player);
          } else if (this.board.checkPlayersPosition(this.players[0].x, this.players[0].y, this.players[1].x, this.players[1].y) === false) {
            this.authorizedMovement(player);
          }
        };
      } else if (cell_Top && !cell_Top.available) {
        break;
      }
    }

    for (let i = 1; i <= player.movement; i += 1) {
      let cell_Bottom = this.board.arrayOfCell.find((cell) => player.x + i <= 9 && cell.x === player.x + i && cell.y === player.y);
      if (cell_Bottom && cell_Bottom.available) {
        cell_Bottom.move = true;
        cell_Bottom.htmlElement.classList.add("move");
        cell_Bottom.htmlElement.onclick = () => {
          player.move(cell_Bottom, this.board.arrayOfCell, "bottom");
          if (this.board.checkPlayersPosition(this.players[0].x, this.players[0].y, this.players[1].x, this.players[1].y) === true) {
            this.fight(player);
          } else if (this.board.checkPlayersPosition(this.players[0].x, this.players[0].y, this.players[1].x, this.players[1].y) === false) {
            this.authorizedMovement(player);
          }
        };
      } else if (cell_Bottom && !cell_Bottom.available) {
        break;
      }
    }
  }

  /**
   * Method to execute an action of attack or defense of the player when he click in a specific button.
   * @param {Object} player - The player who play is turn
   */
  fight(player) {
    document.querySelector(".buttons-player-one .cast").onclick = () => {
      this.players[0].attack(this.players);
    };
    document.querySelector(".buttons-player-one .shield").onclick = () => {
      this.players[0].defense(this.players);
    };

    document.querySelector(".buttons-player-two .cast").onclick = () => {
      this.players[1].attack(this.players);
    };
    document.querySelector(".buttons-player-two .shield").onclick = () => {
      this.players[1].defense(this.players);
    };

    if (player.name === "Player one") {
      document.querySelector(".buttons-player-one").style.visibility = "visible";
    } else if (player.name === "Player two") {
      document.querySelector(".buttons-player-two").style.visibility = "visible";
    }
  }
}

export default Game;
