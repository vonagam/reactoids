const stories = StoriesOf( 'component.shape.Area', module );


stories.add( 'Example', function() {

  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <Area

        data={ [

         [ 0, 58 ],

         [ 1, 23 ],

         [ 2, 68 ],

         [ 3, 72 ],

         [ 4, 19 ],

         [ 5, 61 ],

        ] }

        x={ ( datum ) => datum[ 0 ] * 40 }

        y0={ ( datum ) => - datum[ 1 ] }

        y1={ ( datum ) => - datum[ 1 ] * 2 }

        curve={ d3.curveMonotoneX }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );
