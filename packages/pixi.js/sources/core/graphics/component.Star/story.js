stories.addDecorator( Knobs.withKnobs );


stories.add( 'Example', function() {

  let props = {

    points: Knobs.number( 'points', 5, { range: true, min: 2, max: 20 } ),

    radius: Knobs.number( 'radius', 50, { range: true, min: 0, max: 200 } ),

    lineWidth: Knobs.number( 'lineWidth', 5, { range: true, min: 0, max: 20 } ),

    fillColor: Knobs.number( 'fillColor', 0xCCCCCC, { range: true, min: 0, max: 0xFFFFFF } ),

    lineColor: Knobs.number( 'lineColor', 0x666666, { range: true, min: 0, max: 0xFFFFFF } ),

  };


  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true } }>

      <Star

        {... props }

        x={ 200 }

        y={ 200 }

      />

    </Application>

  );

} );
