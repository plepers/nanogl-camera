import { mat4, vec3 } from "gl-matrix";
import Node = require('nanogl-node');
import { ICameraLens } from "./ICameraLens";
import PerspectiveLens = require("./perspective-lens");
import OrthographicLens = require("./ortho-lens");
declare class Camera<TLens extends ICameraLens> extends Node {
    lens: TLens;
    _view: mat4;
    _viewProj: mat4;
    constructor(lens: TLens);
    modelViewMatrix(out: mat4, model: mat4): void;
    modelViewProjectionMatrix(out: mat4, model: mat4): void;
    getMVP(model: mat4): mat4;
    unproject(out: vec3, v: vec3): void;
    updateViewProjectionMatrix(w: number, h: number): void;
    _computeWorldMatrix(skipParents: boolean): void;
    static makePerspectiveCamera(): Camera<PerspectiveLens>;
    static makeOrthoCamera(): Camera<OrthographicLens>;
}
export = Camera;
