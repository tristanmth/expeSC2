let start_time = new Date().getTime();
let end_time = new Date().getTime();
let randomChar = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
let mesures = [];
let mesureX = [];
let mesureY = [];
let num_question = 0;
let interVal;
let bougeInter;
let congruence;
let prop_congr;
let prop_congruence =false;
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

const colorMapCongruence = [
    { word: "ROUGE", color: 'red' ,congruence_color: true,prop_congruence:true},
    { word: "ROUGE", color: 'red' ,congruence_color: true,prop_congruence:true},
    { word: "ROUGE", color: 'red' ,congruence_color: true,prop_congruence:true},
    { word: "ROUGE", color: 'red' ,congruence_color: true,prop_congruence:true},
    { word: "VERT", color: "green",congruence_color: true ,prop_congruence:true},
    { word: "VERT", color: "green",congruence_color: true,prop_congruence:true },
    { word: "VERT", color: "green" ,congruence_color: true,prop_congruence:true},
    { word: "VERT", color: "green" ,congruence_color: true,prop_congruence:true},
    { word: "VERT", color: "red" ,congruence_color: false,prop_congruence:false},
    { word: "ROUGE", color: "green" ,congruence_color: false,prop_congruence:false},

    { word: "BLEU", color: "yellow" ,congruence_color: false,prop_congruence:true},
    { word: "BLEU", color: "yellow" ,congruence_color: false,prop_congruence:true},
    { word: "BLEU", color: "yellow" ,congruence_color: false,prop_congruence:true},
    { word: "BLEU", color: "yellow" ,congruence_color: false,prop_congruence:true},
    { word: "JAUNE", color: "blue" ,congruence_color: false,prop_congruence:true},
    { word: "JAUNE", color: "blue" ,congruence_color: false,prop_congruence:true},
    { word: "JAUNE", color: "blue" ,congruence_color: false,prop_congruence:true},
    { word: "JAUNE", color: "blue" ,congruence_color: false,prop_congruence:true},

    { word: "BLEU", color: "blue",congruence_color: false,prop_congruence:false },
    { word: "JAUNE", color: "yellow" ,congruence_color: false,prop_congruence:false},

];

const colorMapIncongruence = [
    { word: "ROUGE", color: 'red',congruence_color: true,prop_congruence:false},
    { word: "VERT", color: "green" ,congruence_color: true,prop_congruence:false},

    { word: "VERT", color: "red",congruence_color: false ,prop_congruence: true},
    { word: "VERT", color: "red",congruence_color: false,prop_congruence: true },
    { word: "VERT", color: "red" ,congruence_color: false,prop_congruence: true},
    { word: "VERT", color: "red" ,congruence_color: false,prop_congruence: true},
    { word: "ROUGE", color: "green",congruence_color: false ,prop_congruence: true},
    { word: "ROUGE", color: "green" ,congruence_color: false,prop_congruence: true},
    { word: "ROUGE", color: "green",congruence_color: false ,prop_congruence: true},
    { word: "ROUGE", color: "green",congruence_color: false ,prop_congruence: true},

    { word: "BLEU", color: "blue" ,congruence_color: true,prop_congruence: true},
    { word: "JAUNE", color: "yellow",congruence_color: true ,prop_congruence: true},
    { word: "BLEU", color: "blue" ,congruence_color: true,prop_congruence: true},
    { word: "JAUNE", color: "yellow" ,congruence_color: true,prop_congruence: true},
    { word: "BLEU", color: "blue" ,congruence_color: true,prop_congruence: true},
    { word: "JAUNE", color: "yellow" ,congruence_color: true,prop_congruence: true},
    { word: "BLEU", color: "blue" ,congruence_color: true,prop_congruence: true},
    { word: "JAUNE", color: "yellow" ,congruence_color: true,prop_congruence: true},

    { word: "BLEU", color: "yellow",congruence_color: false,prop_congruence:false },
    { word: "JAUNE", color: "blue" ,congruence_color: false,prop_congruence:false},

];
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

let launchExp = (congruent) => {
    prop_congruence = congruent === 'congruence';

    congruence = congruent;
    mesureX.push('start:'+ID);
    mesureY.push('start:'+ID);
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
    let random = randomChar[getRandomInt(21 - num_question)];
    randomChar = randomChar.filter(item => item !== random);
    start_time = new Date().getTime();

    let colorMap = prop_congruence ? colorMapCongruence : colorMapIncongruence;
    random = parseInt(random);
    if (colorMap[random]) {
        word.textContent = colorMap[random].word;
        word.style.color = colorMap[random].color;
        congruence = colorMap[random].congruence_color;
        prop_congr = colorMap[random].prop_congruence;
    } else {
        clearInterval(interVal);
        word.textContent = "";
        document.getElementById("StartButton").hidden = true;
        savedata({ mesureX, mesureY });
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
    mesureX.push("proportion {"+ prop_congr + "}");
    mesureY.push("proportion {"+ prop_congr + "}");
    mesureX.push("réponse {"+reponse + "}");
    mesureY.push("réponse {"+reponse + "}");
    mesureX.push(reponse===word.style.color);
    mesureY.push(reponse===word.style.color);
    mesureX.push("}");
    mesureY.push("}");

    mesures = []
}
window.addEventListener('DOMContentLoaded', following);
let ID = prompt("Bienvenue dans notre expérience, vous allez voir des mots de couleurs différentes, veuillez répondre à la couleur du mot et non pas au mot lui même. Appuyez sur une touche pour commencer l'expérience");


