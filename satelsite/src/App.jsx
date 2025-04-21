import { Canvas } from "@react-three/fiber";
import Box from "./components/Box";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import { useRef } from "react";
import "./App.css";
import { Scene } from "three";
import Stars from "./components/Stars";
import Accel from "./components/Accel";

function App() {
    const container = useRef();
    return (
        <div ref={container} className="container">
            <Accel />
            {/* <View
                index={1}
                style={{

                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <PerspectiveCamera position={[0, 0, 10]} makeDefault camera={{
                  far: 100000
                }}/>
                <color attach={"background"} args={["black"]} />
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <group>
                  
                </group>
                <Earth />
                <Moon position={[3, 0, 0]} />
                <Stars />
                <OrbitControls />
            </View> */}
            {/* <View
                index={1}
                style={{

                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <PerspectiveCamera position={[0, 0, 10]} makeDefault/>
                <color attach={"background"} args={["black"]} />
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <Earth />
                <OrbitControls />
            </View> */}

            {/* <Canvas eventSource={document.getElementById("root")} className="canvas">
                <View.Port />
            </Canvas> */}
        </div>
    );
}

export default App;
