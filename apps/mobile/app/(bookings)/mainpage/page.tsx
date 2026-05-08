import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState('Online');
  const router = useRouter();

  const bookingData = [
    { id: '1', name: 'Shanella A. Cagulang', stars: 3 },
    { id: '2', name: 'Nadine A. Borja', stars: 3 },
    { id: '3', name: 'Althea Amor Asis', stars: 3 },
    { id: '4', name: 'Althea Amor Asis', stars: 3 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bookings</Text>
          <View style={{ width: 28 }} /> {/* Spacer to center title */}
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcomeTitle}>Welcome!</Text>
            <TouchableOpacity>
              <Text style={styles.welcomeLink}>See what's relevant today!</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 40 }}>💡</Text>
        </View>

        {/* Toggle Buttons */}
        <View style={styles.tabRow}>
          <TouchableOpacity 
            onPress={() => setActiveTab('Online')}
            style={[styles.tab, activeTab === 'Online' ? styles.tabActiveWhite : styles.tabInactive]}
          >
            <Text style={[styles.tabText, { color: activeTab === 'Online' ? '#000' : '#FFF' }]}>Online</Text>
            <View style={[styles.dot, { backgroundColor: '#4CAF50' }]} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveTab('Offline')}
            style={[styles.tab, activeTab === 'Offline' ? styles.tabActiveWhite : styles.tabInactive]}
          >
            <Text style={[styles.tabText, { color: activeTab === 'Offline' ? '#000' : '#FFF' }]}>Offline</Text>
            <View style={[styles.dot, { backgroundColor: '#FFF' }]} />
          </TouchableOpacity>
        </View>

        {/* Bookings List Card */}
        <View style={styles.whiteCard}>
          {bookingData.map((item, index) => (
            <View key={item.id}>
              <View style={styles.bookingItem}>
                <View style={styles.itemHeader}>
                  <Text style={styles.providerName}>{item.name}</Text>
                  <View style={styles.stars}>
                    {[...Array(item.stars)].map((_, i) => (
                      <Ionicons key={i} name="star" size={14} color="#FFE600" />
                    ))}
                  </View>
                </View>
                
                <Text style={styles.labelGray}>Type of Service: Cleaning</Text>
                <Text style={styles.labelBold}>Small Homes (0–50 sqm)</Text>
                <Text style={styles.description}>
                  Perfect for condos, studio units, and small apartments
                </Text>
                <TouchableOpacity onPress={() => router.push('/reviewspage/page')}>
                  <Text style={styles.reviewLink}>See Reviews</Text>
                </TouchableOpacity>
              </View>
              {index !== bookingData.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001540' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },

  welcomeCard: {
    backgroundColor: '#D1D5DB',
    borderRadius: 25,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeTitle: { fontSize: 28, fontWeight: 'bold', color: '#001540' },
  welcomeLink: { color: '#0056D2', fontSize: 14, textDecorationLine: 'underline', marginTop: 5 },

  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  tab: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: 'white' 
  },
  tabActiveWhite: { backgroundColor: 'white' },
  tabInactive: { backgroundColor: 'transparent' },
  tabText: { fontWeight: '600', marginRight: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },

  whiteCard: { backgroundColor: 'white', borderRadius: 15, padding: 20 },
  bookingItem: { marginVertical: 5 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  providerName: { color: '#001540', fontSize: 16, fontWeight: 'bold' },
  stars: { flexDirection: 'row', gap: 2 },
  labelGray: { fontSize: 12, color: '#666', marginTop: 2 },
  labelBold: { fontSize: 13, fontWeight: 'bold', color: '#000', marginVertical: 2 },
  description: { fontSize: 12, color: '#444', lineHeight: 18 },
  reviewLink: { color: '#00C853', fontSize: 12, fontWeight: 'bold', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 }
});