import React, { useMemo, useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import p5 from 'p5';

export default function Computer({ position, rotation }) {
    const computerRef = useRef();
    const { nodes, materials } = useGLTF('/computer.glb');
    const canvasRef = useRef(document.createElement('canvas'));
    const textureRef = useRef(new THREE.CanvasTexture(canvasRef.current));

    useEffect(() => {
        // Set canvas dimensions
        const canvas = canvasRef.current;
        canvas.width = 512;
        canvas.height = 512;

        // Create a p5 sketch
        new p5((p) => {
            p.setup = () => {
                p.createCanvas(canvas.width, canvas.height).parent(canvas);
                p.noLoop();
                p.redraw(); // Force the initial draw
            };

            p.draw = () => {
                p.background(255);
                p.fill(255);
                p.textSize(32);
                p.textAlign(p.CENTER, p.CENTER);
                p.text('Hello, p5.js!', p.width / 2, p.height / 2);

                // Update the texture after p5 rendering is complete
                textureRef.current.needsUpdate = true;
            };
        });
    }, []); // Run only once

    return (
        <group position={position} rotation={rotation} dispose={null} ref={computerRef}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.monitor.geometry}
                material={materials.Beige}
                position={[0.551, 0, -0.551]}
                scale={[0.728, 1, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.screen.geometry}
                position={[0.551, 0, -0.592]}
                scale={[0.942, 0.612, 0.776]}
            >
                <meshStandardMaterial map={textureRef.current} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.keyboard.geometry}
                material={materials.Beige}
                position={[0.551, -1.256, 1.143]}
                scale={[0.498, 0.099, 1]}
            />
        </group>
    );
}

useGLTF.preload('/computer.glb');
