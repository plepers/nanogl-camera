import { mat4, vec3 } from "gl-matrix";
import Node = require('nanogl-node');
import { ICameraLens } from "./ICameraLens";
declare class Camera extends Node {
    lens: ICameraLens;
    _view: mat4;
    _viewProj: mat4;
    constructor(lens: ICameraLens);
    modelViewMatrix(out: mat4, model: mat4): void;
    modelViewProjectionMatrix(out: mat4, model: mat4): void;
    getMVP(model: mat4): mat4;
    unproject(out: vec3, v: vec3): void;
    updateViewProjectionMatrix(w: number, h: number): void;
    _computeWorldMatrix(skipParents: boolean): void;
    static makePerspectiveCamera(): Camera;
    static makeOrthoCamera(): Camera;
}
export = Camera;
