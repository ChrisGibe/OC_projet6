/** Class representing the array of the Board */
class Board {
  /**
   * Create a Board
   * @param {Number} cell_x - The number of line
   * @param {Number} cell_y - The number of column
   * @param {Number} cellNotAvailable - The total of available cell
   * @param {Array} arrayOfCell - Empty Array
   *
   */

  constructor() {
    this.cell_x = 10;
    this.cell_y = 10;
    this.cellNotAvailable = Math.floor((this.cell_x * this.cell_y) / 10);
    this.arrayOfCell = [];
  }

  
  /**
   * Method for create and push all the cells object white the weapons and players.
   * @param {Array<Object>} arrayOfWeapons - The array of all the weapons
   * @param {Array<Object>} arrayOfPlayers - THe array of all the players
   */
  createBoard(arrayOfWeapons, arrayOfPlayers) {
    for (let x = 0; x < this.cell_x; x += 1) {
      for (let y = 0; y < this.cell_y; y += 1) {
        this.arrayOfCell.push({
          x: x,
          y: y,
          available: true,
          move: false,
          weapon: {},
          player: {},
          htmlElement: "",
        });
      }
    }

    while (this.arrayOfCell.filter((cell) => !cell.available).length < this.cellNotAvailable) {
      let cell = this.arrayOfCell[Math.floor(Math.random() * (this.cell_x * this.cell_y))];

      cell.available = false;
    }

    while (this.arrayOfCell.filter((cell) => cell.weapon.onBoard).length < 4) {
      let weaponsNoTOnBoard = arrayOfWeapons.filter((weapon) => !weapon.onBoard);

      let weaponObject = weaponsNoTOnBoard[Math.floor(Math.random() * weaponsNoTOnBoard.length)];
      weaponObject.onBoard = true;

      let cellsAvailable = this.arrayOfCell.filter((cell) => cell.available && !cell.weapon.onBoard);

      let cell = cellsAvailable[Math.floor(Math.random() * cellsAvailable.length)];
      cell.weapon = { ...weaponObject };
    }

    while (this.arrayOfCell.filter((cell) => cell.player.onBoard).length < 2) {
      if (this.arrayOfCell.filter((cell) => cell.player.onBoard).length === 0) {
        let playerObject = arrayOfPlayers[Math.floor(Math.random() * arrayOfPlayers.length)];

        let cellsAvailable = this.arrayOfCell.filter((cell) => cell.available && !cell.weapon.onBoard && !cell.player.onBoard);
        let cell = cellsAvailable[Math.floor(Math.random() * cellsAvailable.length)];

        playerObject.x = cell.x;
        playerObject.y = cell.y;
        playerObject.onBoard = true;

        cell.available = false;
        cell.player = { ...playerObject };
      } else if (this.arrayOfCell.filter((cell) => cell.player.onBoard).length === 1) {
        let firstPlayerOnBoard = arrayOfPlayers.find((player) => player.onBoard);
        let playerNotOnBoard = arrayOfPlayers.find((player) => !player.onBoard);

        let cellsAvailable = this.arrayOfCell.filter((cell) => cell.available && !cell.weapon.onBoard && !cell.player.onBoard);
        let cell = cellsAvailable[Math.floor(Math.random() * cellsAvailable.length)];

        playerNotOnBoard.x = cell.x;
        playerNotOnBoard.y = cell.y;

        if (this.checkPlayersPosition(firstPlayerOnBoard.x, firstPlayerOnBoard.y, playerNotOnBoard.x, playerNotOnBoard.y) === false) {
          playerNotOnBoard.onBoard = true;

          cell.available = false;
          cell.player = { ...playerNotOnBoard };
        }
      }
    }
  }

  /**
   * Method for check the position of the two players on board. 
   * If return true, the 2 players are side by side.
   * @param {Number} playerOne_x - The x position of the player one
   * @param {Number} playerOne_y - The y position of the player one
   * @param {Number} playerTwo_x - The x position of the player two
   * @param {Number} playerTwo_y - The y position of the player two
   */
  checkPlayersPosition(playerOne_x, playerOne_y, playerTwo_x, playerTwo_y) {
    const diff_X = Math.abs(playerOne_x - playerTwo_x);
    const diff_Y = Math.abs(playerOne_y - playerTwo_y);

    if ((diff_X === 1 && diff_Y === 0) || (diff_X === 0 && diff_Y === 1)) {
      return true;
    } else return false;
  }
}

export default Board;
