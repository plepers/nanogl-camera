
var Node            = require( 'nanogl-node' );
var mat4            = require( 'gl-matrix/src/gl-matrix/mat4' );

var PerspectiveLens = require( './perspective-lens' );
var OrthoLens       = require( './ortho-lens' );


var _M4 = mat4.create();



function Camera( lens ){

  Node.call( this );

  this.lens      = lens;

  this._view     = mat4.create();
  this._viewProj = mat4.create();

}


var proto = Object.create( Node.prototype );


proto.modelViewMatrix = function( out, model ){
  mat4.multiply( out, model, this._view );
};


proto.modelViewProjectionMatrix = function( out, model ){
  mat4.multiply( out, this._viewProj, model );
};


proto.getMVP = function( model ){
  mat4.multiply( _M4, this._viewProj, model );
  return _M4;
};


proto.unproject = function( out, v ){
  mat4.invert( IMVP, this._proj );
  vec3.transformMat4( out, v, IMVP );
};


proto.updateViewProjectionMatrix = function( w, h ){
  this.lens.aspect = w/h;
  mat4.multiply( this._viewProj, this.lens.getProjection(), this._view );
};


proto._computeWorldMatrix = function( skipParents ){
  Node.prototype._computeWorldMatrix.call( this, skipParents );
  mat4.invert( this._view, this._wmatrix );
};


Camera.makePerspectiveCamera = function(){
  return new Camera( new PerspectiveLens() );
};


Camera.makeOrthoCamera = function(){
  return new Camera( new OrthoLens() );
};


proto.constructor = Camera;
Camera.prototype = proto;

module.exports = Camera;