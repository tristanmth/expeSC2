var start_time = new Date().getTime();
var end_time = new Date().getTime(); ;
var yes = no = langue = type = color = time = idquestion = String();
var randomChar = [1,2,3,4,5,6,7,8];
var mesures = new Float32Array();
savedata =  function (data) {

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
 getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
}

   (function() {
    document.onmousemove = handleMouseMove;
    let valX = valY =  maxX = maxY = 0;
    let minX = minY = Infinity;
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        if(event.pageX > maxX)maxX = event.pageX;
        if(event.pageY > maxY)maxY = event.pageY;
        if(event.pageX < minX)minX = event.pageX;
        if(event.pageX < minY)minX = event.pageY;
        console.log(event.pageX)
        console.log(event.pageY)
    }
})();



isHidden = function(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none')
}

 repondre = function() {
  // lancer timer
    start_time = new Date().getTime();
    document.getElementById("btn_repondre").hidden = "true";
    if(getRandomInt(2)==1){
        document.getElementById("btn_yes").hidden = false;
        document.getElementById("btn_no").hidden = false;
    }else {
        document.getElementById("btn_yes_norder").hidden = false;
        document.getElementById("btn_no_norder").hidden = false;
    }
}
normalize = function(val, max, min){return (val - min) / (max - min);}

launchExp = function(num_question,reponse){
    var color_param;
    var reponse = reponse || null;
    var lang_param,amb_param;
    num_question++;
    let randint = getRandomInt(8 - num_question);
    var random = randomChar[randint];
    randomChar = randomChar.filter(item => item !== random);
    if(reponse != null){
      end_time = new Date().getTime();
      let elapse = (end_time-start_time);
      console.log(end_time + " "+ start_time + " ("+(end_time-start_time)+")");
    }

    document.getElementById("info_p").hidden = true;
    document.getElementById("formulaire").hidden = true;
    document.getElementById("btn_launch").hidden = true;
    document.getElementById("btn_repondre").hidden = false;
    document.getElementById("btn_yes").hidden = true;
    document.getElementById("btn_no").hidden = true;
    document.getElementById("btn_yes_norder").hidden = true;
    document.getElementById("btn_no_norder").hidden = true;
    switch(parseInt(random)) {
        case 1:
            document.getElementById("question_title").textContent = "ROUGE"; 
            break;
        case 2: 
            document.getElementById("question_title").textContent = "BLEU";
            break;
        case 3:
            document.getElementById("question_title").textContent = "VERT";
            break;
        case 4:
            document.getElementById("question_title").textContent = "JAUNE";
            break;
        case 5:
            document.getElementById("question_title").textContent = "dvorak";
            break;
        case 6:
            document.getElementById("question_title").textContent = "azerty";
            break;
        case 7: 
            document.getElementById("question_title").textContent = "qwerty";
            break;
        case 8: 
            document.getElementById("question_title").textContent = "bepo";
            break; 
        default: 
            console.log(time);
            const data = document.getElementById("formulaire");
            savedata ({data:new FormData(data),idquestion:idquestion,yes: yes, no: no,type:type,color:color,time:time});
            document.getElementById("fin_title").hidden = false;
            document.getElementById("btn_yes").hidden = true;
            document.getElementById("btn_no").hidden = true;
            document.getElementById("btn_yes_norder").hidden = true;
            document.getElementById("btn_no_norder").hidden = true;
            document.getElementById("btn_repondre").hidden = true;
            document.getElementById("question_title").hidden = true;
            break;
        }
            var el = document.getElementById('btn_yes'),
            elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);
            
            el = document.getElementById('btn_no'),
            elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);

            el = document.getElementById('btn_yes_norder'),
            elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);

            el = document.getElementById('btn_no_norder'),
            elClone = el.cloneNode(true);
            el.parentNode.replaceChild(elClone, el);
            
            document.getElementById("btn_yes").addEventListener('click', function() {launchExp(num_question,["oui",lang_param,amb_param,color_param]);});
            document.getElementById("btn_no").addEventListener('click', function() {launchExp(num_question,["non",lang_param,amb_param,color_param]);});
            document.getElementById("btn_yes_norder").addEventListener('click', function() {launchExp(num_question,["oui",lang_param,amb_param,color_param]);});
            document.getElementById("btn_no_norder").addEventListener('click', function() {launchExp(num_question,["non",lang_param,amb_param,color_param]);});
        }
