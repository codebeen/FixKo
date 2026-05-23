import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BaseMain from '../../components/layout/(base-main)/BaseMain';
import bookings from '../data/Bookings.json';

const s = (size: number) => Math.round(size * Dimensions.get('window').width / 375);

type Booking = {
  id: string;
  title: string;
  client?: string;
  name?: string;
  address?: string;
  status: string;
  price: number;
  tasks?: string[];
  rate?: string;
  example?: string;
  schedule?: string;
  contact?: string;
};

export default function Booking() {
  const { activeTab: incomingTab } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState(incomingTab ?? 'Active schedule');
  const router = useRouter();

  const bookingData: Booking[] = bookings as Booking[];

  const getStatusStyle = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === 'pending') {
      return { bg: '#FFF3E0', text: '#E65100', label: 'Pending' };
    }
    if (lower === 'completed') {
      return { bg: '#E8F5E9', text: '#2E7D32', label: 'Completed' };
    }
    return { bg: '#FFF9C4', text: '#F59E0B', label: status };
  };

  const pendingCount = bookingData.filter(b => b.status === 'pending').length;

  return (
    <BaseMain>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push({ pathname: '/booking', params: { activeTab } })}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tab Row */}
      <View style={styles.tabRow}>
        {['Incoming request', 'Active schedule', 'Completed'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                isActive ? styles.tabActiveWhite : styles.tabInactive,
              ]}
            >
              <Text style={[styles.tabText, isActive ? styles.tabTextActive : styles.tabTextInactive]}>
                {tab}{tab === 'Incoming request' && pendingCount > 0 ? ` (${pendingCount})` : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Booking List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {bookingData
          .filter(item => {
            if (activeTab === 'Active schedule') {
              return item.status !== 'pending' && item.status !== 'completed';
            } else if (activeTab === 'Incoming request') {
              return item.status === 'pending';
            } else {
              return item.status === 'completed';
            }
          })
          .map((item) => {
            const statusConfig = getStatusStyle(item.status);

            return (
              <View key={item.id} style={styles.bookingTile}>
                {/* Top Row: Client Meta & Status */}
                <View style={styles.tileHeader}>
                  <View style={styles.clientMeta}>
                    <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>
                        {(item.client || item.name || 'C').charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.tileName}>{item.client || item.name}</Text>
                      <Text style={styles.tileService}>{item.title || 'Service'}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                    <Text style={[styles.statusText, { color: statusConfig.text }]}>
                      {statusConfig.label}
                    </Text>
                  </View>
                </View>

                {/* Footer: Compressed pricing and button layout */}
                <View style={styles.tileFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Total: </Text>
                    <Text style={styles.priceText}>₱{item.price.toFixed(2)}</Text>
                  </View>

                  <TouchableOpacity style={styles.seeMoreBtn} onPress={() => { router.push({ pathname: '/booking/JobOverview', params: { id: item.id, title: item.title, client: item.client, address: item.address, status: item.status, price: item.price.toString(), propertySize: item.propertySize, rate: item.rate, example: item.example, schedule: item.schedule, contact: item.contact, tasks: item.tasks, activeTab: activeTab } }); }}>
                    <Text style={styles.seeMoreText}>Details</Text>
                    <Ionicons name="chevron-forward" size={11} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </BaseMain>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: s(16), paddingTop: s(10), paddingBottom: s(40) },

  /* Header Styles */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: s(16),
    paddingHorizontal: 16,
  },
  backButton: {
    width: s(36),
    height: s(36),
    borderRadius: s(18),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { color: 'white', fontSize: s(20), fontWeight: '700', letterSpacing: -0.5 },

  /* Tab Bar Styles */
  tabRow: { flexDirection: 'row', gap: s(8), marginBottom: s(16), paddingHorizontal: s(16) },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: s(8),
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabActiveWhite: { backgroundColor: 'white', borderColor: 'white' },
  tabInactive: { backgroundColor: 'transparent' },
  tabText: { fontSize: 12, fontWeight: '600' },
  tabTextActive: { color: '#001540' },
  tabTextInactive: { color: 'rgba(255, 255, 255, 0.8)' },

  /* Condensed Card Components */
  bookingTile: {
    backgroundColor: 'white',
    borderRadius: s(8),
    padding: s(10),
    marginBottom: s(8),
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: s(4),
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F2F5'
  },
  tileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: s(6),
  },
  clientMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    flex: 1,
  },
  avatarPlaceholder: {
    width: s(24),
    height: s(24),
    borderRadius: s(12),
    backgroundColor: '#F0F2F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: s(10),
    fontWeight: '700',
    color: '#0056D2',
  },
  tileName: { fontSize: s(12), fontWeight: '700', color: '#001540', letterSpacing: -0.3 },
  tileService: { fontSize: s(11), fontWeight: '500', color: '#64748B', marginTop: 1 },

  statusBadge: {
    paddingHorizontal: s(8),
    paddingVertical: s(2),
    borderRadius: s(8),
  },
  statusText: { fontSize: s(10), fontWeight: '700', letterSpacing: 0.1 },

  /* Card Footer Styling */
  tileFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: s(6),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline', // Align text elements cleanly by baseline
  },
  priceLabel: {
    fontSize: s(10),
    color: '#94A3B8',
    fontWeight: '500',
  },
  priceText: {
    fontSize: s(12),
    fontWeight: '700',
    color: '#0F172A',
  },
  seeMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#0056D2',
    paddingHorizontal: s(10),
    paddingVertical: s(4),
    borderRadius: s(12),
  },
  seeMoreText: { color: 'white', fontSize: 11, fontWeight: '600' },
});