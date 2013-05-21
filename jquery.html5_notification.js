(function($) {
	var html5Notification = {
		init: function ( options ) {
			this.df = $.Deferred();

			if ( typeof html5Notification.initialized === 'undefined' ) {
				// Allow to override default options.
				this.buildDefaults();

				// Check browser support
				if ( this.check_browser_support() ) {
					// Supported, ask for permission
					this.permissionHandler();
				}

				html5Notification.initialized = true;
			}

			return this.df.promise();

		},

		permissionHandler: function() {
			// Check if we have permission (setting output to variable)
			var checkPermission = this.check_permission();
			
			if ( checkPermission === true ) {

			} else if ( checkPermission === 'pending' ) {
				this.request_permission();

			} else {
				this.config.field.browser_support
					.addClass("alert alert-error")
					.text(this.config.message.permission_denied);
			}
		},

		// Default settings that can be changed by user.
		buildDefaults: function() {
			this.config = {
				display_message: 			true,

				message: {
					supported_browser:	    'Your browser does support the Notification API.',
					notsupported_browser: 	'Your browser does not support the Notification API.',
					permission_denied: 	    'You have denied access to display notifications.',
					permission_button: 		'Grant Permission To Display Notifications',
				},

				field: {
					container: 				$('body'),
					browser_support:		$('<div id="message" /></div>'),
				}
			};
		},

		/**
		* Check if browser can support HTML5 Notifications
		*/
		check_browser_support: function() {
			var supported = (Notification) ? true : false;
			if ( this.config.display_message === true ) {
				var browser_support = this.config.field.browser_support.appendTo(this.config.field.container);	

				if( supported === true ) {
					browser_support
						.addClass("alert alert-success")
						.text(this.config.message.supported_browser);
				} else {
					browser_support
						.addClass("alert alert-error")
						.text(this.config.message.notsupported_browser);
				}
			}

			return supported;
		},

		/**
		* Checks to see if HTML5 Notifications has permission
		*/
		check_permission: function() {
			switch( Notification.permission ) {
				// We have permission to post notifications
				case 0:
				case 'granted':
					this.df.resolve();
					return true;
					break;

				// We still need to ask for permission
				case 1:
				case 'default':
					return 'pending';
					break;

				// The user rejected the permissions to post notifications
				case 2:
				case 'denied':
					return false;
					break;
			}
		},

		/**
		* Request HTML5 Notifications permissions.
		* After that recall permissionHandler
		*/
		request_permission: function () {
			var self = this;

			Notification.requestPermission(function(){
				self.permissionHandler();
				self.df.resolve();
			});
		},

		/**
		* All the default options can be inserted into the Notification Api.
		* For a complete list of options see the W3 Web Notifications url.
		* https://dvcs.w3.org/hg/notifications/raw-file/tip/Overview.html#api
		*
		* If the permission is not already granted, the init function will be called.
		* This will cause the current message to be losted.
		*
		*/
		create_message: function( options ) {
			if ( Notification.permission == 'granted' ) {
				if ( typeof options === 'string' ) {
					var title = options,
						config = {};
				} else {
					var title = options.title,
						config = options;
				}

				new Notification(title, config);

			} else {
				var self = this;
				self.init()
					.done(function(){
						self.create_message( options );
					});
			}
		}
	};

	$.html5Notification = html5Notification;
})( jQuery);