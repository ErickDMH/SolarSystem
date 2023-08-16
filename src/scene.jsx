import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Center } from '@react-three/drei'
import Earth from './components/earth'

function Scene() {
    
    console.log('scene render--------->')
    return  <div id="canvas-container" style={{width: '100%', height: '100dvh'}}>
        <Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Center>
				<Earth position={[0, 0, 0]} />
			</Center>
			<OrbitControls />
			<Stats />
        </Canvas>
    </div>
}

export default Scene