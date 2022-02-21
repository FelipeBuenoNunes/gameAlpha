import { level, setGetId } from "./requisitions.js";

try{
    const session = JSON.parse(sessionStorage.getItem('account'));
    setGetId(session.id);
    sessionStorage.clear();
}
catch(e){
    sessionStorage.clear();
    window.location.href = "http://localhost:8000/"
}

let revertPiece;
let dragging = 0;
const audioDrag = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-money-bag-drop-1989.mp3");

const audioDrop = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-small-wood-plank-pile-drop-3141.mp3");

$(function () {
    printStage();
    printPieces();
    
    $('.piece').draggable({
        snap: '.stage-valid',
        handle: '.piece-color',
        cursor: "grabbing",
        stack: ".piece",
        refreshPositions: true,
        start: function() {
            $(audioDrag)[0].play();
        },
        stop: function( event, ui) {
            points++;            
            validation(event);
        },
        revert: function(){
            if(revertPiece > 1){
                return true;
            }else{
                return false
            }
        },
        drag: function(event, ui){
            validation(event);
        },
        addClasses: false
        
    });

    $('.piece-color').dblclick(rotate)
});

let points = 0
jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {
    return this.each(function(){
      var clicks = 0, self = this;
      jQuery(this).click(function(event){
        clicks++;
        if (clicks == 1) {
          setTimeout(function(){
            if(clicks == 1) {
              single_click_callback.call(self, event);
            } else {
              double_click_callback.call(self, event);
            }
            clicks = 0;
          }, timeout || 300 );
        }
      });
    });
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
    {id:'piece7', shape: [[1,0],[1,1],[0,1]], deg: 0},
    {id:'piece8', shape: [[1,1,1]], deg: 0},
    {id:'piece9', shape: [[1,1,1]], deg: 0},
    {id:'piece10', shape: [[1,1,1]], deg: 0},
    {id:'piece11', shape: [[1,1],[1,1]], deg: 0}
];


function printPieces(){
    //forEach in the piece
    pieces.forEach(elem => {
        $('#all').append(`<div class="piece" id="${elem.id}"></div>`);
        
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

function rotate(e){
    points++;
    const _e = e.target.parentNode.offsetParent;   
    const _eId = _e.id.replace(/\D/g,'');
    const piece = pieces[_eId-1];

    $(_e).addClass('.piece-rotate');
    $(_e).css('transition', '500ms');
    piece.deg += 90;    
    _e.style.transform = `rotate(${piece.deg}deg)`;
    var parent = e.target.parentNode;
    var grandParent = parent.parentNode;
    $(grandParent).draggable("disable");
    setTimeout(() => {
        $(_e).css('transition', '0ms');
        $(_e).removeClass('.piece-rotate');
        $(grandParent).draggable("enable");
    }, 500);
    
}

//Validation pieces on stage
function validation(e){
    revertPiece = 0;
    const allPieces = document.getElementsByClassName('piece-color');
    const stage = document.getElementsByClassName('stage-valid');
    
    const positions = [];
    for(let elem of allPieces){
        elem = elem.getBoundingClientRect();
        positions.push([elem.x, elem.y]);
    }
    const validOrInvalid = [];
    for(let elem of stage){
        elem = elem.getBoundingClientRect();
        let valorVal;
        positions.forEach(validate => {
            if(parseInt(validate[0]) === parseInt(elem.x) && parseInt(validate[1]) === parseInt(elem.y)){
                revertPiece++;
            }
            if(revertPiece != 1){
                valorVal = false;
            }else{
                valorVal = true;
            }
        });
        if(revertPiece == 1){
            revertPiece = 0;
        }
        validOrInvalid.push(valorVal);
    }
    //Here is the validation
    if(validOrInvalid.every(elem => elem)){
        $('.piece-color').css('background', 'green');
    }else{
        $('.piece-color').css('background', 'yellow');
    }
    e.target.offsetParent.style.zIndex = 0;
}