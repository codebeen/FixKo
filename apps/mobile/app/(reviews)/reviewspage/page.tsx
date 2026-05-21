import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BaseLayout from '@/components/layout/(base-auth)/BaseLayout';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 60) / 2; // Accounting for screen padding and gap

export default function ReviewsScreen() {
  const router = useRouter();

  // Sample data for the grid
  const reviews = Array(6).fill({
    id: Math.random().toString(),
    user: 'Anonymous',
    title: 'Great employer, give tips...',
    rating: 3,
    status: 'Excellent'
  });

  interface ReviewItem {
    id: string;
    user: string;
    title: string;
    rating: number;
    status: string;
  }

  const renderReviewItem = ({ item }: { item: ReviewItem }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewerName}>{item.user}</Text>
      <Text style={styles.reviewTitle} numberOfLines={2}>{item.title}</Text>

      <View style={styles.cardFooter}>
        <View>
          <View style={styles.starRow}>
            {[1, 2, 3].map((s) => (
              <Ionicons key={s} name="star" size={12} color="#FFD700" />
            ))}
          </View>
          <Text style={styles.excellentText}>{item.status}</Text>
        </View>
        <MaterialCommunityIcons name="comment-quote" size={20} color="white" />
      </View>
    </View>
  );

  return (
    <BaseLayout scrollable={false}>
      <View style={styles.mainWrapper}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reviews</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Profile Summary Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.profileName}>Shanella A. Cagulang</Text>
          <Text style={styles.locationText}>Rodriguez Rizal, Brgy. Burgos</Text>
          <Text style={styles.recommendText}>87% Recommends this person</Text>

          <View style={styles.ratingBadgeRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingBadgeText}>5.0</Text>
            </View>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons key={s} name="star" size={14} color="#FFD700" />
              ))}
            </View>
          </View>
        </View>

        {/* Reviews Grid */}
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.gridGap}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />

        {/* Bottom Action Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => router.push('/(joboverview)/mainjoboverview/page')}
          >
            <Text style={styles.acceptButtonText}>Accept booking</Text>
          </TouchableOpacity>
        </View>

      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, paddingHorizontal: 20 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },

  profileCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#001540',
    marginBottom: 10,
  },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#001540' },
  locationText: { fontSize: 12, color: '#444', marginTop: 2 },
  recommendText: { fontSize: 10, fontStyle: 'italic', color: '#666', marginTop: 4 },

  ratingBadgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15, gap: 5 },
  ratingBadge: { backgroundColor: '#FFD700', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  ratingBadgeText: { fontSize: 10, fontWeight: 'bold' },
  starRow: { flexDirection: 'row', gap: 2 },

  // Grid Styles
  gridGap: { justifyContent: 'space-between', marginBottom: 15 },
  reviewCard: {
    width: COLUMN_WIDTH,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 15,
    padding: 12,
  },
  reviewerName: { color: 'white', fontSize: 11, fontStyle: 'italic' },
  reviewTitle: { color: 'white', fontSize: 13, fontWeight: 'bold', marginVertical: 5 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 5 },
  excellentText: { color: '#FFD700', fontSize: 10, fontWeight: 'bold', marginTop: 2 },

  // Bottom Button
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  acceptButton: {
    backgroundColor: '#66EE66',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
  },
  acceptButtonText: { color: '#001540', fontSize: 16, fontWeight: 'bold' },
});