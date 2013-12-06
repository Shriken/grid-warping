GAME.Grids = (function() {
	
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

	var transformPoint = function(p, grid1, grid2) {
		// assuming uniform grid1
		var pt = {},
		    rectx = (p.x - grid1.x) / spacing,
		    recty = (p.y - grid1.y) / spacing,
			xinrect = (p.x - grid1/x) % spacing,
			yinrect = (p.y - grid1/y) % spacing;

		
	}

	var newPoint = function(x, y) {
		return {
			x : x,
			y : y
		};
	}

	return {
		newGrid : newGrid,
		newPoint : newPoint,
		transformPoint : transformPoint
	}

})();
