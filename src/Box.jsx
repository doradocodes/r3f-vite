import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {gsap} from "gsap";

export default function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    // useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    useEffect(() => {
        if (meshRef.current) {
            // Animate rotation and position with GSAP
            // gsap.to(meshRef.current.rotation, {
            //     y: "+=6.28319", // Equivalent to Math.PI * 2 for continuous rotation
            //     duration: 10,
            //     repeat: -1,
            //     ease: 'linear',
            // });

            gsap.from(meshRef.current.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
                ease: 'elastic.out'
            })
        }
    }, []);

    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            // scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
            castShadow
            receiveShadow
        >
            {/*<boxGeometry args={[1, 1, 1]} />*/}
            <sphereGeometry args={[0.5, 32, 32]} /> {/* Adjust radius and detail */}
            <meshStandardMaterial color={hovered ? 'hotpink' : 'white'}/>
        </mesh>
    )
}
