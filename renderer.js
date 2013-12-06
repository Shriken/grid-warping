GAME.Renderer = (function() {

	var canvas  = GAME.canvas,
	    ctx     = GAME.ctx;

	var newPoint = function(x, y) {
		return {
			x : x,
			y : y
		};
	}

	var draw = function() {

		var grid = GAME.grid;
			tgrid = GAME.tgrid;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "rgb(0,0,0)";

		for (var j=0; j<grid.height; j++) {
			for (var i=0; i<grid.width; i++) {
				joinPoints(grid, i, j, i-1, j);
				joinPoints(grid, i, j, i, j-1);
				joinPoints(grid, i, j, i+1, j);
				joinPoints(grid, i, j, i, j+1);
			}
		}

		for (var j=0; j<tgrid.height; j++) {
			for (var i=0; i<tgrid.width; i++) {
				joinPoints(tgrid, i, j, i-1, j);
				joinPoints(tgrid, i, j, i, j-1);
				joinPoints(tgrid, i, j, i+1, j);
				joinPoints(tgrid, i, j, i, j+1);
			}
		}
	}

	var joinPoints = function(grid, x1, y1, x2, y2) {
		if (0 <= x1 && x1 < grid.width && 0 <= x2 && x2 < grid.width) {
			if (0 <= y1 && y1 < grid.height && 0 <= y2 && y2 < grid.height) {
				ctx.beginPath();
				ctx.moveTo(grid[y1][x1].x, grid[y1][x1].y);
				ctx.lineTo(grid[y2][x2].x, grid[y2][x2].y);
				ctx.stroke();
			}
		}
	}

	return {
		draw : draw,
		joinPoints : joinPoints,
		newPoint : newPoint
	}

})();
