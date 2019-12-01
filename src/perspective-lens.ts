import { mat4 } from "gl-matrix";
import {ICameraLens } from './ICameraLens'



const enum FovMode {
  FOV_MODE_V    = 1,
  FOV_MODE_H    = 2,
  FOV_MODE_AUTO = 3,
} 


class PerspectiveLens implements ICameraLens {


  _near   : number;
  _far    : number;
  _fov    : number;
  _vfov   : number;
  _hfov   : number;
  _aspect : number;
  _fovMode: number;

  _proj: mat4;
  
  _valid: boolean;
  
  constructor(){

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


  getProjection(){
    if( ! this._valid ){
      this._updateProjection();
    }
    return this._proj;
  }


  set fov(f){
    this.setVerticalFov( f );
  }

  get fov( ){ return this._fov; }


  set near(v){
    if( this._near !== v ){
      this._near = v;
      this._invalidate();
    }
  }

  get near( ){ return this._near; }


  set far(v){
    if( this._far !== v ){
      this._far = v;
      this._invalidate();
    }
  }

  get far( ){ return this._far; }


  set aspect(v){
    if( this._aspect !== v ){
      this._aspect = v;
      this._invalidate();
    }
  }

  get aspect( ){ return this._aspect; }



  setHorizontalFov( fov : number ){
    this._fov = fov;
    this._fovMode = FovMode.FOV_MODE_H;
    this._invalidate();
  }


  setVerticalFov( fov : number ){
    this._fov = fov;
    this._fovMode = FovMode.FOV_MODE_V;
    this._invalidate();
  }


  getHorizontalFov( ){
    this.getProjection();
    return this._hfov;
  }


  getVerticalFov( ){
    this.getProjection();
    return this._vfov;
  }


  setAutoFov( fov : number ){
    this._fov = fov;
    this._fovMode = FovMode.FOV_MODE_AUTO;
    this._invalidate();
  }


  _updateProjection(){

    var mode   = this._fovMode,
        aspect = this._aspect;


    if( mode === FovMode.FOV_MODE_V || (mode === FovMode.FOV_MODE_AUTO && aspect > 1.0 ) ){
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

  }


  _invalidate(){
    this._valid = false;
  }
   
}

export default PerspectiveLens