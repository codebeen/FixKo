import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export type StepType = {
    id: string;
    title: string;
    time: string;
    icon: string;
    status: 'completed' | 'upcoming';
};

type BookingStepperProps = {
    steps: StepType[];
};

export default function BookingStepper({ steps }: BookingStepperProps) {
    
    const DashedLine = ({ isCompleted }: { isCompleted: boolean }) => {

        const dashes = Array.from({ length: 6 }); 
        return (
            <View style={styles.dashContainer}>
                {dashes.map((_, i) => (
                    <View 
                        key={i} 
                        style={[
                            styles.dashDot, 
                            isCompleted ? styles.dashCompleted : styles.dashUpcoming
                        ]} 
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const isCompleted = step.status === 'completed';

                return (
                    <View key={step.id} style={styles.stepRow}>
                        
                        {/* Left Column: Icon and Line */}
                        <View style={styles.iconColumn}>
                            {/* Icon Circle */}
                            <View style={[
                                styles.circle, 
                                isCompleted ? styles.circleCompleted : styles.circleUpcoming
                            ]}>
                                <FontAwesome5 
                                    name={step.icon} 
                                    size={16} 
                                    // Uses the new brand color when upcoming
                                    color={isCompleted ? 'white' : '#001851'} 
                                />
                            </View>

                            {/* Bullet-proof Dashed Line */}
                            {!isLast && <DashedLine isCompleted={isCompleted} />}
                        </View>

                        {/* Right Column: Text */}
                        <View style={styles.textColumn}>
                            <Text style={styles.title}>{step.title}</Text>
                            <Text style={styles.time}>{step.time}</Text>
                        </View>

                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    stepRow: {
        flexDirection: 'row',
    },

    iconColumn: {
        alignItems: 'center',
        marginRight: 16,
        width: 44, 
    },

    circle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    circleCompleted: {
        backgroundColor: '#001851', 
    },
    
    circleUpcoming: {
        backgroundColor: '#F3F4F6', 
    },
    
    // --- Custom Dash Line Styles ---
    dashContainer: {
        height: 35, 
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 4,
    },

    dashDot: {
        width: 2, 
        height: 4, 
        borderRadius: 1, 
    },

    dashCompleted: {
        backgroundColor: '#001851', 
    },

    dashUpcoming: {
        backgroundColor: '#D1D5DB', 
    },


    textColumn: {
        flex: 1,
        paddingTop: 4, 
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#111827', 
        marginBottom: 2,
    },

    time: {
        fontSize: 13,
        color: '#9CA3AF',
    },
    
});