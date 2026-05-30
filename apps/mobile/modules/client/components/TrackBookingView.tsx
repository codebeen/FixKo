import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import TopBar from "@/components/ui/top-bar";

export type StepType = {
    id: string;
    title: string;
    time: string;
    icon: string;
    status: "completed" | "upcoming";
};


const TIMELINE_STEPS: StepType[] = [
    {
        id: "1",
        title: "Booking Confirmed",
        time: "Completed at 08:30 AM",
        icon: "check",
        status: "completed",
    },
    {
        id: "2",
        title: "Specialist Dispatched & Arrived",
        time: "Arrived at 09:15 AM",
        icon: "truck",
        status: "completed",
    },
    {
        id: "3",
        title: "Service Ongoing",
        time: "Estimated Completion: 11:30 AM",
        icon: "tools",
        status: "completed",
    },
    {
        id: "4",
        title: "Final Site Assessment & Payment",
        time: "Pending operational finish",
        icon: "wallet",
        status: "upcoming",
    },
];

function BookingStepper({ steps }: { steps: StepType[] }) {
    const DashedLine = ({ isCompleted }: { isCompleted: boolean }) => {
        const dashes = Array.from({ length: 5 });
        return (
            <View className="h-[40px] justify-evenly items-center my-1 w-11">
                {dashes.map((_, i) => (
                    <View
                        key={i}
                        className={`w-[2px] h-[5px] rounded-full ${
                            isCompleted ? "bg-[#0037B7]" : "bg-gray-200"
                        }`}
                    />
                ))}
            </View>
        );
    };

    return (
        <View className="w-full">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const isCompleted = step.status === "completed";

                return (
                    <View key={step.id} className="flex-row items-start">
                        <View className="items-center mr-4 w-11">
                            <View
                                className={`w-10 h-10 rounded-full justify-center items-center shadow-sm ${
                                    isCompleted ? "bg-[#0037B7]" : "bg-gray-100 border border-gray-200"
                                }`}
                            >
                                <FontAwesome5
                                    name={step.icon}
                                    size={14}
                                    color={isCompleted ? "white" : "#64748B"}
                                />
                            </View>
                            {!isLast && (
                                <DashedLine isCompleted={isCompleted} />
                            )}
                        </View>

                        <View className="flex-1 pt-1.5 pb-4">
                            <Text className={`text-sm font-bold leading-tight ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                {step.title}
                            </Text>
                            <Text className={`text-xs mt-1 ${isCompleted ? 'text-gray-500 font-medium' : 'text-gray-400 font-light'}`}>
                                {step.time}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

export default function TrackBookingView() {
    const router = useRouter();

    return (
        <BaseMain>
            <TopBar title="Track Booking Status" />

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: 40,
                    paddingTop: 15,
                }}
                showsVerticalScrollIndicator={false}
                className="flex-1"
            >
                {/* Support Communications Link */}
                <View className="flex-row justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4 mb-5">
                    <View className="flex-1 pr-3">
                        <Text className="text-white text-sm font-bold mb-0.5">Need to clear layout updates?</Text>
                        <Text className="text-white/60 text-xs">Direct messaging helper support help-desk lines.</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.push("/(client)/(tabs)/message" as any)}
                        className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-full px-4 py-2"
                    >
                        <Text className="text-[#7EB1F1] text-xs font-bold">Contact</Text>
                    </TouchableOpacity>
                </View>

                {/* Live Estimations Headline Information */}
                <View className="mb-6 bg-white/5 border border-white/10 rounded-2xl p-5 gap-1.5">
                    <View className="flex-row items-center gap-2">
                        <Ionicons name="time-outline" size={16} color="#DBA92E" />
                        <Text className="text-white/60 text-xs font-bold uppercase tracking-wider">Estimated Window</Text>
                    </View>
                    <Text className="text-white text-xl font-black mt-1">
                        08:30 AM – 11:30 AM
                    </Text>
                    <Text className="text-white/50 text-xs mt-1 leading-4">
                        Your assigned professional specialist is on-site. Real-time checklist steps updates are logged automatically.
                    </Text>
                </View>

                {/* Central Step Timeline Wrapper Element */}
                <View className="bg-white rounded-3xl p-6 shadow-md mb-6">
                    <Text className="text-gray-900 text-base font-black mb-5 tracking-tight border-b border-gray-100 pb-3">
                        Dispatch Milestones
                    </Text>
                    <BookingStepper steps={TIMELINE_STEPS} />
                </View>

                {/* Primary Action Button Controls */}
                <View className="mt-2">
                    <TouchableOpacity
                        activeOpacity={0.85}
                        className="w-full bg-[#4ade80] rounded-full py-4 items-center justify-center shadow-lg shadow-black/20"
                        onPress={() => router.push("/(client)/payment/PaymentMethodPage" as any)}
                    >
                        <Text className="text-brand-navy font-black text-base tracking-tight">
                            Proceed to Payment Options
                        </Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </BaseMain>
    );
}