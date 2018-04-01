global.defOnce = function( name, definition ) {

  let value = undefined;

  def( name, () => value );

  beforeAll( `ui/defOnce: ${ name }`, async () => {

    value = await definition();

  } );

};
