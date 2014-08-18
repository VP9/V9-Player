var VP9 = VP9 || {};

VP9.playerHTML5 = function(player) {
	var _this = this;

	this.name = 'HTML5';
	this.state =  'IDLE';

	this.init = function() {
		player.$player.empty();

		_this.creatDisplay();
	    player.creatDisplay();
		_this.creatControls();
		player.creatControls();

		//init plugin before set video
    	player.plugins.init();

		this.ui.hideControls();

	    //onclick
	    player.$playBtn.on('click', function() {
			if (_this.player.paused) {
				_this.player.play();
			}
			else {
				_this.player.pause();
			}
	    });

	   	player.ready.call(this);
    	if (typeof(player.options.ready) == 'function') {
	   		player.options.ready.call(this, player);
	   	}

		player.setPlaylist(player.options.playlist);
		player.setVideo(player.options.activeVideo);
	}

	this.destroy = function() {
	}

	this.creatDisplay = function() {}

	this.creatControls = function() {}

    this.ui = {};
    this.ui.onEvent = function() {}

    this.ui.resume = function() {}

    this.ui.autoPlay = function() {}

    this.ui.scale = function() {}

	_this.ui.hideTimeout = null;
    this.ui.hideControls = function() {}

    this.ui.setDuration = function(duration) {};

    this.ui.setCurrentTime = function(currentTime, duration) {}

    this.ui.setStop = function() {}

    this.ui.setVideo = function(id) {}


    //Events
    player.onReady = function(func) {}

    player.onPlay = function(func) {}

    player.onFirstPlay = function(func) {}

    player.onPause = function(func) {}

    player.onEnded = function(func) {}

    var onStop = [];
    player.onStop = function(func) {}

    var onSetVideo = [];
    player.onSetVideo = function(func) {}

    player.onTimeupdate = function(func) {}

    player.onError = function(func) {}

    player.onSeeking = function(func) {}

    player.onSeeked = function(func) {}

    //methods
    player.setPlay = function() {}

    player.setPause = function() {}

	player.setStop = function() {}

	player.setSeek = function(time) {}

	player.setVideo = function(item, seekTime) {}

	player.setPlaylist = function(playlist) {}


	player.setAutoNext = function(auto) {}

    player.addItem = function(data) {}

    player.removeItem = function(data) {}

	player.getCurrentVideo = function() {}

	player.getCurrentTime = function() {}

	player.getState = function(state) {}

    this.init();
}
