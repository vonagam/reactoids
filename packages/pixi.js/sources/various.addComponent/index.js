// http://pixijs.download/release/docs/PIXI.DisplayObject.html


const commonPropTypes = {

  // Transform
  position: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),
  scale: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),
  pivot: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),
  skew: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),
  rotation: PropTypes.number,

  // DisplayObject/properties
  alpha: PropTypes.number,
  visible: PropTypes.bool,
  renderable: PropTypes.bool,
  filterArea: PropTypes.instanceOf( PIXI.Rectangle ),

  // DisplayObject/setters
  x: PropTypes.number,
  y: PropTypes.number,
  mask: PropTypes.oneOfType( [ PropTypes.instanceOf( PIXI.Graphics ), PropTypes.instanceOf( PIXI.Sprite ) ] ),
  filters: PropTypes.arrayOf( PropTypes.instanceOf( PIXI.Filter ) ),

  // Container
  width: PropTypes.number,
  height: PropTypes.number,

  // interactiveTarget
  interactive: PropTypes.bool,
  interactiveChildren: PropTypes.bool,
  hitArea: PropTypes.oneOfType( [
    PropTypes.instanceOf( PIXI.Rectangle ),
    PropTypes.instanceOf( PIXI.Circle ),
    PropTypes.instanceOf( PIXI.Ellipse ),
    PropTypes.instanceOf( PIXI.Polygon ),
    PropTypes.instanceOf( PIXI.RoundedRectangle ),
  ] ),
  buttonMode: PropTypes.bool,
  cursor: PropTypes.string,

  // accessibleTarget
  accessible: PropTypes.bool,
  accessibleTitle: PropTypes.string,
  accessibleHint: PropTypes.string,
  tabIndex: PropTypes.number,

  // getChildByName
  name: PropTypes.string,

  // cacheAsBitmap
  cacheAsBitmap: PropTypes.bool,

};

const commonDefaultProps = {

  // Transform
  position: new PIXI.Point( 0, 0 ),
  scale: new PIXI.Point( 1, 1 ),
  pivot: new PIXI.Point( 0, 0 ),
  skew: new PIXI.Point( 0, 0 ),
  rotation: 0,

  // DisplayObject/properties
  alpha: 1,
  visible: true,
  renderable: true,
  filterArea: null,

  // DisplayObject/setters
  x: 0,
  y: 0,
  mask: null,
  filters: null,

  // Container
  width: 0,
  height: 0,

  // interactiveTarget
  interactive: false,
  interactiveChildren: true,
  hitArea: null,
  buttonMode: false,
  cursor: null,

  // accessibleTarget
  accessible: false,
  accessibleTitle: null,
  accessibleHint: null,
  tabIndex: 0,

  // getChildByName
  name: null,

  // cacheAsBitmap
  cacheAsBitmap: false,

};


const eventsPropTypes = {

  onAdded: PropTypes.func,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseUpOutSide: PropTypes.func,
  onPointerCancel: PropTypes.func,
  onPointerDown: PropTypes.func,
  onPointerMove: PropTypes.func,
  onPointerOut: PropTypes.func,
  onPointerOver: PropTypes.func,
  onPointerTap: PropTypes.func,
  onPointerUp: PropTypes.func,
  onPointerUpOutSide: PropTypes.func,
  onRemoved: PropTypes.func,
  onRightClick: PropTypes.func,
  onRightDown: PropTypes.func,
  onRightUp: PropTypes.func,
  onRightUpOutSide: PropTypes.func,
  onTap: PropTypes.func,
  onTouchCancel: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchEndOutSide: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,

};

const eventsMapping = _.transform( eventsPropTypes, ( eventsMapping, type, key ) => {

  eventsMapping[ key ] = key.replace( /^on/, '' ).toLowerCase();

}, {} );


export default function addComponent( { name, defaultProps, create, update = _.noop } ) {

  let componentDefaultProps = _.assign( {}, commonDefaultProps, defaultProps );


  Components[ name ] = {

    create( props ) {

      let pixi = create( props );

      this.update( pixi, {}, props );

      return pixi;

    },

    update( pixi, prevProps, nextProps ) {

      applyProps( pixi, componentDefaultProps, prevProps, nextProps );

      applyEventsProps( pixi, eventsMapping, prevProps, nextProps );

      update( pixi, prevProps, nextProps );

    },

  };


  return name;

};
