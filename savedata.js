let start_time = new Date().getTime();
let end_time = new Date().getTime();
let randomChar = [1,2,3,4,5,6,7,8];
let mesures = [];
let mesureX = [];
let mesureY = [];
let num_question = 0;
let interVal;
let savedata = (data) => {

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "../savedata.php";

    // open a connection
    xhr.open ("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader ("Content-Type", "application/json");

    // Sending data with the request
    console.log(data);
    xhr.send (JSON.stringify (data));
}
let getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
let following = () => {
    let maxY = 0, maxX = 0, valX = 0, valY = 0, minX = Infinity, minY = Infinity;
    onmousemove = function(e){
        if(e.pageX > maxX)maxX = e.pageX;
        if(e.pageY > maxY)maxY = e.pageY;
        if(e.pageX < minX)minX = e.pageX;
        if(e.pageY < minY)minY = e.pageY;

        valX = normalize(e.pageX, maxX, minX);
        valY = 1 - normalize(e.pageY, maxY, minY);

        mesures[0] = valX;
        mesures[1] =  valY;
    }
};

let normalize = (val, max, min) => {return (val - min) / (max - min);}
let launchExp = () => {
    mesureX.push('start');
    mesureY.push('start');
    document.querySelector("div[id=wordContainer]").hidden = false;
    document.querySelector("div[id=order]").hidden = true;
    interVal = setInterval(function () {
        mesureX.push(mesures[0]);
        mesureY.push(mesures[1]);
    },13);
    num_question++;
    let random = randomChar[getRandomInt(8 - num_question)];
    randomChar = randomChar.filter(item => item !== random);
    start_time = new Date().getTime();

    switch(parseInt(random)) {
        case 1:
            document.getElementById("word").textContent = "ROUGE";
            break;
        case 2: 
            document.getElementById("word").textContent = "BLEU";
            break;
        case 3:
            document.getElementById("word").textContent = "VERT";
            break;
        case 4:
            document.getElementById("word").textContent = "JAUNE";
            break;
        case 5:
            document.getElementById("word").textContent = "JAUNE";
            break;
        case 6:
            document.getElementById("word").textContent = "VERT";
            break;
        case 7: 
            document.getElementById("word").textContent = "BLEU";
            break;
        case 8: 
            document.getElementById("word").textContent = "ROUGE";
            break; 
        default:
            clearInterval(interVal)
            document.getElementById("word").textContent = "";
            savedata ({mesureX,mesureY});
            break;
    }
}

function reponse(reponse) {
    clearInterval(interVal)
    end_time = new Date().getTime();
    document.querySelector("div[id=wordContainer]").hidden = true;
    let elapse = end_time - start_time;
    console.log(elapse)
    if(elapse>=500)document.querySelector("div[id=order]").hidden = false;
    mesureX.push(elapse);
    mesureY.push(elapse);
    mesureX.push(reponse);
    mesureY.push(reponse);
    mesures = []
}
window.addEventListener('DOMContentLoaded', following);

