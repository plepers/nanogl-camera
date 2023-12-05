import { mat4, vec3 } from "gl-matrix"

import Node from 'nanogl-node'

import { ICameraLens } from "./ICameraLens"
import PerspectiveLens from "./perspective-lens"
import OrthographicLens from "./ortho-lens"


const  _M4  = mat4.create();
const  IMVP = mat4.create();

/**
 * This class provides functionalities for cameras.
 * You can choose which type of projection to use with the lens.
 * @typeParam TLens The type of lens this camera uses
 */
export default class Camera<TLens extends ICameraLens = ICameraLens> extends Node {
  /** The lens this camera uses */
  lens : TLens;

  /**
   * The view matrix for this camera
   * @defaultValue Identity 4*4 matrix
   */
  readonly _view    : mat4;
  /**
   * The view projection matrix for this camera
   * @defaultValue Identity 4*4 matrix
   */
  readonly _viewProj: mat4;

  /**
   * @typeParam TLens The type of lens this camera uses
   * @param lens The lens to use for this camera
   */
  constructor( lens : TLens ){

    super();

    this.lens      = lens;

    this._view     = mat4.create();
    this._viewProj = mat4.create();

  }


  /**
   * Compute a model view matrix from a transform matrix using the camera view matrix.
   *
   * You can use this to convert a matrix from world space to camera space.
   *
   * @param out The matrix to write to
   * @param model The transform matrix to use
   */
  modelViewMatrix( out : mat4, model : mat4 ){
    mat4.multiply( out, model, this._view );
  }

  /**
   * Compute a model view projection matrix from a transform matrix using the camera view projection matrix.
   *
   * You can use this to convert a matrix from world space to clip space.
   *
   * @param out The matrix to write to
   * @param model The transform matrix to use
   */
  modelViewProjectionMatrix( out : mat4, model : mat4 ){
    mat4.multiply( out, this._viewProj, model );
  }

  /**
   * Compute a model view projection matrix from a transform matrix using the camera view projection matrix, and return the result.
   *
   * You can use this to convert a matrix from world space to clip space.
   *
   * **Note :** This method returns a local matrix variable, so you should not store it for later use.
   *
   * @param model The transform matrix to use
   */
  getMVP( model : mat4 ) : mat4 {
    mat4.multiply( _M4, this._viewProj, model );
    return _M4;
  }

  /**
   * Reverse project a point using the camera view projection matrix.
   *
   * You can use this to transform a point from screen space to world space.
   *
   * @param out The matrix to write to
   * @param v The point's coordinates
   */
  unproject( out : vec3, v : vec3 ){
    mat4.invert( IMVP, this._viewProj );
    vec3.transformMat4( out, v, IMVP );
  }


  /**
   * Update camera view projection matrix.
   * @param w The width of the canvas
   * @param h The height of the canvas
   */
  updateViewProjectionMatrix( w : number, h : number ){
    this.lens.aspect = w/h;
    mat4.multiply( this._viewProj, this.lens.getProjection(), this._view );
  }

  /**
   * Compute camera world matrix and update camera view matrix.
   * @param skipParents If true, the camera's parent's world matrix will not be computed
   */
  _computeWorldMatrix( skipParents : boolean ){
    super._computeWorldMatrix( skipParents );
    mat4.invert( this._view, this._wmatrix );
  }

  /**
   * Create a camera with a perspective lens.
   */
  static makePerspectiveCamera() : Camera<PerspectiveLens>{
    return new Camera( new PerspectiveLens() );
  }

  /**
   * Create a camera with an orthographic lens.
   */
  static makeOrthoCamera() : Camera<OrthographicLens>{
    return new Camera( new OrthographicLens() );
  }

}
