const stories = StoriesOf( 'component.shape.Line', module );


stories.add( 'Example', function() {

  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <Line

        data={ [

         [ 0, 0 ],

         [ 100, 100 ],

         [ 50, -100 ],

        ] }

        stroke='black'

        strokeWidth={ 5 }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );
