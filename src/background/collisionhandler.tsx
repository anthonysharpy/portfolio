import { Vector3 } from "three"
import { ObjectType, SceneObject } from "./sceneobject"

export class CollisionHandler {
    constructor(protected ourObject: SceneObject) {}
 
    isCollidingWith(otherObject: SceneObject): boolean { return false }

    /** There is a collision with otherObject. Update the velocities of both objects. */
    handleCollisionWith(otherObject: SceneObject) { }

    private static objectIsMovingTowardsPoint(object: SceneObject, point: Vector3): boolean {
        const directionToPoint = point.sub(object.getPositionRef()).normalize();
        const dotProduct = object.velocity.dot(directionToPoint);
    
        return dotProduct > 0;
    }

    /** This object has collided with the floor. Get the point of impact. */
    private static getImpactPointWithFloor(object: SceneObject): Vector3 {
        if (object.velocity.y === 0) {
            return object.getPosition()
        }

        const yDiff = (-10 + object.size/2) - object.getPositionRef().y
        return object.getPosition()
            .add(object.velocity.clone().multiplyScalar(yDiff / object.velocity.y))
    }

    /** These objects are colliding. Fix any overlap between them. */
    static resolveOverlap(objectA: SceneObject, objectB: SceneObject, physicsDelta: number) {
        if (objectA.type === ObjectType.Cube || objectB.type === ObjectType.Cube) {
            return
        }

        if (objectA.type === ObjectType.Plane) {
            // Object B is colliding with the floor, so just set it to the point of impact.
            objectB.setPosition(CollisionHandler.getImpactPointWithFloor(objectB))
            return
        } else if (objectB.type === ObjectType.Plane) {
             // Object A is colliding with the floor, so just set it to the point of impact.
             objectA.setPosition(CollisionHandler.getImpactPointWithFloor(objectA))
             return
        }

        // We can assume both objects are spheres.

        // An object does not get adjusted if it was not moving towards the other object.
        const shouldAdjustA = CollisionHandler.objectIsMovingTowardsPoint(objectA, objectB.getPosition())
        const shouldAdjustB = CollisionHandler.objectIsMovingTowardsPoint(objectB, objectA.getPosition())

        if (!shouldAdjustA && !shouldAdjustB) {
            return
        }

        const minimumDistance = objectA.size/2 + objectB.size/2
        const currentDistance = objectA.getPositionRef().distanceTo(objectB.getPositionRef())
        const overlapNormal = objectB.getPosition().sub(objectA.getPositionRef()).normalize()
        const overlapCorrection = overlapNormal.multiplyScalar(minimumDistance - currentDistance)

        if (!shouldAdjustB) {
            // Just adjust A.
            objectA.getPositionRef().sub(overlapCorrection)
        } else if (!shouldAdjustA) {
            // Just adjust B.
            objectB.getPositionRef().add(overlapCorrection)
        } else {
            const magVelocityA = objectA.velocity.length()
            const magVelocityB = objectB.velocity.length()

            const totalMagVelocity = magVelocityA + magVelocityB;

            if (totalMagVelocity === 0)
                return;

            objectA.getPositionRef().add(overlapCorrection.multiplyScalar(magVelocityA / totalMagVelocity))
            objectB.getPositionRef().sub(overlapCorrection.multiplyScalar(magVelocityB / totalMagVelocity))
        }
    }
}

// Nice and simple as we only care about if meteors collide with eachother.
export class CubeCollisionHandler extends CollisionHandler {
    override isCollidingWith(otherObject: SceneObject): boolean {
        switch (otherObject.type) {
            case ObjectType.Cube:
                // The distance they need to be less than in order to be colliding.
                const collisionDistance = this.ourObject.size/2 + otherObject.size/2
                const actualDistance = this.ourObject.getPositionRef().distanceTo(otherObject.getPositionRef())
                return actualDistance < collisionDistance // Use cheap spherical approximation.
            case ObjectType.Sphere:
            case ObjectType.Plane:
                return false
        }
    }
}

export class SphereCollisionHandler extends CollisionHandler {
    override isCollidingWith(otherObject: SceneObject): boolean {
        switch (otherObject.type) {
            case ObjectType.Cube:
                return false
            case ObjectType.Sphere:
                // The distance they need to be less than in order to be colliding.
                const collisionDistance = this.ourObject.size/2 + otherObject.size/2
                const actualDistance = this.ourObject.getPositionRef().distanceTo(otherObject.getPositionRef())
                return actualDistance < collisionDistance
            case ObjectType.Plane:
                const objectPosition = this.ourObject.getPositionRef()
                // Lowest point of this cube.
                const radius = this.ourObject.size/2
                const lowestPoint = objectPosition.y - radius
                return lowestPoint < -10
        }
    }

    override handleCollisionWith(otherObject: SceneObject) {
        switch (otherObject.type) {
            case ObjectType.Cube:
                return
            case ObjectType.Sphere:
                this.handleCollisionWithSphere(otherObject)
                return
            case ObjectType.Plane:
                this.handleCollisionWithPlane(otherObject)
                return
        }
    }

    private handleCollisionWithPlane(plane: SceneObject) {
        this.ourObject.velocity.multiply(new Vector3(0.8, -0.3, 0.8))

        if (this.ourObject.velocity.length() < 1) {
            this.ourObject.velocity = new Vector3()
        }
    }

    private handleCollisionWithSphere(cube: SceneObject) {
        const collisionNormal = this.ourObject.getPosition().clone().sub(cube.getPositionRef()).normalize();
        const relativeVelocity = this.ourObject.velocity.clone().sub(cube.velocity)
        const relativeSpeed = relativeVelocity.dot(collisionNormal);
        
        // If spheres are not approaching each other, return.
        if (relativeSpeed > 0)
            return;
        
        this.ourObject.velocity.sub(collisionNormal
                .multiplyScalar(2 * relativeSpeed / (1/this.ourObject.mass + 1/cube.mass) * 1/this.ourObject.mass))
    }
}

// This doesn't actually need to do anything as the floor plane should never move.
export class PlaneCollisionHandler extends CollisionHandler {
}