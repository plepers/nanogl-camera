import { mat4, vec3 } from "gl-matrix"

import Node from 'nanogl-node'

import { ICameraLens } from "./ICameraLens"
import PerspectiveLens from "./perspective-lens" 
import OrthographicLens from "./ortho-lens" 


const  _M4  = mat4.create();
const  IMVP = mat4.create();


export default class Camera<TLens extends ICameraLens = ICameraLens> extends Node {

  lens : TLens;

  readonly _view    : mat4;
  readonly _viewProj: mat4;


  constructor( lens : TLens ){

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
    super._computeWorldMatrix( skipParents );
    mat4.invert( this._view, this._wmatrix );
  }


  static makePerspectiveCamera() : Camera<PerspectiveLens>{
    return new Camera( new PerspectiveLens() );
  }


  static makeOrthoCamera() : Camera<OrthographicLens>{
    return new Camera( new OrthographicLens() );
  }

}
