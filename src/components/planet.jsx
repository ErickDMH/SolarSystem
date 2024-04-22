
import { useRef, useContext } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import {SceneContext} from '../state/sceneState'

function Planet(props) {
	const {color, size, position, images, onClick} = props
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
		<group position={[0, 0, 0]}>
			<mesh
				position={[position, 0, 0]}
				ref={meshPlanet}
				onClick={onClick}
			>
				<sphereGeometry args={[size, 16, 16]} />
				<meshStandardMaterial 
					color={map ? undefined : color}
					map={map}
					bumpMap={bump} 
				/>
			</mesh>
		</group>
	)
  }

export default Planet