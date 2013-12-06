GAME.Grid = (function() {
	
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

	return {
		newGrid : newGrid
	}

})();
