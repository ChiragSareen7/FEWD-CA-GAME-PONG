const button = document.getElementById("button");

button.onclick = () => {
  location.href = "./user.html";
};
const button2 = document.getElementById("click")
button2.onclick = () => {
  location.href = "./inst.html";
};


var audio = document.createElement("AUDIO")
document.body.appendChild(audio);
audio.src = "./music.mp3"

document.body.addEventListener("mousemove", function () {
    audio.play()
})