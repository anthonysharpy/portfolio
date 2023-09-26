import React, { ReactNode, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './background.css'
import { degreesToRadians, randomVector } from '../helpers/mathhelpers'
import { Euler, Vector3 } from 'three'
import { ObjectType, SceneObject } from './sceneobject'
import { SoftShadows } from '@react-three/drei'
import { MeteorChunk } from './meteorchunk'
import { CollisionHandler } from './collisionhandler'
import { Meteor } from './meteor'

let lastTickTime: number = Date.now()
let lastPhysicsTickTime: number = Date.now()
const tickRate = 60
const tickInterval = 1 / tickRate
const physicsTickInterval = 1 / 60
const gravity = new Vector3(0, -40, 0)
const drag = 0.001 // Between 0 and 1. I'm not really sure if this a good value or not but it seems to work nicely.
const angularDrag = 1 // Between 0 and 1. 

let sceneObjects: SceneObject[]
let sceneDirty: boolean = true // If true, we need to rebuild the scene (probably a better way to do this but eh, downside of this fiber library really).

export function Background() {
    const [, setFrame] = useState<number>(0) // Forces our component to update.

    if (sceneObjects == null || sceneObjects.length == 0) {
        initialiseScene()
    }

    return (
        <div className="background">
            <Canvas shadows color='pink'>
                <SoftShadows size={5} focus={0.4} samples={15}/>
                <ambientLight intensity={0.5} />
                <fog attach="fog" args={["skyblue", 0, 450]} />
                <spotLight position={[0, 400, 0]} intensity={10} distance={10000} decay={0.1} castShadow shadow-mapSize={2048} />

                {buildScene()}
                <FrameHandler setFrame={setFrame}/>
            </Canvas>
        </div>
    )
}

function initialiseScene() {
    let floor = new SceneObject(ObjectType.Plane, 1000, new Vector3(), "floor")
    floor.setRotation(new Euler(degreesToRadians(-90), 0, 0))
    floor.setPosition(new Vector3(0, -10, -250))
    floor.affectedByGravity = false
    floor.static = true

    sceneObjects = [
        floor
    ]

    sceneDirty = true
}

/** Builds the scene (on component rebuild). */
function buildScene(): ReactNode[] {
    return sceneObjects.map(x => x.element)
}

/** Does stuff every frame. */
const FrameHandler: React.FC<{setFrame: React.Dispatch<React.SetStateAction<number>>
    }> = ({ setFrame }) => {

    useFrame((state, delta) => {
        moveObjects(delta)

        let currentTime = Date.now()
        let timeSinceLastTick = currentTime - lastTickTime
        let timeSinceLastPhysicsTick = currentTime - lastPhysicsTickTime

        if (timeSinceLastPhysicsTick >= physicsTickInterval * 1000) {
            applyForces()
        }
        if (timeSinceLastTick >= tickInterval * 1000) {
            doLogic(tickInterval)
        }

        // Only force component re-render if scene is dirty.
        if (sceneDirty) {
            sceneDirty = false
            setFrame(frame => frame + 1)
        }
    });

    return null;
}

/** Move stuff. */
function moveObjects(delta: number) {
    // Go back-to-front so we can safely remove elements if we need to.
    for (let i = sceneObjects.length-1; i >= 0; i--) {
        const x = sceneObjects[i]

        // Velocity
        x.setPosition(x.getPosition().add(x.velocity.clone().multiplyScalar(delta)))

        // Angular velocity
        let change = x.angularVelocity.clone().multiplyScalar(delta)
        let currentRotation = x.getRotation()

        x.setRotation(new Euler(currentRotation.x + change.x, currentRotation.y + change.y, currentRotation.z + change.z)) 

        // Drag
        if (x.affectedByDrag) {
            x.velocity.multiplyScalar(1 - (drag * delta))
            x.angularVelocity.multiplyScalar(1 - (angularDrag * delta))
        }
    }
}

/** Check collisions and do gravity. */
function applyForces() {
    lastPhysicsTickTime = Date.now()

    let i, j = 0
    const gravityAmount = gravity.clone().multiplyScalar(physicsTickInterval)

    // Go back-to-front so we can safely remove elements if we need to.
    for(i = sceneObjects.length-1; i >= 0; i--) {
        if (sceneObjects[i].affectedByGravity) {
            sceneObjects[i].velocity.add(gravityAmount)
        }

        // Do some collision checks against all other objects.
        for (j = i-1; j >= 0; j--) {
            if (sceneObjects[i].collisionHandler.isCollidingWith(sceneObjects[j])) {
                CollisionHandler.resolveOverlap(sceneObjects[i], sceneObjects[j], physicsTickInterval)

                sceneObjects[i].collisionHandler.handleCollisionWith(sceneObjects[j])
                sceneObjects[j].collisionHandler.handleCollisionWith(sceneObjects[i])

                sceneObjects[i].onCollide(sceneObjects[j])
                sceneObjects[j].onCollide(sceneObjects[i])
            }
        }
    }
}

/** Do scene logic. */
function doLogic(delta: number) {
    lastTickTime = Date.now()

    for(let i = sceneObjects.length-1; i >= 0; i--) {
        sceneObjects[i].tick()
    }

    maybeSpawnMeteor(delta)
    //maybeSpawnMeteorChunk(delta)
}

// Used for debugging physics.
// function maybeSpawnMeteorChunk(delta: number) {
//     if ( Math.random() > 0.96 ) {
//         let chunk = new MeteorChunk(new Vector3(0, 0, -10))
//         chunk.velocity = randomVector().multiplyScalar(3)

//         addSceneObject(chunk)
//     }
// }

function maybeSpawnMeteor(delta: number) {
    if ( Math.random() > 0.90 ) {
        addSceneObject(new Meteor())
    }
}

/** Remove this scene object from the scene */
export function deleteSceneObject(object: SceneObject) {
    sceneDirty = true
    sceneObjects = sceneObjects.filter(x => x.objectID != object.objectID)
}

/** Add this scene object to the scene */
export function addSceneObject(object: SceneObject) {
    sceneDirty = true
    sceneObjects.push(object)
}