import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import TabTopBar from "@/components/ui/TabTopBar";
import bookingsData from "@/data/Bookings.json";

/* Filter only completed bookings */
const completedBookings = (bookingsData as any[]).filter(
    (b) => b.status === "completed"
);

/* Compute total lifetime payout */
const totalPayout = completedBookings.reduce(
    (sum, b) => sum + (b.price ?? 0),
    0
);

export default function WorkerHistoryView() {
    const router = useRouter();

    const handlePress = (item: any) => {
        router.push({
            pathname: "/booking/JobOverview",
            params: {
                title: item.title ?? "",
                client: item.client ?? "",
                address: item.address ?? "",
                propertySize: item.propertySize ?? "",
                rate: item.rate ?? "",
                example: item.example ?? "",
                schedule: item.schedule ?? "",
                contact: item.contact ?? "",
                tasks: JSON.stringify(item.tasks ?? []),
                status: "completed",   // hides stepper in JobOverviewView
                activeTab: "",
            },
        });
    };

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
                {/* ── Earnings Summary Card ── */}
                <View className="bg-white rounded-3xl p-6 items-center mb-6">
                    <Text className="text-[#4B5563] text-xs font-semibold uppercase tracking-wider">
                        Total Lifetime Payout
                    </Text>
                    <Text className="text-[#001449] text-3xl font-black mt-1">
                        ₱{totalPayout.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                    </Text>
                    <Text className="text-[#4ade80] text-xs font-bold mt-1.5">
                        {completedBookings.length} job{completedBookings.length !== 1 ? "s" : ""} successfully delivered
                    </Text>
                </View>

                <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-4 px-1">
                    Job History
                </Text>

                {completedBookings.length === 0 ? (
                    <View className="items-center py-16">
                        <Ionicons name="receipt-outline" size={48} color="rgba(255,255,255,0.2)" />
                        <Text className="text-white/40 text-sm mt-3">No completed jobs yet.</Text>
                    </View>
                ) : (
                    completedBookings.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handlePress(item)}
                            activeOpacity={0.8}
                            className="bg-white/10 border border-white/10 rounded-2xl p-5 mb-4"
                        >
                            <View className="flex-row justify-between items-start mb-3">
                                <View className="flex-1 mr-3">
                                    <Text className="text-white text-base font-bold">
                                        {item.client}
                                    </Text>
                                    <Text className="text-[#7EB1F1] text-xs font-semibold mt-0.5">
                                        {item.title}
                                    </Text>
                                    <Text className="text-brand-grey-light text-[10px] mt-1">
                                        {item.schedule || item.date}
                                    </Text>
                                </View>
                                <View className="items-end gap-y-1.5">
                                    <View className="bg-[#4ade80]/20 border border-[#4ade80]/30 px-2.5 py-1 rounded-full">
                                        <Text className="text-[#4ade80] text-[10px] font-bold">
                                            COMPLETED
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.3)" />
                                </View>
                            </View>

                            <View className="h-[1px] bg-white/10 my-2" />

                            <View className="flex-row justify-between items-center mt-1">
                                <View className="flex-row items-center gap-x-1">
                                    <Ionicons name="location-outline" size={12} color="rgba(255,255,255,0.4)" />
                                    <Text className="text-white/40 text-xs" numberOfLines={1}>
                                        {item.address}
                                    </Text>
                                </View>
                                <Text className="text-white text-base font-bold">
                                    ₱{(item.price ?? 0).toLocaleString()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </BaseMain>
    );
}
