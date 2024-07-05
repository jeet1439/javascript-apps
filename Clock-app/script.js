const currTime = () => {
let time = new Date().toLocaleTimeString();
document.getElementById("clock").innerText = time;
}; 
setInterval(() =>{
    currTime();
}, 1000);
// currTime();