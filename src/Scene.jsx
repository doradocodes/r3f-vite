import {useEffect, useRef, useState} from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Star from "./Star.jsx";



export default function Scene({ wishes = [], setShowText, setTextContent }) {
    const [stars, setStars] = useState([]); // Array to store box positions
    const { scene, camera } = useThree();
    const groupRef = useRef();

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
            setStars((prevBoxes) => [...prevBoxes, newBoxPosition]); // Add new box position
        }
    };

    useEffect(() => {
        for (let i = 0; i < wishes.length; i++) {
            // const pos = {
            //     x: getRandomInt(-125, 125),
            //     y: getRandomInt(-125, 125),
            //     z: getRandomInt(-125, 125),
            // };
            setStars((prevBoxes) => [...prevBoxes, {
                position: [
                    wishes[i].position.x,
                    wishes[i].position.y,
                    wishes[i].position.z
                ],
                content: wishes[i].content,
            }]);

        }
    }, [wishes]);

    return (
        <>
            <group
                ref={groupRef}
            >
                {/*<Plane*/}
                {/*    onClick={handleClick}*/}
                {/*    position={[0, -0.5, 0]}*/}
                {/*/>*/}

                {/*<Plane*/}
                {/*    onClick={handleClick}*/}
                {/*    rotation={[-Math.PI / 2, 0, 0]} // Flat on the ground*/}
                {/*    position={[0, -0.5, 0]}*/}
                {/*/>*/}

                {/* Render dynamically added boxes */}
                {stars.map((star, index) => (
                    <Star
                        setShowText={setShowText}
                        setTextContent={() => setTextContent(star.content)}
                        key={index}
                        position={star.position}
                        scale={[1, 1, 1]}
                    />
                ))}

                {/*<Star*/}
                {/*    setShowText={setShowText}*/}
                {/*    position={[0,0,-10]}*/}
                {/*    // scale={[1, 1, 1]}*/}
                {/*    color={'orange'}*/}
                {/*/>*/}
            </group>
        </>
    );
}
