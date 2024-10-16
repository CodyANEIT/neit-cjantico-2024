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

// Shape 3: Pentagon
ctx.fillStyle = "rgb(255, 0, 255)";
ctx.lineWidth = 5;
ctx.strokeStyle = "rgb(0,255,255)";
ctx.beginPath();
ctx.moveTo(557, 308); // Starting at the given absolute value
ctx.lineTo(667, 284); // Point 2
ctx.lineTo(724, 380); // Point 3
ctx.lineTo(650, 464); // Point 4
ctx.lineTo(546, 420); // Point 5
ctx.closePath();
ctx.fill();
ctx.stroke();






// Shape 4: Star
ctx.fillStyle = "rgb(255,255,0)";
ctx.lineWidth = 5;
ctx.strokeStyle = "black";
ctx.beginPath();
ctx.moveTo(635, 497); // Top point
ctx.lineTo(603, 554); // point
ctx.lineTo(538, 567); // Middle right point
ctx.lineTo(583, 614); // point
ctx.lineTo(575, 681); // Middle left point
ctx.lineTo(635, 653); // Bottom right point
ctx.lineTo(696, 681); // Bottom left point
ctx.lineTo(688, 616); // Middle left point
ctx.lineTo(733, 567); // Bottom right point
ctx.lineTo(668, 554); // Bottom left point
ctx.lineTo(635, 496); // Middle left point

ctx.closePath();
ctx.fill();
ctx.stroke();

// Shape 5: Line
ctx.lineWidth = 5;
ctx.strokeStyle = "rgb(255, 0, 0)";
ctx.beginPath();
ctx.moveTo(85, 682); 
ctx.lineTo(278, 549); 
ctx.stroke();
ctx.closePath(); 