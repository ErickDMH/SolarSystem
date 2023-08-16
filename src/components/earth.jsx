
import { useRef, useContext } from 'react'
import earthImg from  '../assets/earth.jpg'
import earthBumpImg from  '../assets/earth_bump.jpg'
import moonImg from  '../assets/moon.jpg'
import moonBumpImg from  '../assets/moon_bump.jpg'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import {SceneContext} from '../state/sceneState'

function Earth(props) {
  const { sceneState } = useContext(SceneContext)
    const earthBasicMap = useLoader(THREE.TextureLoader, earthImg)
    const earthBumpMap = useLoader(THREE.TextureLoader, earthBumpImg)
    const moonBasicMap = useLoader(THREE.TextureLoader, moonImg)
    const moonBumpMap = useLoader(THREE.TextureLoader, moonBumpImg)

    const meshEarth = useRef()
    const meshMoon = useRef()
    const meshGroup = useRef()
    
    useFrame((state, delta) => {
      if(sceneState.isPlaying) {
        meshGroup.current.rotation.y += delta
        meshMoon.current.rotation.y += delta/.5
      }
    })
    
    return (
      <group {...props} ref={meshGroup}>
        <mesh
          ref={meshEarth}
        >
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color={earthBasicMap ? undefined : 'blue'} map={earthBasicMap} bumpMap={earthBumpMap} />
        </mesh>
        <mesh
          position={[2, 0, 0]}
          ref={meshMoon}
        >
          <sphereGeometry args={[.1, 8, 8]} />
          <meshStandardMaterial color={moonBasicMap ? undefined : 'gray'} map={moonBasicMap} bumpMap={moonBumpMap} />
        </mesh>
      </group>
    )
  }

export default Earth