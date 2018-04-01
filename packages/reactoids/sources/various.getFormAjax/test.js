describe( 'various.getFormAjax', () => {

  defFunc( 'getFormAjax', ( html ) => getFormAjax( $( html )[ 0 ] ) );


  its( 'does work ${ key }', [

    {

      form: '<form action="https://reactjs.org/0"><input name="check" value="0" /></form>',

      output: () => ( {

        url: 'https://reactjs.org/0',

        method: 'get',

        contentType: 'application/x-www-form-urlencoded',

        data: [ { name: 'check', value: '0' } ],

      } ),

    },

    {

      form: '<form action="https://reactjs.org/1" method="post" enctype="application/x-www-form-urlencoded"><input name="check[][]" value="1" /></form>',

      output: () => ( {

        url: 'https://reactjs.org/1',

        method: 'post',

        contentType: 'application/x-www-form-urlencoded',

        data: [ { name: 'check[][]', value: '1' } ],

      } ),

    },

    {

      form: '<form action="https://reactjs.org/2" method="post" enctype="multipart/form-data"><input name="_method" value="delete" /><input name="check[][]" value="1" /></form>',

      output: () => ( {

        url: 'https://reactjs.org/2',

        method: 'delete',

        contentType: false,

        processData: false,

        data: smatch.instanceOf( window.FormData ),

      } ),

    },

    {

      form: '<form action="https://reactjs.org/3" method="get" data-enctype="application/json"><input name="check[][]" data-value-type="number" value="1" /></form>',

      output: () => ( {

        url: 'https://reactjs.org/3',

        method: 'get',

        contentType: 'application/json',

        data: { check: [ [ 1 ] ] },

      } ),

    },

  ], ( { form, output } ) =>

    expect( $getFormAjax( form ) ).to.smatch( output() )

  );

} );
