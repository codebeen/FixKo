import React from 'react';
import { View, Text } from 'react-native';

type TopBarProps = {
  title: string;
  rightElement?: React.ReactNode;
};

export default function TabTopBar({ title, rightElement }: TopBarProps) {
  return (
      <View className="flex-row items-center justify-between px-6 py-4 mb-5">
          <Text className="text-white text-2xl font-bold">{title}</Text>
          {rightElement}
      </View>
  );
}
