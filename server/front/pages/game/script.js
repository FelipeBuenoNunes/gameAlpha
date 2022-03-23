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
  const lvl = await level(setGetAccount().currentLevel);
  $("#level-header").text("Fase: " + lvl.level);
  printStage(lvl.stage);
  pieces = lvl.pieces;
  printPieces();
}

let revertPiece;
const audioRotate = new Audio("./assets/songs/poppin.mp3");
const audioDrag = new Audio("./assets/songs/bubble-pop.mp3");
const audioDrop = new Audio("./assets/songs/drag.mp3");
const music = new Audio("./assets/songs/music.mp3");
const correct = new Audio("./assets/songs/correct.mp3");

music.play();
music.loop = true;
music.volume = 0.25;

//Set events every elements
function setEvents() {
  $("section").droppable({
    drop: function (event, ui) {
      audioDrop.play();
    },
  });

  $(".piece").draggable({
    containment: "main",
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

  $("#back").click(backPage);
}

//--------------------Print Stage
function printStage(arr) {
  $("#moves").text("Nº de movimentos: " + 0);
  $("#sectionContent").html("");
  $("#sectionContent").append('<div class="stage"></div>');
  //forEach piece of the stage
  arr.forEach((elem) => {
    $("#sectionContent > div.stage").append('<div class="column"></div>');
    for (let column of elem) {
      const classDiv = column ? "stage-valid" : "stage-invalid";
      $("#sectionContent > div.stage > div:last-child").append(
        `<div class="${classDiv}"></div>`
      );
    }
  });
}

//------------------- Print Pieces
function printPieces() {
  $("#piecesContent").html("");
  //forEach in the piece
  pieces.forEach((elem, id) => {
    $("#piecesContent").append(`<div class="piece" id="${id}"></div>`);

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
  audioRotate.play();
  $("#moves").text("Nº de movimentos: " + addPoint());
  const _e = e.target.parentNode.offsetParent;
  //const _eId = _e.id.replace(/\D/g, "");
  const piece = pieces[Number(_e.id)];

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
        parseInt(validate[0]) >= parseInt(elem.x) - 1 &&
        parseInt(validate[0]) <= parseInt(elem.x) + 1 &&
        parseInt(validate[1]) >= parseInt(elem.y) - 1 &&
        parseInt(validate[1]) <= parseInt(elem.y) + 1
      ) {
        valorVal = true;
      }
    });

    validOrInvalid.push(valorVal);
  }
  //Validation is here
  if (validOrInvalid.every((elem) => elem)) {
    correct.play();
    $(".piece-color").css("background", "green");
    if (!setGetAccount("add")) $("#modal-reset").css("display", "block");
    else $("#myModal").css("display", "block");
    $("#close-lvl").click(() => {
      $("#myModal").css("display", "none");
      requisitions();
    });
    $("#close-final").click(() => {
      window.location.href = "http://localhost:8000/";
    });
  }
}

//---------------Validation stage pieces on top of stage pieces
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

//Voltar página
function backPage() {
  let session = setGetAccount();
  session.level =
    session.currentLevel > session.level ? session.currentLevel : session.level;
  sessionStorage.setItem("account", JSON.stringify(session));
  window.location.href = "/stage";
  session = { username: session.username, level: session.level };
}

$("#volume").change(function () {
  music.volume = this.value / 500;
  audioRotate.volume = this.value / 100;
  audioDrag.volume = this.value / 100;
  audioDrop.volume = this.value / 100;
  correct.volume = this.value / 100;
});
