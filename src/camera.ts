import { mat4, vec3 } from "gl-matrix";
import Node = require( 'nanogl-node' )

import { ICameraLens } from "./ICameraLens";
import PerspectiveLens = require("./perspective-lens");
import OrthographicLens = require("./ortho-lens");


const  _M4  = mat4.create();
const  IMVP = mat4.create();


class Camera extends Node {

  lens : ICameraLens;

  _view    : mat4;
  _viewProj: mat4;


  constructor( lens : ICameraLens ){

    super();

    this.lens      = lens;

    this._view     = mat4.create();
    this._viewProj = mat4.create();

  }



  modelViewMatrix( out : mat4, model : mat4 ){
    mat4.multiply( out, model, this._view );
  }


  modelViewProjectionMatrix( out : mat4, model : mat4 ){
    mat4.multiply( out, this._viewProj, model );
  }


  getMVP( model : mat4 ) : mat4 {
    mat4.multiply( _M4, this._viewProj, model );
    return _M4;
  }


  unproject( out : vec3, v : vec3 ){
    mat4.invert( IMVP, this._viewProj );
    vec3.transformMat4( out, v, IMVP );
  }



  updateViewProjectionMatrix( w : number, h : number ){
    this.lens.aspect = w/h;
    mat4.multiply( this._viewProj, this.lens.getProjection(), this._view );
  }


  _computeWorldMatrix( skipParents : boolean ){
    Node.prototype._computeWorldMatrix.call( this, skipParents );
    mat4.invert( this._view, this._wmatrix );
  }


  static makePerspectiveCamera(){
    return new Camera( new PerspectiveLens() );
  }


  static makeOrthoCamera(){
    return new Camera( new OrthographicLens() );
  }

}

export = Camera;