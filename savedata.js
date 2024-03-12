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
    document.onmousemove = handleMouseMove;
    let maxY = 0, maxX = 0, valX = 0, valY = 0, minX = Infinity, minY = Infinity;
    function handleMouseMove(event) {

        if (event.pageX == null && event.clientX != null) {
            let eventDoc = (event.target && event.target.ownerDocument) || document,
                doc = eventDoc.documentElement, body = eventDoc.body;

            event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);

            event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        if(event.pageX > maxX)maxX = event.pageX;
        if(event.pageY > maxY)maxY = event.pageY;
        if(event.pageX < minX)minX = event.pageX;
        if(event.pageY < minY)minY = event.pageY;

        valX = normalize(event.pageX, maxX, minX);
        valY = 1 - normalize(event.pageY, maxY, minY);

        mesures[0] = valX;
        mesures[1] =  valY;
    }
};

let isHidden = (el) => {
    let style = window.getComputedStyle(el);
    return (style.display === 'none')
}

let normalize = (val, max, min) => {return (val - min) / (max - min);}
let launchExp = () => {
    mesureX.push('start');
    mesureY.push('start');
    interVal = setInterval(function () {
        if(mesures !== 0)console.log(mesures)
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
            document.getElementById("word").textContent = "dvorak";
            break;
        case 6:
            document.getElementById("word").textContent = "azerty";
            break;
        case 7: 
            document.getElementById("word").textContent = "qwerty";
            break;
        case 8: 
            document.getElementById("word").textContent = "bepo";
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
    elapse = end_time - start_time;
    mesureX.push(elapse);
    mesureY.push(elapse);
    mesureX.push(reponse);
    mesureY.push(reponse);
    mesures = []
}
window.addEventListener('DOMContentLoaded', following);

