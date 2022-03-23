const urlBackend = "http://localhost:8080/";
const url = "http://localhost:8000/";
const music = new Audio("./assets/songs/music.mp3");
const selectSound = new Audio("./assets/songs/select.mp3");

music.play();
music.loop = true;
music.volume = 0.1;

//Add Events and get Elements
const pageTutorial = document.getElementsByClassName("tutorialsect")[0];
const pageStage = document.getElementById("stage");

//Open page tutorial
document.getElementById("help").addEventListener("click", () => {
  selectSound.play();
  pageTutorial.classList.add("elemVisible");
  pageStage.classList.add("mainHidden");
});

//Close page tutorial
document.getElementById("closetutorial").addEventListener("click", () => {
  selectSound.play();
  pageStage.classList.remove("mainHidden");
  pageTutorial.classList.remove("elemVisible");
});

//Open modal
document.getElementById("crown-ranking").addEventListener("click", ranking);

//Exit page
document.getElementById('exit_button').addEventListener("click", () => window.location.href = url);

//Print function of modal
function ranking() {
  const rankingPersons = document.getElementById("ranking-persons");
  rankingPersons.innerHTML = "";
  fetch(urlBackend + "ranking")
    .then((response) => response.json())
    .then((out) => printModal(out));

  function printModal(users) {
    let cont = 1;
    for (let user of users) {
      if (cont > 10) break;
      rankingPersons.append(document.createElement("tr"));

      const elem = document.querySelector("#ranking-persons > tr:last-child");
      let td = document.createElement("td");
      td.append(cont);
      elem.append(td);

      td = document.createElement("td");
      td.append(user.username);
      elem.append(td);

      td = document.createElement("td");
      td.append(user.level);
      elem.append(td);

      td = document.createElement("td");
      td.append(user.movies_piece_all);
      elem.append(td);

      cont++;
    }
    document.getElementsByClassName("modal")[0].style.display = "block";
  }
  document.getElementsByClassName("close")[0].addEventListener("click", () => {
    selectSound.play();
    document.getElementsByClassName("modal")[0].style.display = "none";
  });
}

let session;
try {
    session = JSON.parse(sessionStorage.getItem("account"));
    if (session === null) throw new Error("error");
    sessionStorage.clear();
} catch (e) {
  sessionStorage.clear();
  window.location.href = url;
}

const stages = document.getElementsByClassName("stage");

for (let i = 0; i < stages.length; i++) {
  if (i < session.level) {
    stages[i].addEventListener("click", play);
  } else stages[i].style.filter = "grayscale(1)";
}

//ecolhe fase
function play() {
  if (this.innerText > session.level) return;
  session.currentLevel = Number(this.innerText);
  sessionStorage.setItem("account", JSON.stringify(session));
  window.location.href = "/game";
}
