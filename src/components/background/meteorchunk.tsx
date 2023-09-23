import { Vector3 } from "three";
import { ObjectType, SceneObject } from "../3d/sceneobject";
import { deleteSceneObject } from "./background";
import { RandomVector } from "../../helpers/mathhelpers";

export class MeteorChunk extends SceneObject {
    constructor(spawnPosition: Vector3) {
        super(ObjectType.Cube, 
            1, 
            RandomVector().multiplyScalar(20),
            "meteor chunk")            

        this.setPosition(spawnPosition)
        this.angularVelocity = new Vector3((Math.random()-0.5) * 60, (Math.random()-0.5) * 60, (Math.random()-0.5) * 60)
        this.collisionsEnabled = true
    }

    tick = () => {
        if (Date.now() - this.spawnedAt > 20000) {
            deleteSceneObject(this)
        }
    }
}