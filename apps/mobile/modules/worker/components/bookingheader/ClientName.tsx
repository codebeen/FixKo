import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface ClientNameProps {
  disableMessage?: boolean;
}

export default function ClientName({ disableMessage = false }: ClientNameProps) {
  const { client, title } = useLocalSearchParams();

  if (!client) return null;

  return (
    <View className="w-full mb-5 bg-white/8 rounded-xl p-4 border border-white/15 flex-row justify-between items-center">
      <View className="flex-1">
        <Text className="text-[#66EE66] text-[11px] font-bold tracking-[1.5px] mb-1">
          CLIENT
        </Text>
        <Text className="text-white text-[22px] font-bold">
          {client}
        </Text>
      </View>

      {!disableMessage && (
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-11 h-11 rounded-full bg-black/75 justify-center items-center"
          onPress={() => router.push({
            pathname: '/booking/Chat',
            params: { client: String(client), title: String(title || '') },
          })}
        >
          <MaterialIcons
            name="message"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

