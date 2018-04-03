// http://pixijs.download/release/docs/PIXI.extras.BitmapText.html


const propTypes = {

  text: PropTypes.string,

  font: PropTypes.oneOfType( [ PropTypes.object, PropTypes.string ] ),

  tint: PropTypes.number,

  align: PropTypes.string,

  anchor: PropTypes.oneOfType( [ PropTypes.object, PropTypes.number ] ),

  maxWidth: PropTypes.number,

};

const defaultProps = {

  text: '',

  font: '',

  tint: 0xFFFFFF,

  align: 'left',

  anchor: 0,

  maxWidth: 0,

};


export default addComponent( {

  name: 'bitmaptext',

  defaultProps,

  create() {

    return new PIXI.extras.BitmapText( '', {} );

  },

} );
