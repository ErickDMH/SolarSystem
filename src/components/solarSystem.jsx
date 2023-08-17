import { useRef, useContext } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'

import {SceneContext} from '../state/sceneState'
import Earth from './earth'
import Planet from './planet'

import mercuryBumpImg from  '../assets/mercury_bump.jpg'
import mercuryImg from  '../assets/mercury.jpg'
import venusImg from  '../assets/venus.jpg'
import sunImg from  '../assets/sun.jpeg'

const PLANETS = {
    'mercury': {color: 'gray', size: .5, position: 20, images: {bump: mercuryBumpImg, map: mercuryImg}},
    'venus': {color: 'white', size: .9, position: 30, images: {map: venusImg}},
    'earth': {render: props => <Earth {...props} />, size: 1, position: 40},
    'mars': {color: 'red', size: .7, position: 50}
}

function SolarSystem(props) {
    const { sceneState } = useContext(SceneContext)
    const sunBasicMap = useLoader(THREE.TextureLoader, sunImg)

    const meshSun = useRef()
    const meshGroup = useRef()
    
    useFrame((state, delta) => {
        if(sceneState.isPlaying) {
            meshGroup.current.rotation.y += delta
        }
    })

    return (
        <group {...props} ref={meshGroup}>
            <mesh
                ref={meshSun}
            >
                <sphereGeometry args={[10, 16, 16]} />
                <meshStandardMaterial color={sunBasicMap ? undefined : 'yellow'} map={sunBasicMap} />
            </mesh>
            { 
                Object.entries(PLANETS).map((value) => {
                    if (value[1].render) {
                        const { render, ...props} = value[1]
                        return render(props)
                    } else {
                        const props = value[1]
                        return <Planet key={value[0]} {...props} />
                    }
                })
            }
        </group>
    )
}

export default SolarSystem