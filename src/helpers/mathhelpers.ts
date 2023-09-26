import { Vector3 } from "three";

export function degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180.0;
}

/** Return a Vector3 that has each axis randomly set between -1 and 1. */
export function randomVector(): Vector3 {
    return new Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).multiplyScalar(2)
}