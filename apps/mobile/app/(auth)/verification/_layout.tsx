import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { 
  VerificationContext, 
  defaultPersonalInfo, 
  defaultExperience, 
  defaultIdentity, 
  defaultSelfie,
  PersonalInfoState,
  ExperienceState,
  IdentityState,
  SelfieState
} from '@/modules/auth';

export default function VerificationLayout() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoState>(defaultPersonalInfo);
  const [experience, setExperience] = useState<ExperienceState>(defaultExperience);
  const [identity, setIdentity] = useState<IdentityState>(defaultIdentity);
  const [selfie, setSelfie] = useState<SelfieState>(defaultSelfie);

  const resetForm = () => {
    setPersonalInfo(defaultPersonalInfo);
    setExperience(defaultExperience);
    setIdentity(defaultIdentity);
    setSelfie(defaultSelfie);
  };

  return (
    <VerificationContext.Provider
      value={{
        personalInfo,
        experience,
        identity,
        selfie,
        setPersonalInfo,
        setExperience,
        setIdentity,
        setSelfie,
        resetForm,
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PersonalInfo" />
        <Stack.Screen name="Experience" />
        <Stack.Screen name="IdentityVerification" />
        <Stack.Screen name="SelfieWithID" />
        <Stack.Screen name="Review" />
      </Stack>
    </VerificationContext.Provider>
  );
}
