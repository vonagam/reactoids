global.defReactClass = function( Component ) {

  def( 'Component', Component );

  def( 'props', {} );

  def( 'context', {} );


  let mounted;

  def( 'mount', () => ( mounted = true, mount( <$Component {... $props } />, { context: $context } ) ) );

  def( 'shallow', () => shallow( <$Component {... $props } />, { context: $context } ) );

  def( 'render', () => render( <$Component {... $props } /> ) );


  def( 'component', () => $mount.instance() );

  defFunc( 'unmount', () => mounted && ( $mount.unmount(), mounted = false ) );


  beforeEach( () => mounted = false );

  afterEach( () => $unmount() );

};
