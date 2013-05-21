HTML5 Notification
==================

HTML5 Notification uses the [W3C Web Notification API](http://www.w3.org/TR/notifications/)<br />
At the moment FireFox (v22 - beta) and Safari uses the current version of the W3C Notification.<br />
Chrome still uses an older versie on webkitNotification. (Still working on this)<br />
Internet Explorer (v11) will support Notification. (Still working on this)<br />

Link for more information about browser support [click here](http://caniuse.com/notifications).

How to use the plugin
---------------------

initializing is really easy
	html5Notification.init();

But if you want some configuration options you can use the current configuration list below:
	The default settings
	{
		display_message: true,

		message: {
			supported_browser: 'Your browser does not support the Notification API.',
			notsupported_browser: 'Your browser does support the Notification API.',
			permission_denied: 'You have denied access to display notifications.',
		},

		field: {
			container: $('body'),
			browser_support: $('<div id="message" /></div>'),
		},
	}

A little explanation about what everything does.

	display_message: true OR false, On false no notification will be displayed.

	message: {
		supported_browser: 'Your browser does not support the Notification API.',
		notsupported_browser: 'Your browser does support the Notification API.',
		permission_denied: 'You have denied access to display notifications.',
	},

	field: {
		container: $('body'),
		browser_support: $('<div id="message" /></div>'),
	},

Creating a message
------------------
Short type
	html5Notification.create_message('Short version')

With some extra options
	html5Notification.create_message({
		title: 'The Longer version',
		body: 'A cool message with Nedap\'s logo',
		icon: 'http://www.studiokluif.nl/sites/default/files/Nedap_huisstijl_asterisk.jpg'
	});

Still working on
----------------

* Autoload the init function on create_message call
* Chromium compatibility
* Internet Explorer compatibility