import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StepperProps {
  currentStep: number; // 1 to 5
}

const STEPS = [
  { label: 'Arrived',      shortLabel: 'Arrived',   icon: 'location'              },
  { label: 'Job Setup',    shortLabel: 'Setup',      icon: 'construct'             },
  { label: 'In Progress',  shortLabel: 'Progress',   icon: 'timer'                 },
  { label: 'Upload Proof', shortLabel: 'Upload',     icon: 'cloud-upload'          },
  { label: 'Payment',      shortLabel: 'Pay',      icon: 'card'               },
];

export default function Stepper({ currentStep }: StepperProps) {
  const clampedStep = Math.max(1, Math.min(currentStep, STEPS.length));

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 10,
        marginBottom: 20,
      }}
    >
      {/* Step row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {STEPS.map((step, index) => {
          const stepNumber  = index + 1;
          const isCompleted = stepNumber < clampedStep;
          const isActive    = stepNumber === clampedStep;
          const isUpcoming  = stepNumber > clampedStep;

          return (
            <React.Fragment key={index}>
              {/* Circle */}
              <View style={{ alignItems: 'center', width: 48 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isCompleted
                      ? '#66EE66'
                      : isActive
                      ? 'transparent'
                      : 'rgba(255,255,255,0.08)',
                    borderWidth: isActive ? 2 : 0,
                    borderColor: isActive ? '#66EE66' : 'transparent',
                    // Glow effect on active
                    shadowColor: isActive ? '#66EE66' : 'transparent',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: isActive ? 0.8 : 0,
                    shadowRadius: isActive ? 6 : 0,
                    elevation: isActive ? 4 : 0,
                  }}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={18} color="#001540" />
                  ) : (
                    <Ionicons
                      name={step.icon as any}
                      size={16}
                      color={isActive ? '#66EE66' : 'rgba(255,255,255,0.3)'}
                    />
                  )}
                </View>

                {/* Label */}
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 9,
                    fontWeight: isActive ? '700' : '400',
                    color: isCompleted
                      ? '#66EE66'
                      : isActive
                      ? '#ffffff'
                      : 'rgba(255,255,255,0.35)',
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                >
                  {step.shortLabel}
                </Text>
              </View>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <View
                  style={{
                    flex: 1,
                    height: 2,
                    marginBottom: 16,
                    backgroundColor: isCompleted ? '#66EE66' : 'rgba(255,255,255,0.12)',
                    borderRadius: 1,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Active step badge */}
      <View
        style={{
          marginTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: 'rgba(102,238,102,0.1)',
          borderWidth: 1,
          borderColor: 'rgba(102,238,102,0.2)',
          borderRadius: 999,
          paddingHorizontal: 12,
          paddingVertical: 4,
        }}
      >
        <Ionicons
          name={STEPS[clampedStep - 1].icon as any}
          size={13}
          color="#66EE66"
          style={{ marginRight: 5 }}
        />
        <Text
          style={{
            color: '#66EE66',
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 0.5,
          }}
        >
          STEP {clampedStep} OF {STEPS.length} — {STEPS[clampedStep - 1].label.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
