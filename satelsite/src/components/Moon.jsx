import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { TextureLoader } from "three";

function Moon(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef();
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.y += delta));
    
    const loader = useLoader(TextureLoader, '/moonmap1k.jpg')
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
        >
            <icosahedronGeometry args={[.5, 2]} />
            <meshStandardMaterial  flatShading={false} map={loader} />
        </mesh>
    );
}

export default Moon;
