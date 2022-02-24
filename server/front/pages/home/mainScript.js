$('.modal').css('display', "block")
$(document).ready(function () {
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
    $("main aside").css("right", "-100vw");
  });

  $("#play").on("click", () => {
    $("main aside").css("right", "-100vw");
    $("#content").css("transform", "translate(-150vw)");
    $("#registersect").css("transform", "translate(-150vw)");
  });

  $("#closeregister").on("click", () => {
    $("#content").css("transform", "translate(0px)");
    $("#registersect").css("transform", "translate(50vw)");
  });

  $("#tutorial").on("click", () => {
    $("main aside").css("right", "-100vw");
    $("#content").css("transform", "translate(-150vw)");
    $("#tutorialsect").css("transform", "translate(-150vw)");
  });

  $("#closetutorial").on("click", () => {
    $("#content").css("transform", "translate(0px)");
    $("#tutorialsect").css("transform", "translate(50vw)");
  });

  $("#options").on("click", () => {
    $("main aside").css("right", "-100vw");
    $("#content").css("transform", "translate(-150vw)");
    $("#optionssect").css("transform", "translate(-150vw)");
  });

  $("#closeoptions").on("click", () => {
    $("#content").css("transform", "translate(0px)");
    $("#optionssect").css("transform", "translate(50vw)");
  });

  //Button login and register
  $("#loginButton, #registerButton").on("click", login);
});

const url = "http://localhost:8080/";
function login(e) {
  if (!$("#nameInput").val() || !$("#passwordInput").val()) {
    console.log(
      "O seu username está vazio ou a senha está vazia, ou algo deu errado"
    );
    return;
  }
  console.log(e.target.id);
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
      if (!res.ok) throw new Error(res);
      return res.text();
    })
    .then((response) => {
      try {
        JSON.parse(response);
        sessionStorage.setItem("account", response);
        window.location.href = "/game";
      } catch (e) {
        console.log(e);
        console.log(response);
      }
    })
    .catch((e) => console.log(e));
}

function ranking() {
  fetch(url + "ranking")
    .then((response) => response.json())
    .then((out) => console.log(out));
  $("#leaderboard").css("display", "flex");
}
