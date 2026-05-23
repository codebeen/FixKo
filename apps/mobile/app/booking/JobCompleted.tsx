import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

export default function JobCompleted() {
    const router = useRouter();
    const { 
        title, client, address, propertySize, rate, 
        example, schedule, contact, tasks, status, activeTab 
    } = useLocalSearchParams();

    const getBedAndBath = () => {
        const propStr = String(propertySize || '').toLowerCase();
        let bed = '1 Bedroom';
        let bath = '1 Bathroom';
        
        if (propStr.includes('bedroom') || propStr.includes('bed')) {
            const match = propStr.match(/(\d+)\s*(bedroom|bed)/);
            if (match) bed = `${match[1]} Bedroom`;
        }
        if (propStr.includes('bathroom') || propStr.includes('bath')) {
            const match = propStr.match(/(\d+)\s*(bathroom|bath)/);
            if (match) bath = `${match[1]} Bathroom`;
        }
        return { bed, bath };
    };
    
    const { bed, bath } = getBedAndBath();

    return (
        <BaseMain scrollable={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/home')} style={styles.back}>
                    <Ionicons name="arrow-back" size={26} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Completed</Text>
            </View>

            <View style={styles.content}>
                <MaterialCommunityIcons name="check-decagram" size={130} color="#5df260" style={styles.mainIcon} />

                <Text style={styles.statusText}>Work submitted. Awaiting{"\n"}approval to release payment.</Text>

                {/* Info Grid */}
                <View style={styles.row}>
                    <InfoBox icon={<FontAwesome5 name="bed" size={22} color="white" />} label={bed} half />
                    <InfoBox icon={<MaterialCommunityIcons name="bathtub-outline" size={24} color="white" />} label={bath} half />
                </View>

                <View style={styles.card}>
                    <Text style={styles.boldLabel}>{title ? String(title) : 'Cleaning Service'}</Text>
                    <Text style={styles.mutedText}>
                        {client ? `Provided to ${client}` : 'Perfect for condos, studio units, and small apartments'}
                    </Text>
                </View>

                <View style={[styles.card, styles.row, { justifyContent: 'space-around' }]}>
                    <StatItem icon="cash-outline" label={rate ? String(rate) : "₱ 1,500"} />
                    <StatItem icon="time-outline" label={schedule ? String(schedule) : "One hour"} />
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => router.replace('/home')}>
                    <Text style={styles.btnText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </BaseMain>
    );
}

// Internal Mini-Components to reduce JSX clutter
interface InfoBoxProps {
    icon: React.ReactNode;
    label: string;
    half?: boolean;
}

const InfoBox = ({ icon, label, half }: InfoBoxProps) => (
    <View style={[styles.card, half && { width: '48%', height: 90 }]}>
        {icon}
        <Text style={[styles.whiteText, { marginTop: 8, fontSize: 13 }]}>{label}</Text>
    </View>
);

interface StatItemProps {
    icon: any;
    label: string;
}

const StatItem = ({ icon, label }: StatItemProps) => (
    <View style={styles.row}>
        <Ionicons name={icon} size={18} color="white" />
        <Text style={[styles.whiteText, { marginLeft: 10 }]}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20 },
    back: { position: 'absolute', left: 20 },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: '700' },
    content: { flex: 1, alignItems: 'center', paddingHorizontal: 30 },
    mainIcon: { marginTop: 30, marginBottom: 20 },
    statusText: { color: 'white', textAlign: 'center', fontSize: 16, lineHeight: 22, marginBottom: 30 },
    row: { flexDirection: 'row', alignItems: 'center' },
    card: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    boldLabel: { color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
    whiteText: { color: 'white', fontSize: 13 },
    mutedText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 18 },
    btn: {
        backgroundColor: '#5df260',
        width: '100%',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 40
    },
    btnText: { color: '#001a4d', fontWeight: 'bold', fontSize: 16 }
});