const stories = StoriesOf( 'component.shape.RadialLink', module );


stories.add( 'Example', function() {

  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <RadialLink

        data={ {

          source: [ 0, 25 ],

          target: [ Math.PI / 4, 100 ],

        } }

        stroke='black'

        strokeWidth={ 5 }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );
