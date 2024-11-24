import {OrthographicCamera, PerspectiveCamera} from "@react-three/drei";
import {useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {gsap} from "gsap";

export default function AnimatedCamera() {
    const { camera } = useThree();
    const cameraRef = useRef();
    useEffect(() => {
        if (cameraRef.current) {
            gsap.to(cameraRef.current.position, {
                x: "+=6.28319",
                y: "+=6.28319",
                duration: 60,
                ease: 'linear',
                repeat: -1,
                yoyo: true,
                // onUpdate: () => cameraRef.current.updateProjectionMatrix(), // Apply the changes
                // onStart: () => console.log("Camera zoom animation started (ref)"), // Debugging line
            });
            // gsap.to(cameraRef.current.zoom, {
            //     value: 1,
            //     duration: 1,
            //     ease: 'linear',
            //     onUpdate: () => cameraRef.current.updateProjectionMatrix(), // Apply the changes
            // })
        }
    }, [cameraRef.current]);

    useEffect(() => {
        if (camera) {
            // gsap.to(camera, {
            //     x: "+=6.28319",
            //     y: "+=6.28319",
            //     duration: 60,
            //     ease: 'linear',
            //     // onUpdate: () => camera.updateProjectionMatrix(), // Apply the changes
            //     onStart: () => console.log("Camera zoom animation started"), // Debugging line
            // });
            // gsap.to(camera.zoom, {
            //     value: 1,
            //     duration: 1,
            //     ease: 'linear',
            //     onUpdate: () => camera.updateProjectionMatrix(), // Apply the changes
            // })
        }
    }, [camera]);

    return <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 2]}
        zoom={0.25}
    />
}
