import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseLayout from '@/components/layout/BaseLayout';
import { useVerification } from './_layout';
import Stepper from './components/Stepper';

const logo = require('../../../assets/logo_fixko.png');

export default function ReviewScreen() {
  const router = useRouter();
  const { personalInfo, experience, identity, selfie, resetForm } = useVerification();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    // Perform final submit action (e.g. upload to server)
    setShowSuccessModal(true);
  };

  const handleFinish = () => {
    setShowSuccessModal(false);
    resetForm();
    // Redirect to main workspace/dashboard
    router.replace('/(main)/mainpage/page' as any);
  };

  return (
    <BaseLayout align="center">
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Stepper progress */}
        <Stepper currentStep={5} />

        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>Review Application</Text>
          <Text style={styles.subtitle}>
            Please review all details before submitting your worker application.
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollSection}>
          {/* 1. Personal Information */}
          <View style={styles.reviewCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="person-outline" size={18} color="#DBA92E" />
              <Text style={styles.cardTitle}>Personal Information</Text>
            </View>
            <View style={styles.detailsList}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Full Name</Text>
                <Text style={styles.detailValue}>{personalInfo.fullName || 'Not provided'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Phone Number</Text>
                <Text style={styles.detailValue}>{personalInfo.phoneNumber || 'Not provided'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Email Address</Text>
                <Text style={styles.detailValue}>{personalInfo.email || 'Not provided'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Service Location</Text>
                <Text style={styles.detailValue}>{personalInfo.serviceLocation || 'Not provided'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Service Offer</Text>
                <Text style={styles.detailValue}>{personalInfo.serviceOffer || 'Not provided'}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Short Bio</Text>
                <Text style={styles.detailValueText}>{personalInfo.shortBio || 'Not provided'}</Text>
              </View>
            </View>
          </View>

          {/* 2. Experience Details */}
          <View style={styles.reviewCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="briefcase-outline" size={18} color="#DBA92E" />
              <Text style={styles.cardTitle}>Experience & Qualifications</Text>
            </View>
            {experience.skipped ? (
              <Text style={styles.skippedText}>Skipped for now</Text>
            ) : (
              <View style={styles.detailsList}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Experience Description</Text>
                  <Text style={styles.detailValueText}>{experience.workExperience || 'Not provided'}</Text>
                </View>
                {experience.certification && (
                  <View style={styles.documentRow}>
                    <Ionicons name="document-text-outline" size={18} color="#7EB1F1" />
                    <Text style={styles.documentLabel}>Certification uploaded</Text>
                  </View>
                )}
                {experience.imagesProof && experience.imagesProof.length > 0 && (
                  <View style={styles.proofContainer}>
                    <Text style={styles.detailLabel}>Proof of Work ({experience.imagesProof.length} photos)</Text>
                    <View style={styles.proofGrid}>
                      {experience.imagesProof.map((uri, idx) => (
                        <Image key={idx} source={{ uri }} style={styles.proofThumbnail} />
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* 3. Identity Verification */}
          <View style={styles.reviewCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="card-outline" size={18} color="#DBA92E" />
              <Text style={styles.cardTitle}>Uploaded ID Verification</Text>
            </View>
            <View style={styles.docsGrid}>
              <View style={styles.docCol}>
                <Text style={styles.docLabel}>Government ID</Text>
                {identity.governmentId ? (
                  <Image source={{ uri: identity.governmentId }} style={styles.docThumbnail} />
                ) : (
                  <View style={styles.noDoc}>
                    <Text style={styles.noDocText}>Missing</Text>
                  </View>
                )}
              </View>
              <View style={styles.docCol}>
                <Text style={styles.docLabel}>NBI Clearance</Text>
                {identity.nbiClearance ? (
                  <Image source={{ uri: identity.nbiClearance }} style={styles.docThumbnail} />
                ) : (
                  <View style={styles.noDoc}>
                    <Text style={styles.noDocText}>Missing</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* 4. Selfie Biometric Verification */}
          <View style={styles.reviewCard}>
            <View style={styles.cardHeader}>
              <Ionicons name="camera-outline" size={18} color="#DBA92E" />
              <Text style={styles.cardTitle}>Facial Verification</Text>
            </View>
            <View style={styles.selfieRow}>
              {selfie.selfieWithId ? (
                <Image source={{ uri: selfie.selfieWithId }} style={styles.selfieThumbnail} />
              ) : (
                <View style={[styles.selfieThumbnail, styles.noDoc]}>
                  <Text style={styles.noDocText}>Missing</Text>
                </View>
              )}
              <View style={styles.selfieStatus}>
                <View style={styles.statusBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                  <Text style={styles.statusBadgeText}>Biometric Match Done</Text>
                </View>
                <Text style={styles.selfieStatusDesc}>
                  Your selfie matched the identity card with an automated verification confidence level of 98.4%.
                </Text>
              </View>
            </View>
          </View>

          {/* Guidelines disclaimer */}
          <View style={styles.disclaimerBox}>
            <Ionicons name="information-circle-outline" size={18} color="#7EB1F1" style={styles.infoIcon} />
            <Text style={styles.disclaimerText}>
              By submitting, you agree that all provided documents and information are yours and are true and accurate. FixKo PH will verify documents for security.
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/(auth)/(verification)/SelfieWithID' as any)}
          >
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit Application</Text>
          </TouchableOpacity>
        </View>

        {/* Success Congratulations Modal */}
        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          onRequestClose={handleFinish}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.successModalCard}>
              <View style={styles.congratsCircle}>
                <Ionicons name="ribbon-outline" size={48} color="#DBA92E" />
              </View>
              <Text style={styles.congratsTitle}>Verification Under Review!</Text>
              <Text style={styles.congratsDesc}>
                Excellent work! Your worker verification profile has been submitted successfully to the FixKo admin team.
              </Text>
              <Text style={styles.congratsSubdesc}>
                We will review your documents and verify your credentials within 24 to 48 hours. You will receive an SMS and email notification once approved!
              </Text>

              <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
                <Text style={styles.finishBtnText}>Go to Dashboard</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: -10,
  },
  logo: {
    width: 180,
    height: 90,
    resizeMode: 'contain',
  },
  content: {
    width: '100%',
    maxWidth: 340,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 18,
  },
  scrollSection: {
    maxHeight: 460,
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: '#FFF',
  },
  detailsList: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'column',
    gap: 2,
  },
  detailLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.45)',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 13.5,
    color: '#FFF',
    fontWeight: '500',
  },
  detailValueText: {
    fontSize: 13,
    color: '#DDD',
    lineHeight: 17,
  },
  skippedText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.4)',
    fontStyle: 'italic',
  },
  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginTop: 4,
  },
  documentLabel: {
    fontSize: 12.5,
    color: '#FFF',
    fontWeight: '500',
  },
  proofContainer: {
    marginTop: 4,
  },
  proofGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  proofThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  docsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  docCol: {
    flex: 1,
    gap: 6,
  },
  docLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  docThumbnail: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    resizeMode: 'cover',
  },
  noDoc: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDocText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selfieRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  selfieThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  selfieStatus: {
    flex: 1,
    gap: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 11,
    alignSelf: 'flex-start',
  },
  statusBadgeText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: 'bold',
  },
  selfieStatusDesc: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    lineHeight: 15,
  },
  disclaimerBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'rgba(126, 177, 241, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(126, 177, 241, 0.15)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  infoIcon: {
    marginTop: 1,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 15,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 40,
    gap: 12,
  },
  backBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  submitBtn: {
    flex: 2,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#DBA92E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DBA92E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  submitBtnText: {
    color: '#001449',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successModalCard: {
    backgroundColor: '#07183B',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    shadowColor: '#DBA92E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
  },
  congratsCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(219, 169, 46, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#DBA92E',
  },
  congratsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  congratsDesc: {
    fontSize: 13.5,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 12,
    fontWeight: '600',
  },
  congratsSubdesc: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.55)',
    textAlign: 'center',
    lineHeight: 17,
    marginBottom: 24,
  },
  finishBtn: {
    backgroundColor: '#7EB1F1',
    width: '100%',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7EB1F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  finishBtnText: {
    color: '#001449',
    fontSize: 14.5,
    fontWeight: 'bold',
  },
});
