import { mat4 } from "gl-matrix";
import { ICameraLens } from './ICameraLens';
declare class OrthographicLens implements ICameraLens {
    _near: number;
    _far: number;
    _xMin: number;
    _xMax: number;
    _yMin: number;
    _yMax: number;
    _aspect: number;
    _proj: mat4;
    _valid: boolean;
    constructor();
    getProjection(): mat4;
    setBound(xMin: number, xMax: number, yMin: number, yMax: number): void;
    near: number;
    far: any;
    aspect: any;
    _updateProjection(): void;
    _invalidate(): void;
}
export = OrthographicLens;
