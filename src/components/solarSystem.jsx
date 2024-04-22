import { useRef, useContext, useCallback } from 'react'
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
    const { sceneState, updateSceneState  } = useContext(SceneContext)
    const sunBasicMap = useLoader(THREE.TextureLoader, sunImg)

    const meshSun = useRef()
    const meshGroup = useRef()
    
    const handleClickZoom = useCallback(
        (e) => {
            e.stopPropagation()
            console.log('e---------------->', e)
            console.log('e.object.position---------------->', e.object.position)
            console.log('e.camera.position---------------->', e.camera.position)
            const distance = e.object.position.distanceTo(e.camera.position)
            updateSceneState({targetObj: e.object, distanceTarget: distance})
        },
      [updateSceneState],
    )

    console.log('distanceTarget---------------->', sceneState.distanceTarget)

    useFrame((state, delta) => {
        if(sceneState.isPlaying) {
            // Planet rotation from solar system center
            for ( let mesh of meshGroup.current.children) {
                console.log('mesh---------------->', mesh)
                const firstSelectedMesh = mesh.children[0]
                let size, position_x  
                if(firstSelectedMesh) {
                    if((firstSelectedMesh.type ?? firstSelectedMesh.constructor.name) === 'Mesh') {
                        size = firstSelectedMesh.geometry.parameters.radius
                        position_x = firstSelectedMesh.position.x
                    } else if(firstSelectedMesh.constructor.name === 'Group') {
                        size = firstSelectedMesh.children[0].geometry.parameters.radius
                        position_x = firstSelectedMesh.position.x
                    }
                    const vel = (delta * 20)/ (position_x / size)
                    mesh.rotation.y += (vel)
                }
            }
        }
        if(sceneState.targetObj) {
            state.camera.lookAt(sceneState.targetObj?.position)
        }
        if(sceneState.targetObj && sceneState.distanceTarget > 10) {
            console.log('targetObj---------------->', sceneState?.targetObj)

            // state.camera.lookAt(sceneState.targetObj.position)
            // state.camera.position.lerp(sceneState.targetObj.position, .03)
            // state.camera.updateProjectionMatrix()
            if (sceneState.targetObj?.position) {
                state.camera.position.x = THREE.MathUtils.damp(
                    state.camera.position.x,
                    sceneState.targetObj.position.x,
                    1,
                    0.7
                )
                state.camera.position.y = THREE.MathUtils.damp(
                    state.camera.position.y,
                    sceneState.targetObj.position.y,
                    1,
                    0.7
                )
                state.camera.position.z = THREE.MathUtils.damp(
                    state.camera.position.z,
                    sceneState.targetObj.position.z,
                    1,
                    0.7
                )

                const distance = sceneState.targetObj.position.distanceTo(state.camera.position)
                sceneState.distanceTarget = distance
            }
        }
    })

    return (
        <group {...props} ref={meshGroup}>
            <mesh
                ref={meshSun}
                onClick={handleClickZoom}
            >
                <sphereGeometry args={[10, 16, 16]} />
                <meshStandardMaterial color={sunBasicMap ? undefined : 'yellow'} map={sunBasicMap} />
            </mesh>
            { 
                Object.entries(PLANETS).map((value) => {
                    if (value[1].render) {
                        const { render, ...props} = value[1]
                        return render({...props, key: value[0], onClick: handleClickZoom})
                    } else {
                        const props = value[1]
                        return <Planet key={value[0]} onClick={handleClickZoom} {...props} />
                    }
                })
            }
        </group>
    )
}

export default SolarSystem