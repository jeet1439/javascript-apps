
let btn1 = document.getElementById("myBtn");
let btn2 = document.getElementById("myBtn2");
let copydiv = document.querySelector(".copycode");

let myHexvalues = "0123456789abcdef";
const hexValues = () => {
    let colors = "#";
    for (let i = 0; i < 6; i++) {
        colors = colors + myHexvalues[Math.floor(Math.random() * 16)];
    }
    return colors;
};
let rgb1 = "#0649eb";
let rgb2 = "#008793";
const handleButtton1 = () => {
    rgb1 = hexValues();
  //  console.log(rgb1);
    document.body.style.backgroundImage = `linear-gradient(to right, ${rgb1}, ${rgb2})`;
    copydiv.innerHTML = `background-image: linear-gradient(to right, ${rgb1},${rgb2});`;
    btn1.innerHTML = `${rgb1}`;
};
const handleButtton2 = () => {
    rgb2 = hexValues();
   // console.log(rgb2);
    document.body.style.backgroundImage = `linear-gradient(to right, ${rgb1}, ${rgb2})`;
    copydiv.innerHTML = `background-image: linear-gradient(to right, ${rgb1}, ${rgb2});`;
    btn2.innerHTML = `${rgb2}`;
};

btn1.addEventListener("click", handleButtton1);
btn2.addEventListener("click", handleButtton2);

copydiv.addEventListener("click", () => {
   navigator.clipboard.writeText(copydiv.innerText);
   alert("code copied");
});
