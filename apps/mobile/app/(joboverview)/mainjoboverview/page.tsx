import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

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

export default function JobOverviewScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Overview</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Main Info Card */}
        <View style={styles.outlineCard}>
          <InfoItem icon="vacuum" text="Service: House Cleaning" isBold={true} />
          <InfoItem icon="location-on" text="Location: (with map pin)" isBold={false} iconFamily={MaterialIcons} />
          <InfoItem icon="arrow-expand-all" text="Property Size: Small Home (0-50 sqm)" isBold={false} />
          <InfoItem icon="currency-php" text="Rate: ₱25-₱35 per sqm" isBold={false} />
          <InfoItem icon="calculator" text="Estimated Total: (auto-calculated)" isBold={false} />
          <Text style={styles.exampleText}>Example: 40 sqm × ₱30 = ₱1,200</Text>
          <InfoItem icon="clock-outline" text="Schedule: Date & Time" isBold={false} />
          <InfoItem icon="account-outline" text="Client Name: Shanella A. Cagulang" isBold={false} />

          <TouchableOpacity style={styles.updateStatusBtn}>
            <Text style={styles.btnText}>Update Status</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons Container */}
        <View style={[styles.outlineCard, styles.actionRow]}>
          <TouchableOpacity style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Contact Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.whiteBtn}>
            <Text style={styles.whiteBtnText}>View Details</Text>
          </TouchableOpacity>
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          {/* For real implementation, use <MapView /> from react-native-maps */}
          <View style={styles.mapPlaceholder}>
             <Ionicons name="location" size={40} color="#800000" style={styles.mapPin} />
             <Text style={styles.mapLabel}>Map Preview</Text>
          </View>
        </View>

        {/* Footer Action */}
        <TouchableOpacity style={styles.arrivedBtn} onPress={() => router.push('/(joboverview)/arrived/page')}>
          <Text style={styles.btnText}>Arrived</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001540' },
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
  arrivedBtn: {
    backgroundColor: '#66EE66',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
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
    height: 200,
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