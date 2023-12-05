import { mat4 } from "gl-matrix";
import {ICameraLens } from './ICameraLens'

/**
 * This class provides functionalities for orthographic projection.
 */
class OrthographicLens implements ICameraLens {

  /**
   * The near plane distance
   * @defaultValue 0.01
   */
  _near   : number;
  /**
   * The far plane distance
   * @defaultValue 10
   */
  _far    : number;
  /**
   * The left bound
   * @defaultValue -1
   */
  _xMin   : number;
  /**
   * The right bound
   * @defaultValue 1
   */
  _xMax   : number;
  /**
   * The bottom bound
   * @defaultValue -1
   */
  _yMin   : number;
  /**
   * The top bound
   * @defaultValue 1
   */
  _yMax   : number;
  /**
   * The aspect ratio
   * @defaultValue 1
   */
  _aspect : number;

  /**
   * The projection matrix for this lens
   * @defaultValue Identity 4*4 matrix
   */
  _proj: mat4;

  /**
   * Whether the projection matrix is valid or not
   * @defaultValue false
   */
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



  /**
   * Get the projection matrix for this lens.
   * The projection matrix is updated before (if it was declared invalid).
   */
  getProjection() : mat4 {
    if( ! this._valid ){
      this._updateProjection();
    }
    return this._proj;
  }

  /**
   * Set the bounds of this lens.
   * @param xMin The left bound
   * @param xMax The right bound
   * @param yMin The bottom bound
   * @param yMax The top bound
   */
  setBound( xMin : number, xMax : number, yMin : number, yMax : number ){
    this._xMin = xMin;
    this._xMax = xMax;
    this._yMin = yMin;
    this._yMax = yMax;
    this._invalidate();
  }

  /**
   * Set the near plane distance of this lens.
   * @param v The value to set
   */
  set near(v : number ){
    if( this._near !== v ){
      this._near = v;
      this._invalidate();
    }
  }

  /**
   * Get the near plane distance of this lens.
   */
  get near( ){ return this._near; }

  /**
   * Set the far plane distance of this lens.
   * @param v The value to set
   */
  set far(v){
    if( this._far !== v ){
      this._far = v;
      this._invalidate();
    }
  }

  /**
   * Get the far plane distance of this lens.
   */
  get far( ){ return this._far; }

  /**
   * Set the aspect ratio of this lens.
   * @param v The value to set
   */
  set aspect(v){
    if( this._aspect !== v ){
      this._aspect = v;
      // this._invalidate();
    }
  }

  /**
   * Get the aspect ratio of this lens.
   */
  get aspect( ){ return this._aspect; }


  /**
   * Update lens projection matrix.
   */
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

  /**
   * Invalidate lens projection matrix.
   */
  _invalidate(){
    this._valid = false;
  }


}



export default OrthographicLens