import { mat4 } from "gl-matrix";
import { ICameraLens } from './ICameraLens';
declare class PerspectiveLens implements ICameraLens {
    _near: number;
    _far: number;
    _fov: number;
    _vfov: number;
    _hfov: number;
    _aspect: number;
    _fovMode: number;
    _proj: mat4;
    _valid: boolean;
    constructor();
    getProjection(): mat4;
    fov: any;
    near: any;
    far: any;
    aspect: any;
    setHorizontalFov(fov: number): void;
    setVerticalFov(fov: number): void;
    getHorizontalFov(): number;
    getVerticalFov(): number;
    setAutoFov(fov: number): void;
    _updateProjection(): void;
    _invalidate(): void;
}
export = PerspectiveLens;
