const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Shape 1: Square
ctx.fillStyle = "yellow";
ctx.fillRect(85, 300, 100, 100);
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
ctx.strokeRect(85, 300, 100, 100);

// Shape 2: Circle
ctx.fillStyle = "rgb(255,255,0)";
ctx.beginPath();
ctx.arc(385, 440, 66, 0, Math.PI * 2);
ctx.closePath();
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = "red";
ctx.stroke();

// Shape 3: Circle






// Shape 4: Star






// Shape 5: Line
ctx.lineWidth = 5;
ctx.strokeStyle = "rgb(255, 0, 0)";
ctx.beginPath();
ctx.moveTo(85, 682); 
ctx.lineTo(278, 549); 
ctx.stroke();
ctx.closePath(); 