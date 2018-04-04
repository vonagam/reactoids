stories.add( 'Example', function() {

  return (

    <svg width='400' height='400' viewBox='0 0 400 400' preserveAspectRatio=''>

      <RadialLine

        data={ [

         [ Math.PI * 0.00, 100 ],

         [ Math.PI * 0.25, 40 ],

         [ Math.PI * 0.50, 100 ],

         [ Math.PI * 0.75, 40 ],

         [ Math.PI * 1.00, 100 ],

         [ Math.PI * 1.50, 100 ],

        ] }

        curve={ d3.curveCardinalClosed }

        stroke='black'

        strokeWidth={ 5 }

        transform='translate( 200, 200 )'

      />

    </svg>

  );

} );
