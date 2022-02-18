$(document).ready(function () {
  $("#play").mouseover(() => {
    $("#playSquare").removeClass("inviSquare");
    $("#playSquare").addClass("pinkSquare");
  });

  $("#play").mouseout(() => {
    $("#playSquare").removeClass("pinkSquare");
    $("#playSquare").addClass("inviSquare");
  });

  $("#tutorial").mouseover(() => {
    $("#tutorialSquare").removeClass("inviSquare");
    $("#tutorialSquare").addClass("pinkSquare");
  });

  $("#tutorial").mouseout(() => {
    $("#tutorialSquare").removeClass("pinkSquare");
    $("#tutorialSquare").addClass("inviSquare");
  });

  $("#options").mouseover(() => {
    $("#optionsSquare").removeClass("inviSquare");
    $("#optionsSquare").addClass("pinkSquare");
  });

  $("#options").mouseout(() => {
    $("#optionsSquare").removeClass("pinkSquare");
    $("#optionsSquare").addClass("inviSquare");
  });
});
