stories.addDecorator( Knobs.withKnobs );


stories.add( 'Example', function() {

  let props = {

    radius: Knobs.number( 'radius', 100, { range: true, min: 0, max: 200 } ),

    lineWidth: Knobs.number( 'lineWidth', 5, { range: true, min: 0, max: 20 } ),

    fillColor: Knobs.number( 'fillColor', 0xCCCCCC, { range: true, min: 0, max: 0xFFFFFF } ),

    lineColor: Knobs.number( 'lineColor', 0x666666, { range: true, min: 0, max: 0xFFFFFF } ),

  };


  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true } }>

      <Circle

        {... props }

        x={ 200 }

        y={ 200 }

      />

    </Application>

  );

} );
