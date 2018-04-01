const stories = StoriesOf( 'component.graphics.Ellipse', module );

stories.addDecorator( Knobs.withKnobs );


stories.add( 'Example', function() {

  let props = {

    radiusX: Knobs.number( 'radiusX', 100, { range: true, min: 0, max: 200 } ),

    radiusY: Knobs.number( 'radiusY', 100, { range: true, min: 0, max: 200 } ),

    lineWidth: Knobs.number( 'lineWidth', 5, { range: true, min: 0, max: 20 } ),

    fillColor: Knobs.number( 'fillColor', 0xCCCCCC, { range: true, min: 0, max: 0xFFFFFF } ),

    lineColor: Knobs.number( 'lineColor', 0x666666, { range: true, min: 0, max: 0xFFFFFF } ),

  };


  return (

    <Application width={ 400 } height={ 400 } options={ { antialias: true } }>

      <Ellipse

        {... props }

        x={ 200 }

        y={ 200 }

      />

    </Application>

  );

} );
