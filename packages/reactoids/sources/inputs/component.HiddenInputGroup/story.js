stories.add( 'Demo', () => {

  return (

    <HiddenInputGroup

      value={ {

        'a': 1,

        '[b]': 2,

        'c': [ 3, { 'd': 4 } ],

      } }

      name='name'

    />

  );

} );
