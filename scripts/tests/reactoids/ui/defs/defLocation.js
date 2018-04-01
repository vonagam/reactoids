global.defLocation = function( url ) {

  let currentUrl;

  beforeEach( 'ui/defLocation: replace url', () => {

    currentUrl = window.location.href;

    if ( url ) {

      jsdom.reconfigure( { url } );

    }

  } );

  afterEach( 'ui/defLocation: restore url', () => {

    jsdom.reconfigure( { url: currentUrl } );

  } );

  defFunc( 'setLocation', ( url ) => {

    jsdom.reconfigure( { url } );

  } );

};
