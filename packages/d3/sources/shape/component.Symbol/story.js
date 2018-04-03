import Symbol from './index';


const stories = StoriesOf( 'shape:component.Symbol', module );


stories.add( 'Example', function() {

  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <Symbol

        size={ 500 }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );
