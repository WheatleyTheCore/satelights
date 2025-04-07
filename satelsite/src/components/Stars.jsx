import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { TextureLoader } from "three";
import Papa from "papaparse";

function Stars(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef();
    const [starData, setStarData] = useState();

    useEffect(() => {
        Papa.parse("/hygdata_filtered.csv", {
            download: "true",
            header: true,
            complete: (data) => setStarData(data.data),
        });
    }, []);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.y += delta));

    console.log(starData);
    // Return view, these are regular three.js elements expressed in JSX

    if (!starData) return <></>

    return (
        <>
            {starData.map((star) => {
                return (
                    <mesh position={[star.x, star.y, star.z].map(i => i * 10)} ref={meshRef}>
                        <boxGeometry />
                        <meshStandardMaterial color={"white"} />
                    </mesh>
                );
            })}
        </>
    );
}

export default Stars;
