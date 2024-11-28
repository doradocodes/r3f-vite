import Computer from "./Computer.jsx";
import {OrbitControls, OrthographicCamera} from "@react-three/drei";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useEffect, useRef} from "react";
import {useControls} from "leva";
import {useThree} from "@react-three/fiber";

const timeline = gsap.timeline();

export default function Scene({ sketchRef }) {
    const {camera} = useThree();
    const spotlightRef = useRef();

    useEffect(() => {
        timeline
            .to(spotlightRef.current, {
                intensity: 5,
                duration: 0.32,
                repeat: 6,
                ease: 'power1.inOut',
            })
            // .to(camera, {
            //     zoom: 8,
            //     duration: 10,
            //     ease: 'power1.inOut',
            //     onUpdate: () => {
            //         camera.updateProjectionMatrix();
            //     }
            // })
            // .to(sketchRef.current, {
            //     opacity: 1,
            //     zIndex: 1,
            //     duration: 0.3,
            //     ease: 'power1.inOut',
            // })
    }, []);

    // useGSAP(
    //     () => {
    //         timeline.to(spotlightRef.current, {
    //             intensity: 5,
    //             duration: 0.32,
    //             repeat: 6,
    //             ease: 'power1.inOut',
    //         });
    //     },
    //     {scope: spotlightRef}
    // );
    //
    // useGSAP(() => {
    //     timeline.to(camera, {
    //         zoom: 10,
    //         duration: 10,
    //         ease: 'power1.inOut',
    //         onUpdate: () => {
    //             camera.updateProjectionMatrix();
    //         }
    //     });
    // }, {scope: camera})
    return (
        <>
            {/*<OrthographicCamera*/}
            {/*    makeDefault*/}
            {/*    ref={cameraRef}*/}
            {/*    rotation={[cameraRotation.x, cameraRotation.y, cameraRotation.z]}*/}
            {/*    position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}*/}
            {/*    zoom={100}*/}
            {/*    near={0.1}*/}
            {/*    far={1000}*/}
            {/*/>*/}
            <OrbitControls
                enablePan={false}
                // enableZoom={false}
                // enableRotate={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
            />
            <ambientLight
                intensity={3}
                color={"rgb(49,71,105)"}
            />

            {/*<pointLight position={[position.x, position.y, position.z]} decay={0} intensity={Math.PI}/>*/}

            <Computer
                position={[-0.5, 0,0]}
                rotation={[0,0,0]}
                sketchRef={sketchRef}
            />
            <GroundPlane/>
            <spotLight
                ref={spotlightRef}
                position={[2, -10, -3]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={0}
                color={"rgba(115,239,78,0.34)"}
            />
        </>
    );
}

function GroundPlane() {
    return (
        <group>

            <mesh
                rotation={[-Math.PI / 2, 0, 0]} // Rotate the plane to lie flat
                position={[0, -2, 0]} // Position it slightly below the objects
                receiveShadow
            >
                <planeGeometry args={[100, 100]}/>
                {/* Width and height of the plane */}
                <meshStandardMaterial color="black"/>
            </mesh>
        </group>
    );
}
