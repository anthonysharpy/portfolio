import React, { useRef } from 'react'
import { Mesh } from 'three'
import { SceneObject } from './sceneobject'

interface Props {
  sceneObject: SceneObject
}

export function Box(props: Props) {
  props.sceneObject.mesh = useRef<Mesh>(null)

  return (
    <mesh
      key={props.sceneObject.objectID}
      ref={props.sceneObject.mesh}
      castShadow
      receiveShadow>
      <boxGeometry args={[props.sceneObject.size, props.sceneObject.size, props.sceneObject.size]} />
      <meshLambertMaterial color={props.sceneObject.colour} />
    </mesh>
  )
}