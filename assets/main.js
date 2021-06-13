var scores = [0,0]; //Highscore, Score

function updateScores(hs, s) {
    scores[0] += hs; //Five points will be added if conditions are met regardless of the level
    scores[1] += s;
    /*Adding Stats to the Client*/
    document.getElementById("hscore").innerHTML = scores[0];
    document.getElementById("cscore").innerHTML = scores[1];
    return scores;
}
var closeModal = () => {//Adding show/hide
    if(document.querySelector('.modal-gs').classList.add("hide")){
        return true;
    }
}
function showProgress(secs){// Show the progress bar
    document.querySelector('.progress .bar').remove();
    document.querySelector('.progress').innerHTML = "<span class = '" + Word + " bar'></span>" + "<style>."+ Word +"{animation:heartbeat "+ secs + "ms linear}</style>";
    document.getElementById("timelft").innerHTML = Math.round((secs)/1000);
}
function gameOver(){// Game over function
    document.querySelector('.gameOver').classList.remove('hide');
    document.querySelector('.gameOver .scores span').innerHTML = "High Score : " + scores[0] + "   <br/>Score : " + scores[1];
}
var Word = "";//Making it universal to gain access from everywhere
var factor;//This one too
function startGame(lvl){
    if(lvl == "Easy"){
        factor = 2;
    }
    else if(lvl == "Medium"){
        factor = 1.3;
    }
    else if(lvl == "Hard"){
        factor = 0.8;
    }// Fator for Difficulties. Lated multiplied with number of characters
    Word = genRandWord(factor);
    document.getElementById("lvl").innerHTML = lvl;
    updateScores(0, 0);
}
function restartGame(){
    document.querySelector('.gameOver').classList.add('hide');
    document.querySelector('.modal-gs').classList.remove("hide");
    scores[1] = 0;
    startGame(factor);
}
function genRandWord(factor){
    document.getElementById("typedval").value = "";
    clearTimeout(timer);
    var showOn = document.querySelector('.form-group .Word');
    Word = "";
    var alps = ['a', 'b', 'c', 'd', 'e', 'f', 'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    for(var i = 0;i < 26; i++){
        var Tp = 
        alps.push(alps[i].toUpperCase());
    }
    for(i = 0;i < Math.floor(Math.random() * (7-5) + 5) ; i++){
        Word += alps[Math.floor(Math.random() * 52)];
    }
    showOn.innerHTML = Word;
    setTimer(factor, Word);
    showProgress((Word.length * factor * 1000));
    return Word;
}
var timer;
var setTimer = (factor, word) => {
    timer = setTimeout(function(){
        document.querySelector('.progress .bar').classList.remove('anim');
        gameOver();
    },(word.length * factor * 1000));
}
var OldGameLvl = "";
document.getElementById("gamelevel").addEventListener("submit",function(e){
    e.preventDefault();
    var lvl = document.getElementById("gamelvl").value;
    if(OldGameLvl !== "" && OldGameLvl !== lvl){
        scores[0] = 0;
    }
    OldGameLvl = lvl;
    startGame(lvl);
    closeModal();
});
document.getElementById("gameplay").addEventListener('submit',function(e){
    e.preventDefault();
    var typedval = document.getElementById('typedval').value;
    if(typedval == Word){
        if(scores[1] >= scores[0])
            updateScores(5, 5);
        else{
            updateScores(0, 5);
        }
        clearTimeout(timer);
        document.getElementById("typedval").value = "";
        genRandWord(factor);
    }
    else{
        document.getElementById("typedval").value = "";
    }
});