Package.describe({
  name: 'jiku:soundcloud',
  version: '1.0.1',
  git: 'https://github.com/jiku/meteor-soundcloud'
});


Package.onUse( function( api ){
  api.versionsFrom( '1.0' );
  var both = [ 'client', 'server' ];

  api.use( 'oauth2', both );
  api.use( 'oauth', both );
  api.use( 'http', 'server' );
  api.use( 'underscore', 'server' );
  api.use( 'random', 'client' );
  api.use( 'templating', 'client' );
  api.use( 'service-configuration', both );

  api.addFiles( 'settings.js', both );

  api.export( "Soundcloud" );

  api.addFiles( 'soundcloud_configure.html', 'client' );
  api.addFiles( 'soundcloud_configure.js', 'client' );

  api.addFiles( 'soundcloud_client.js', 'client' );
  api.addFiles( 'soundcloud_server.js', 'server' );

});

Package.onTest( function( api ){
  api.use('tinytest');
  api.use('jiku:soundcloud');
  api.addFiles('jiku:soundcloud-tests.js');
});
