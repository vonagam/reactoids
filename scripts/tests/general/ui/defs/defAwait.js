global.defAwait = function( name, definition ) {

  let value = undefined;

  def( name, () => value );

  beforeEach( `ui/defAwait: ${ name }`, async () => {

    value = await definition();

  } );

};
