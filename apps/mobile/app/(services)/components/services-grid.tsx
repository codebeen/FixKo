import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export type ServiceItem = {
    icon: string;
    label: string;
    route: any;
};


type ServicesGridProps = {
    services: ServiceItem[];
};

export default function ServicesGrid({ services }: ServicesGridProps) {
    const router = useRouter();

    const half = Math.ceil(services.length / 2);
    const leftServices = services.slice(0, half);
    const rightServices = services.slice(half);

    const renderServiceBox = ({ icon, label, route }: ServiceItem) => (
        <TouchableOpacity
            key={label}
            activeOpacity={0.7}
            onPress={() => router.push(route)}
            style={styles.servicesBoxWrapper}
        >
            <LinearGradient
                colors={['#f6f8fa', '#E8EEF8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.servicesBox}
            >
                <FontAwesome5 name={icon} size={46} color="#001851" />
                <Text style={styles.servicesText}>{label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.servicesContainer}>
            <View style={styles.column}>
                {leftServices.map(renderServiceBox)}
            </View>

            <View style={styles.column}>
                {rightServices.map(renderServiceBox)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    servicesContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center', 
        gap: 20,                  
        marginVertical: 16,
    },

    column: {
        width: '42%',            
        alignItems: 'center',
        gap: 10,
    },

    servicesBoxWrapper: {
        width: '100%',            
        aspectRatio: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 4,
        borderRadius: 20,
    },

    servicesBox: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: 20,
        padding: 16,
        overflow: 'hidden',
    },
    
    servicesText: {
        color: '#1a1a1a',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'left',
    },
});