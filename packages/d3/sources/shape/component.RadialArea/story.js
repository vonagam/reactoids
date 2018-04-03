const stories = StoriesOf( 'shape:component.RadialArea', module );


stories.add( 'Example', function() {

  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <RadialArea

        data={ [

         [ 0, 58 ],

         [ 1, 23 ],

         [ 2, 68 ],

         [ 3, 72 ],

         [ 4, 19 ],

         [ 5, 61 ],

        ] }

        angle={ ( datum ) => datum[ 0 ] * Math.PI * 2 / 6 }

        innerRadius={ ( datum ) => - datum[ 1 ] }

        outerRadius={ ( datum ) => - datum[ 1 ] * 2 }

        curve={ d3.curveCardinalClosed }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );
