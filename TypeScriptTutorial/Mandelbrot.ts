
var canvas = <HTMLCanvasElement>document.getElementById("mb_canvas")
var height = parseInt(canvas.getAttribute("height"))
var width = parseInt(canvas.getAttribute("width"))
var mouseDown : MouseEvent = null
var ctxt : CanvasRenderingContext2D = canvas.getContext("2d")

console.log("Width: " + width + ", Height: " + height)

class Limit {
    constructor(public min: number, public max: number) { }
}

var xLimits = new Limit(-2.5, 1)
var yLimits = new Limit(-1, 1)

function scale(val: number, limit: Limit) : number{
    return (limit.max - limit.min)/val
}

function draw() {
	var max_iterations = 1000
	var xscale = scale(width,xLimits) 
	var yscale = scale(height,yLimits) 

	for (var r = 0; r < height; r++) {
		var y0 = yLimits.min + yscale * r
		for (var c = 0; c < width; c++) {
				var x0 = xLimits.min + xscale * c

				var x = 0
				var y = 0

				var iteration = 0
				while (x * x + y * y < 2 * 2 && iteration < max_iterations) {
						var xtemp = x*x - y*y + x0
						y = 2*x*y+y0
						x = xtemp
						iteration++
				}

				ctxt.beginPath()
				var colorScale = 0xFFFF/max_iterations
				var color = "#"+Math.floor(iteration*colorScale).toString(16)+"FF"
				ctxt.fillStyle = color
				
				ctxt.rect(c,r,1,1)
				ctxt.fill()
				ctxt.closePath()
		}
	}
}	


canvas.onmousedown = function(mouse : MouseEvent) { 
	console.log("Mouse down: x: " + mouse.clientX + ", y: " +mouse.clientY);
	mouseDown = mouse
}

canvas.onmouseup = function(mouseUp: MouseEvent) { 
	console.log("Mouse up: x: " + mouseUp.clientX + ", y: " +mouseUp.clientY);
	if(!movedEnough(mouseDown, mouseUp)) return
	resize(mouseUp)
	draw()
}

function min(x: number, y:number){
	return x < y ? x : y
}

function max(x: number, y:number){
	return x > y ? x : y
}

function resize(mouseUp: MouseEvent){
	var zoomStart = min(mouseDown.clientX,mouseUp.clientX)
	var zoomStop = max(mouseDown.clientX,mouseUp.clientX)

	var newMin = (xLimits.max-xLimits.min)*zoomStart/width
	var newMax = (xLimits.max-xLimits.min)*zoomStop/width
	
	xLimits = new Limit(newMin,newMax)
}


function movedEnough(down: MouseEvent, up: MouseEvent) {
	var minMove = 100
	return (Math.abs(down.clientX - up.clientX) > minMove && 
					Math.abs(down.clientY - down.clientY) > minMove)
}


draw()

