import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


export type TierType = {
    title: string;
    description: string;
    rate: string;
};


type TierSelectorProps = {
    tiers: TierType[];
    onSelectTier?: (selectedTierTitle: string) => void; 
};

export default function TierSelector({ tiers, onSelectTier }: TierSelectorProps) {
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const router = useRouter();

    const handleSelect = (title: string) => {
        setSelectedTier(title);
        
        if (onSelectTier) {
            onSelectTier(title); 
        }

        // Delay the push slightly so the user can actually see the card turn blue/glassy before the screen changes!
        setTimeout(() => {
            router.push('/(bookings)/mainpage/BookingPage'); // Put your exact route here
        }, 150); 
    };

    

    return (
        <View style={styles.container}>
            {tiers.map((tier) => {
                const isSelected = selectedTier === tier.title;

                return (
                    <TouchableOpacity
                        key={tier.title}
                        activeOpacity={0.8}
                        onPress={() => handleSelect(tier.title)}
                        style={[
                            styles.card,
                            isSelected && styles.cardSelected
                        ]}
                    >
                        <Text style={[
                            styles.cardTitle,
                            isSelected && styles.textSelected
                        ]}>
                            {tier.title}
                        </Text>
                        
                        <Text style={[
                            styles.cardDescription,
                            isSelected && styles.textSelected
                        ]}>
                            {tier.description}
                        </Text>
                        
                        <Text style={[
                            styles.cardRate,
                            isSelected && styles.rateSelected
                        ]}>
                            {tier.rate}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 20, 
    },

    card: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    cardSelected: {
        backgroundColor: '#eff3fc',
        borderColor: '#083ca2',
        borderWidth: 2,
    },

    cardTitle: {
        color: '#111827',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    cardDescription: {
        color: '#4B5563',
        lineHeight: 20,
        fontSize: 14,
    },

    cardRate: {
        color: '#0037B7',
        fontWeight: 'bold',
        marginTop: 8,
        fontSize: 15,
    },

    textSelected: {
        color: '#083ca2', 
    },

    rateSelected: {
        color: '#0037B7',
    },
});