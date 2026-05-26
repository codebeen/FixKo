import React from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ClientSearchBar() {
  return (
    <View className="flex-row items-center bg-white/8 border border-white/15 rounded-xl px-3 h-11 mb-5">
      <Ionicons name="search" size={18} color="rgba(255,255,255,0.6)" style={{ marginRight: 6 }} />
      <TextInput
        className="flex-1 text-white text-sm"
        placeholder="Search services..."
        placeholderTextColor="rgba(255,255,255,0.4)"
        style={{ outlineStyle: 'none' } as any}
      />
    </View>
  );
}
