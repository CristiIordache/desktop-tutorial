let box_0 = document.getElementById("box_0");
let box_1 = document.getElementById("box_1");
let box_2 = document.getElementById("box_2");
let box_3 = document.getElementById("box_3");
let box_4 = document.getElementById("box_4");
let box_5 = document.getElementById("box_5");
let box_6 = document.getElementById("box_6");
let box_7 = document.getElementById("box_7");
let box_8 = document.getElementById("box_8");

let game = [
  [box_0, box_1, box_2],
  [box_3, box_4, box_5],
  [box_6, box_7, box_8],
];

for (let element of game) {
  for (let element2 of element) {
    console.log(element2);
    element2.addEventListener("click", index);
  }
}

function index(e) {
  e.target.style.backgroundColor = "green";
  let calculator = Math.floor(Math.random() * 10) - 1;

  let white = false;
  while (true) {
    calculator = Math.floor(Math.random() * 10);
    if (calculator !== 0) {
      calculator = calculator - 1;
    }
    for (let element of game) {
      for (let element2 of element) {
        console.log(element2);
        if (
          !(
            element2.style.backgroundColor == "red" ||
            element2.style.backgroundColor == "green"
          )
        ) {
          white = true;
        }
      }
    }
    if (white == false) {
      break;
    }
    let celula = document.getElementById("box_" + calculator);
    if (
      !(
        celula.style.backgroundColor == "red" ||
        celula.style.backgroundColor == "green"
      )
    ) {
      celula.style.backgroundColor = "red";
      break;
    }
  }
  Winner();
}
function Winner() {
    // Verificăm rândurile și coloanele pentru câștigătorul uman
    for (let i = 0; i < 3; i++) {
        if (game[i][0].style.backgroundColor === 'green' && game[i][1].style.backgroundColor === 'green' && game[i][2].style.backgroundColor === 'green') {
            alert("Ai câștigat!");
            resetGame();
            return;
        }
        if (game[0][i].style.backgroundColor === 'green' && game[1][i].style.backgroundColor === 'green' && game[2][i].style.backgroundColor === 'green') {
            alert("Ai câștigat!");
            resetGame();
            return;
        }
    }

    // Verificăm diagonalele pentru câștigătorul uman
    if ((game[0][0].style.backgroundColor === 'green' && game[1][1].style.backgroundColor === 'green' && game[2][2].style.backgroundColor === 'green') ||
        (game[0][2].style.backgroundColor === 'green' && game[1][1].style.backgroundColor === 'green' && game[2][0].style.backgroundColor === 'green')) {
        alert("Ai câștigat!");
        resetGame();
        return;
    }

    // Verificăm câștigătorul calculatorului (marcat cu roșu)
    // Verificăm rândurile și coloanele
    for (let i = 0; i < 3; i++) {
        if (game[i][0].style.backgroundColor === 'red' && game[i][1].style.backgroundColor === 'red' && game[i][2].style.backgroundColor === 'red') {
            alert("Calculatorul a câștigat!");
            resetGame();
            return;
        }
        if (game[0][i].style.backgroundColor === 'red' && game[1][i].style.backgroundColor === 'red' && game[2][i].style.backgroundColor === 'red') {
            alert("Calculatorul a câștigat!");
            resetGame();
            return;
        }
    }

    // Verificăm diagonalele pentru câștigătorul calculatorului
    if ((game[0][0].style.backgroundColor === 'red' && game[1][1].style.backgroundColor === 'red' && game[2][2].style.backgroundColor === 'red') ||
        (game[0][2].style.backgroundColor === 'red' && game[1][1].style.backgroundColor === 'red' && game[2][0].style.backgroundColor === 'red')) {
        alert("Calculatorul a câștigat!");
        resetGame();
        return;
    }
}
// let player = "x";
// let moves = 0;
// for (let row of game) {
//     for (let box of row) {
//       box.addEventListener("click", function () {
//         if (!this.textContent) {
//           this.textContent = player;
//           moves++;
//   if (
//             // Verificare pe linii și coloane
//             (game[0][0].textContent &&
//               game[0][0].textContent === game[0][1].textContent &&
//               game[0][0].textContent === game[0][2].textContent) ||
//             (game[1][0].textContent &&
//               game[1][0].textContent === game[1][1].textContent &&
//               game[1][0].textContent === game[1][2].textContent) ||
//             (game[2][0].textContent &&
//   game[2][0].textContent === game[2][1].textContent &&
//               game[2][0].textContent === game[2][2].textContent) ||
//             (game[0][0].textContent &&
//               game[0][0].textContent === game[1][0].textContent &&
//               game[0][0].textContent === game[2][0].textContent) ||
//             (game[0][1].textContent &&
//   game[0][1].textContent === game[1][1].textContent &&
//               game[0][1].textContent === game[2][1].textContent) ||
//             (game[0][2].textContent &&
//               game[0][2].textContent === game[1][2].textContent &&
//               game[0][2].textContent === game[2][2].textContent) ||
//   // Verificare pe diagonale
//             (game[0][0].textContent &&
//               game[0][0].textContent === game[1][1].textContent &&
//               game[0][0].textContent === game[2][2].textContent) ||
//             (game[0][2].textContent &&
//               game[0][2].textContent === game[1][1].textContent &&
//               game[0][2].textContent === game[2][0].textContent)
//   ) {
//             return;
//           }

//           // Verificăm dacă este remiză
//           if (moves === 9) {
//             return;
//           }

//           player = player === "X" ? "O" : "X";

//           // Este rândul calculatorului
//           if (player === "O") {
//             computerMove();
//           }
//         }
//       });
//     }
//   }
//   function computerMove() {
//     let emptyCells = [];
//     for (let row of game) {
//       for (let box of row) {
//         if (!box.textContent) {
//           emptyCells.push(box);
//         }
//       }
//     }
//     if (emptyCells.length > 0) {
//       let randomIndex = Math.floor(Math.random() * emptyCells.length);
//       let selectedCell = emptyCells[randomIndex];
//       selectedCell.textContent = "O";
//       moves++;
//   if (
//         // Verificare pe linii și coloane
//         (game[0][0].textContent &&
//           game[0][0].textContent === game[0][1].textContent &&
//           game[0][0].textContent === game[0][2].textContent) ||
//         (game[1][0].textContent &&
//           game[1][0].textContent === game[1][1].textContent &&
//           game[1][0].textContent === game[1][2].textContent) ||
//         (game[2][0].textContent &&
//   game[2][0].textContent === game[2][1].textContent &&
//           game[2][0].textContent === game[2][2].textContent) ||
//         (game[0][0].textContent &&
//           game[0][0].textContent === game[1][0].textContent &&
//           game[0][0].textContent === game[2][0].textContent) ||
//         (game[0][1].textContent &&
//   game[0][1].textContent === game[1][1].textContent &&
//           game[0][1].textContent === game[2][1].textContent) ||
//         (game[0][2].textContent &&
//           game[0][2].textContent === game[1][2].textContent &&
//           game[0][2].textContent === game[2][2].textContent) ||
//   // Verificare pe diagonale
//         (game[0][0].textContent &&
//           game[0][0].textContent === game[1][1].textContent &&
//           game[0][0].textContent === game[2][2].textContent) ||
//         (game[0][2].textContent &&
//           game[0][2].textContent === game[1][1].textContent &&
//           game[0][2].textContent === game[2][0].textContent)
//   ) {
//         return;
//       }

//       // Verificăm dacă este remiză
//       if (moves === 9) {
//         return;
//       }

//       player = "X"; // Trecem la următorul jucător
//     }
//   }
