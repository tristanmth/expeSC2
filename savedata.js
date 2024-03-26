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
    let url = "savedata.php";

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
    
    let word = document.getElementById("word");
    let congruence=false;
    if(getRandomInt(10)<=7){
      congruence = true
    }
    switch(parseInt(random)) {
        case 1:
            word.textContent = "ROUGE";//0.80 RED & 0.20 GREEN
            congruence?  word.style.color = 'red': word.style.color = "green";
            break;
        case 2: 
            word.textContent = "BLEU";
            congruence?  word.style.color = 'yellow': word.style.color = "blue";
            break;
        case 3:
            word.textContent = "VERT";
            congruence?  word.style.color = 'green': word.style.color = "red";
            break;
        case 4:
            word.textContent = "JAUNE";
            congruence?  word.style.color = 'yellow': word.style.color = "red";
            break;
        case 5:
            word.textContent = "JAUNE";
            congruence?  word.style.color = 'blue': word.style.color = "yellow";

            break;
        case 6:
            word.textContent = "VERT";
            congruence?  word.style.color = 'red': word.style.color = "green";
            break;
        case 7: 
            word.textContent = "BLEU";
            congruence?  word.style.color = 'yellow': word.style.color = "blue";
            break;
        case 8: 
            word.textContent = "ROUGE";//0.20 RED
            congruence?  word.style.color = 'green': word.style.color = "red";
            break; 
        default:
            clearInterval(interVal)
            word.textContent = "";
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


