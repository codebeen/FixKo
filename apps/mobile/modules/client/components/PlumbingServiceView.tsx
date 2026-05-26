import React from 'react';
import { ScrollView } from 'react-native';
import BackButton from '@/components/ui/back-button';
import SectionHeader from '@/components/ui/section-header';
import ClientSearchBar from './ClientSearchBar';
import ClientSectionLabel from './ClientSectionLabel';
import ServiceTierSelector from './ServiceTierSelector';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

const PLUMBING_TIERS = [
  {
    title: 'Faucet Installation',
    rate: '₱300 – ₱700',
    description: 'Includes basic installation and leak check',
  },
  {
    title: 'Toilet Installation',
    rate: '₱800 – ₱1,500',
    description: 'Covers setup, sealing, and functionality testing',
  },
  {
    title: 'Sink Installation',
    rate: '₱500 – ₱1,200',
    description: 'Includes mounting and pipe connection',
  },
  {
    title: 'Shower Installation',
    rate: '₱700 – ₱1,500',
    description: 'Includes fixture setup and water flow testing',
  },
];

export default function PlumbingServiceView() {
  return (
    <BaseMain>
      <BackButton />
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader
          title="Explore our Services"
          subtitle="Whether it's a quick repair or a full home service, FixKo connects you to trusted workers in just a few taps."
        />
        <ClientSearchBar />
        <ClientSectionLabel
          title="Plumbing Services (Per Fixture Pricing)"
          subtitle="Simple, transparent pricing—pay only for what you need."
        />
        <ServiceTierSelector tiers={PLUMBING_TIERS} />
      </ScrollView>
    </BaseMain>
  );
}
