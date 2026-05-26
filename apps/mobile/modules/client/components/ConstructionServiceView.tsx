import React from 'react';
import { ScrollView } from 'react-native';
import BackButton from '@/components/ui/back-button';
import SectionHeader from '@/components/ui/section-header';
import ClientSearchBar from './ClientSearchBar';
import ClientSectionLabel from './ClientSectionLabel';
import ServiceTierSelector from './ServiceTierSelector';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

const CONSTRUCTION_TIERS = [
  {
    title: 'Skilled Workers (Mason, Carpenter, Painter)',
    rate: '₱700 – ₱1,200 / day',
    description: 'Includes basic labor for construction, repair, and finishing tasks',
  },
  {
    title: 'Foreman / Supervisor',
    rate: '₱1,200 – ₱2,000 / day',
    description: 'Oversees workers, manages workflow, and ensures project quality',
  },
];

export default function ConstructionServiceView() {
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
          title="Construction Services Pricing"
          subtitle="Hire skilled professionals based on your project needs—flexible and cost-efficient."
        />
        <ServiceTierSelector tiers={CONSTRUCTION_TIERS} />
      </ScrollView>
    </BaseMain>
  );
}
