import { Canvas } from "@react-three/fiber";
import Box from "./components/Box";
import {
    OrbitControls,
    PerspectiveCamera,
    View,
    Grid,
} from "@react-three/drei";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import "./App.css";
import { Scene } from "three";
import Stars from "./components/Stars";
import Accel from "./components/Accel";
import CustomCamera from "./components/CustomCamera";

function App() {
    const cameraRef = useRef()
    // const container = useRef();
    // const controlsRef = useRef();

    // useFrame(() => {
    //     if (controlsRef.current) {
    //         let x = controlsRef.current.target.x;
    //         let y = controlsRef.current.target.y;
    //         let z = controlsRef.current.target.z;

    //         console.log([x, y, z]);
    //     }
    // });

    return (
        <Canvas>
            <CustomCamera />
            <color attach={"background"} args={["black"]} />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
            />
            <group></group>
            <Stars />
            {/* <Grid
                position={[0, -0.05, 0]}
                cellSize={0.01}
                cellThickness={1}
                cellColor={"pink"}
            /> */}
            <OrbitControls
                // minDistance={0}
                // maxDistance={0.001}
                onUpdate={() => {
                    console.log('update')
                    console.log(cameraRef.current?.rotation)
                }}
            />
        </Canvas>
    );
}

export default App;
