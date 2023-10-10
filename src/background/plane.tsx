import React, { useRef } from 'react'
import { Mesh } from 'three'
import { SceneState } from './background'
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
      <meshLambertMaterial color={SceneState.currentPageInfo.floorColour} />
    </mesh>
  )
}