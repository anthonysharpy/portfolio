import { Vector3 } from "three";
import { ObjectType, SceneObject } from "./sceneobject";
import { deleteSceneObject } from "./background";

export class MeteorChunk extends SceneObject {
    constructor(spawnPosition: Vector3) {
        super(ObjectType.Sphere, 2, new Vector3(), "meteor chunk")   

        this.setPosition(spawnPosition)
    }

    override tick() {
        if (Date.now() - this.spawnedAt > 20000) {
            deleteSceneObject(this)
        }
    }
}