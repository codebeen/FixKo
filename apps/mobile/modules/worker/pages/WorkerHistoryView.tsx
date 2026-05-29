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
                <View className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
                    <View className="items-center">
                        <Text className="text-[#4B5563] text-xs font-semibold uppercase tracking-wider">
                            Available Balance
                        </Text>
                        <Text className="text-[#001449] text-4xl font-black mt-1">
                            ₱{ (totalPayout * 0.65).toLocaleString("en-PH", { minimumFractionDigits: 2 }) }
                        </Text>
                        <Text className="text-[#4B5563] text-xs mt-1.5">
                            Total Earnings: <Text className="font-bold">₱{totalPayout.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</Text>
                        </Text>
                    </View>

                    <View className="w-full flex-row mt-6 pt-6 border-t border-gray-100 justify-between px-2">
                         <TouchableOpacity className="items-center active:opacity-70 flex-1">
                             <View className="w-12 h-12 rounded-full bg-[#001449]/10 items-center justify-center mb-2">
                                <Ionicons name="cash-outline" size={24} color="#001449" />
                             </View>
                             <Text className="text-[#001449] text-xs font-bold">Cash Out</Text>
                         </TouchableOpacity>
                         
                         <TouchableOpacity className="items-center active:opacity-70 flex-1">
                             <View className="w-12 h-12 rounded-full bg-[#001449]/10 items-center justify-center mb-2">
                                <Ionicons name="swap-horizontal-outline" size={24} color="#001449" />
                             </View>
                             <Text className="text-[#001449] text-xs font-bold">Transfer</Text>
                         </TouchableOpacity>
                         
                         <TouchableOpacity className="items-center active:opacity-70 flex-1">
                             <View className="w-12 h-12 rounded-full bg-[#001449]/10 items-center justify-center mb-2">
                                <Ionicons name="pie-chart-outline" size={24} color="#001449" />
                             </View>
                             <Text className="text-[#001449] text-xs font-bold">Analytics</Text>
                         </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row justify-between items-center mb-4 px-1">
                    <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider">
                        Recent Transactions
                    </Text>
                    <TouchableOpacity>
                        <Text className="text-white/60 text-xs font-semibold">View All</Text>
                    </TouchableOpacity>
                </View>

                {/* Dummy Cashout / Transfer Records */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-3 flex-row items-center justify-between"
                >
                    <View className="flex-row items-center flex-1 mr-3">
                        <View className="w-10 h-10 rounded-full bg-[#4ade80]/20 items-center justify-center mr-3">
                            <Ionicons name="cash" size={20} color="#4ade80" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-sm font-bold">GCash Cash Out</Text>
                            <Text className="text-white/50 text-[10px] mt-0.5">Today, 2:30 PM • 0917 •••• 1234</Text>
                        </View>
                    </View>
                    <Text className="text-white text-sm font-bold">- ₱1,500.00</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex-row items-center justify-between"
                >
                    <View className="flex-row items-center flex-1 mr-3">
                        <View className="w-10 h-10 rounded-full bg-[#F59E0B]/20 items-center justify-center mr-3">
                            <Ionicons name="business" size={20} color="#F59E0B" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-sm font-bold">Bank Transfer</Text>
                            <Text className="text-white/50 text-[10px] mt-0.5">Yesterday, 10:15 AM • BDO Unibank</Text>
                        </View>
                    </View>
                    <Text className="text-white text-sm font-bold">- ₱3,000.00</Text>
                </TouchableOpacity>

                <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-4 px-1 mt-2">
                    Job Earnings History
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
                                <Text className="text-[#4ade80] text-base font-bold">
                                    + ₱{(item.price ?? 0).toLocaleString()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </BaseMain>
    );
}
