import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from 'expo-router';
import BaseMain from '../../components/layout/(base-main)/BaseMain';

// Reusable component for the overview list items
interface InfoItemProps {
    icon: string;
    text: string;
    isBold?: boolean;
    iconFamily?: any;
}

const InfoItem = ({ icon, text, isBold = false, iconFamily: IconFam = MaterialCommunityIcons }: InfoItemProps) => (
    <View style={styles.infoRow}>
        <IconFam name={icon} size={20} color="white" style={styles.infoIcon} />
        <Text style={[styles.infoText, isBold && styles.boldText]}>{text}</Text>
    </View>
);

export default function JobOverview() {
    const { title, client, address, status, price, propertySize, rate, example, schedule, contact, tasks, activeTab } = useLocalSearchParams();
    const [selectedTask, setSelectedTask] = React.useState('');
return (
        <BaseMain
            theme="navy"
            scrollable={true}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push({ pathname: '/booking', params: { activeTab } })}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Job Overview</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Main Info Card */}
            <View style={styles.outlineCard}>
                <InfoItem icon="vacuum" text={title ? `Service: ${title}` : 'Service'} isBold={true} />
                <InfoItem icon="location-on" text={address ? `Location: ${address}` : 'Location'} isBold={false} iconFamily={MaterialIcons} />
                <InfoItem icon="arrow-expand-all" text={propertySize ? `Property Size: ${propertySize}` : ''} isBold={false} />
                <InfoItem icon="currency-php" text={rate ? `Rate: ${rate}` : ''} isBold={false} />
                <InfoItem icon="calculator" text="Estimated Total: (auto-calculated)" isBold={false} />
                <Text style={styles.exampleText}>{example ? `Example: ${example}` : ''}</Text>
                <InfoItem icon="clock-outline" text={schedule ? `Schedule: ${schedule}` : ''} isBold={false} />
                <InfoItem icon="phone" text={contact ? `Contact: ${contact}` : ''} isBold={false} />
                <InfoItem icon="information-outline" text={status ? `Status: ${status}` : ''} isBold={false} />
            </View>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                {/* For real implementation, use <MapView /> from react-native-maps */}
                <View style={styles.mapPlaceholder}>
                    <Ionicons name="location" size={0} color="#800000" style={styles.mapPin} />
                    <Text style={styles.mapLabel}>Map Preview</Text>
                </View>
            </View>
            {/* Task Dropdown */}
            {Array.isArray(tasks) && (
                <View style={styles.taskDropdown}>
                    <Picker
                        selectedValue={selectedTask}
                        onValueChange={(itemValue) => setSelectedTask(itemValue)}
                        style={{ color: 'white' }}
                    >
                        <Picker.Item label="Select Task" value="" />
                        {tasks.map((t, i) => (
                            <Picker.Item label={t} value={t} key={i} />
                        ))}
                    </Picker>
                </View>
            )}
            {/* Footer Action */}
            {status !== 'completed' && (
                <TouchableOpacity
                    style={styles.arrivedBtn}
                    onPress={() => router.push('/booking/StartJob')}
                >
                    <Text style={styles.btnText}>Accept Booking</Text>
                </TouchableOpacity>
            )}
        </BaseMain>
    );
}

const styles = StyleSheet.create({
    scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 25
    },
    headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },

    // Cards
    outlineCard: {
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
    },

    // Info Items
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    infoIcon: { width: 30 },
    infoText: { color: 'white', fontSize: 13 },
    boldText: { fontWeight: 'bold' },
    exampleText: { color: '#CCC', fontSize: 12, marginLeft: 30, marginBottom: 10, marginTop: -8 },

    // Buttons
    updateStatusBtn: {
        backgroundColor: '#66EE66',
        borderRadius: 25,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    taskDropdown: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    arrivedBtn: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: '#66EE66',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        width: '90%',
    },
    btnText: { color: '#001540', fontWeight: 'bold', fontSize: 16 },

    // Horizontal Actions
    actionRow: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
    outlineBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    outlineBtnText: { color: 'white', fontSize: 13 },
    whiteBtn: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    whiteBtnText: { color: '#001540', fontSize: 13, fontWeight: '600' },

    // Map
    mapContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        height: 250,
        marginBottom: 10,
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: '#2A3B5F', // Dark placeholder
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPin: { position: 'absolute', top: '40%' },
    mapLabel: { color: 'white', opacity: 0.5, marginTop: 50 }
});