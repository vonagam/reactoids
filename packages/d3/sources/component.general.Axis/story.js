const stories = StoriesOf( 'component.general.Axis', module );

stories.addDecorator( Knobs.withKnobs );


stories.add( 'Example', function() {

  let props = {

    orient: Knobs.select( 'orient', [ 'top', 'bottom', 'left', 'right' ], 'bottom' ),

    tickArguments: [ Knobs.number( 'tickArguments', 10, { range: true, min: 0, max: 20 } ) ],

    tickSize: Knobs.number( 'tickSize', 180, { range: true, min: 20, max: 180 } ),

    tickPadding: Knobs.number( 'tickPadding', 10, { range: true, min: 0, max: 40 } ),

  };


  let tickFormat = d3.format( '.1f' );

  let scale = d3.scaleLinear().domain( [ 0, 2 ] ).range( [ 0, 180 ] );


  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <Axis

        {... props }

        scale={ scale }

        tickFormat={ tickFormat }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );
