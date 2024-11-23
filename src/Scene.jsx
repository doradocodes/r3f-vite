import {useEffect, useRef, useState} from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Box from "./Box.jsx";
import {gsap} from "gsap";
import Plane from "./Plane.jsx";

export default function Scene() {
    const [boxes, setBoxes] = useState([]); // Array to store box positions
    const { scene, camera } = useThree();
    const groundRef = useRef();

    const handleClick = (event) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const newBoxPosition = intersect.point; // Get intersection point
            setBoxes((prevBoxes) => [...prevBoxes, newBoxPosition]); // Add new box position
        }
    };

    useEffect(() => {
        if (groundRef.current) {
            // Animate rotation and position with GSAP
            gsap.to(groundRef.current.rotation, {
                y: "+=6.28319", // Equivalent to Math.PI * 2 for continuous rotation
                duration: 120,
                repeat: -1,
                ease: 'linear',
            });
        }

        if (boxes.length < 1) {
            for (let i = 0; i < 1000; i++) {
                setBoxes((prevBoxes) => [...prevBoxes, {
                    x: Math.random() * window.innerWidth - window.innerWidth / 2,
                    y: Math.random() * window.innerHeight - window.innerHeight / 2,
                    z: Math.random() * window.innerWidth - window.innerWidth / 2,
                }]);

            }
        }
    }, []);

    return (
        <>
            <group
                ref={groundRef}
            >
                <Plane
                    onClick={handleClick}
                    position={[0, -0.5, 0]}
                />

                <Plane
                    onClick={handleClick}
                    rotation={[-Math.PI / 2, 0, 0]} // Flat on the ground
                    position={[0, -0.5, 0]}
                />

                {/* Render dynamically added boxes */}
                {boxes.map((position, index) => (
                    <Box
                        key={index}
                        position={[position.x, position.y, position.z]}
                        scale={[1, 1, 1]}
                    />
                ))}
            </group>
        </>
    );
}
