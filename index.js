import { mat4, vec3 } from "gl-matrix";
import Node from 'nanogl-node';
import PerspectiveLens from "./perspective-lens";
import OrthographicLens from "./ortho-lens";
const _M4 = mat4.create();
const IMVP = mat4.create();
class Camera extends Node {
    constructor(lens) {
        super();
        this.lens = lens;
        this._view = mat4.create();
        this._viewProj = mat4.create();
    }
    modelViewMatrix(out, model) {
        mat4.multiply(out, model, this._view);
    }
    modelViewProjectionMatrix(out, model) {
        mat4.multiply(out, this._viewProj, model);
    }
    getMVP(model) {
        mat4.multiply(_M4, this._viewProj, model);
        return _M4;
    }
    unproject(out, v) {
        mat4.invert(IMVP, this._viewProj);
        vec3.transformMat4(out, v, IMVP);
    }
    updateViewProjectionMatrix(w, h) {
        this.lens.aspect = w / h;
        mat4.multiply(this._viewProj, this.lens.getProjection(), this._view);
    }
    _computeWorldMatrix(skipParents) {
        super._computeWorldMatrix(skipParents);
        mat4.invert(this._view, this._wmatrix);
    }
    static makePerspectiveCamera() {
        return new Camera(new PerspectiveLens());
    }
    static makeOrthoCamera() {
        return new Camera(new OrthographicLens());
    }
}
export default Camera;
