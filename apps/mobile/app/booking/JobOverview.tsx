import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import BaseMain from '../../components/layout/(base-main)/BaseMain';
import BaseModal from '../../components/modal/BaseModal';

const { width } = Dimensions.get('window');

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
    const { 
        title, client, address, status, propertySize, 
        rate, example, schedule, contact, tasks, activeTab 
    } = useLocalSearchParams();

    const [successModalVisible, setSuccessModalVisible] = React.useState(false);

    const handleAcceptBooking = () => {
        setSuccessModalVisible(true);
        setTimeout(() => {
            setSuccessModalVisible(false);
            router.push({
                pathname: '/booking/StartJob',
                params: {
                    title: title || '',
                    client: client || '',
                    address: address || '',
                    propertySize: propertySize || '',
                    rate: rate || '',
                    example: example || '',
                    schedule: schedule || '',
                    contact: contact || '',
                    tasks: tasks || '',
                    status: status || '',
                    activeTab: activeTab || ''
                }
            });
        }, 1000);
    };

    // Safely parse tasks regardless of format
    const parsedTasks = React.useMemo(() => {
        if (!tasks) return [];
        if (Array.isArray(tasks)) return tasks;
        if (typeof tasks === 'string') {
            try {
                const parsed = JSON.parse(tasks);
                if (Array.isArray(parsed)) return parsed;
            } catch {
                return tasks.split(',').map(t => t.trim());
            }
        }
        return [];
    }, [tasks]);

    return (
        <BaseMain
            theme="navy"
            scrollable={true}
            contentContainerStyle={styles.scrollContent}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => router.push({ pathname: '/booking', params: { activeTab } })}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Job Overview</Text>
                <View style={{ width: 40 }} /> {/* Keeps title centered */}
            </View>

            {/* Client Section */}
            {client && (
                <View style={styles.clientSection}>
                    <View style={styles.clientInfo}>
                        <Text style={styles.clientLabel}>CLIENT</Text>
                        <Text style={styles.clientName}>{client}</Text>
                    </View>
                </View>
            )}

            {/* Main Info Card */}
            <View style={styles.outlineCard}>
                {title && <InfoItem icon="vacuum" text={`Service: ${title}`} isBold={true} />}
                {address && <InfoItem icon="location-on" text={`Location: ${address}`} iconFamily={MaterialIcons} />}
                {propertySize && <InfoItem icon="arrow-expand-all" text={`Property Size: ${propertySize}`} />}
                {rate && <InfoItem icon="currency-php" text={`Rate: ${rate}`} />}
                
                {/* Auto-calculated Total Row */}
                <InfoItem icon="calculator" text="Estimated Total: (auto-calculated)" />
                {example && <Text style={styles.exampleText}>{`Example: ${example}`}</Text>}
                
                {schedule && <InfoItem icon="clock-outline" text={`Schedule: ${schedule}`} />}
                {contact && <InfoItem icon="phone" text={`Contact: ${contact}`} />}
                {status && <InfoItem icon="information-outline" text={`Status: ${status}`} />}
            </View>

            {/* Task Container List Section */}
            {parsedTasks.length > 0 && (
                <View style={styles.taskContainer}>
                    <Text style={styles.containerLabel}>Available Tasks</Text>
                    <View style={styles.listContainer}>
                        {parsedTasks.map((task, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.listItem,
                                    index === parsedTasks.length - 1 && { borderBottomWidth: 0 }
                                ]}
                            >
                                <Text style={styles.listItemText}>{task}</Text>
                                <Ionicons name="radio-button-on" size={16} color="rgba(255,255,255,0.4)" />
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Map Section */}
            <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
                    <Ionicons name="location" size={24} color="#66EE66" style={styles.mapPin} />
                    <Text style={styles.mapLabel}>Map Preview</Text>
                </View>
            </View>

            {/* Footer Action Button */}
            {status !== 'completed' && (
                <TouchableOpacity
                    style={styles.arrivedBtn}
                    onPress={handleAcceptBooking}
                    activeOpacity={0.8}
                >
                    <Text style={styles.btnText}>Accept Booking</Text>
                </TouchableOpacity>
            )}

            {/* Success Sileo Alert Modal */}
            <BaseModal
                visible={successModalVisible}
                onClose={() => setSuccessModalVisible(false)}
                cardStyle={styles.sileoCard}
                overlayStyle={styles.sileoOverlay}
            >
                <View style={styles.sileoContent}>
                    <View style={styles.sileoBadge}>
                        <Ionicons name="checkmark" size={24} color="#66EE66" />
                    </View>
                    <View style={styles.sileoTextContainer}>
                        <Text style={styles.sileoTitle}>Booking Accepted!</Text>
                        <Text style={styles.sileoDescription}>
                            You have successfully accepted the booking. Let's get started!
                        </Text>
                    </View>
                </View>
            </BaseModal>
        </BaseMain>
    );
}

const styles = StyleSheet.create({
    scrollContent: { 
        paddingHorizontal: 20, 
        paddingBottom: 40,
        alignItems: 'center' // Standardizes center alignment for responsive kids
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 25,
        width: '100%'
    },
    backButton: {
        padding: 5
    },
    headerTitle: { 
        color: 'white', 
        fontSize: 22, 
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
    },

    clientSection: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clientInfo: {
        flex: 1,
    },
    clientLabel: {
        color: '#66EE66',
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    clientName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    messageButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    outlineCard: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.03)'
    },

    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
    infoIcon: { width: 30 },
    infoText: { color: 'white', fontSize: 14, flex: 1 },
    boldText: { fontWeight: 'bold', fontSize: 15 },
    exampleText: { color: '#CCC', fontSize: 12, marginLeft: 30, marginBottom: 12, marginTop: -8 },

    taskContainer: {
        width: '100%',
        marginVertical: 15,
    },
    containerLabel: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    listContainer: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        overflow: 'hidden',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    listItemText: {
        color: 'white',
        fontSize: 14,
        flex: 1,
        marginRight: 10
    },

    mapContainer: {
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        height: 180,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)'
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: '#1E2D4A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPin: { marginBottom: 8 },
    mapLabel: { color: 'white', opacity: 0.5, fontSize: 13 },

    // Fixed & Responsive Button Styling matching Screenshot 2026-05-23 155940.png
    arrivedBtn: {
        backgroundColor: '#66EE66',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: width > 500 ? '60%' : '85%', // Scaled perfectly down for mobile and looks smart on tablets
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        marginTop: 10
    },
    btnText: { color: '#001540', fontWeight: 'bold', fontSize: 16 },

    // Sileo Toast Alert Styles
    sileoOverlay: {
        justifyContent: 'flex-start', // Position vertically at the top
        alignItems: 'flex-end', // Position horizontally on the right side
        paddingTop: 60, // Clear status bar
        paddingRight: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    sileoCard: {
        backgroundColor: '#07183B', // Beautiful dark navy matching the app card background
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        width: 320,
        maxWidth: '100%',
        paddingHorizontal: 20,
        paddingVertical: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 10,
    },
    sileoContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sileoBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(102, 238, 102, 0.15)', // Circular translucent success-green badge
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    sileoTextContainer: {
        flex: 1,
    },
    sileoTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.3,
    },
    sileoDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 12,
        marginTop: 2,
        lineHeight: 17,
    },
});