"use strict";
const gl_matrix_1 = require("gl-matrix");
const Node = require("nanogl-node");
const PerspectiveLens = require("./perspective-lens");
const OrthographicLens = require("./ortho-lens");
const _M4 = gl_matrix_1.mat4.create();
const IMVP = gl_matrix_1.mat4.create();
class Camera extends Node {
    constructor(lens) {
        super();
        this.lens = lens;
        this._view = gl_matrix_1.mat4.create();
        this._viewProj = gl_matrix_1.mat4.create();
    }
    modelViewMatrix(out, model) {
        gl_matrix_1.mat4.multiply(out, model, this._view);
    }
    modelViewProjectionMatrix(out, model) {
        gl_matrix_1.mat4.multiply(out, this._viewProj, model);
    }
    getMVP(model) {
        gl_matrix_1.mat4.multiply(_M4, this._viewProj, model);
        return _M4;
    }
    unproject(out, v) {
        gl_matrix_1.mat4.invert(IMVP, this._viewProj);
        gl_matrix_1.vec3.transformMat4(out, v, IMVP);
    }
    updateViewProjectionMatrix(w, h) {
        this.lens.aspect = w / h;
        gl_matrix_1.mat4.multiply(this._viewProj, this.lens.getProjection(), this._view);
    }
    _computeWorldMatrix(skipParents) {
        super._computeWorldMatrix(skipParents);
        gl_matrix_1.mat4.invert(this._view, this._wmatrix);
    }
    static makePerspectiveCamera() {
        return new Camera(new PerspectiveLens());
    }
    static makeOrthoCamera() {
        return new Camera(new OrthographicLens());
    }
}
module.exports = Camera;
