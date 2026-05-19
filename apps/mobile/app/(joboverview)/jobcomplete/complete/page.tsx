import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import BaseLayout from '@/components/layout/BaseLayout';

export default function IdenticalSimplified() {
  return (
    <BaseLayout scrollable={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={26} color="white" style={styles.back} />
        <Text style={styles.headerTitle}>Completed</Text>
      </View>

      <View style={styles.content}>
        <MaterialCommunityIcons name="check-decagram" size={130} color="#5df260" style={styles.mainIcon} />
        
        <Text style={styles.statusText}>Work submitted. Awaiting{"\n"}approval to release payment.</Text>

        {/* Info Grid */}
        <View style={styles.row}>
          <InfoBox icon={<FontAwesome5 name="bed" size={22} color="white" />} label="1 Bedroom" half />
          <InfoBox icon={<MaterialCommunityIcons name="bathtub-outline" size={24} color="white" />} label="1 Bathroom" half />
        </View>

        <View style={styles.card}>
          <Text style={styles.boldLabel}>Small Homes (0-50 sqm)</Text>
          <Text style={styles.mutedText}>Perfect for condos, studio units, and{"\n"}small apartments</Text>
        </View>

        <View style={[styles.card, styles.row, { justifyContent: 'space-around' }]}>
          <StatItem icon="person" label="1 Cleaner" />
          <StatItem icon="time" label="One hour" />
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </BaseLayout>
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