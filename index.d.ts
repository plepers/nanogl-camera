import { mat4, vec3 } from "gl-matrix";
import Node from 'nanogl-node';
import { ICameraLens } from "./ICameraLens";
import PerspectiveLens from "./perspective-lens";
import OrthographicLens from "./ortho-lens";
export default class Camera<TLens extends ICameraLens = ICameraLens> extends Node {
    lens: TLens;
    readonly _view: mat4;
    readonly _viewProj: mat4;
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
