import React from 'react';
import { View, Text } from 'react-native';

interface ClientSectionLabelProps {
  title: string;
  subtitle?: string;
}

export default function ClientSectionLabel({ title, subtitle }: ClientSectionLabelProps) {
  return (
    <View className="mb-4">
      <Text className="text-brand-yellow text-sm font-bold uppercase tracking-wider">{title}</Text>
      {subtitle && <Text className="text-white/60 text-xs mt-1 leading-4">{subtitle}</Text>}
    </View>
  );
}
