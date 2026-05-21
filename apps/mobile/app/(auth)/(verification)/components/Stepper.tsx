import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StepperProps {
  currentStep: number; // 1 to 5
}

const STEPS = [
  { id: 1, label: 'Info', icon: 'person' },
  { id: 2, label: 'Experience', icon: 'briefcase' },
  { id: 3, label: 'Identity', icon: 'card' },
  { id: 4, label: 'Selfie', icon: 'camera' },
  { id: 5, label: 'Review', icon: 'checkmark-circle' },
];

export default function Stepper({ currentStep }: StepperProps) {
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 380;

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        {STEPS.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isPending = step.id > currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Connector line */}
              {index > 0 && (
                <View
                  style={[
                    styles.connector,
                    {
                      backgroundColor:
                        step.id <= currentStep ? '#FACC15' : 'rgba(255, 255, 255, 0.15)',
                    },
                  ]}
                />
              )}

              {/* Step circle */}
              <View style={styles.stepWrapper}>
                <View
                  style={[
                    styles.circle,
                    isCompleted && styles.circleCompleted,
                    isActive && styles.circleActive,
                    isPending && styles.circlePending,
                  ]}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={16} color="#001449" />
                  ) : (
                    <Text
                      style={[
                        styles.circleText,
                        isActive ? styles.textActive : styles.textPending,
                      ]}
                    >
                      {step.id}
                    </Text>
                  )}
                </View>
                {!isSmallScreen && (
                  <Text
                    style={[
                      styles.label,
                      isActive && styles.labelActive,
                      isCompleted && styles.labelCompleted,
                    ]}
                  >
                    {step.label}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      {isSmallScreen && (
        <Text style={styles.mobileStepIndicator}>
          Step {currentStep} of 5: {STEPS[currentStep - 1].label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
  },
  stepWrapper: {
    alignItems: 'center',
    zIndex: 1,
  },
  connector: {
    flex: 1,
    height: 3,
    marginHorizontal: -8,
    marginTop: -16, // Align with center of the circle vertically (assuming label exists)
    borderRadius: 1.5,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  circleCompleted: {
    backgroundColor: '#DBA92E',
    borderColor: '#DBA92E',
  },
  circleActive: {
    backgroundColor: '#FACC15',
    borderColor: '#FFF',
    shadowColor: '#FACC15',
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  circlePending: {
    backgroundColor: '#0E1E45',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  circleText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  textActive: {
    color: '#001449',
  },
  textPending: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  label: {
    marginTop: 6,
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
    textAlign: 'center',
  },
  labelActive: {
    color: '#FACC15',
    fontWeight: 'bold',
  },
  labelCompleted: {
    color: '#DBA92E',
  },
  mobileStepIndicator: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
