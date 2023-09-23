import React, { useRef } from 'react'
import { Mesh } from 'three'
import { SceneObject } from './sceneobject'

interface Props {
  sceneObject: SceneObject
}

export function Box(props: Props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null)
  props.sceneObject.mesh = meshRef

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      key={props.sceneObject.objectID}
      scale={props.sceneObject.size}
      ref={meshRef}
      castShadow
      receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={'white'} />
    </mesh>
  )
}