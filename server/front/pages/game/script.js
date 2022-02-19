$(function () {
    printStage();
    printPieces();
    

    $('.piece').draggable({
        snap: '.stage-valid',
        zIndex: 1,
        cancel: '.piece-empty',
        refreshPositions: true
    });

    //$('.piece').on('mousedown', zIndex)


    $('.piece').on('mouseup', validation)
    $('.piece-color').on('dblclick', rotate)
});

const arr = sessionStorage.getItem('account');
sessionStorage.clear();

function sla(){
    $('.piece-rotate').css('transition', '0ms');
}

function printStage() {
    const arr = [[0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]];
    $('section').append('<div class="stage"></div>');
    //forEach piece of the stage
    arr.forEach(elem => {
        $('section > div.stage').append('<div class="column"></div>');
        for (let column of elem) {
            const classDiv = column ? "stage-valid" : "stage-invalid";
            $('section > div.stage > div:last-child').append(`<div class="${classDiv}"></div>`)
        }
    });
}
const exFetch = {"level": 1, "difficulty": "Fácil", "stage": [ [1,0,0,0,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1] ], "pieces": [ [ [0,1],[1,1] ], [ [1,1], [1,1] ], [ [1,1,1] ], [ [1,1,1] ], [ [1,1,1],[0,0,1] ], [ [0,0,1],[1,1,1] ] ]};

const pieces = [
    {id:'piece1', shape: [[1,1,1]], deg: 0},
    {id:'piece2', shape: [[1,1,1]], deg: 0},
    {id:'piece3', shape: [[1,1,1]], deg: 0},
    {id:'piece4', shape: [[1,1,1]], deg: 0},
    {id:'piece5', shape: [[1,1],[1,1]], deg: 0},
    {id:'piece6', shape: [[1,0],[1,1],[0,1]], deg: 0},
    {id:'piece7', shape: [[1,1,1]], deg: 0},
    {id:'piece8', shape: [[1,1,1]], deg: 0},
    {id:'piece9', shape: [[1,1,1]], deg: 0},
    {id:'piece10', shape: [[1,1],[1,1]], deg: 0}
];


function printPieces(){
    //forEach in the piece
    pieces.forEach(elem => {
        $('#all').append(`<div class="piece piece-rotate" id="${elem.id}"></div>`);
        
        //forEach column in the piece
        elem.shape.forEach(column => {
            $('#all > div:last-child').append('<div></div>');
            //forEach line of the column of the piece
            column.forEach(line => {
                const hasColor = line ? "piece-color" : "piece-empty";
                $('#all > div:last-child > div:last-child').append(`<div class="${hasColor}"></div>`);
            })
        })
    });
}

async function rotate(e){
    const _e = e.target.offsetParent;   
    const _eId = _e.id.replace(/\D/g,'');
    const piece = pieces[_eId-1];
    $('.piece-rotate').css('transition', '500ms');
    piece.deg += 90;    
    _e.style.transform = `rotate(${piece.deg}deg)`;
    setInterval(sla, 1000);
}

//clicked on the piece, it up
function zIndex(e){
    initialPos = [];
    initialPos.push(e.target.offsetParent.style.left.split('p')[0], e.target.offsetParent.style.top.split('p')[0]);
    console.log(initialPos);
    e.target.offsetParent.style.zIndex = 1;
}

//Validation pieces on stage
function validation(e){
    const allPieces = document.getElementsByClassName('piece-color');
    const stage = document.getElementsByClassName('stage-valid');
    //let zoom = +window.getComputedStyle(document.body).zoom;
    let zoom = 1
    const positions = [];
    for(let elem of allPieces){
        elem = elem.getBoundingClientRect();
        positions.push([elem.x * zoom, elem.y * zoom]);
    }
    const validOrInvalid = [];
    for(let elem of stage){
        elem = elem.getBoundingClientRect();
        let cont = 0;
        let valorVal;
        positions.forEach(validate => {
            if(parseInt(validate[0]) === parseInt(elem.x) && parseInt(validate[1]) === parseInt(elem.y)){
                cont++;
            }
            if(cont != 1){
                valorVal = false;
            }else{
                valorVal = true;
            }
        })
        validOrInvalid.push(valorVal);
        if(cont > 1){
            console.log(initialPos)
            e.target.offsetParent.style.top = initialPos[1]+ "px"
            e.target.offsetParent.style.left = initialPos[0]+ "px"
        }
    }
    //Here is the validation
    if(validOrInvalid.every(elem => elem)){
        $('.piece-color').css('background', 'green');
    }else{
        $('.piece-color').css('background', 'yellow');
    }
    
    e.target.offsetParent.style.zIndex = 0;
}

//Validating pieces on top of pieces // Não está usando mais
function aboutPieces(currentElement, positions){
    let _positions = [...positions];
    const _currentElement = $(`#${currentElement.offsetParent.id} > div > div.piece-color`);
    
    const positionsCurrent = [];
    for(let element of _currentElement){
        element = element.getBoundingClientRect();
        positionsCurrent.push([element.x, element.y]);
    }
    //filtering of equal elements 
    for(let element of positionsCurrent){
        _positions = _positions.filter(position => {
            return !(element[0] == position[0] && element[1] == position[1])});
    }

    if(_positions.length < positions.length - _currentElement.length){
        alert('Mudar posição')
        return;
    }

    const sizePieces = _currentElement[0].getBoundingClientRect().width;
    for(let position of _positions){
        for(let positionCurrent of positionsCurrent){
            if(positionCurrent[0] < position[0]+sizePieces && positionCurrent[0]+sizePieces > position[0] && positionCurrent[1] < position[1]+sizePieces && positionCurrent[1]+sizePieces > position[1]){
                console.log("MUDAR POSIÇÃO");
                const left = currentElement.offsetParent.style.left.split('p')[0]*1 + 50 + 'px';
                const top = currentElement.offsetParent.style.left.split('p')[0]*1 + 50 + 'px';
                currentElement.offsetParent.style.top = top;
                currentElement.offsetParent.style.left = left;
            }
        }
    }

}