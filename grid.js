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

		var points1 = [];
		points1.push(grid1[recty][rectx]);
		points1.push(grid1[recty+1][rectx]);
		points1.push(grid1[recty][rectx+1]);
		points1.push(grid1[recty+1][rectx+1]);

		var points2 = [];
		points2.push(grid2[recty][rectx]);
		points2.push(grid2[recty+1][rectx]);
		points2.push(grid2[recty][rectx+1]);
		points2.push(grid2[recty+1][rectx+1]);

		var weights1 = [];
		for (var i=0; i<4; i++) {
			weights1.push(pdp(psub(points1[i], p), psub(points1[i], c1)));
		}

		var weights2 = [];
		for (var i=0; i<4; i++) {
			weights2.push(pdp(psub(points2[i], p), psub(points2[i], c2)));
		}
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
