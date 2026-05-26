import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingAnimationProps {
    style?: StyleProp<ViewStyle>;
}

export default function LoadingAnimation({ style }: LoadingAnimationProps) {
    return (
        <LottieView
            source={{ uri: 'https://lottie.host/6545d3d6-29d3-4771-bb27-81a002979bb4/XdwR994Cex.lottie' }}
            autoPlay
            loop
            style={style}
        />
    );
}
