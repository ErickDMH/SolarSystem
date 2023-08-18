import { useRef, useContext } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'

import {SceneContext} from '../state/sceneState'
import Earth from './earth'
import Planet from './planet'

import mercuryBumpImg from  '../assets/mercury_bump.jpg'
import mercuryImg from  '../assets/mercury.jpg'
import venusImg from  '../assets/venus.jpg'
import marsBumpImg from  '../assets/mars_bump.jpg'
import marsImg from  '../assets/mars.jpg'
import jupiterImg from  '../assets/jupiter.jpg'
import saturnImg from  '../assets/saturn.jpg'
import uranusImg from  '../assets/uranus.jpg'
import neptuneImg from  '../assets/neptune.jpg'
import plutoImg from  '../assets/pluto.jpg'
import sunImg from  '../assets/sun.jpeg'

const PLANETS = {
    'mercury': {color: 'gray', size: .5, position: 20, images: {bump: mercuryBumpImg, map: mercuryImg}},
    'venus': {color: 'white', size: .9, position: 30, images: {map: venusImg}},
    'earth': {render: props => <Earth {...props} />, size: 1, position: 40},
    'mars': {color: 'red', size: .7, position: 50, images: {bump: marsBumpImg, map: marsImg}},
    'jupiter': {color: 'brown', size: 2, position: 60, images: {map: jupiterImg}},
    'saturn': {color: 'yellow', size: 1.8, position: 70, images: {map: saturnImg}},
    'uranus': {color: 'cyan', size: 1.4, position: 80, images: {map: uranusImg}},
    'neptune': {color: 'blue', size: 1.3, position: 90, images: {map: neptuneImg}},
    'pluto': {color: 'brown', size: .2, position: 100, images: {map: plutoImg}},
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