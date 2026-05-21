import React, { createContext, useContext, useState } from 'react';
import { Stack } from 'expo-router';

export interface PersonalInfoState {
  fullName: string;
  phoneNumber: string;
  email: string;
  serviceLocation: string;
  shortBio: string;
  serviceOffer: string;
}

export interface ExperienceState {
  workExperience: string;
  certification: string | null;
  imagesProof: string[];
  skipped: boolean;
}

export interface IdentityState {
  governmentId: string | null;
  nbiClearance: string | null;
}

export interface SelfieState {
  selfieWithId: string | null;
}

export interface VerificationContextType {
  personalInfo: PersonalInfoState;
  experience: ExperienceState;
  identity: IdentityState;
  selfie: SelfieState;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfoState>>;
  setExperience: React.Dispatch<React.SetStateAction<ExperienceState>>;
  setIdentity: React.Dispatch<React.SetStateAction<IdentityState>>;
  setSelfie: React.Dispatch<React.SetStateAction<SelfieState>>;
  resetForm: () => void;
}

const defaultPersonalInfo: PersonalInfoState = {
  fullName: '',
  phoneNumber: '',
  email: '',
  serviceLocation: '',
  shortBio: '',
  serviceOffer: '',
};

const defaultExperience: ExperienceState = {
  workExperience: '',
  certification: null,
  imagesProof: [],
  skipped: false,
};

const defaultIdentity: IdentityState = {
  governmentId: null,
  nbiClearance: null,
};

const defaultSelfie: SelfieState = {
  selfieWithId: null,
};

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function useVerification() {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
}

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
