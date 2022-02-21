export async function level(lvl) {
    const response = await fetch('http://localhost:8080/getLevel?lvl=' + lvl)
        .then(res => res.json());
    return response;
}
let saveId;
export function setGetId(id){
    if(saveId) return saveId;
    saveId = id;
}