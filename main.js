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

	GAME.grid = GAME.Renderer.newGrid(50, 50, 5, 5);
	GAME.tgrid = GAME.Renderer.newGrid(200, 50, 5, 5);
}

GAME.step = function() {

	GAME.Renderer.draw(GAME.grid);

	// setup the next one
	setTimeout(GAME.step, 0.1);
}
