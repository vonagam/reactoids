global.defMixinSpy = function( Mixin, calledOnce ) {

  let mixinSpy = _.assign( spy( Mixin ), Mixin );


  if ( ! calledOnce ) {

    defSinon( Mixin.name, mixinSpy );

  }

  def( `${ Mixin.name }Args`, () => $mixin && mixinSpy.lastCall.args[ 0 ] );


  return mixinSpy;

};
