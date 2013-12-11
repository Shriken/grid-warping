var GAME = {

	canvas   : document.getElementById("canvas"),

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

	ctx      : GAME.canvas.getContext("2d")

});

GAME.setup = function() {

	GAME.grid = GAME.Grids.newGrid(400, 50, 5, 5);
	GAME.tgrid = GAME.Grids.newGrid(50, 50, 5, 5);
	var grid = GAME.grid,
		tgrid = GAME.tgrid;

	GAME.points = [];
	GAME.tpoints = [];

	GAME.point = {
		x : grid.x,
		y : grid.y
	}

	for (var j=0; j<tgrid.height; j++) {
		for (var i=0; i<tgrid.width; i++) {
			tgrid[j][i].x += 30*Math.random();
			tgrid[j][i].y += 30*Math.random();
		}
	}

	GAME.canvas.onmousemove = GAME.Input.mousemove;

	GAME.tpoint = GAME.Grids.transformPoint(GAME.point, GAME.grid, GAME.tgrid);
	GAME.Renderer.draw(GAME.grid);
}

GAME.step = function() {

	if (GAME.point.x != GAME.I_CURSOR_X || GAME.point.y != GAME.I_CURSOR_Y) {
		GAME.point = GAME.Grids.newPoint(GAME.I_CURSOR_X, GAME.I_CURSOR_Y);
		GAME.points.push(GAME.point);
		var p = GAME.Grids.transformPoint(GAME.point, GAME.grid, GAME.tgrid);
		if (p)
			GAME.tpoint = p;
	}

	GAME.Renderer.draw(GAME.grid);

	// setup the next one
	setTimeout(GAME.step, 0.1);
}
