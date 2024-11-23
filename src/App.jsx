import './App.css'
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import Scene from "./Scene.jsx";


function App() {
    return (
        <>
            <Canvas
                style={{width: '100vw', height: '100vh'}}
            >
                <camera
                    position={[0, 0, 0]}
                    zoom={0.5}
                />
                <OrbitControls
                    // enablePan={false}
                    // enableZoom={false}
                />
                <ambientLight intensity={5}/>
                {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>*/}
                {/*<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>*/}
                {/*<Box position={[0, 0, 0]} scale={[2, 2, 2]}/>*/}

                <Scene/>
            </Canvas>
        </>
    )
}

export default App
