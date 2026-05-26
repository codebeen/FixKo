import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import TopBar from "@/components/ui/top-bar";

export default function PaymentConfirmationView() {
    const router = useRouter();

    return (
        <BaseMain>
            <TopBar title="Payment Completed" />

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: 40,
                    alignItems: "center",
                    paddingTop: 10,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text className="text-white text-2xl font-bold text-center mt-2.5 mb-6">
                    Cleaning Services
                </Text>

                <View className="items-center justify-center mb-4 relative">
                    <FontAwesome5
                        name="certificate"
                        size={120}
                        color="#4ade80"
                    />
                    <FontAwesome5
                        name="check"
                        size={50}
                        color="#001851"
                        style={{ position: "absolute", top: 32 }}
                    />
                </View>

                <Text className="text-white text-base text-center mb-8">
                    Service Completed & Paid Successfully
                </Text>

                <View className="bg-white w-full rounded-2xl p-5 mb-10 shadow-lg">
                    <View className="flex-row gap-3 mb-3">
                        <View className="flex-1 bg-[#F3F4F6] rounded-xl py-4 items-center justify-center border border-[#E5E7EB]">
                            <FontAwesome5
                                name="bed"
                                size={24}
                                color="#001851"
                            />
                            <Text className="text-[#111827] text-[13px] font-medium mt-2">
                                1 Bedroom
                            </Text>
                        </View>
                        <View className="flex-1 bg-[#F3F4F6] rounded-xl py-4 items-center justify-center border border-[#E5E7EB]">
                            <FontAwesome5
                                name="bath"
                                size={24}
                                color="#001851"
                            />
                            <Text className="text-[#111827] text-[13px] font-medium mt-2">
                                1 Bathroom
                            </Text>
                        </View>
                    </View>

                    <View className="bg-[#F3F4F6] rounded-xl p-4 mb-3 border border-[#E5E7EB]">
                        <Text className="text-[#111827] text-sm font-bold mb-1">
                            Small Homes (0–50 sqm)
                        </Text>
                        <Text className="text-[#4B5563] text-xs leading-[18px]">
                            Perfect for condos, studio units, and small
                            apartments
                        </Text>
                    </View>

                    <View className="flex-row bg-[#F3F4F6] rounded-xl p-4 items-center justify-center border border-[#E5E7EB]">
                        <View className="flex-row items-center gap-2">
                            <FontAwesome5
                                name="user"
                                solid
                                size={14}
                                color="#4B5563"
                            />
                            <Text className="text-[#111827] text-[13px] font-medium">
                                1 Cleaner
                            </Text>
                        </View>

                        <View className="w-1 h-1 rounded-full bg-[#9CA3AF] mx-4" />

                        <View className="flex-row items-center gap-2">
                            <FontAwesome5
                                name="clock"
                                solid
                                size={14}
                                color="#4B5563"
                            />
                            <Text className="text-[#111827] text-[13px] font-medium">
                                One hour
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="w-full">
                    <TouchableOpacity
                        className="bg-[#4ade80] rounded-full py-4 items-center w-full mb-3"
                        activeOpacity={0.8}
                        onPress={() =>
                            router.replace("/(client)/(tabs)/reviews" as any)
                        }
                    >
                        <Text className="text-[#001851] text-[15px] font-bold">
                            Write a Review for your Helper
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-white/10 border border-white/20 rounded-full py-4 items-center w-full"
                        activeOpacity={0.8}
                        onPress={() =>
                            router.replace("/(client)/(tabs)/home" as any)
                        }
                    >
                        <Text className="text-white text-[15px] font-bold">
                            Back to Dashboard
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </BaseMain>
    );
}
