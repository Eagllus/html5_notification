HTML5 Notification
==================

HTML5 Notification uses the [W3C Web Notification API(http://www.w3.org/TR/notifications/)<br />
At the moment FireFox (v22 - beta) and Safari use the current version of the W3C Notification.<br />
Chrome still uses an older versie on webkitNotification. (Still working on this)<br />
Internet Explorer (v11) will support Notification. (Still working on this)<br />

Link for info about browser support [click here](http://caniuse.com/notifications)

The options that can be set for the notifications.

	html5Notification.init({
		display_message: true,

		message: {
			supported_browser: 'Your browser does not support the Notification API.',
			notsupported_browser: 'Your browser does support the Notification API.',
			permission_denied: 'You have denied access to display notifications.',
			permission_button: 'Grant Permission To Display Notifications',
		},

		field: {
			container: $('body'),
			browser_support: $('<div id="message" /></div>'),
		},
	});