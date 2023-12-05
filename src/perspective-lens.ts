import { mat4 } from "gl-matrix";
import {ICameraLens } from './ICameraLens'



const enum FovMode {
  FOV_MODE_V    = 1,
  FOV_MODE_H    = 2,
  FOV_MODE_AUTO = 3,
}

/**
 * This class provides functionalities for perspective projection.
 */
class PerspectiveLens implements ICameraLens {

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
   * The field of view
   * @defaultValue Math.PI/3
   */
  _fov    : number;
  /**
   * The vertical field of view
   * @defaultValue 0
   */
  _vfov   : number;
  /**
   * The horizontal field of view
   * @defaultValue 0
   */
  _hfov   : number;
  /**
   * The aspect ratio
   * @defaultValue 1
   */
  _aspect : number;
  /**
   * The mode of field of view (vertical, horizontal or auto)
   * @defaultValue 0
   */
  _fovMode: number;

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

    this._fov    = Math.PI/3.0;
    this._vfov   = 0.0;
    this._hfov   = 0.0;
    this._aspect = 1.0;

    this._fovMode = 0;

    this._proj    = mat4.create();

    this._valid = false;

  }

  /**
   * Get the projection matrix for this lens.
   * The projection matrix is updated before (if it was declared invalid).
   */
  getProjection(){
    if( ! this._valid ){
      this._updateProjection();
    }
    return this._proj;
  }

  /**
   * Shortcut to {@link PerspectiveLens#setVerticalFov}.
   * @param f The value to set
   */
  set fov(f){
    this.setVerticalFov( f );
  }

  /**
   * Get the field of view set for this lens.
   * It can be the vertical or horizontal fov depending on the fov mode.
   */
  get fov( ){ return this._fov; }

  /**
   * Set the near plane distance of this lens.
   * @param v The value to set
   */
  set near(v){
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
      this._invalidate();
    }
  }

  /**
   * Get the aspect ratio of this lens.
   */
  get aspect( ){ return this._aspect; }


  /**
   * Set the horizontal field of view of this lens.
   * The fov mode will be changed to horizontal.
   * @param fov The value to set
   */
  setHorizontalFov( fov : number ){
    this._fov = fov;
    this._fovMode = FovMode.FOV_MODE_H;
    this._invalidate();
  }

  /**
   * Set the vertical field of view of this lens.
   * The fov mode will be changed to vertical.
   * @param fov The value to set
   */
  setVerticalFov( fov : number ){
    this._fov = fov;
    this._fovMode = FovMode.FOV_MODE_V;
    this._invalidate();
  }

  /**
   * Get the computed horizontal field of view of this lens.
   */
  getHorizontalFov( ){
    this.getProjection();
    return this._hfov;
  }

  /**
   * Get the computed vertical field of view of this lens.
   */
  getVerticalFov( ){
    this.getProjection();
    return this._vfov;
  }

  /**
   * Set the field of view of this lens.
   * The value will be used for either the vertical or horizontal fov depending on the aspect ratio.
   * The fov mode will be changed to auto.
   * @param fov The value to set
   */
  setAutoFov( fov : number ){
    this._fov = fov;
    this._fovMode = FovMode.FOV_MODE_AUTO;
    this._invalidate();
  }

  /**
   * Update lens projection matrix.
   */
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

  /**
   * Invalidate lens projection matrix.
   */
  _invalidate(){
    this._valid = false;
  }

}

export default PerspectiveLens