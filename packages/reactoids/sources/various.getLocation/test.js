describe( 'various.getLocation', () => {

  defLocation();


  its( 'does return ${ doStringify( value.result ) } for ${ doStringify( value.input ) } input in ${ doStringify( value.context ) } context', [

    { context: 'https://a.com/b/c?d#e', input: undefined, result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/c', search: '?d', hash: '#e' } },

    { context: 'https://a.com/b/c?d#e', input: 'x', result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/x', search: '', hash: '' } },

    { context: 'https://a.com/b/c?d#e', input: '/x', result: { protocol: 'https:', hostname: 'a.com', pathname: '/x', search: '', hash: '' } },

    { context: 'https://a.com/b/c?d#e', input: '?x', result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/c', search: '?x', hash: '' } },

    { context: 'https://a.com/b/c?d#e', input: '#x', result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/c', search: '?d', hash: '#x' } },

    { context: 'https://a.com/b/c?d#e', input: '', result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/c', search: '?d', hash: '' } },

    { context: 'https://a.com/b/c?d#e', input: 'x#x', result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/x', search: '', hash: '#x' } },

    { context: 'https://a.com/b/c?d#e', input: {}, result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/c', search: '?d', hash: '#e' } },

    { context: 'https://a.com/b/c?d#e', input: { irrelevent: 'x' }, result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/c', search: '?d', hash: '#e' } },

    { context: 'https://a.com/b/c?d#e', input: { search: 'x' }, result: { protocol: 'https:', hostname: 'a.com', pathname: '/b/c', search: '?x', hash: '#e' } },

    { context: 'https://a.com/b/c?d#e', input: { hostname: 'x.com', hash: 'x' }, result: { protocol: 'https:', hostname: 'x.com', pathname: '/b/c', search: '?d', hash: '#x' } },

  ], ( { context, input, result } ) => {

    $setLocation( context );

    expect( getLocation( input ) ).to.include( result );

  } );

  describe( 'returned object', () => {

    it( 'does have responsive setters', () => {

      $setLocation( 'https://a.com/b/c?d#e' );

      let result = getLocation();

      expect( () => result.search = 'x' ).to.alter( () => result.href, { from: 'https://a.com/b/c?d#e', to: 'https://a.com/b/c?x#e' } );

    } );

  } );

} );
