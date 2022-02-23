const url = "http://localhost:8080";

export async function level(lvl) {
    const response = fetch(url + '/getLevel?lvl=' + lvl);
    return await response.then(x => x.json());
}
let points = 0;

export const addPoint = () => ++points;


let saveAccount;
export function setGetAccount(account) {
    if (account === 'add') {
        saveAccount.level++;
        return updateRanking();
    }
    else if (saveAccount) return saveAccount;
    else saveAccount = account;
}

async function updateRanking(){
    try{
        const response = fetch(url + '/ranking', {
            method: 'PUT',
            headers:{
                "Content-type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                "username": saveAccount.username, 
                "moviesPiece": points,
                "id": saveAccount.id
            })
        });
        points = 0;
        return await response.then(res => res.json());
    }
    catch(e){
        return "Algo deu errado!";
    }
}