const stories = StoriesOf( 'objects:component.Mesh', module );

stories.addDecorator( Knobs.withKnobs );


stories.add( 'Example', function() {

  let geometry = new THREE.BoxGeometry( 1, 1, 1 );

  let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );


  let z = Knobs.number( 'z', 5, { range: true, min: -20, max: 20, step: 0.01 } );

  let asd = Knobs.boolean( 'ads', true );


  return (

    <Application width={ 400 } height={ 400 } rendererArgs={ { antialias: true } }>

      <PerspectiveCamera

        positionZ={ z }

      />

      {

        asd ?

          <Mesh

            geometry={ geometry }

            material={ material }

            positionZ={ -5 }

          >

            <Mesh

              geometry={ geometry }

              positionX={ -3 }

            >

              <MeshNormalMaterial />

            </Mesh>

          </Mesh>

        :

          <Mesh

            geometry={ geometry }

            positionZ={ -5 }

          >

            <MeshNormalMaterial />

            <Mesh

              geometry={ geometry }

              material={ material }

              positionX={ -3 }

            />

          </Mesh>

      }

    </Application>

  );

} );
