import './App.css'
import {Canvas, useThree} from "@react-three/fiber";
import {OrbitControls, Text, PerspectiveCamera} from "@react-three/drei";
import Scene from "./Scene.jsx";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import AnimatedCamera from "./AnimatedCamera.jsx";
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { useControls } from 'leva'
import {getRandomInt} from "./utils.js";
import testData from "./testData.js";


function App() {
    const [wishes, setWishes] = useState(testData); // State to store wishes


    // Update span position on mouse move
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (textRef.current) {
                textRef.current.style.left = `${event.clientX}px`; // Set X position
                textRef.current.style.top = `${event.clientY}px`; // Set Y position
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup event listener
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const submitWish = (event) => {
        event.preventDefault();

        const formFields = new FormData(event.target);
        const inputValue = formFields.get('content');

        console.log('Wish submitted', inputValue);

        setWishes((prevWishes) => [
            ...prevWishes,
            {
                content: inputValue,
                position: {
                    x: getRandomInt(-10,10),
                    y: getRandomInt(-10,10),
                    z: getRandomInt(-10,10),
                }
            }
        ]);
    }

    return (
        <div
            className={'App'}
        >
            <form className="wish_form" onSubmit={submitWish}>
                <input type="text" name="content" placeholder={'Send me a wish'}/>
                <button>Send</button>
            </form>
            <Canvas
                style={{width: '100vw', height: '100vh'}}
            >
                <EffectComposer disableNormalPass>
                    <Bloom
                        mipmapBlur
                        luminanceThreshold={1}
                        levels={5}
                        intensity={0.04}
                    />
                    <ToneMapping/>
                </EffectComposer>
                <AnimatedCamera/>

                <OrbitControls
                    // enablePan={false}
                    // enableZoom={true}
                />
                <ambientLight intensity={15}/>
                {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>*/}
                {/*<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>*/}
                {/*<Box position={[0, 0, 0]} scale={[2, 2, 2]}/>*/}

                <Scene
                    wishes={wishes}
                />
            </Canvas>
        </div>
    )
}

export default App
