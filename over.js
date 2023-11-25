let scoree = localStorage.getItem("scoreCard")
let show = document.getElementById("score-board");

show.innerText= scoree;


const button = document.getElementById("button");

button.onclick = () => {
  location.href = "./index.html";
};
var sentence =[
    "Well Played",
    "You Saved The planet",
    "Epic Game"
]
function phase(){
    return Math.floor(Math.random()*sentence.length)
}
document.getElementById("phrase").innerText=sentence[phase()];

var store = localStorage.getItem("nick");
var head = document.getElementsByClassName("head");
head[0].innerHTML="THANK YOU, "+ store;
