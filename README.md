Mootools Element Scroller
=========================

Allows you to convert (wrap) an element to make it scrollable. Automatically inserts a scroll-area and up/down scroll elements.


How to use
----------

Javascript:

	#JS
	var myScroller = new mooElementScroller('element', {
		resize: {
			enabled: true,
			offset: 180
		},
		slow: 2
	});


Stylesheet:

	#somelist-mes-wrapper {
		height: 100px;
		overflow: hidden;
		border: 1px solid black;
	}
	
	#somelist {
		list-style: none;
		padding-right: 100px;
	}
	
	#somelist li {
		padding: 10px;
		margin: 20px 0px;
		border: 1px solid gray;
		background-color: lightgreen;
	}

	.mes-scrollarea {
		position: fixed;
		top: 50%;
		margin-top: -58px;
		height: 156px;
		right: 20px;
		z-index: 3;
	}

	.mes-up, .mes-down {
		height: 48px;
		width: 51px;
		cursor: pointer;
		background-repeat: no-repeat;
		background-color: transparent;
	}

	.mes-up {
		background-image: url('go-up.png');
		background-position: top left;
		margin-bottom: 60px;
	}

	.mes-down {
		background-image: url('go-down.png');
		background-position: bottom left;
	}


HTML:

	&lt;ul id="somelist"&gt;
		&lt;li&gt;One&lt;/li&gt;
		&lt;li&gt;Two&lt;/li&gt;

		&lt;li&gt;Three&lt;/li&gt;
		&lt;li&gt;Four&lt;/li&gt;
		&lt;li&gt;Five&lt;/li&gt;
		&lt;li&gt;Six&lt;/li&gt;
		&lt;li&gt;Seven&lt;/li&gt;
	&lt;/ul&gt;


Options
-------

The plugin uses a modifier internally that controlls the scroll speed.

* slow:          Default: 5. MouseOver speed.
* fast:          Default: 25. MouseDown speed.
* scrollSpeed:   Default: 30. Pixels to move with each scroll event.

The resize hash controlls whether the wrapping element should be resized if the page is resized. Offset will be substracted from the maxmimum width available.

* resize:        Default: { enabled: false, offset: 0 }.

