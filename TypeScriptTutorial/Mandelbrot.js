var Limit = (function () {
    function Limit(min, max) {
        this.min = min;
        this.max = max;
    }
    return Limit;
})();
function scale(val, limit) {
    return (limit.max - limit.min) / val;
}
var max_iterations = 1000;
var xLimits = new Limit(-2.5, 1);
var yLimits = new Limit(-1, 1);
var canvas = document.getElementById("mb_canvas");
var height = parseInt(canvas.getAttribute("height"));
var width = parseInt(canvas.getAttribute("width"));
console.log("Width: " + width + ", Height: " + height);
var ctxt = canvas.getContext("2d");
var xscale = scale(width, xLimits);
var yscale = scale(height, yLimits);
for(var r = 0; r < height; r++) {
    var y0 = yLimits.min + yscale * r;
    for(var c = 0; c < width; c++) {
        var x0 = xLimits.min + xscale * c;
        var x = 0;
        var y = 0;
        var iteration = 0;
        while(x * x + y * y < 2 * 2 && iteration < max_iterations) {
            var xtemp = x * x - y * y + x0;
            y = 2 * x * y + y0;
            x = xtemp;
            iteration++;
        }
        ctxt.beginPath();
        if(iteration == max_iterations) {
            ctxt.fillStyle = '#FFFFFF';
        } else {
            ctxt.fillStyle = '#000000';
        }
        ctxt.rect(c, r, 1, 1);
        ctxt.fill();
        ctxt.closePath();
    }
}
