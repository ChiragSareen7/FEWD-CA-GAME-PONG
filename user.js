

var text = document.getElementById("value")
const button = document.getElementById("button");

button.onclick = () => {
  localStorage.setItem("nick",text.value)
  location.href = "./index.html";
};



