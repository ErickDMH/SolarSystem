
import { useRef, useContext } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import {SceneContext} from '../state/sceneState'

function Planet(props) {
	const {color, size, position, images} = props
	const { sceneState } = useContext(SceneContext)

	let map = undefined
	if (images?.map) {
		map = useLoader(THREE.TextureLoader, images?.map)
	}
	let bump = undefined
	if (images?.bump) {
		bump = useLoader(THREE.TextureLoader, images?.bump)
	}

    const meshPlanet = useRef()
    
    useFrame((state, delta) => {
      if(sceneState.isPlaying) {
        meshPlanet.current.rotation.y += delta
      }
    })
    
    return (
        <mesh
			position={[position, 0, 0]}
			ref={meshPlanet}
        >
			<sphereGeometry args={[size, 16, 16]} />
			<meshStandardMaterial 
				color={map ? undefined : color}
				map={map}
				bumpMap={bump} 
			/>
        </mesh>
	)
  }

export default Planet