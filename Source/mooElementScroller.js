/**
 * Quite flexible implementation to make a content box scrollable per
 * mouse-wheel and scroll-buttons.
 *
 * © Alexander Hofbauer
 */

var mooTextScroller = new Class
({
	Implements: Options,
	
	element: null,
	content: null,
	scroll: null,
	modifier: 0,
	perID: null,
	
	options: {
		resize: {
			enabled: false,
			offset: 0
		},
		slow: 5,
		fast: 25,
		scrollSpeed: 30,
		//TODO: implement hover/click or click only options
		hoverScroll: false
	},
	
	initialize: function(element, options)
	{
		this.content = element;
		this.setOptions(options);

		window.addEvent('domready', function() { this.prepareEvents(); }.bind(this));
		window.addEvent('resize', function() { this.resizeEvent(); }.bind(this));
	},

	
	prepareEvents: function()
	{
		this.content = document.id(this.content);
		if (this.content == null) return;
		
		// add a wrapping element with the id of the element to scroll + "-mts-wrapper"
		this.element = new Element('div', {'id': this.content.get('id')+'-mts-wrapper' });
		this.element.wraps(this.content);

		// add the scroll area that will contain the scroll buttons
		this.scroll = new Element('div', {
			'class': 'mts-scrollarea',
			'styles': {
				'opacity': 0
			}
		});
		
		this.scroll.inject(this.element, 'after');
		
		var up = new Element('div', {
			'class': 'up'
		}).addEvents({
			'mouseenter': 	function() {
				this.modifier = -(this.options.slow);
				this.perID = this.buttonScroll.periodical(1, this);
			}.bind(this),
			'mousedown': 	function() { this.modifier = -(this.options.fast); }.bind(this),
			'mouseup': 		function() { this.modifier = -(this.options.slow); }.bind(this),
			'mouseleave': 	function() { $clear(this.perID); }.bind(this)
		});
		
		var down = new Element('div', {
			'class': 'down'
		}).addEvents({
			'mouseenter': 	function() {
				this.modifier = this.options.slow;
				this.perID = this.buttonScroll.periodical(1, this);
			}.bind(this),
			'mousedown': 	function() { this.modifier = this.options.fast; }.bind(this),
			'mouseup': 		function() { this.modifier = this.options.slow; }.bind(this),
			'mouseleave': 	function() { $clear(this.perID); }.bind(this)
		});

		this.scroll.grab(up).grab(down);
		
		this.resizeEvent();
		
		var scrollSpeed = this.options.scrollSpeed;
		this.element.addEvent('mousewheel', function(e) {
			e.stop();
			var dir = (e.wheel < 0) ? 1 : -1;
			var scroll = this.getScroll();
			this.scrollTo(0, scroll.y+(dir*scrollSpeed));
		});
	},
	
	
	resizeEvent: function()
	{
		if (this.options.resize.enabled) {
			var newHeight = document.id(document.body).getSize().y - this.options.resize.offset;
			this.element.setStyle('height', newHeight);
		}	
		this.showScroll();
	},
	
	showScroll: function()
	{
		if (this.element.getSize().y >= this.element.getScrollSize().y) {
			this.scroll.fade('out');
			this.element.scrollTo(0, 0);
		} else {
			this.scroll.fade('in');
		}
	},
	
	buttonScroll: function()
	{
		var scroll = this.element.getScroll();
		this.element.scrollTo(scroll.x, scroll.y+this.modifier);
	}
});

