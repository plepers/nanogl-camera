import { mat4 } from "gl-matrix";


export interface ICameraLens {

    getProjection() : mat4;
    near : number;
    far : number;
    aspect : number;
}