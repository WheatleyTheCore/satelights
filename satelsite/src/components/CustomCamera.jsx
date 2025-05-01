import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import useWebSocket, { ReadyState } from "react-use-websocket";

function CustomCamera() {
    const controlsRef = useRef();
    const count = useRef(0);

    const { sendMessage, lastMessage, readyState } = useWebSocket(
        "ws://localhost:9999"
    );
    useFrame(() => {
        console.log(readyState)
        if (readyState == ReadyState.OPEN) {
            count.current = count.current + 1;
            if (controlsRef.current && count.current > 20) {
                console.log(controlsRef.current.rotation);
                sendMessage(JSON.stringify({acc: [controlsRef.current.rotation.z * -2, controlsRef.current.rotation.y * 2, controlsRef.current.rotation.x * -2]}))
                count.current = 0;
            }
        }
    });

    return (
        <>
            <PerspectiveCamera
                position={[0, 0, 11]}
                makeDefault
                camera={{
                    far: 100000,
                    near: 0.001,
                }}
                ref={controlsRef}
            />
        </>
    );
}

export default CustomCamera;
