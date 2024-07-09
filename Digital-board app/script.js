const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retriveButton = document.getElementById("retriveButton");
const fontPicker = document.getElementById("fontPicker");
const ctx = canvas.getContext('2d'); 
const highlightColor = document.getElementById("highlightColor");

ctx.strokeStyle = colorPicker.value;
colorPicker.addEventListener('change',(e) => {
     ctx.strokeStyle = e.target.value;
     ctx.fillStyle = e.target.value;
     ctx.lineCap = 'round';

     ctx.lineWidth = 2;
     ctx.shadowBlur = null;
     ctx.shadowColor = null;
})
        
highlightColor.addEventListener('change',(e) =>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
    ctx.lineCap = 'round';

    ctx.lineWidth = 7;
    ctx.shadowBlur = 10;
    ctx.shadowColor = e.target.value;
})
        
canvas.addEventListener('mousedown', (e) =>{
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;

})
canvas.addEventListener('mouseup', (e) =>{
    isDrawing = false;
})
canvas.addEventListener('mousemove', (e) => {
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
                
        ctx.stroke();
        lastX = event.offsetX;
        lastY = event.offsetY;
    }
})
canvasColor.addEventListener('change',(e) =>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, 800, 400);
})
fontPicker.addEventListener('change',(e) =>{
    ctx.lineWidth = e.target.value;
    ctx.lineCap = 'round';
})
clearButton.addEventListener('click', ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

const addtols = () =>{
    localStorage.setItem('canvasContents', canvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    link.click();
}
saveButton.addEventListener('click',() =>{
    addtols();
})

retriveButton.addEventListener('click', ()=>{
let savedCanvas = localStorage.getItem('canvasContents');
if(savedCanvas){
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img,0,0);
        }
    })
  
        