GAME.setConsts({

	I_CURSOR_X : 0,
	I_CURSOR_Y : 0

});

GAME.Input = (function() {

	var mousemove = function(event) {
		GAME.I_CURSOR_X = event.x - 9;
		GAME.I_CURSOR_Y = event.y - 9;
	}

	return {
		mousemove : mousemove
	};

})();
