import React from 'react';
import { ScrollView } from 'react-native';
import BackButton from '@/components/ui/back-button';
import SectionHeader from '@/components/ui/section-header';
import ClientSearchBar from './ClientSearchBar';
import ClientSectionLabel from './ClientSectionLabel';
import ServiceTierSelector from './ServiceTierSelector';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

const CLEANING_TIERS = [
  {
    title: 'Small Homes (0–50 sqm)',
    description: 'Perfect for condos, studio units, and small apartments',
    rate: '₱25–₱35 per sqm',
  },
  {
    title: 'Medium Homes (51–120 sqm)',
    description: 'Ideal for standard apartments and small family houses',
    rate: '₱30–₱45 per sqm',
  },
  {
    title: 'Large Homes (121–250 sqm)',
    description: 'Best for bigger family homes with multiple rooms',
    rate: '₱40–₱60 per sqm',
  },
];

export default function CleaningServiceView() {
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
          title="Variations for Cleaning Services"
          subtitle="Flexible pricing based on home size—bigger spaces, more time and effort."
        />
        <ServiceTierSelector tiers={CLEANING_TIERS} />
      </ScrollView>
    </BaseMain>
  );
}
