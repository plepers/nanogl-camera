import { mat4 } from "gl-matrix";
import {ICameraLens } from './ICameraLens'


class OrthographicLens implements ICameraLens {


  _near   : number;
  _far    : number;
  _xMin   : number;
  _xMax   : number;
  _yMin   : number;
  _yMax   : number;
  _aspect : number;
  
  _proj: mat4;
  
  _valid: boolean;



  constructor(){

    this._near   = 0.01;
    this._far    = 10.0;

    this._xMin =  -1.0;
    this._xMax =   1.0;
    this._yMin =  -1.0;
    this._yMax =   1.0;
    this._aspect = 1.0;

    this._proj    = mat4.create();

    this._valid   = false;

  }



  getProjection() : mat4 {
    if( ! this._valid ){
      this._updateProjection();
    }
    return this._proj;
  }


  setBound( xMin : number, xMax : number, yMin : number, yMax : number ){
    this._xMin = xMin;
    this._xMax = xMax;
    this._yMin = yMin;
    this._yMax = yMax;
    this._invalidate();
  }


  set near(v : number ){
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
      // this._invalidate();
    }
  }

  get aspect( ){ return this._aspect; }



  _updateProjection(){

    mat4.ortho( this._proj,
      this._xMin,
      this._xMax,
      this._yMin,
      this._yMax,
      this._near,
      this._far
    );

    this._valid = true;

  }


  _invalidate(){
    this._valid = false;
  }


}



export default OrthographicLens