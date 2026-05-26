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
        time: "Time: 7:00 AM",
        icon: "check",
        status: "completed",
    },
    {
        id: "2",
        title: "Helper Arrived",
        time: "Time: 7:20 AM",
        icon: "truck",
        status: "completed",
    },
    {
        id: "3",
        title: "Booking Finished",
        time: "Time: 8:20 AM",
        icon: "clock",
        status: "upcoming",
    },
    {
        id: "4",
        title: "Pay now",
        time: "Time: 8:20 AM",
        icon: "wallet",
        status: "upcoming",
    },
];

function BookingStepper({ steps }: { steps: StepType[] }) {
    const DashedLine = ({ isCompleted }: { isCompleted: boolean }) => {
        const dashes = Array.from({ length: 6 });
        return (
            <View className="h-[35px] justify-evenly items-center my-1">
                {dashes.map((_, i) => (
                    <View
                        key={i}
                        className={`w-[2px] h-[4px] rounded-[1px] ${
                            isCompleted ? "bg-brand-navy-deep" : "bg-[#D1D5DB]"
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
                    <View key={step.id} className="flex-row">
                        <View className="items-center mr-4 w-11">
                            <View
                                className={`w-11 h-11 rounded-full justify-center items-center ${
                                    isCompleted
                                        ? "bg-brand-navy-deep"
                                        : "bg-[#F3F4F6]"
                                }`}
                            >
                                <FontAwesome5
                                    name={step.icon}
                                    size={16}
                                    color={isCompleted ? "white" : "#001851"}
                                />
                            </View>
                            {!isLast && (
                                <DashedLine isCompleted={isCompleted} />
                            )}
                        </View>

                        <View className="flex-1 pt-1">
                            <Text className="text-[15px] font-bold text-[#111827] mb-0.5">
                                {step.title}
                            </Text>
                            <Text className="text-xs text-[#9CA3AF]">
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
    const [activeTab, setActiveTab] = useState<"new" | "completed">("new");

    return (
        <BaseMain>
            <TopBar title="Track Booking" />

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: 40,
                    paddingTop: 10,
                }}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity
                    className="mb-4"
                    onPress={() =>
                        router.push("/(client)/(tabs)/message" as any)
                    }
                >
                    <Text className="text-[#7EB1F1] text-base font-bold underline">
                        Contact Helper Support
                    </Text>
                </TouchableOpacity>

                <Text className="text-white text-base mb-4">
                    Estimated Time:{" "}
                    <Text className="font-bold">7:00 AM – 8:00 AM</Text>
                </Text>

                <Text className="text-white/80 text-sm leading-5 mb-6">
                    We’ll let you know when your helper is here!
                </Text>

                <View className="flex-row gap-3 mb-8">
                    <TouchableOpacity
                        className={`flex-1 rounded-[25px] py-2.5 items-center justify-center ${
                            activeTab === "new"
                                ? "bg-[#4ade80]"
                                : "bg-[#D1D5DB]"
                        }`}
                        onPress={() => setActiveTab("new")}
                        activeOpacity={0.9}
                    >
                        <Text
                            className={`text-[15px] font-semibold ${
                                activeTab === "new"
                                    ? "text-brand-navy"
                                    : "text-[#4B5563]"
                            }`}
                        >
                            New
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 rounded-[25px] py-2.5 items-center justify-center bg-[#D1D5DB]"
                        onPress={() => {
                            setActiveTab("completed");
                            // Navigate or trigger payment simulation
                            router.push(
                                "/(client)/payment/PaymentMethodPage" as any,
                            );
                        }}
                        activeOpacity={0.9}
                    >
                        <Text className="text-[15px] font-semibold text-[#111827]">
                            Proceed to Pay
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-white rounded-2xl p-6 shadow-lg">
                    <BookingStepper steps={TIMELINE_STEPS} />
                </View>
            </ScrollView>
        </BaseMain>
    );
}
