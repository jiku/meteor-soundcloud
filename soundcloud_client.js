
// Request Github credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Soundcloud.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (! credentialRequestCompleteCallback && typeof options === 'function' ) {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({ service: 'soundcloud' });
  if (! config ) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback( new ServiceConfiguration.ConfigError() );
    return;
  }

  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle( 'soundcloud', config, options );
  config.loginStyle = loginStyle;   // hack to make sure '?close' is not added to redirectUri; SC doesn't like it

  var loginUrl =
    'https://soundcloud.com/connect' +
    '?client_id=' + config.clientId +
    '&scope=non-expiring' +
    '&redirect_uri=' + OAuth._redirectUri( 'soundcloud', config, null, { replaceLocalhost: true }) +
    '&state=' + OAuth._stateParam( loginStyle, credentialToken ) +
    '&response_type=code_and_token' +
    '&display=popup';


  OAuth.launchLogin({
    loginService: "soundcloud",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: { width: 550, height: 382 }
  });
};
