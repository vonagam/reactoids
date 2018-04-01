export default funced = function() {

  let types = Array.prototype.slice.call( arguments );

  types = [ PropTypes.func ].concat( types );

  return PropTypes.oneOfType( types );

};
