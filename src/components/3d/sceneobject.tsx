import { RefObject } from "react";
import { Euler, Mesh, Scene, Vector3 } from "three";
import { Box } from "./box";
import { Plane } from "./plane";

export enum ObjectType {
    Cube,
    Plane
}

export class SceneObject {
    public objectID: string
    public angularVelocity: Vector3 = new Vector3()
    public affectedByGravity: boolean = true
    public collisionsEnabled: boolean = true
    public affectedByDrag: boolean = true
    public mass: number = 1
    public mesh: RefObject<Mesh> = null!
    public element: JSX.Element = null!
    protected objectName: string
    protected spawnedAt: number
    private position: Vector3 = new Vector3() // We need to store these as well because the mesh ref might be null (and so we cant always access them there)
    private rotation: Euler = new Euler()

    constructor(public type: ObjectType, 
        public size: number,
        public velocity: Vector3,
        objectName: string) {
        this.objectID = crypto.randomUUID()

        this.objectName = objectName
        this.spawnedAt = Date.now()

        switch(this.type) {
            case ObjectType.Cube:
                this.initialiseCube()
                break
            case ObjectType.Plane:
                this.initialisePlane()
                break
        }
    }

    tick() { }

    onCollide(otherObject: SceneObject) { 
        if (this.type == ObjectType.Cube && otherObject.type == ObjectType.Cube) {
            this.resolveSphericalCollision(otherObject)
        } else if (this.type == ObjectType.Cube && otherObject.type == ObjectType.Plane) {
            this.resolveFloorCollision()
        }
    }

    setPosition(position: Vector3) {
        this.position = position

        if ( this.mesh != null ) {
            this.mesh.current!.position.x = this.position.x
            this.mesh.current!.position.y = this.position.y
            this.mesh.current!.position.z = this.position.z
        }
    } 

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
            this.mesh.current!.rotation.x = this.rotation.x
            this.mesh.current!.rotation.y = this.rotation.y
            this.mesh.current!.rotation.z = this.rotation.z
        }
    } 

    getRotation(): Euler {
        return this.rotation.clone()
    } 

    /** Like getPosition except this returns a reference to the rotation,
     * which is unsafe but useful for some micro-optimisations. */
    getRotationRef(): Euler {
        return this.rotation.clone()
    } 

    private initialiseCube() {
        this.element = <Box sceneObject={this}/>
    }

    private initialisePlane() {
        this.element = <Plane sceneObject={this}/>
    }

    /** Check whether this scene object is colliding with otherObject. Uses 
     * a crappy sphere collision algorithm; could make it more complicated,
     * but doubt anyone would care. These objects are far away and fast-moving,
     * so won't notice the difference. */
    collidingWith(otherObject: SceneObject): boolean {
        if (!this.collisionsEnabled || !otherObject.collisionsEnabled) {
            return false
        }

        switch (this.type) {
            case ObjectType.Cube:
                return this.checkCubeCollision(otherObject)
            case ObjectType.Plane:
                return this.checkPlaneCollision(otherObject)
        }
    } 

    /** Does this object (which we figured out was a cube), collide with otherObject? */
    private checkCubeCollision (otherObject: SceneObject): boolean {
        switch (otherObject.type) {
            case ObjectType.Cube:
                const collisionDistance = (otherObject.size + this.size) / 2
                return this.position.distanceToSquared(otherObject.getPositionRef()) < (collisionDistance * collisionDistance)
            // Again, I can't be bothered to do this properly... we only have 1 plane (the floor) :-)
            case ObjectType.Plane:
                return this.getPositionRef().y - this.size/2 < -10
        }
    }

    /** Does this object (which we figured out was a plane), collide with otherObject? */
    private checkPlaneCollision (otherObject: SceneObject): boolean {
        switch (otherObject.type) {
            case ObjectType.Cube:
                return otherObject.getPositionRef().y - otherObject.size/2 < -10
            default:
                throw new Error("unknown collision type with object "+otherObject.objectName)
        }
    }

    /** This object (which is really a cube) has just collided with otherObject.
     * Set the new velocities of both objects. */
    private resolveSphericalCollision(otherObject: SceneObject) {
        const collisionNormal = this.getPosition().clone().sub(otherObject.getPosition()).normalize();
        
        const relativeVelocity = this.velocity.clone().sub(otherObject.velocity)
        
        const relativeSpeed = relativeVelocity.clone().dot(collisionNormal);
        
        // If spheres are not approaching each other, return.
        if (relativeSpeed >= 0)
            return;

        const restitution = 0.9
        
        const newVelocityA = this.velocity.clone().sub(collisionNormal.clone().multiplyScalar((1 + restitution) * relativeSpeed / (1 / this.mass + 1 / otherObject.mass) * 1 / this.mass))
        const newVelocityB = otherObject.velocity.clone().add(collisionNormal.clone().multiplyScalar((1 + restitution) * -relativeSpeed / (1 / this.mass + 1 / otherObject.mass) * 1 / otherObject.mass))

        this.velocity = newVelocityA;
        otherObject.velocity = newVelocityB;
    }

    /** This object (which is really a cube) has just collided with the floor.
     * Set the new velocity of this object. */
    private resolveFloorCollision() {
        this.getPosition().setY(-10 + this.size/2)
        this.velocity.multiply(new Vector3(0.7, -0.2, 0.7))
    }
}