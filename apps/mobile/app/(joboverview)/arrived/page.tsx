import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Reusable component for the job details
interface JobDetailProps {
  icon: string;
  text: string;
  isBold?: boolean;
  iconFamily?: any;
}

const JobDetail = ({ icon, text, isBold = false, iconFamily: IconFam = MaterialCommunityIcons }: JobDetailProps) => (
  <View style={styles.detailRow}>
    <IconFam name={icon} size={20} color="#333" style={styles.detailIcon} />
    <Text style={[styles.detailText, isBold && styles.boldText]}>{text}</Text>
  </View>
);

export default function JobUploadScreen() {
  const router = useRouter();

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

        {/* Outer Container Frame */}
        <View style={styles.outerFrame}>
          
          {/* Summary Card */}
          <View style={styles.whiteCard}>
            <JobDetail icon="vacuum" text="Service: House Cleaning" isBold={true} />
            <JobDetail icon="location-on" text="Location: (with map pin)" isBold={false} iconFamily={MaterialIcons as any} />
            <JobDetail icon="arrow-expand-all" text="Property Size: Small Home (0–50 sqm)" isBold={false} />
            <JobDetail icon="currency-php" text="Rate: ₱25–₱35 per sqm" isBold={false} />
            
            <View style={styles.calcBox}>
              <Text style={styles.calcLabel}>Estimated Total: (auto-calculated)</Text>
              <Text style={styles.calcExample}>Example: 40 sqm × ₱30 = ₱1,200</Text>
            </View>

            <JobDetail icon="clock-outline" text="Schedule: Date & Time" isBold={false} />
            <JobDetail icon="account-outline" text="Client Name: Shanella A. Cagulang" isBold={false} />

            <TouchableOpacity
              style={styles.startBtn} onPress={() => router.push('/(joboverview)/timer/page')}>
              <Text style={styles.startBtnText}>Start Job</Text>
            </TouchableOpacity>
          </View>

          {/* Upload Section */}
          <View style={styles.uploadSection}>
            <Text style={styles.uploadTitle}>Upload Photos to Start Job</Text>
            
            <TouchableOpacity style={styles.uploadPlaceholder}>
              <MaterialCommunityIcons name="image-plus" size={50} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>Upload</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#001540' 
  },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 25,
  },
  headerTitle: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  outerFrame: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 15,
    minHeight: 600,
  },
  whiteCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  detailRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  detailIcon: { 
    width: 30 
  },
  detailText: { 
    fontSize: 14, 
    color: '#333' 
  },
  boldText: { 
    fontWeight: 'bold' 
  },
  calcBox: { 
    marginLeft: 30, 
    marginBottom: 10 
  },
  calcLabel: { 
    fontSize: 13, 
    color: '#333' 
  },
  calcExample: { 
    fontSize: 12, 
    color: '#666' 
  },
  startBtn: {
    backgroundColor: '#66EE66',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  startBtnText: { 
    color: '#001540', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  uploadSection: {
    alignItems: 'center',
  },
  uploadTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  uploadPlaceholder: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadBtn: {
    backgroundColor: 'white',
    width: '80%',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  uploadBtnText: { 
    color: '#001540', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});