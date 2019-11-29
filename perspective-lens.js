"use strict";
const gl_matrix_1 = require("gl-matrix");
class PerspectiveLens {
    constructor() {
        this._near = 0.01;
        this._far = 10.0;
        this._fov = Math.PI / 3.0;
        this._vfov = 0.0;
        this._hfov = 0.0;
        this._aspect = 1.0;
        this._fovMode = 0;
        this._proj = gl_matrix_1.mat4.create();
        this._valid = false;
    }
    getProjection() {
        if (!this._valid) {
            this._updateProjection();
        }
        return this._proj;
    }
    set fov(f) {
        this.setVerticalFov(f);
    }
    get fov() { return this._fov; }
    set near(v) {
        if (this._near !== v) {
            this._near = v;
            this._invalidate();
        }
    }
    get near() { return this._near; }
    set far(v) {
        if (this._far !== v) {
            this._far = v;
            this._invalidate();
        }
    }
    get far() { return this._far; }
    set aspect(v) {
        if (this._aspect !== v) {
            this._aspect = v;
            this._invalidate();
        }
    }
    get aspect() { return this._aspect; }
    setHorizontalFov(fov) {
        this._fov = fov;
        this._fovMode = 2;
        this._invalidate();
    }
    setVerticalFov(fov) {
        this._fov = fov;
        this._fovMode = 1;
        this._invalidate();
    }
    getHorizontalFov() {
        this.getProjection();
        return this._hfov;
    }
    getVerticalFov() {
        this.getProjection();
        return this._vfov;
    }
    setAutoFov(fov) {
        this._fov = fov;
        this._fovMode = 3;
        this._invalidate();
    }
    _updateProjection() {
        var mode = this._fovMode, aspect = this._aspect;
        if (mode === 1 || (mode === 3 && aspect > 1.0)) {
            this._vfov = this._fov;
            this._hfov = Math.atan(Math.tan(this._fov / 2.0) * aspect) * 2.0;
        }
        else {
            this._hfov = this._fov;
            this._vfov = Math.atan(Math.tan(this._fov / 2.0) / aspect) * 2.0;
        }
        gl_matrix_1.mat4.perspective(this._proj, this._vfov, aspect, this._near, this._far);
        this._valid = true;
    }
    _invalidate() {
        this._valid = false;
    }
}
module.exports = PerspectiveLens;
