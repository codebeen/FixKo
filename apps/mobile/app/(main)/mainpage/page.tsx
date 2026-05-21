import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '../../../components/layout/(base-main)/BaseMain';

// --- Reusable UI Pieces ---

const StatusTab = ({ label, color, isActive, onPress, textColor, tabType }: { label: string; color: string; isActive: boolean; onPress: () => void; textColor: string; tabType: 'Online' | 'Offline' }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tab, isActive ? { backgroundColor: tabType === 'Offline' ? 'white' : '#001851' } : null]}
  >
    <Text style={[styles.tabText, { color: textColor }]}>{label}</Text>
    <View style={[styles.dot, { backgroundColor: color }]} />
  </TouchableOpacity>
);

const ServiceEntry = ({ name, description }: { name: string; description: string }) => (
  <View style={styles.entry}>
    <View style={styles.rowBetween}>
      <Text style={styles.boldNavy}>{name}</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4].map(i => <Ionicons key={i} name="star" size={12} color="#FBC02D" />)}
      </View>
    </View>
    <Text style={styles.smallGray}>Type of Service: Cleaning</Text>
    <Text style={styles.smallBold}>Small Homes (0-50 sqm)</Text>
    <Text style={styles.descText}>{description}</Text>
    <TouchableOpacity><Text style={styles.greenLink}>See Reviews</Text></TouchableOpacity>
  </View>
);

// --- Main Screen ---

export default function App() {
  const [activeTab, setActiveTab] = useState('Online');
  const router = useRouter();

  return (
    <BaseMain>
      <View style={[styles.rowBetween, { marginBottom: 30 }]}>
        <MaterialCommunityIcons name="view-grid" size={30} color="white" />
        <Text style={styles.header}>Home</Text>
        <Ionicons name="notifications" size={26} color="white" />
      </View>

      <Text style={styles.greeting}>Hi, Darben!</Text>
      <Text style={styles.subGreeting}>Goodmorning</Text>

      <View style={styles.welcomeBox}>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.smallGray}>See what's relevant today!</Text>
        </View>
        <Text style={{ fontSize: 40 }}>💡</Text>
      </View>

      <View style={[styles.row, { marginBottom: 20 }]}>
        <StatusTab
          label="Online" color="#4CAF50" textColor={activeTab === 'Online' ? 'white' : '#999'}
          isActive={activeTab === 'Online'} onPress={() => setActiveTab('Online')} tabType="Online"
        />
        <StatusTab
          label="Offline" color="black" textColor={activeTab === 'Offline' ? 'black' : '#999'}
          isActive={activeTab === 'Offline'} onPress={() => setActiveTab('Offline')} tabType="Offline"
        />
      </View>

      <View style={styles.whiteCard}>
        <ServiceEntry name="Shanella A. Cagulang" description="Perfect for condos, studio units, and small apartments" />
        <View style={styles.hr} />
        <ServiceEntry name="Nadine A. Borja" description="Perfect for condos, studio units, and small apartments" />
      </View>

      <TouchableOpacity style={styles.blueBtn} onPress={() => router.push('/(bookings)/mainpage/page')}>
        <Text style={styles.blueBtnText}>See more</Text>
      </TouchableOpacity>

    </BaseMain>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  header: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  greeting: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  subGreeting: { color: '#AAB8C2', fontSize: 18, marginBottom: 20 },
  welcomeBox: { backgroundColor: '#D1D5DB', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: '#001540' },
  tab: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: 'white' },
  tabText: { fontWeight: '600', marginRight: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  whiteCard: { backgroundColor: 'white', borderRadius: 15, padding: 15 },
  entry: { marginVertical: 5 },
  boldNavy: { color: '#001540', fontWeight: 'bold', fontSize: 15 },
  smallGray: { fontSize: 12, color: '#666' },
  smallBold: { fontSize: 13, fontWeight: 'bold', color: '#001540', marginVertical: 2 },
  descText: { fontSize: 12, color: '#666', lineHeight: 16 },
  greenLink: { color: '#4CAF50', fontSize: 12, fontWeight: 'bold', marginTop: 4 },
  hr: { height: 1, backgroundColor: '#EEE', marginVertical: 12 },
  blueBtn: { backgroundColor: '#8AB4F8', padding: 12, borderRadius: 20, width: 140, alignSelf: 'center', alignItems: 'center', marginTop: 20 },
  blueBtnText: { color: '#001540', fontWeight: 'bold' }
});