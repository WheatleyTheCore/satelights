import { useEffect, useState } from "react";

const Accel = () => {
    const [permission, setPermission] = useState(false);
    const [motion, setMotion] = useState();
    const [orientation, setOrientation] = useState();
    // const [x, setX] = useState();
    // const [y, setY] = useState();
    // const [z, setZ] = useState();

    // useEffect(() => {
    //     let acl = new Accelerometer({ frequency: 60 });
    //     let [perm, setPerm] = useState(false)
    //     acl.addEventListener("reading", () => {
    //         setX(acl.x);
    //         setY(acl.y);
    //         setZ(acl.z);
    //     });

    //     acl.start();

    // }, []);

    const handleGrantPermissions = (e) => {
        e.preventDefault();

        // Request permission for iOS 13+ devices
        if (
            DeviceMotionEvent &&
            typeof DeviceMotionEvent.requestPermission === "function"
        ) {
            DeviceMotionEvent.requestPermission();
        }

        window.addEventListener("devicemotion", handleMotion);
        window.addEventListener("deviceorientationabsolute", handleOrientation);
    };

    const handleOrientation = (event) => {
        setOrientation(JSON.stringify(event.alpha))
    }
    const handleMotion = (event) => {
        setMotion(JSON.stringify(event))
    }

    return (
        <div>
            <div> orientation: {JSON.stringify(orientation)}</div>
            <div> motion: {JSON.stringify(motion)}</div>
            <button onClick={(event) => handleGrantPermissions(event)}>
                grant permissions
            </button>
        </div>
    );
};

export default Accel;
