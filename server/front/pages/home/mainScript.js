$(document).ready(function () {
  const tetrisTheme = new Audio("./assets/songs/music.mp3");
  const selectSound = new Audio("./assets/songs/select.mp3");

  tetrisTheme.play();
  tetrisTheme.loop = true;
  tetrisTheme.volume = 0.1;

  let twinkle = false;
  $("#play").mouseover(() => {
    $("#playSquare").removeClass("inviSquare");
    $("#playSquare").addClass("pinkSquare");
    twinkleInterval = setInterval(() => {
      if (twinkle == false) {
        $(".yellowText").css("display", "none");
        twinkle = true;
      } else {
        $(".yellowText").css("display", "flex");
        twinkle = false;
      }
    }, 250);
  });

  $("#play").mouseout(() => {
    $("#playSquare").removeClass("pinkSquare");
    $("#playSquare").addClass("inviSquare");
    $(".yellowText").css("display", "flex");
    clearInterval(twinkleInterval);
    twinkle = false;
  });

  $("#tutorial").mouseover(() => {
    $("#tutorialSquare").removeClass("inviSquare");
    $("#tutorialSquare").addClass("pinkSquare");
    twinkleInterval = setInterval(() => {
      if (twinkle == false) {
        $("#questionmark").css("display", "none");
        twinkle = true;
      } else {
        $("#questionmark").css("display", "flex");
        twinkle = false;
      }
    }, 250);
  });

  $("#tutorial").mouseout(() => {
    $("#tutorialSquare").removeClass("pinkSquare");
    $("#tutorialSquare").addClass("inviSquare");
    $("#questionmark").css("display", "flex");
    clearInterval(twinkleInterval);
    twinkle = false;
  });

  $("#options").mouseover(() => {
    $("#optionsSquare").removeClass("inviSquare");
    $("#optionsSquare").addClass("pinkSquare");
    twinkleInterval = setInterval(() => {
      if (twinkle == false) {
        $("#gearimg").css("display", "none");
        twinkle = true;
      } else {
        $("#gearimg").css("display", "flex");
        twinkle = false;
      }
    }, 250);
  });

  $("#options").mouseout(() => {
    $("#optionsSquare").removeClass("pinkSquare");
    $("#optionsSquare").addClass("inviSquare");
    $("#gearimg").css("display", "flex");
    clearInterval(twinkleInterval);
    twinkle = false;
  });

  $("#leaderboardbtn").on("click", () => {
    selectSound.play();
    ranking();
  });

  $("#leaderboardbtn").mouseover(() => {
    $("#leaderboardSquare").removeClass("inviSquare");
    $("#leaderboardSquare").addClass("pinkSquare");
    twinkleInterval = setInterval(() => {
      if (twinkle == false) {
        $("#trophy").css("display", "none");
        twinkle = true;
      } else {
        $("#trophy").css("display", "flex");
        twinkle = false;
      }
    }, 250);
  });

  $("#leaderboardbtn").mouseout(() => {
    $("#leaderboardSquare").removeClass("pinkSquare");
    $("#leaderboardSquare").addClass("inviSquare");
    $("#trophy").css("display", "flex");
    clearInterval(twinkleInterval);
    twinkleCounter = 0;
  });

  $("#closeldbrd").on("click", () => {
    selectSound.play();
    $("main aside").css("right", "-100vw");
  });

  $("#play").on("click", () => {
    selectSound.play();
    $("main aside").css("right", "-100vw");
    $("#content").css("transform", "translate(-150vw)");
    $("#registersect").css("transform", "translate(-150vw)");
  });

  $("#closeregister").on("click", () => {
    selectSound.play();
    $("#content").css("transform", "translate(0px)");
    $("#registersect").css("transform", "translate(50vw)");
  });

  $("#tutorial").on("click", () => {
    selectSound.play();
    $("main aside").css("right", "-100vw");
    $("#content").css("transform", "translate(-150vw)");
    $("#tutorialsect").css("transform", "translate(-150vw)");
  });

  $("#closetutorial").on("click", () => {
    selectSound.play();
    $("#content").css("transform", "translate(0px)");
    $("#tutorialsect").css("transform", "translate(50vw)");
  });

  $("#options").on("click", () => {
    selectSound.play();
    $("main aside").css("right", "-100vw");
    $("#content").css("transform", "translate(-150vw)");
    $("#optionssect").css("transform", "translate(-150vw)");
  });

  $("#closeoptions").on("click", () => {
    selectSound.play();
    $("#content").css("transform", "translate(0px)");
    $("#optionssect").css("transform", "translate(50vw)");
  });

  //Button login and register
  $("#loginButton, #registerButton").on("click", login);
});

const url = "http://localhost:8080/";
function login(e) {
  if (!$("#nameInput").val() || !$("#passwordInput").val()) {
    $("#registerInfo").text("O seu username está vazio ou a senha está vazia");
    return;
  }

  const route = e.target.id === "loginButton" ? "login-user" : "cadaster-user";
  fetch(url + route, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: $("#nameInput").val(),
      password: $("#passwordInput").val(),
    }),
  })
    .then((res) => {
      //if (!res.ok) throw new Error(res);
      return res.text();
    })
    .then((response) => {
      try {
        JSON.parse(response);
        sessionStorage.setItem("account", response);
        window.location.href = "/stage";
      } catch (e) {
        $("#registerInfo").text(response);
      }
    })
    .catch((e) => e);
}

//----------MODAL--------------//

function ranking() {
  $("#ranking-persons").html("");
  fetch(url + "ranking")
    .then((response) => response.json())
    .then((out) => printModal(out));

  function printModal(users) {
    let cont = 1;
    for (let user of users) {
      if (cont > 10) break;
      $("#ranking-persons").append("<tr></tr>");
      $("#ranking-persons > tr:last-child")
        .append(`<td>${cont}º</td>`)
        .append(`<td>${user.username}</td>`)
        .append(`<td>${user.level}</td>`)
        .append(`<td>${user.movies_piece_all}</td>`);
      cont++;
    }
    $(".modal").css("display", "block");
  }
  $(".close").click(() => {
    $(".modal").css("display", "none");
  });
}
