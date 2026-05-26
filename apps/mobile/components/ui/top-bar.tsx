import React from 'react';
import { View, Text } from 'react-native';
import BackButton from './back-button';

type TopBarProps = {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
};

export default function TopBar({ title, onBack, rightElement }: TopBarProps) {
  return (
    <View className="flex-row items-center justify-between px-6 py-4 mb-5 border-b border-white/10">
      <BackButton onPress={onBack} />
      <Text className="text-white text-lg font-bold">{title}</Text>
      <View className="w-6">{rightElement}</View>
    </View>
  );
}
