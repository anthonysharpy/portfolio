import { Vector3 } from "three";
import { ObjectType, SceneObject } from "./sceneobject";
import { addSceneObject, deleteSceneObject } from "./background";
import { MeteorChunk } from "./meteorchunk";
import { randomVector } from "../helpers/mathhelpers";

export class Meteor extends SceneObject {
    constructor() {
        let spawnOnLeftHandSide = Math.random() >= 0.5

        super(ObjectType.Cube, 10, new Vector3(spawnOnLeftHandSide ? 150 : -150, 0, 0), "meteor")

        this.setPosition(new Vector3(spawnOnLeftHandSide ? -1000 : 1000, Math.random() * 200, Math.random() * -500))
        this.affectedByDrag = false
        this.affectedByGravity = false
        this.angularVelocity = new Vector3((Math.random()-0.5) * 2, (Math.random()-0.5) * 2, (Math.random()-0.5) * 2)
    }

    override tick() {
        if (Date.now() - this.spawnedAt > 15000) {
            deleteSceneObject(this)
        }
    }

    override onCollide(otherObject: SceneObject) {
        super.onCollide(otherObject)

        this.explode()
    }

    explode() {
        deleteSceneObject(this)

        const position = this.getPosition()

        for (let i = 0; i < 20; i++) {
            let chunk = new MeteorChunk(position)
            chunk.velocity = randomVector().multiplyScalar(20)
            chunk.angularVelocity = new Vector3((Math.random()-0.5) * 60, (Math.random()-0.5) * 60, (Math.random()-0.5) * 60)
            addSceneObject(chunk)
        }
    }
}