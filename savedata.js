let start_time = new Date().getTime();
let end_time = new Date().getTime();
let randomChar = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
let mesures = [];
let mesureX = [];
let mesureY = [];
let num_question = 0;
let interVal;
let bougeInter;
let congruence= false;
let prop_congruence;
let bouge = false;
let count = 2;
let X0;
let Y0;
let IT;

/**
 * Petite partie pour les constances
 */
const wordContainer = document.querySelector("div[id=wordContainer]");
const word = document.getElementById("word");
const order = document.querySelector("div[id=order]");

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
    mesureX.push('start:'+num_question);
    mesureY.push('start:'+num_question);
    mesureX.push('{');
    mesureY.push('{');

    order.hidden = true;
    wordContainer.hidden = false;
    interVal = setInterval(function () {
        mesureX.push(mesures[0]);
        mesureY.push(mesures[1]);
        if (count === 2) {
            X0 = mesures[0];
            Y0 = mesures[1];
            count--;
        } else if (count === 1) {
            if (X0 !== mesures[0] && Y0 !== mesures[1]) {
                end_time = new Date().getTime();
                IT = end_time - start_time;
                console.log(IT);
                count--;
            }
        }
    },13);

    bougeInter = setInterval(function () {
        if (!bouge) {
            X0 = mesures[0];
            Y0 = mesures[1];
            bouge = true;
        } else {
            if (X0 === mesures[0] && Y0 === mesures[1]) order.hidden = false;
            bouge = false;
        }
    }, 500);
    num_question++;
    let random = randomChar[getRandomInt(8 - num_question)];
    randomChar = randomChar.filter(item => item !== random);
    start_time = new Date().getTime();

    if(getRandomInt(10)<=7){
      congruence = true
    }
    switch(parseInt(random)) {
        case 1:
            word.textContent = "ROUGE";//0.80 RED & 0.20 GREEN
            congruence?  word.style.color = 'red': word.style.color = "green";
            prop_congruence = 1;
            break;
        case 2: 
            word.textContent = "BLEU";
            congruence?  word.style.color = "yellow": word.style.color = "blue";
            prop_congruence = 1;
            break;
        case 3:
            word.textContent = "VERT";
            congruence?  word.style.color = "green": word.style.color = "red";
            prop_congruence = 1;
            break;
        case 4:
            word.textContent = "JAUNE";
            congruence?  word.style.color = "yellow": word.style.color = "red";
            prop_congruence = 1;
            break;
        case 5:
            word.textContent = "JAUNE";
            congruence?  word.style.color = "blue": word.style.color = "yellow";
            prop_congruence = 2;
            break;
        case 6:
            word.textContent = "VERT";
            congruence?  word.style.color = "red": word.style.color = "green";
            prop_congruence = 2;
            break;
        case 7: 
            word.textContent = "BLEU";
            congruence?  word.style.color = "yellow": word.style.color = "blue";
            prop_congruence = 2;
            break;
        case 8: 
            word.textContent = "ROUGE";//0.20 RED
            congruence?  word.style.color = "green": word.style.color = "red";
            prop_congruence = 2;
            break; 
        default:
            clearInterval(interVal)
            clearInterval(bougeInter)
            console.log(mesureX)
            word.textContent = "";
            savedata ({mesureX,mesureY});
            break;
    }
}



function reponse(reponse) {
    clearInterval(interVal)
    clearInterval(bougeInter)
    end_time = new Date().getTime();
    wordContainer.hidden = true;
    order.hidden = true;
    count = 2;
    let elapse = end_time - start_time;
    mesureX.push("RT " +elapse);
    mesureY.push("RT "+elapse);
    mesureX.push("IT "+IT);
    mesureY.push("IT "+IT);
    mesureX.push("congruence {"+ congruence + "}");
    mesureY.push("congruence {"+ congruence+ "}");
    mesureX.push("proportion {"+ prop_congruence + "}");
    mesureY.push("proportion {"+ prop_congruence + "}");
    mesureX.push("réponse {"+reponse + "}");
    mesureY.push("réponse {"+reponse + "}");
    mesureX.push("vrai "+reponse===word.style.color);
    mesureY.push("vrai "+reponse===word.style.color);
    mesureX.push("}");
    mesureY.push("}");

    mesures = []
}
window.addEventListener('DOMContentLoaded', following);


