const url = "http://localhost:8080";

async function level(lvl) {
  const response = fetch(url + "/getLevel?lvl=" + lvl);
  return await response.then((x) => x.json());
}
let points = 0;

const addPoint = () => ++points;

let saveAccount;
function setGetAccount(account) {
  if (account === "add") {
    updateRanking();
    if(saveAccount.currentLevel !== 10) {
      saveAccount.currentLevel++;
      return true;
    }
    return false;
  } else if (saveAccount) return saveAccount;
  else saveAccount = account;
}


async function updateRanking() {
  try {
    const response = fetch(url + "/ranking", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: saveAccount.username,
        moviesPiece: points,
        currentLevel: saveAccount.currentLevel,
        id: saveAccount.id
      }),
    });
    points = 0;
    return await response.then((res) => res.json());
  } catch (e) {
    return "Algo deu errado!";
  }
}
export {setGetAccount, addPoint, level}