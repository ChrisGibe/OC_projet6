import _, { indexOf, toPlainObject, times } from "lodash";
import "./style.css";

import Board from "./components/Board";
import Weapon from "./components/Weapon";
import Player from "./components/Player";
import Game from "./components/Game";

import imgWarningShog from "./img/warning-shot.png";
import imgGetExcited from "./img/get-excited.png";
import imgGrasp from "./img/grasp-of-the-undying.png";
import imgVengeance from "./img/vengeance.png";

import PoroGaren from "./img/poro-garen.jpg";
import PoroDarius from "./img/poro-darius.jpg";
import PoroJinx from "./img/poro-jinx.jpg";
import PoroLux from "./img/poro-lux.jpg";

let avatars = document.querySelectorAll("label img");
avatars[0].setAttribute("src", `${PoroGaren}`);
avatars[1].setAttribute("src", `${PoroDarius}`);
avatars[2].setAttribute("src", `${PoroJinx}`);
avatars[3].setAttribute("src", `${PoroLux}`);

let avatarsArray = [];

let select = document.querySelectorAll("ul input");
let playerOne = document.querySelector("#player-one-img");
let playerTwo = document.querySelector("#player-two-img");

for (let i = 0; i < select.length; i++) {
  select[i].addEventListener("click", chooseYourAvatars);
}

let numberOfAvatars = 0;
/** @function updateDisplay */
function chooseYourAvatars(event) {
  if (event.target.checked === true) {
    avatarsArray.push(event.target.nextElementSibling.firstChild.attributes[0].value);
    numberOfAvatars += 1;
    if (numberOfAvatars === 1) {
      playerOne.style.backgroundImage = `url(${event.target.nextElementSibling.firstChild.attributes[0].value})`;
    }

    if (numberOfAvatars === 2) {
      for (let i = 0; i < select.length; i++) {
        if (!select[i].checked) {
          playerTwo.style.backgroundImage = `url(${event.target.nextElementSibling.firstChild.attributes[0].value})`;
          select[i].disabled = true;
        }
      }
    }
  } else if (event.target.checked === false) {
    avatarsArray.splice(event.target.nextElementSibling.firstChild.attributes[0].value);
    numberOfAvatars -= 1;
    for (let i = 0; i < select.length; i++) {
      if (!select[i].checked) {
        select[i].disabled = false;
      }
    }
  }
}

let player = document.querySelector(".begin");
let avatarsContainer = document.querySelector(".choose-avatars");
let boardContainer = document.getElementById("game-container");

player.onclick = () => {
  avatarsContainer.style.display = "none";
  boardContainer.style.display = "flex";
  // Initialize all the Weapons
  let arrayOfWeapons = [];
  let warningShot = new Weapon("Taser", 15, imgWarningShog);
  let getExcited = new Weapon("Knife", 20, imgGetExcited);
  let grasp = new Weapon("Gun", 25, imgGrasp);
  let vengeance = new Weapon("Shotgun", 30, imgVengeance);
  arrayOfWeapons.push(warningShot, getExcited, grasp, vengeance);

  // Initialize all the Players
  let arrayOfPlayers = [];
  let playerOne = new Player("Player one", 100, avatarsArray[0]);
  let playerTwo = new Player("Player two", 100, avatarsArray[1]);
  arrayOfPlayers.push(playerOne, playerTwo);

  // Initialize the Board
  let theBoard = new Board();
  theBoard.createBoard(arrayOfWeapons, arrayOfPlayers);

  // Launch the Game
  let newGame = new Game(theBoard, arrayOfWeapons, arrayOfPlayers);
  newGame.showBoard();
  newGame.startGame();
};
