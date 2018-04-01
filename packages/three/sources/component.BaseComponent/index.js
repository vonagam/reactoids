export default class BaseComponent {

  static propsSchema = {};

  constructor( props, root ) {

    this.three = this.create( props, root );

    this.children = [];

    this.parent = undefined;

    this.update( {}, props );

  }

  create( props, root ) {

    throw new Error( 'BaseComponent#create should be overwritten' );

  }

  update( prevProps, nextProps ) {

    applyProps( this.three, this.constructor.propsSchema, prevProps, nextProps );

  }

  mount( parent ) {

    if ( this.parent === parent ) {

      return;

    }

    if ( this.parent !== undefined ) {

      this.parent.children.splice( this.parent.children.indexOf( this ), 1 );

    }

    this.parent = parent;

    parent.children.push( this );

  }

  unmount( parent, nested ) {

    this.unmounted = true;

    if ( ! nested && this.parent !== undefined ) {

      this.parent.children.splice( this.parent.children.indexOf( this ), 1 );

      this.parent = undefined;

    }

    _.each( this.children, ( child ) => {

      child.unmount( this, true );

    } );

    if ( this.three.dispose ) {

      this.three.dispose();

    }

  }

}
