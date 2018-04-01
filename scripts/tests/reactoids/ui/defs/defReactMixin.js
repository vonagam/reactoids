import ReactoidsMixin from '@reactoids/reactoids/builds/lib/sources/various.Mixin';


global.defReactMixin = function( Mixin, ARGS = () => ( {} ), additionals = {} ) {

  def( 'Mixin', () => Mixin );

  def( 'ARGS', ARGS );

  def( 'mixin', () => $Mixin( $ARGS ) );

  def( 'additionals', additionals );


  defReactClass( () => {

    let options = _.defaults( {}, $additionals, {

      mixins: [],

      render() { return <div>{ this.props.children }</div>; },

    } );


    options.mixins = _.concat( $mixin, options.mixins );


    if ( _.some( options.mixins, 'render' ) ) _.unset( options, 'render' );


    return ReactoidsMixin.createClass( options );

  } );


  defFunc( 'createMixin', ( args ) => $Mixin( _.defaults( args, $ARGS ) ) );

  defFunc( 'checkMixing', ( ...mixins ) => ReactoidsMixin.createClass( { mixins: [ ...mixins, _.some( mixins, 'render' ) ? undefined : { render: _.noop } ] } ) );

};
