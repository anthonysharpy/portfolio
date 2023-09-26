import { RefObject } from "react";
import { Euler, Mesh, Scene, Vector3 } from "three";
import { Box } from "./box";
import { CollisionHandler, CubeCollisionHandler, PlaneCollisionHandler, SphereCollisionHandler } from "./collisionhandler";
import { Plane } from "./plane";
import { Sphere } from "./sphere";

export enum ObjectType {
    Cube,
    Plane,
    Sphere
}

export class SceneObject {
    public objectID: string
    public angularVelocity: Vector3 = new Vector3()
    public affectedByGravity: boolean = true
    public affectedByDrag: boolean = true
    public mass: number = 1
    public mesh: RefObject<Mesh> = null!
    public element: JSX.Element = null!
    public static: boolean = false
    public collisionHandler: CollisionHandler
    protected objectName: string
    protected spawnedAt: number
    private position: Vector3 = new Vector3() // We need to store these as well because the mesh ref might be null (and so we cant always access them there)
    private rotation: Euler = new Euler()

    constructor(public type: ObjectType, public size: number, public velocity: Vector3, objectName: string) {
        this.objectID = crypto.randomUUID()
        this.objectName = objectName
        this.spawnedAt = Date.now()
        this.collisionHandler = this.getCollisionHandler()
        this.element = this.getElement()
    }

    private getElement() {
        switch(this.type) {
            case ObjectType.Cube:
                return <Box sceneObject={this}/>
            case ObjectType.Plane:
                return <Plane sceneObject={this}/>
            case ObjectType.Sphere:
                return <Sphere sceneObject={this}/>
        }
    }

    private getCollisionHandler() {
        switch(this.type) {
            case ObjectType.Cube:
                return new CubeCollisionHandler(this)
            case ObjectType.Plane:
                return new PlaneCollisionHandler(this)
            case ObjectType.Sphere:
                return new SphereCollisionHandler(this)
        }
    }

    onCollide(otherObject: SceneObject) {

    }

    setPosition(position: Vector3) {
        this.position = position

        if ( this.mesh != null ) {
            this.mesh.current!.position.x = position.x
            this.mesh.current!.position.y = position.y
            this.mesh.current!.position.z = position.z
        }
    } 

    /** Can be slow since we return a copy. */
    getPosition(): Vector3 {
        return this.position.clone()
    }

    /** Like getPosition except this returns a reference to the position vector,
    * which is unsafe but useful for some micro-optimisations. */
    getPositionRef(): Vector3 {
        return this.position
    }

    setRotation(rotation: Euler) {
        this.rotation = rotation

        if ( this.mesh != null ) {
            this.mesh.current!.rotation.x = rotation.x
            this.mesh.current!.rotation.y = rotation.y
            this.mesh.current!.rotation.z = rotation.z
        }
    }

    getRotation(): Euler {
        return this.rotation.clone()
    } 

    /** Like getRotation except this returns a reference to the rotation,
     * which is unsafe but useful for some micro-optimisations. */
    getRotationRef(): Euler {
        return this.rotation
    }

    tick() { }
}