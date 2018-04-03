const stories = StoriesOf( 'reactoids:component.Application', module );


stories.add( 'Example', function() {

  class App extends React.Component {

    constructor( props ) {

      super( props );

      let rectangles = _.times( 100, () => {

        let x = Math.random() * 300;

        let y = Math.random() * 300;

        let w = Math.random() * 100 + 50;

        let h = Math.random() * 100 + 50;

        let fillColor = Math.round( Math.random() * 0xFFFFFF );

        return { x, y, w, h, fillColor };

      } );

      this.state = { rectangles };

    }

    componentDidMount() {

      let deltaCombo = 0;

      let isWaiting = false;

      this.refs.app.pixi.ticker.add( ( deltaTime ) => {

        deltaCombo += deltaTime;

        if ( isWaiting ) return;

        isWaiting = true;

        let rectangles = _.map( this.state.rectangles, ( rectangle ) => {

          rectangle.x += 0.05;

          rectangle.y += 0.05;

          return rectangle;

        } );

        this.setState( { rectangles }, () => {

          if ( deltaCombo > 1.5 ) console.log( deltaCombo );

          deltaCombo = 0;

          isWaiting = false;

        } );

      } );

    }

    render() {

      return (

        <Application ref='app' width={ 400 } height={ 400 } options={ { antialias: true } }>

          {

            _.map( this.state.rectangles, ( rectangle, index ) =>

              <Rectangle

                key={ index }

                { ...rectangle }

                lineWidth={ 20 }

                lineColor={ 0xFFFFFF }

              />

            )

          }

        </Application>

      );

    }

  }

  return <App />;

} );
