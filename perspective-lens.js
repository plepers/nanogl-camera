
var mat4 = require( 'gl-matrix/src/gl-matrix/mat4' );


var FOV_MODE_V    = 1,
    FOV_MODE_H    = 2,
    FOV_MODE_AUTO = 3;


function PerspectiveLens(){

  this._near   = 0.01;
  this._far    = 10.0;

  this._fov    = Math.PI/3.0;
  this._vfov   = 0.0;
  this._hfov   = 0.0;
  this._aspect = 1.0;

  this._fovMode = 0;

  this._proj    = mat4.create();

  this._valid = false;

}


PerspectiveLens.prototype = {


  getProjection : function(){
    if( ! this._valid ){
      this._updateProjection();
    }
    return this._proj;
  },


  set fov(f){
    this.setVerticalFov( f );
  },

  get fov( ){ return this._fov; },


  set near(v){
    if( this._near !== v ){
      this._near = v;
      this._invalidate();
    }
  },

  get near( ){ return this._near; },


  set far(v){
    if( this._far !== v ){
      this._far = v;
      this._invalidate();
    }
  },

  get far( ){ return this._far; },


  set aspect(v){
    if( this._aspect !== v ){
      this._aspect = v;
      this._invalidate();
    }
  },

  get aspect( ){ return this._aspect; },



  setHorizontalFov : function( fov ){
    this._fov = fov;
    this._fovMode = FOV_MODE_H;
    this._invalidate();
  },


  setVerticalFov : function( fov ){
    this._fov = fov;
    this._fovMode = FOV_MODE_V;
    this._invalidate();
  },


  getHorizontalFov : function( ){
    this.getProjection();
    return this._hfov;
  },


  getVerticalFov : function( ){
    this.getProjection();
    return this._vfov;
  },


  setAutoFov : function( fov ){
    this._fov = fov;
    this._fovMode = FOV_MODE_AUTO;
  },


  _updateProjection : function(){

    var mode   = this._fovMode,
        aspect = this._aspect;


    if( mode === FOV_MODE_V || (mode === FOV_MODE_AUTO && aspect > 1.0 ) ){
      this._vfov = this._fov;
      this._hfov = Math.atan( Math.tan( this._fov / 2.0) * aspect )*2.0;
    } else {
      this._hfov = this._fov;
      this._vfov = Math.atan( Math.tan( this._fov / 2.0) / aspect )*2.0;
    }

    mat4.perspective( this._proj,
      this._vfov,
      aspect,
      this._near,
      this._far
    );

    this._valid = true;

  },


  _invalidate : function(){
    this._valid = false;
  }


};



module.exports = PerspectiveLens;