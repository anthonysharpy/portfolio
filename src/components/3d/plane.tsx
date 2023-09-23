import React, { useRef } from 'react'
import { Euler, Mesh, Vector3 } from 'three'
import { SceneObject } from './sceneobject'

interface Props {
  sceneObject: SceneObject
}

export function Plane(props: Props) {
  const meshRef = useRef<Mesh>(null)
  props.sceneObject.mesh = meshRef

  return (
    <mesh
      key={props.sceneObject.objectID}
      castShadow
      rotation={new Euler()}
      position={new Vector3()}
      receiveShadow
      ref={meshRef}>
      <planeGeometry args={[props.sceneObject.size, props.sceneObject.size]} />
      <meshLambertMaterial color={'white'} />
    </mesh>
  )
}