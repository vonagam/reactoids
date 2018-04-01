const stories = StoriesOf( 'component.shape.Arc', module );

stories.addDecorator( Knobs.withKnobs );


stories.add( 'Example', function() {

  let props = {

    outerRadius: Knobs.number( 'outerRadius', 100, { range: true, min: 0, max: 200 } ),

    innerRadius: Knobs.number( 'innerRadius', 0, { range: true, min: 0, max: 200 } ),

    startAngle: Knobs.number( 'startAngle', 0, { range: true, min: 0, max: 360 } ) / 360 * 2 * Math.PI,

    endAngle: Knobs.number( 'endAngle', 180, { range: true, min: 0, max: 360 } ) / 360 * 2 * Math.PI,

  };


  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <Arc

        {... props }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );

