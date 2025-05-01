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

    const magDataRef = useRef("");
    const accDataRef = useState("");
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
                magDataRef.current = [result.x.toFixed(5), result.y.toFixed(5), result.z.toFixed(5)];
            })
        );
        setAccSubscription(
            Accelerometer.addListener(
                (result) =>
                    (accDataRef.current = [result.x.toFixed(5), result.y.toFixed(5), result.z.toFixed(5)])
            )
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

    return (
        <View style={styles.container}>
            {magSubscription && accSubscription ? (
                <>
                    <Text style={styles.text}>Magnetometer:</Text>
                    <Text style={styles.text}>magx: {magDataRef.current[0] || ''}</Text>
                    <Text style={styles.text}>magy: {magDataRef.current[1] || ''}</Text>
                    <Text style={styles.text}>magz: {magDataRef.current[2] || ''}</Text>
                    <Text style={styles.text}>Accelerometer:</Text>
                    <Text style={styles.text}>accx: {accDataRef.current[0] || ''}</Text>
                    <Text style={styles.text}>accy: {accDataRef.current[1] || ''}</Text>
                    <Text style={styles.text}>accz: {accDataRef.current[2] || ''}</Text>
                </>
            ) : (
                <></>
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
        color: 'black'
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
