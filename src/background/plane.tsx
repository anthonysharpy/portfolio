import React, { useRef } from 'react'
import { Euler, Mesh, Vector3 } from 'three'
import { SceneObject } from './sceneobject'

interface Props {
  sceneObject: SceneObject
}

export function Plane(props: Props) {
  props.sceneObject.mesh = useRef<Mesh>(null)

  return (
    <mesh
      key={props.sceneObject.objectID}
      castShadow
      receiveShadow
      ref={props.sceneObject.mesh}>
      <planeGeometry args={[props.sceneObject.size, props.sceneObject.size/2]} />
      <meshLambertMaterial color={'white'} />
    </mesh>
  )
}