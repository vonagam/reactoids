const stories = StoriesOf( 'component.shape.Link', module );


stories.add( 'Example', function() {

  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <Link

        data={ {

          source: [ -100, -100 ],

          target: [ 100, 100 ],

        } }

        type='vertical'

        stroke='black'

        strokeWidth={ 5 }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );
