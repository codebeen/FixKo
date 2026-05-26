import React, { createContext, useContext } from 'react';

export interface PersonalInfoState {
  fullName: string;
  phoneNumber: string;
  email: string;
  serviceLocation: string;
  shortBio: string;
  serviceOffer: string[];
  sex: string;
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

export const defaultPersonalInfo: PersonalInfoState = {
  fullName: '',
  phoneNumber: '',
  email: '',
  serviceLocation: '',
  shortBio: '',
  serviceOffer: [],
  sex: '',
};

export const defaultExperience: ExperienceState = {
  workExperience: '',
  certification: null,
  imagesProof: [],
  skipped: false,
};

export const defaultIdentity: IdentityState = {
  governmentId: null,
  nbiClearance: null,
};

export const defaultSelfie: SelfieState = {
  selfieWithId: null,
};

export const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function useVerification() {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
}
