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

	GAME.grid = GAME.Grids.newGrid(50, 50, 5, 5);
	GAME.tgrid = GAME.Grids.newGrid(200, 50, 5, 5);

	var grid = GAME.grid,
		tgrid = GAME.tgrid;

	for (var j=0; j<tgrid.height; j++) {
		for (var i=0; i<tgrid.width; i++) {
			tgrid[j][i].x += 10*Math.random();
			tgrid[j][i].y += 10*Math.random();
		}
	}
}

GAME.step = function() {

	GAME.Renderer.draw(GAME.grid);

	// setup the next one
	setTimeout(GAME.step, 0.1);
}
