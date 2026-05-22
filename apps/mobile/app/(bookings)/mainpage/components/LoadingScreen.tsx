import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
// 1. Import the correct Native Lottie package
import LottieView from 'lottie-react-native'; 

export default function LoadingScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(bookings)/mainpage/WorkerSelectionPage');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            
            {/* 2. Use LottieView instead of DotLottieReact */}
            {/* <LottieView
                source={{ uri: "https://lottie.host/d7c9f416-faeb-48d2-b70d-ef5a135bcf46/WW87zwFQke.lottie" }}
                autoPlay
                loop
                style={styles.lottieAnim}
            /> */}

            <LottieView
                source={{ uri: "https://lottie.host/6545d3d6-29d3-4771-bb27-81a002979bb4/XdwR994Cex.lottie" }}
                autoPlay
                loop
                style={styles.lottieAnim}
            />

            <Text style={styles.loadingText}>Finding available workers...</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001851', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieAnim: {
        width: 250,
        height: 250,
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    }
});