import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Center } from '@react-three/drei'
// import Earth from './components/earth'
import SolarSystem from './components/solarSystem'

function Scene() {
    return  <div id="canvas-container" style={{width: '100%', height: '100dvh'}}>
        <Canvas  camera={{ position: [-40, 40, 60], fov: 35 }}>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Center>
				<SolarSystem position={[0, 0, 0]} />
				{/* <Earth position={[0, 0, 0]} /> */}
			</Center>
			<OrbitControls />
			<Stats />
        </Canvas>
    </div>
}

export default Scene