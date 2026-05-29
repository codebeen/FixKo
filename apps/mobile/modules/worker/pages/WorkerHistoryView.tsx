import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import TabTopBar from "@/components/ui/TabTopBar";

const EARNINGS_HISTORY = [
    {
        id: "1",
        clientName: "Darben Client",
        service: "Deep Home Cleaning",
        date: "May 26, 2026",
        status: "Paid",
        amount: "₱700.00",
        method: "GCash",
    },
    {
        id: "2",
        clientName: "Nadine Borja",
        service: "Kitchen Plumbing Service",
        date: "May 23, 2026",
        status: "Paid",
        amount: "₱900.00",
        method: "Cash",
    },
];

export default function WorkerHistoryView() {
    const router = useRouter();

    return (
        <BaseMain>
            {/* Header */}
            <TabTopBar
                title="Earnings"
                rightElement={<Ionicons name="card-outline" size={24} color="white" />}
            />

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 10,
                    paddingBottom: 40,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Earnings Card */}
                <View className="bg-white rounded-3xl p-6 items-center mb-6">
                    <Text className="text-[#4B5563] text-xs font-semibold uppercase tracking-wider">
                        Total Lifetime Payout
                    </Text>
                    <Text className="text-[#001449] text-3xl font-black mt-1">
                        ₱18,400.00
                    </Text>
                    <Text className="text-[#4ade80] text-xs font-bold mt-1.5">
                        32 jobs successfully delivered
                    </Text>
                </View>

                <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-4 px-1">
                    Job History
                </Text>

                {EARNINGS_HISTORY.map((item) => (
                    <View
                        key={item.id}
                        className="bg-white/10 border border-white/10 rounded-2xl p-5 mb-4"
                    >
                        <View className="flex-row justify-between items-start mb-3">
                            <View>
                                <Text className="text-white text-base font-bold">
                                    {item.clientName}
                                </Text>
                                <Text className="text-[#7EB1F1] text-xs font-semibold mt-0.5">
                                    {item.service}
                                </Text>
                                <Text className="text-brand-grey-light text-[10px] mt-1">
                                    {item.date}
                                </Text>
                            </View>
                            <View className="bg-brand-green/20 border border-brand-green/30 px-2.5 py-1 rounded-full">
                                <Text className="text-brand-green text-[10px] font-bold">
                                    PAID
                                </Text>
                            </View>
                        </View>

                        <View className="h-[1px] bg-white/10 my-2" />

                        <View className="flex-row justify-between items-center mt-1">
                            <Text className="text-brand-grey-light text-xs">
                                Payout method: {item.method}
                            </Text>
                            <Text className="text-white text-base font-bold">
                                {item.amount}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </BaseMain>
    );
}
