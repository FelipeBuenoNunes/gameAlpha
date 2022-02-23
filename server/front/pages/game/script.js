import { level, setGetAccount, addPoint } from "./requisitions.js";
let pieces;
$(function () {
  try {
    const session = JSON.parse(sessionStorage.getItem("account"));
    if (session === null) throw new Error("error");
    setGetAccount(session);
    sessionStorage.clear();
    requisitions();
  } catch (e) {
    sessionStorage.clear();
    window.location.href = "http://localhost:8000/";
  }
});

async function requisitions() {
  console.log("a");
  const lvl = await level(setGetAccount().level);
  printStage(lvl.stage);
  pieces = lvl.pieces;
  printPieces();
}

let revertPiece;
let dragging = 0;
const audioDrag = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-money-bag-drop-1989.mp3"
);
const audioDrop = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-small-wood-plank-pile-drop-3141.mp3"
);

//Set events every elements
function setEvents() {
  $(".stage-valid").droppable({
    drop: function (event, ui) {
      alert("aaaa");
    },
    accept: ".piece-color",
    greedy: true,
  });

  $(".piece").draggable({
    snap: ".stage-valid",
    handle: ".piece-color",
    cursor: "grabbing",
    stack: ".piece",
    refreshPositions: true,
    start: function () {
      $(audioDrag)[0].play();
    },
    stop: function (event, ui) {
      $("#moves").text("Nº de movimentos: " + addPoint());
      if ($(".piece").draggable("option", "revert") == false) {
        validation(event);
      }
    },
    drag: function (event, ui) {
      reverseValidation(event);
    },
    revert: false,
  });

  $(".piece-color").dblclick(rotate);
}

//--------------------Print Stage
function printStage(arr) {
  $("#moves").text("Nº de movimentos: " + 0);
  $("section").html("");
  $("section").append('<div class="stage"></div>');
  //forEach piece of the stage
  arr.forEach((elem) => {
    $("section > div.stage").append('<div class="column"></div>');
    for (let column of elem) {
      const classDiv = column ? "stage-valid" : "stage-invalid";
      $("section > div.stage > div:last-child").append(
        `<div class="${classDiv}"></div>`
      );
    }
  });
}

//------------------- Print Pieces
function printPieces() {
  $("#piecesContent").html("");
  //forEach in the piece
  pieces.forEach((elem) => {
    $("#piecesContent").append(`<div class="piece" id="${elem.id}"></div>`);

    //forEach column in the piece
    elem.shape.forEach((column) => {
      $("#piecesContent > div:last-child").append("<div></div>");
      //forEach line of the column of the piece
      column.forEach((line) => {
        const hasColor = line ? "piece-color" : "piece-empty";
        $("#piecesContent > div:last-child > div:last-child").append(
          `<div class="${hasColor}"></div>`
        );
      });
    });
  });
  setEvents();
}

// ------------------Rotate
function rotate(e) {
  $("#moves").text("Nº de movimentos: " + addPoint());
  const _e = e.target.parentNode.offsetParent;
  const _eId = _e.id.replace(/\D/g, "");
  const piece = pieces[_eId - 1];

  $(_e).css("transition", "500ms");
  piece.deg += 90;

  _e.style.transform = `rotate(${piece.deg}deg)`;
  const parent = e.target.parentNode;
  const grandParent = parent.parentNode;
  $(grandParent).draggable("disable");
  setTimeout(() => {
    $(_e).css("transition", "0ms");
    $(_e).removeClass(".piece-rotate");
    $(grandParent).draggable("enable");
  }, 500);
}

// ------------------Validation pieces on stage
function validation(e) {
  revertPiece = 0;
  const allPieces = document.getElementsByClassName("piece-color");
  const stage = document.getElementsByClassName("stage-valid");

  const positions = [];
  for (let elem of allPieces) {
    elem = elem.getBoundingClientRect();
    positions.push([elem.x, elem.y]);
  }
  const validOrInvalid = [];
  for (let elem of stage) {
    elem = elem.getBoundingClientRect();
    let valorVal;
    positions.forEach((validate) => {
      if (
        parseInt(validate[0]) === parseInt(elem.x) &&
        parseInt(validate[1]) === parseInt(elem.y)
      ) {
        valorVal = true;
      }
    });

    validOrInvalid.push(valorVal);
  }
  //Here is the validation
  if (validOrInvalid.every((elem) => elem)) {
    $(".piece-color").css("background", "green");
    const timeout = setTimeout(() => {
      $("#myModal").css("display", "none");
      setGetAccount("add");
      requisitions();
    }, 3000);

    $("#myModal").css("display", "block");
    $(".close").click(() => {
      clearTimeout(timeout);
      $("#myModal").css("display", "none");
      setGetAccount("add");
      requisitions();
    });
  }
}

// ------------------Validation stage pieces on top of stage pieces
function reverseValidation(e) {
  revertPiece = 0;
  const allPieces = document.getElementsByClassName("piece-color");
  const stage = document.getElementsByClassName("stage-valid");

  const positions = [];
  for (let elem of allPieces) {
    elem = elem.getBoundingClientRect();
    positions.push([elem.x, elem.y]);
  }
  for (let elem of stage) {
    elem = elem.getBoundingClientRect();
    positions.forEach((validate) => {
      if (
        parseInt(validate[0]) === parseInt(elem.x) &&
        parseInt(validate[1]) === parseInt(elem.y)
      ) {
        revertPiece++;
      }
    });
    if (revertPiece == 1) {
      revertPiece = 0;
    }
    if (revertPiece > 1) {
      $(".piece").draggable("option", "revert", true);
    } else {
      $(".piece").draggable("option", "revert", false);
    }
  }
}
