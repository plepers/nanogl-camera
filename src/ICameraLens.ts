import { mat4 } from "gl-matrix";


export interface ICameraLens {
    /**
     * Get the projection matrix for this lens.
     */
    getProjection() : mat4;
    /** The near plane distance */
    near : number;
    /** The far plane distance */
    far : number;
    /** The aspect ratio */
    aspect : number;
}