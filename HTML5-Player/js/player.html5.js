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

	this.destroy = function() {}

	this.creatDisplay = function() {
		player.$display = $('<div class="ppdisplay"></div>').appendTo(player.$player);
		player.$media = $('<div id="' + player.id + '_media"></div>')
			.css({
				overflow: 'hidden',
				height: '100%',
				width: '100%',
				top: '0px',
				left: '0px',
				padding: '0px',
				margin: '0px',
				display: 'block'
			})
			.appendTo(player.$display);

		player.$start = $('<div class="ppstart" style="display:none"></div>')
			.on('click', function(event) {
				event.preventDefault();
				player.$playBtn.click();
			})
			.appendTo(player.$display);

		player.$buffering = $('<div class="ppbuffering_" style="display:none"></div>').appendTo(player.$display);
	}

	this.creatControls = function() {
		player.$controls = $('<div class="ppcontrols"><ul class="left nav"></ul><ul class="right"></ul><ul class="bottom"></ul></div>')
			.appendTo(player.$player);

		if ($.inArray('fullscreen', player.options.controls) >= 0 && window.screenfull) {
			player.addControl('fsExitBtn', '<div class="ppfsexit inactive"></div>', '.right')
				.on('click', function(event) {
					event.preventDefault();
					screenfull.exit();
					player.$fsExitBtn.removeClass('active').addClass('inactive');
					player.$fsEnterBtn.removeClass('inactive').addClass('active');
				});
			player.addControl('fsEnterBtn', '</div><div class="ppfsenter active"></div>', '.right')
				.on('click', function(event) {
					event.preventDefault();
					screenfull.request();
					player.$fsExitBtn.removeClass('inactive').addClass('active');
					player.$fsEnterBtn.removeClass('active').addClass('inactive');
				});
		}

		if ($.inArray('timeleft', player.options.controls) >= 0) {
			player.addControl('timeleftBar', '<div class="pptimeleft"><span class="ppelp">00:00:00</span> | <span class="ppdur">00:00:00</span></div>', '.right');

	    	_this.$dur = player.$timeleftBar.find('.ppdur');
	    	_this.$elp = player.$timeleftBar.find('.ppelp');
		}

		if ($.inArray('progress', player.options.controls) >= 0) {
			player.addControl('progressBar', '<div class="ppscrubber" ><div class="pploaded"></div><div class="ppplayhead" style="width: 0%;"></div><div class="ppscrubberknob" ></div><div class="ppscrubberdrag"></div></div>', '.bottom');

			player.$playhead = player.$progressBar.find('.ppplayhead');
			player.$scrubberdrag = player.$progressBar.find('.ppscrubberdrag')
				.on('click', function(event) {
					event.preventDefault();
					if (_this.player.readyState == 0) {
						return false;
					} 

		            var x = $(this).offset().left;
		            var dx = event.clientX - x;
		            var widthSlider = $(this).width();
		            var seekTime = dx * _this.player.duration / widthSlider;
					_this.ui.setCurrentTime(seekTime, _this.player.duration);
		            _this.player.currentTime = seekTime;
				});
		}

		if ($.inArray('next', player.options.controls) >= 0) {
			player.addControl('nextBtn', '<div class="ppnext inactive"></div>', '.right')
				.on('click', function(event) {
					event.preventDefault();
					player.setVideo('next');
				});
		}

		if ($.inArray('prev', player.options.controls) >= 0) {
			player.addControl('prevBtn', '<div class="ppprev inactive"></div>', '.right')
				.on('click', function(event) {
					event.preventDefault();
					player.setVideo('prev');
				});
		}
	}

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
