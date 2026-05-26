import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StepperProps {
  currentStep: number; // 1 to 5
}

const STEPS = [
  { label: 'Personal Info', icon: 'person-outline' },
  { label: 'Experience', icon: 'briefcase-outline' },
  { label: 'Identity', icon: 'card-outline' },
  { label: 'Selfie', icon: 'camera-outline' },
  { label: 'Review', icon: 'clipboard-outline' },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <View className="w-full mb-5">
      <View className="flex-row items-center justify-between w-full">
        {STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <React.Fragment key={index}>
              <View className="items-center">
                <View
                  className={`w-8 h-8 rounded-full justify-center items-center border-2 ${
                    isCompleted
                      ? 'bg-brand-yellow-gold border-brand-yellow-gold'
                      : isActive
                      ? 'bg-brand-blue border-brand-blue'
                      : 'bg-transparent border-white/20'
                  }`}
                >
                  {isCompleted ? (
                    <Ionicons name="checkmark" size={16} color="#001449" />
                  ) : (
                    <Text
                      className={`text-[11px] font-bold ${
                        isActive ? 'text-brand-navy' : 'text-white/30'
                      }`}
                    >
                      {stepNum}
                    </Text>
                  )}
                </View>
              </View>

              {index < STEPS.length - 1 && (
                <View
                  className={`flex-1 h-[2px] mx-1 ${
                    stepNum < currentStep ? 'bg-brand-yellow-gold' : 'bg-white/10'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      <View className="flex-row items-center justify-between mt-1.5 px-0">
        {STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <View key={index} className="items-center" style={{ width: 50 }}>
              <Text
                className={`text-[9px] font-semibold text-center leading-[12px] ${
                  isActive
                    ? 'text-brand-blue'
                    : isCompleted
                    ? 'text-brand-yellow-gold'
                    : 'text-white/25'
                }`}
                numberOfLines={2}
              >
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
