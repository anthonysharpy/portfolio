import React, { useRef } from 'react'
import { Mesh } from 'three'
import { SceneObject } from './sceneobject'

interface Props {
  sceneObject: SceneObject
}

export function Sphere(props: Props) {
  props.sceneObject.mesh = useRef<Mesh>(null)

  return (
    <mesh
      key={props.sceneObject.objectID}
      ref={props.sceneObject.mesh}
      castShadow
      receiveShadow>
      <sphereGeometry args={[props.sceneObject.size/2]} />
      <meshLambertMaterial color={'red'} />
    </mesh>
  )
}