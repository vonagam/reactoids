export default queue = function() {

  let funcs = _.filter( arguments, _.isFunction );

  return function() {

    _.each( funcs, ( func ) => {

      func.apply( this, arguments );

    } );

  };

};
