import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome5,
} from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import TopBar from "@/components/ui/top-bar";

interface InfoBoxProps {
    icon: React.ReactNode;
    label: string;
    half?: boolean;
}

const InfoBox = ({ icon, label, half }: InfoBoxProps) => (
    <View
        className={`border border-white/40 rounded-xl p-[15px] mb-3 justify-center items-start ${
            half ? "w-[48%] h-[90px]" : "w-full"
        }`}
    >
        {icon}
        <Text className="text-white text-[13px] mt-2">{label}</Text>
    </View>
);

interface StatItemProps {
    icon: any;
    label: string;
}

const StatItem = ({ icon, label }: StatItemProps) => (
    <View className="flex-row items-center">
        <Ionicons name={icon} size={18} color="white" />
        <Text className="text-white text-[13px] ml-2.5">{label}</Text>
    </View>
);

export default function JobCompletedView() {
    const router = useRouter();
    const {
        title,
        client,
        address,
        propertySize,
        rate,
        example,
        schedule,
        contact,
        tasks,
        status,
        activeTab,
    } = useLocalSearchParams();

    const getBedAndBath = () => {
        const propStr = String(propertySize || "").toLowerCase();
        let bed = "1 Bedroom";
        let bath = "1 Bathroom";

        if (propStr.includes("bedroom") || propStr.includes("bed")) {
            const match = propStr.match(/(\d+)\s*(bedroom|bed)/);
            if (match) bed = `${match[1]} Bedroom`;
        }
        if (propStr.includes("bathroom") || propStr.includes("bath")) {
            const match = propStr.match(/(\d+)\s*(bathroom|bath)/);
            if (match) bath = `${match[1]} Bathroom`;
        }
        return { bed, bath };
    };

    const { bed, bath } = getBedAndBath();

    return (
        <BaseMain scrollable={false}>
            <TopBar title="Completed" onBack={() => router.replace("/home")} />

            <View className="flex-1 items-center px-[30px]">
                <MaterialCommunityIcons
                    name="check-decagram"
                    size={130}
                    color="#5df260"
                    className="mt-[30px] mb-5"
                />

                <Text className="text-white text-center text-base leading-[22px] mb-[30px]">
                    Work submitted. Awaiting{"\n"}approval to release payment.
                </Text>

                {/* Info Grid */}
                <View className="flex-row items-center justify-between w-full">
                    <InfoBox
                        icon={
                            <FontAwesome5 name="bed" size={22} color="white" />
                        }
                        label={bed}
                        half
                    />
                    <InfoBox
                        icon={
                            <MaterialCommunityIcons
                                name="bathtub-outline"
                                size={24}
                                color="white"
                            />
                        }
                        label={bath}
                        half
                    />
                </View>

                <View className="w-full border border-white/40 rounded-xl p-[15px] mb-3 justify-center items-start">
                    <Text className="text-white font-bold text-sm mb-1">
                        {title ? String(title) : "Cleaning Service"}
                    </Text>
                    <Text className="text-white/70 text-xs leading-[18px]">
                        {client
                            ? `Provided to ${client}`
                            : "Perfect for condos, studio units, and small apartments"}
                    </Text>
                </View>

                <View className="w-full border border-white/40 rounded-xl p-[15px] mb-3 flex-row items-center justify-around">
                    <StatItem
                        icon="cash-outline"
                        label={rate ? String(rate) : "₱ 1,500"}
                    />
                    <StatItem
                        icon="time-outline"
                        label={schedule ? String(schedule) : "One hour"}
                    />
                </View>

                <TouchableOpacity
                    className="bg-[#5df260] w-full p-4 rounded-full items-center mt-auto mb-10"
                    onPress={() => router.replace("/home")}
                >
                    <Text className="text-[#001a4d] font-bold text-base">
                        Back to Home
                    </Text>
                </TouchableOpacity>
            </View>
        </BaseMain>
    );
}
