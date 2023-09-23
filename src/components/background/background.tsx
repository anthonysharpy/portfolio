import React, { ReactNode, useEffect, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Plane } from '../3d/plane'
import './background.css'
import { DegreesToRadians } from '../../helpers/mathhelpers'
import { Color, Euler, SpotLightShadow, Vector3 } from 'three'
import { ObjectType, SceneObject } from '../3d/sceneobject'
import { Meteor } from './meteor'
import { Effects, SoftShadows } from '@react-three/drei'

let lastTickTime: number = Date.now()
const tickRate = 60
const tickInterval = 1 / tickRate
const gravity = new Vector3(0, -10, 0)
const drag = 0.001 // Between 0 and 1.
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
                <FrameHandler setFrame={setFrame}/>
                <SoftShadows size={5} focus={0.4} samples={15}/>
                <ambientLight intensity={0.5} />
                <fog attach="fog" args={["skyblue", 0, 450]} />
                <spotLight position={[200, 400, -100]} intensity={10} distance={10000} decay={0.1} castShadow shadow-mapSize={4096} />

                {buildScene(sceneObjects)}
            </Canvas>
        </div>
    )
}

function initialiseScene() {
    let floor = new SceneObject(ObjectType.Plane, 1000, new Vector3(), "floor")
    floor.setRotation(new Euler(DegreesToRadians(-90), 0, 0))
    floor.setPosition(new Vector3(0, -10, -0))
    floor.affectedByGravity = false

    sceneObjects = [
        floor
    ]

    sceneDirty = true
}

/** Builds the scene (on component rebuild). */
function buildScene(sceneObjects: SceneObject[]): ReactNode {
    return (
        <>
        {sceneObjects.map(x => x.element)}
        </>
    )
}

/** Does stuff every frame. */
const FrameHandler: React.FC<{setFrame: React.Dispatch<React.SetStateAction<number>>
    }> = ({ setFrame }) => {

    useFrame((state, delta) => {
        pruneGoneObjects()
        doPhysics(delta)

        let currentTime = Date.now()
        let timeSinceLastTick = currentTime - lastTickTime

        if (timeSinceLastTick >= tickInterval * 1000) {
            doLogic(delta)
        }

        // Only force component re-render if scene is dirty.
        //if (sceneDirty) {
            sceneDirty = false
            setFrame(frame => frame + 1)
        //}
    });

    return null;
}

/** Move stuff. Check collisions. */
function doPhysics(delta: number) {
    // Velocity.  
    sceneObjects.forEach(x => {
        x.setPosition(x.getPosition().add(x.velocity.clone().multiplyScalar(delta)))

        if (x.affectedByGravity) {
            x.velocity = x.velocity.clone().add(gravity.clone().multiplyScalar(delta))
        }
    })
    
    // Angular velocity.
    sceneObjects.forEach(x => { 
        let change = x.angularVelocity.clone().multiplyScalar(delta)
        let currentRotation = x.getRotation()

        x.setRotation(new Euler(currentRotation.x + change.x, currentRotation.y + change.y, currentRotation.z + change.z))
    })

    // Drag.
    sceneObjects.forEach(x => { 
        if (x.affectedByDrag) {
            x.velocity.multiplyScalar(1 - (drag * delta))
        }
    })

    // Angular drag.
    sceneObjects.forEach(x => { 
        if (x.affectedByDrag) {
            x.angularVelocity.multiplyScalar(1 - (angularDrag * delta))
        }
    })

    // Very basic collision checks. Go back-to-front so we can safely
    // remove elements if we need to.
    for(let i = sceneObjects.length-1; i >= 0; i--) {
        for(let j = i-1; j >= 0; j--) {
            if (sceneObjects[i].collidingWith(sceneObjects[j])) {
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

    maybeSpawnMeteor()
}

function maybeSpawnMeteor() {
    if ( Math.random() > 0.9 ) {
        addSceneObject(new Meteor())
    }
}

/** Prune stuff that is outside the bounds of the map. */
function pruneGoneObjects() {
    for(let i = sceneObjects.length-1; i >= 0; i--) {
        if (sceneObjects[i].getPosition().y < -200) {
            deleteSceneObject(sceneObjects[i])
        }
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