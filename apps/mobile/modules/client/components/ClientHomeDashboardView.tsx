import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  route: string;
}

interface BestService {
  id: string;
  title: string;
  price: string;
  oldPrice: string;
  reviews: string;
  provider: string;
  image: string;
  route: string;
}

const categories: ServiceCategory[] = [
  { id: '1', name: 'Carpenter', icon: 'hammer', color: '#DBA92E', route: '/(client)/services/variation/ConstructionServicePage' },
  { id: '2', name: 'Cleaner', icon: 'broom', color: '#7EB1F1', route: '/(client)/services/variation/CleaningServicePage' },
  { id: '3', name: 'Painter', icon: 'paint-roller', color: '#4ade80', route: '/(client)/services/variation/ConstructionServicePage' },
  { id: '4', name: 'Electrician', icon: 'bolt', color: '#f87171', route: '/(client)/services/variation/CleaningServicePage' },
  { id: '5', name: 'Beauty', icon: 'cut', color: '#93c5fd', route: '/(client)/services/variation/CleaningServicePage' },
  { id: '6', name: 'AC Repair', icon: 'snowflake', color: '#7EB1F1', route: '/(client)/services/variation/CleaningServicePage' },
  { id: '7', name: 'Plumber', icon: 'wrench', color: '#f87171', route: '/(client)/services/variation/PlumbingServicePage' },
  { id: '8', name: 'Salon', icon: 'user-tie', color: '#DBA92E', route: '/(client)/services/variation/CleaningServicePage' },
];

const bestServices: BestService[] = [
  {
    id: '1',
    title: 'Complete Kitchen Cleaning',
    price: 'PHP 150',
    oldPrice: 'PHP 180',
    reviews: '130 Reviews',
    provider: 'Mark Williams',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80',
    route: '/(client)/services/variation/CleaningServicePage',
  },
  {
    id: '2',
    title: 'Window Deep Cleaning',
    price: 'PHP 80',
    oldPrice: 'PHP 110',
    reviews: '98 Reviews',
    provider: 'Jocelyn Reyes',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=500&q=80',
    route: '/(client)/services/variation/CleaningServicePage',
  },
  {
    id: '3',
    title: 'Living Room Cleaning',
    price: 'PHP 200',
    oldPrice: 'PHP 230',
    reviews: '240 Reviews',
    provider: 'Ronald Mark',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80',
    route: '/(client)/services/variation/CleaningServicePage',
  },
  {
    id: '4',
    title: 'AC Service and Cleaning',
    price: 'PHP 50',
    oldPrice: 'PHP 120',
    reviews: '86 Reviews',
    provider: 'Joel Santos',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80',
    route: '/(client)/services/variation/CleaningServicePage',
  },
];

export default function ClientHomeDashboardView() {
  const router = useRouter();

  return (
    <BaseMain>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 76 }} className="flex-1 px-5 pt-4">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-brand-grey-light text-xs font-semibold uppercase tracking-wider">Welcome Back</Text>
            <Text className="text-white text-2xl font-bold mt-0.5">Hi, Darben!</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="location" size={12} color="#DBA92E" />
              <Text className="text-[#AAB8C2] text-xs font-semibold ml-1">Rodriguez, Rizal</Text>
            </View>
          </View>
          <TouchableOpacity
            className="w-10 h-10 bg-white/5 border border-white/10 rounded-full justify-center items-center"
            onPress={() => router.push('/(client)/notification' as any)}
          >
            <Ionicons name="notifications-outline" size={20} color="#fff" />
            <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-yellow-gold rounded-full" />
          </TouchableOpacity>
        </View>

        <View className="bg-white/5 border border-white/15 rounded-3xl p-5 mb-6 flex-row items-center">
          <View className="flex-1 mr-4">
            <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider">Summer Promo</Text>
            <Text className="text-white text-lg font-extrabold mt-1">Get 15% off Cleaners!</Text>
            <Text className="text-brand-grey-light text-[11px] mt-1 leading-4">
              Book professional home cleaners today. Use code <Text className="font-bold text-white">FIXKOSUMMER</Text>.
            </Text>
          </View>
          <View className="w-14 h-14 rounded-2xl bg-brand-yellow-gold/20 items-center justify-center">
            <FontAwesome5 name="broom" size={26} color="#DBA92E" />
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-4 px-1">
          <Text className="text-white text-base font-extrabold">Find Services</Text>
          <TouchableOpacity onPress={() => router.push('/(client)/(tabs)/explore' as any)}>
            <Text className="text-brand-blue text-xs font-bold">See All</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between mb-7">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => router.push(cat.route as any)}
              className="w-[23%] mb-4 items-center"
              activeOpacity={0.8}
            >
              <View className="w-full aspect-square rounded-2xl bg-white/95 border border-white/20 justify-center items-center shadow-sm">
                <FontAwesome5 name={cat.icon as any} size={22} color={cat.color} />
              </View>
              <Text className="text-white text-[10px] font-semibold mt-1.5 text-center" numberOfLines={1}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row justify-between items-center mb-4 px-1">
          <Text className="text-white text-base font-extrabold">Best Services</Text>
          <TouchableOpacity onPress={() => router.push('/(client)/(tabs)/explore' as any)}>
            <Text className="text-brand-blue text-xs font-bold">See All</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {bestServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              className="w-[48%] bg-white rounded-lg overflow-hidden mb-4 shadow-sm"
              activeOpacity={0.85}
              onPress={() => router.push(service.route as any)}
            >
              <Image source={{ uri: service.image }} className="w-full h-[96px]" resizeMode="cover" />
              <View className="p-2.5">
                <View className="flex-row items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={11} color="#DBA92E" />
                  ))}
                  <Text className="text-[#64748B] text-[9px] ml-1">({service.reviews})</Text>
                </View>
                <Text className="text-[#111827] text-xs font-extrabold leading-4" numberOfLines={2}>
                  {service.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-[#111827] text-xs font-bold">{service.price}</Text>
                  <Text className="text-[#94A3B8] text-[10px] line-through ml-1">{service.oldPrice}</Text>
                </View>
                <View className="flex-row items-center justify-between mt-3">
                  <View className="flex-row items-center flex-1 mr-2">
                    <View className="w-7 h-7 rounded-full bg-[#E6EEFD] items-center justify-center mr-1.5">
                      <FontAwesome5 name="user-alt" size={11} color="#12357F" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[#111827] text-[10px] font-bold" numberOfLines={1}>
                        {service.provider}
                      </Text>
                      <Text className="text-[#64748B] text-[8px]" numberOfLines={1}>Service Provider</Text>
                    </View>
                  </View>
                  <View className="bg-brand-blue rounded-md px-3 py-2">
                    <Text className="text-white text-[10px] font-bold">Add</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </BaseMain>
  );
}
