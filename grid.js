GAME.Grids = (function() {
	
	var newGrid = function(x, y, width, height) {
		var points = [],
			spacing = 40;
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
		var rectx = Math.floor((p.x - grid1.x) / grid1.spacing),
		    recty = Math.floor((p.y - grid1.y) / grid1.spacing);
		if (rectx < 0 || grid1.width-1 <= rectx ||
		    recty < 0 || grid1.height-1 <= recty)
			return undefined;

		var rect1 = [];
		rect1.push(grid1[recty][rectx]);
		rect1.push(grid1[recty+1][rectx]);
		rect1.push(grid1[recty][rectx+1]);
		rect1.push(grid1[recty+1][rectx+1]);

		var rect2 = [];
		rect2.push(grid2[recty][rectx]);
		rect2.push(grid2[recty+1][rectx]);
		rect2.push(grid2[recty][rectx+1]);
		rect2.push(grid2[recty+1][rectx+1]);

		var point = transformPointRects(clonePoint(p), rect1, rect2);
		return point;
	}

	var transformPointRects = function(p, rect1, rect2) {

		r1 = [];
		r2 = [];
		for (var i=0; i<4; i++) {
			r1.push(clonePoint(rect1[i]));
			r2.push(clonePoint(rect2[i]));
		}

		rect1 = r1;
		rect2 = r2;

		var center1 = {
			x : 0,
			y : 0
		};

		var center2 = {
			x : 0,
			y : 0
		};

		for (var i=0; i<4; i++) {
			center1.x += rect1[i].x;
			center1.y += rect1[i].y;
			center2.x += rect2[i].x;
			center2.y += rect2[i].y;
		}

		center1.x /= 4;
		center1.y /= 4;
		center2.x /= 4;
		center2.y /= 4;

		p.x -= center1.x;
		p.y -= center1.y;
		for (var i=0; i<4; i++) {
			rect1[i].x -= center1.x;
			rect1[i].y -= center1.y;
			rect2[i].x -= center2.x;
			rect2[i].y -= center2.y;
		}

		var weights = [],
			spacing = rect1[1].y - rect1[0].y,
		    newPoint = {
		    	x : 0,
		    	y : 0
		    };
		for (var i=0; i<4; i++) {
			weights.push(pdp(p, rect1[i]) * 1.414 / spacing);
			newPoint.x += rect2[i].x * weights[i];
			newPoint.y += rect2[i].y * weights[i];
		}

		newPoint.x /= 1.414 * 40;
		newPoint.y /= 1.414 * 40;
		newPoint.x += center2.x;
		newPoint.y += center2.y;

		return newPoint;
	}

	var newPoint = function(x, y) {
		return {
			x : x,
			y : y,
		};
	}

	var clonePoint = function(p) {
		return {
			x : p.x,
			y : p.y
		};
	}

	var pdp = function(p1, p2) {
		return p1.x * p2.x + p1.y * p2.y;
	}

	return {
		newGrid : newGrid,
		newPoint : newPoint,
		transformPoint : transformPoint,
		clonePoint : clonePoint
	}

})();
