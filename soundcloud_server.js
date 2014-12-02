
// see: http://developers.soundCloud.com/docs/api/reference#me
SoundCloud.whitelistedFields = [
  'id', 'username', 'permalink', 'permalink_url', 'avatar_url', 'country',
  'full_name', 'city', 'description', 'website', 'discogs-name', 'myspace-name',
  'track_count', 'playlist_count', 'followers_count', 'followings_count',
  'public_favorites_count', 'private_tracks_count', 'private_playlists_count'
];



OAuth.registerService( 'soundCloud', 2, null, function( query ){
  var accessToken = getAccessToken( query );
  var identity = getIdentity( accessToken );

  // call user update method here..
  var serviceData = { accessToken: accessToken };
  var _serviceFields = _.pick( identity, SoundCloud.whitelistedFields );
  _.extend( serviceData, _serviceFields );
  var rv = {
    serviceData: serviceData,
    options: { profile: { name: identity.full_name }}
  };

  return rv;
});




function getAccessToken( query ){
  var config = ServiceConfiguration.configurations.findOne({ service: 'soundCloud' });
  if (! config )
    throw new ServiceConfiguration.ConfigError( "SoundCloud service not configured" );

  var rv;
  try {
    rv = HTTP.post( "https://api.soundcloud.com/oauth2/token", {
      headers: { Accept: 'application/json' },
      params: {
        code: query.code,
        grant_type: "authorization_code",
        client_id: config.clientId,
        client_secret: config.secret,
        redirect_uri: Meteor.absoluteUrl("_oauth/soundCloud", { replaceLocalhost: true }),
        state: query.state
      }
    });

  } catch ( err ) {
    throw _.extend( new Error( "Failed to complete OAuth handshake with SoundCloud. " + err.message ), { response: err.response });
  }

  if ( rv.data.error ) // if the http rv was a json object with an error attribute
    throw new Error( "Failed to complete OAuth handshake with SoundCloud. " + rv.data.error );

  return rv.data.access_token;
};




function getIdentity( accessToken ) {
  try {
    var rv = HTTP.get( "https://api.soundcloud.com/me.json", {
      params: {
        oauth_token: accessToken
      }
    });
    // console.info("fetching identity from: https://api.soundCloud.com/me", rv);
    return rv.data;
  } catch ( err ) {
    throw new Error( "Failed to fetch identity from SoundCloud. " + err.message );
  }
};



SoundCloud.retrieveCredential = function( credentialToken, credentialSecret ) {
  return OAuth.retrieveCredential( credentialToken, credentialSecret );
};
