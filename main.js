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

	GAME.grid = GAME.Grids.newGrid(400, 50, 5, 1);
	GAME.tgrid = GAME.Grids.newGrid(50, 50, 5, 1);
	var grid = GAME.grid,
		tgrid = GAME.tgrid;

	var x1 = grid.x + grid.spacing * 0.5,
	    y1 = grid.y + grid.spacing * 0.5,
	    x2 = grid.x + grid.spacing * (grid.width - 1.5),
	    y2 = grid.y + grid.spacing * 0.5;
	GAME.line = [GAME.Grids.newPoint(x1, y1),
	             GAME.Grids.newPoint(x2, y2)];

	for (var j=0; j<tgrid.height; j++) {
		for (var i=0; i<tgrid.width; i++) {
			tgrid[j][i].x += 30*Math.random();
			tgrid[j][i].y += 30*Math.random();
		}
	}

	GAME.canvas.onmousemove = GAME.Input.mousemove;

	GAME.tline = GAME.Grids.transformLine(GAME.line, GAME.grid, GAME.tgrid);
	GAME.Renderer.draw(GAME.grid);
}

GAME.step = function() {
}
/*	GAME.Renderer.draw(GAME.grid);

	// setup the next one
	setTimeout(GAME.step, 0.1);
}*/
