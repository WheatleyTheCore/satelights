import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Magnetometer, Accelerometer } from "expo-sensors";

export default function HomeScreen() {
    // const [magData, setMagData] = useState('');
    // const [{ accx, accy, accz }, setAccData] = useState({
    //     accx: 0,
    //     accy: 0,
    //     accz: 0,
    // });

    const [magSubscription, setMagSubscription] = useState(null);
    const [accSubscription, setAccSubscription] = useState(null);
    const [isWsOpen, setIsWsOpen] = useState(false);
    const [sensorData, setSensorData] = useState();

    const magDataRef = useRef([""]);
    const accDataRef = useRef([""]);
    const wsRef = useRef();
    const intervalRef = useRef();

    const _slow = () => {
        Accelerometer.setUpdateInterval(1000);
        Magnetometer.setUpdateInterval(1000);
    };
    const _fast = () => {
        Accelerometer.setUpdateInterval(16);
        Magnetometer.setUpdateInterval(16);
    };

    const _subscribe = () => {
        setMagSubscription(
            Magnetometer.addListener((result) => {
                magDataRef.current = [
                    result.x.toFixed(5),
                    result.y.toFixed(5),
                    result.z.toFixed(5),
                ];
            })
        );
        setAccSubscription(
            Accelerometer.addListener((result) => {
                accDataRef.current = [
                    result.x.toFixed(5),
                    result.y.toFixed(5),
                    result.z.toFixed(5),
                ];
            })
        );
    };

    const _unsubscribe = () => {
        magSubscription && magSubscription.remove();
        accSubscription && accSubscription.remove();
        setMagSubscription(null);
        setAccSubscription(null);
    };

    const connectToWs = () => {
        wsRef.current = new WebSocket("ws://192.168.1.25:9999");
        wsRef.current.onopen = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setIsWsOpen(true);
            intervalRef.current = setInterval(() => {
                sendData(wsRef.current);
                setSensorData(
                    JSON.stringify({
                        acc: accDataRef.current,
                        mag: magDataRef.current,
                    })
                );
            }, 25);
        };

        wsRef.current.onclose = () => {
            setIsWsOpen(false);
            clearInterval(intervalRef.current);
            setTimeout(function () {
                connectToWs();
            }, 1000);
        };

        wsRef.current.onerror = () => {
            setIsWsOpen(false);
            clearInterval(intervalRef.current);
            setTimeout(function () {
                connectToWs();
            }, 1000);
        };
    };

    const sendData = () => {
        wsRef.current.send(
            JSON.stringify({
                acc: accDataRef.current,
                mag: magDataRef.current,
            })
        );
    };

    const vecToAscDec = (accl) => {
        let [x, y, z] = accl
        const ra = Math.atan2(y, x).toFixed(5);
        const dec =
            (Math.PI / 2 - Math.atan2(z, Math.sqrt(x * x + y * y + z * z))).toFixed(5);
        // may need to remove the pi/2
        return { ra, dec };
    };

    const magAngle = (mag) => {
        let [x, y, z] = mag
        let angle = 0;
        if (Math.atan2(y, x) >= 0) {
            angle = Math.atan2(y, x) * (180 / Math.PI);
        } else {
            angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
        }
        let unajusted =  Math.round(angle);
        let deg = unajusted - 90 >= 0
        ? unajusted - 90
        : unajusted + 271;

        return (Math.PI - deg * Math.PI/180).toFixed(7)
    };

    // useEffect(() => {
    //     magDataRef.current = JSON.stringify([magx, magy, magz]);
    // }, [magx, magy, magz]);

    // useEffect(() => {
    //     accDataRef.current = JSON.stringify([accx, accy, accz]);
    // }, [accx, accy, accz]);

    useEffect(() => {
        _subscribe();

        connectToWs();

        return () => {
            _unsubscribe();
        };
    }, []);

    if (!isWsOpen) {
        return (
            <View style={styles.container}>
                <Text>connecting to websocket...</Text>
            </View>
        );
    }

    // Accel: 0 0 1 is pointing up
    // mag: -x, -50, -7 (ish) is

    return (
        <View style={styles.container}>
            {magSubscription && accSubscription ? (
                <>
                    <Text style={styles.text}>
                        mag {JSON.stringify(magAngle(magDataRef.current))}
                    </Text>
                    <Text style={styles.text}>
                        acc {JSON.stringify(vecToAscDec(accDataRef.current))}
                    </Text>
                </>
            ) : (
                <Text>no access to sensors</Text>
            )}

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={
                        magSubscription && accSubscription
                            ? _unsubscribe
                            : _subscribe
                    }
                    style={styles.button}
                >
                    <Text>
                        {magSubscription && accSubscription ? "On" : "Off"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={_slow}
                    style={[styles.button, styles.middleButton]}
                >
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} style={styles.button}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    text: {
        textAlign: "center",
        color: "black",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "stretch",
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#ccc",
    },
});
