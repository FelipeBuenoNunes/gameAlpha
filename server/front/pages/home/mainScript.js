$(document).ready(function () {
  let twinkle = false;
  $("#play").mouseover(() => {
    $("#playSquare").removeClass("inviSquare");
    $("#playSquare").addClass("pinkSquare");
    twinkleInterval = setInterval(() => {
      if (twinkle == false) {
        $(".yellowText").css("display", "none")
        twinkle = true;
      } else {
        $(".yellowText").css("display", "flex")
        twinkle = false;
      }
    }, 250)
  });

  $("#play").mouseout(() => {
    $("#playSquare").removeClass("pinkSquare");
    $("#playSquare").addClass("inviSquare");
    $(".yellowText").css("display", "flex")
    clearInterval(twinkleInterval)
    twinkle = false;
  });

  $("#tutorial").mouseover(() => {
    $("#tutorialSquare").removeClass("inviSquare");
    $("#tutorialSquare").addClass("pinkSquare");
    twinkleInterval = setInterval(() => {
      if (twinkle == false) {
        $("#questionmark").css("display", "none")
        twinkle = true;
      } else {
        $("#questionmark").css("display", "flex")
        twinkle = false;
      }
    }, 250)
  });

  $("#tutorial").mouseout(() => {
    $("#tutorialSquare").removeClass("pinkSquare");
    $("#tutorialSquare").addClass("inviSquare");
    $("#questionmark").css("display", "flex")
    clearInterval(twinkleInterval)
    twinkle = false;
  });

  $("#options").mouseover(() => {
    $("#optionsSquare").removeClass("inviSquare");
    $("#optionsSquare").addClass("pinkSquare");
    twinkleInterval = setInterval(() => {
      if (twinkle == false) {
        $("#gearimg").css("display", "none")
        twinkle = true;
      } else {
        $("#gearimg").css("display", "flex")
        twinkle = false;
      }
    }, 250)
  });

  $("#options").mouseout(() => {
    $("#optionsSquare").removeClass("pinkSquare");
    $("#optionsSquare").addClass("inviSquare");
    $("#gearimg").css("display", "flex")
    clearInterval(twinkleInterval)
    twinkle = false;
  });

  $("#leaderboardbtn").mouseover(() => {
    $("#leaderboardSquare").removeClass("inviSquare");
    $("#leaderboardSquare").addClass("pinkSquare");
    twinkleInterval = setInterval(() => {
      if (twinkle == false) {
        $("#trophyimg").css("display", "none")
        twinkle = true;
      } else {
        $("#trophyimg").css("display", "flex")
        twinkle = false;
      }
    }, 250)
  });

  $("#leaderboardbtn").on("click", () => {
    $("main aside").css("right", "180px")
  });

  $("#leaderboardbtn").mouseout(() => {
    $("#leaderboardSquare").removeClass("pinkSquare");
    $("#leaderboardSquare").addClass("inviSquare");
    $("#trophyimg").css("display", "flex");
    clearInterval(twinkleInterval);
    twinkleCounter = 0;
  });

  $("#closeldbrd").on("click", () => {
    $("main aside").css("right", "-500px")
  });

  $("#play").on("click", () => {
    $("#content").css("transform", "translate(-2000px)")
    $("main section").css("transform", "translate(-2000px)")
  })

  $("#closeregister").on("click", () => {
    $("#content").css("transform", "translate(0px)")
    $("main section").css("transform", "translate(1000px)")
  })

  //Button login
  $('#loginButton').on('click', login)
});

function login() {
  fetch("http://localhost:8080/login-user", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "username": $("#nameInput").val(),
      "password": $("#passwordInput").val()
    })
  })
    .then(res => {
      if (!res.ok) throw new Error(res);
      return res.text();
    })
    .then(response => {
      console.log(response);
      sessionStorage.setItem('account', response);
      window.location.href = '/game';
    })
    .catch(e => console.log(e));
  //sessionStorage.setItem('', );
}