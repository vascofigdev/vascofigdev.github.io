/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

		// Gallery.
		$('.gallery')
		.wrapInner('<div class="inner"></div>')
		.prepend(browser.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
		.scrollex({
			top:		'30vh',
			bottom:		'30vh',
			delay:		50,
			initialize:	function() {
				$(this).addClass('is-inactive');
			},
			terminate:	function() {
				$(this).removeClass('is-inactive');
			},
			enter:		function() {
				$(this).removeClass('is-inactive');
			},
			leave:		function() {

				var $this = $(this);

				if ($this.hasClass('onscroll-bidirectional'))
					$this.addClass('is-inactive');

			}
		})
		.children('.inner')
			//.css('overflow', 'hidden')
			.css('overflow-y', browser.mobile ? 'visible' : 'hidden')
			.css('overflow-x', browser.mobile ? 'scroll' : 'hidden')
			.scrollLeft(0);

	// Style #1.
		// ...

	// Style #2.
		$('.gallery')
			.on('wheel', '.inner', function(event) {

				var	$this = $(this),
					delta = (event.originalEvent.deltaX * 10);

				// Cap delta.
					if (delta > 0)
						delta = Math.min(25, delta);
					else if (delta < 0)
						delta = Math.max(-25, delta);

				// Scroll.
					$this.scrollLeft( $this.scrollLeft() + delta );

			})
			.on('mouseenter', '.forward, .backward', function(event) {

				var $this = $(this),
					$inner = $this.siblings('.inner'),
					direction = ($this.hasClass('forward') ? 1 : -1);

				// Clear move interval.
					clearInterval(this._gallery_moveIntervalId);

				// Start interval.
					this._gallery_moveIntervalId = setInterval(function() {
						$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
					}, 10);

			})
			.on('mouseleave', '.forward, .backward', function(event) {

				// Clear move interval.
					clearInterval(this._gallery_moveIntervalId);

			});
		// Lightbox.
		$('.gallery.lightbox')
		.on('click', 'a', function(event) {

			var $a = $(this),
				$gallery = $a.parents('.gallery'),
				$modal = $gallery.children('.modal'),
				$modalImg = $modal.find('img'),
				href = $a.attr('href');

			// Not an image? Bail.
				if (!href.match(/\.(jpg|gif|png|mp4)$/))
					return;

			// Prevent default.
				event.preventDefault();
				event.stopPropagation();

			// Locked? Bail.
				if ($modal[0]._locked)
					return;

			// Lock.
				$modal[0]._locked = true;

			// Set src.
				$modalImg.attr('src', href);

			// Set visible.
				$modal.addClass('visible');

			// Focus.
				$modal.focus();

			// Delay.
				setTimeout(function() {

					// Unlock.
						$modal[0]._locked = false;

				}, 600);

		})
		.on('click', '.modal', function(event) {

			var $modal = $(this),
				$modalImg = $modal.find('img');

			// Locked? Bail.
				if ($modal[0]._locked)
					return;

			// Already hidden? Bail.
				if (!$modal.hasClass('visible'))
					return;

			// Lock.
				$modal[0]._locked = true;

			// Clear visible, loaded.
				$modal
					.removeClass('loaded')

			// Delay.
				setTimeout(function() {

					$modal
						.removeClass('visible')

					setTimeout(function() {

						// Clear src.
							$modalImg.attr('src', '');

						// Unlock.
							$modal[0]._locked = false;

						// Focus.
							$body.focus();

					}, 475);

				}, 125);

		})
		.on('keypress', '.modal', function(event) {

			var $modal = $(this);

			// Escape? Hide modal.
				if (event.keyCode == 27)
					$modal.trigger('click');

		})
		.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
			.find('img')
				.on('load', function(event) {

					var $modalImg = $(this),
						$modal = $modalImg.parents('.modal');

					setTimeout(function() {

						// No longer visible? Bail.
							if (!$modal.hasClass('visible'))
								return;

						// Set loaded.
							$modal.addClass('loaded');

					}, 275);

				});

	// Smooth scroll.
	$('.smooth-scroll').scrolly();
	$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });


})(jQuery);