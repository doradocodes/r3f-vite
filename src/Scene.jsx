import { useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Box from "./Box.jsx";

export default function Scene() {
    const [boxes, setBoxes] = useState([]); // Array to store box positions
    const { scene, camera } = useThree();

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

    return (
        <>
            {/* Ground Plane for clicking */}
            <mesh
                onClick={handleClick}
                // rotation={[-Math.PI / 2, 0, 0]} // Flat on the ground
                position={[0, -0.5, 0]}
            >
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial
                    color="lightgray"
                    opacity={0} // Adjust transparency level
                    transparent={true} // Enable transparency
                />
            </mesh>

            {/* Render dynamically added boxes */}
            {boxes.map((position, index) => (
                <Box
                    key={index}
                    position={[position.x, position.y, position.z]}
                    scale={[1, 1, 1]}
                />
            ))}
        </>
    );
}
