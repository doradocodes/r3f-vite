import './App.css'
import {Canvas} from "@react-three/fiber";
import Scene from "./Scene.jsx";
import {Suspense, useEffect, useRef} from "react";
import p5 from "p5";


function App() {
    const sketchRef = useRef();

    // add p5 sketch to sketchRef
    // useEffect(() => {
    //     new p5((p) => {
    //         let video;
    //
    //         p.setup = () => {
    //             p.createCanvas(window.innerWidth, window.innerHeight).parent(sketchRef.current);
    //
    //             video = p.createCapture(p.VIDEO);
    //             video.size(p.width, p.height);
    //             video.hide();
    //         };
    //
    //         p.draw = () => {
    //             p.background(0);
    //             p.fill(0, 200, 0);
    //             let gridSize = 20;
    //             video.loadPixels();
    //             for (let y = 0; y < video.height; y += gridSize) {
    //                 for (let x = 0; x < video.width; x += gridSize) {
    //                     let index = (x + y * video.width) * 4;
    //                     let r = video.pixels[index];
    //                     if (r > 50) {
    //                         p.text(' ', x, y)
    //                     } else {
    //                         p.text('1', x, y)
    //                     }
    //                 }
    //             }
    //         };
    //     });
    // }, []);

    return (
        <>
            <Canvas
                style={{width: '100vw', height: '100vh', backgroundColor: 'black'}}
            >
                <Suspense fallback={null}>
                    <Scene sketchRef={sketchRef}/>
                </Suspense>
            </Canvas>
            <div className="sketch" ref={sketchRef}></div>
        </>
    )
}

export default App
