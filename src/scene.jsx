import { Suspense } from 'react'
import { OrbitControls  } from '@react-three/drei'
import ThreeLazy from './utils/threeLazy'
import SolarSystem from './components/solarSystem'

function Scene() {
    return  (<div id="canvas-container" style={{width: '100%', height: '100dvh'}}>
        <ThreeLazy  camera={{ position: [-40, 40, 60], fov: 35 }}>
			<spotLight position={[-100, -100, -100]} intensity={0.2} angle={0.3} penumbra={1} />
			<hemisphereLight color="white" groundColor="#000" position={[-7, 25, 13]} intensity={1} />
			<Suspense fallback={null}>
				<SolarSystem position={[0, 0, 0]} />
			</Suspense>
			<OrbitControls />
        </ThreeLazy>
    </div>)
}

export default Scene