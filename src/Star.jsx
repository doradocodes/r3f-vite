import {useEffect, useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import {gsap} from "gsap";
import {Text} from "@react-three/drei";

export default function Star({ index, position, color, content}) {
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
                duration: 5,
                ease: 'elastic.out'
            });

            gsap.from(meshRef.current.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: 5,
                ease: 'easeOut'
            });
        }
    }, []);

    const onStarHover = (isHovered) => {
        setHover(isHovered);
        // setShowText(isHovered);
        // setTextContent();
        setActive(isHovered);
    }

    // Return view, these are regular three.js elements expressed in JSX
    return (
        <group
            key={index}
            // onPointerOver={(event) => onStarHover(true)}
            // onPointerOut={(event) => onStarHover(false)}
            onClick={(event) => onStarHover(!active)}
            position={position}
        >
            <mesh
                ref={meshRef}
                onClick={(event) => setActive(!active)}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
                castShadow
                receiveShadow

            >
                <sphereGeometry args={[0.5, 32, 32]}/>
                {/* Adjust radius and detail */}
                <meshStandardMaterial
                    emissive={color || 'white'}
                    emissiveIntensity={hovered ? 1 : 0.5}
                    color={hovered ? 'orange' : color || 'white'}
                />
            </mesh>
            {active &&
                <Text
                    position={[0, 1, 0]}
                    scale={[1, 1, 1]}
                    color="white" // default
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    {content}
                </Text>
            }
        </group>
    )
}
