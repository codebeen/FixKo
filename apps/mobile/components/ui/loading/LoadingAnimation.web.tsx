import React from 'react';
import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native';

interface LoadingAnimationProps {
    style?: StyleProp<ViewStyle>;
}

export default function LoadingAnimation({ style }: LoadingAnimationProps) {
    return (
        <View style={[style, { alignItems: 'center', justifyContent: 'center' }]}>
            <ActivityIndicator size="large" color="#F5C518" />
        </View>
    );
}
