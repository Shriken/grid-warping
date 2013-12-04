var GAME = {

}

// With thanks to Wolfenstein3D-browser
GAME.setConsts = function(C) {
    for (var a in C) {
        if (C.hasOwnProperty(a) && !(a in GAME)) {
            GAME[a] = C[a];
        }
    }
}

GAME.setConsts({
	canvas   : document.getElementById("canvas")
});

GAME.setConsts({
	ctx      : GAME.canvas.getContext("2d")
});

GAME.Renderer = (function() {
	var canvas  = GAME.canvas,
	    ctx     = GAME.ctx;

	var newGrid = function(x, y, width, height) {
		var points = [],
			spacing = 20;
		for (var j=0; j<height+1; j++) {
			row = [];
			for (var i=0; i<width+1; i++) {
				row.push(newPoint(x + i*spacing, y + j*spacing));
			}
			points.push(row);
		}

		points.x = x;
		points.y = y;
		points.width = width+1;
		points.height = height+1;
		points.spacing = spacing;

		return points;
	}

	var newPoint = function(x, y) {
		return {
			x : x,
			y : y
		};
	}

	var draw = function(grid) {
		x = grid;
		ctx.strokeStyle = "rgb(0,0,0)";
		for (var j=0; j<grid.height; j++) {
			for (var i=0; i<grid.width; i++) {
				joinPoints(grid, i, j, i-1, j);
				joinPoints(grid, i, j, i, j-1);
				joinPoints(grid, i, j, i+1, j);
				joinPoints(grid, i, j, i, j+1);
			}
		}
	}

	var joinPoints = function(grid, x1, y1, x2, y2) {
		if (0 <= x1 && x1 < grid.width && 0 <= x2 && x2 < grid.width) {
			if (0 <= y1 && y1 < grid.height && 0 <= y2 && y2 < grid.height) {
				ctx.beginPath();
				ctx.moveTo(grid.x + x1*grid.spacing, grid.y + y1*grid.spacing);
				ctx.lineTo(grid.x + x2*grid.spacing, grid.y + y2*grid.spacing);
				ctx.stroke();
			}
		}
	}

	return {
		newGrid : newGrid,
		draw : draw,
		joinPoints : joinPoints,
		newPoint : newPoint
	}
})();

GAME.Renderer.draw(GAME.Renderer.newGrid(50, 50, 5, 5));
