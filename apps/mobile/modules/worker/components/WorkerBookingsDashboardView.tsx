import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import bookings from "@/data/Bookings.json";
import TopBar from "@/components/ui/top-bar";
import TabTopBar from "@/components/ui/TabTopBar";

const s = (size: number) =>
    Math.round((size * Dimensions.get("window").width) / 375);

type Booking = {
    id: string;
    title: string;
    client?: string;
    name?: string;
    address?: string;
    propertySize?: string;
    status: string;
    price: number;
    tasks?: string[];
    rate?: string;
    example?: string;
    schedule?: string;
    contact?: string;
};

export default function WorkerBookingsDashboardView() {
    const { activeTab: incomingTab } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState(
        incomingTab ?? "Active schedule",
    );
    const router = useRouter();

    const bookingData: Booking[] = bookings as Booking[];

    const getStatusStyle = (status: string) => {
        const lower = status.toLowerCase();
        if (lower === "pending") {
            return { bg: "#FFF3E0", text: "#E65100", label: "Pending" };
        }
        if (lower === "completed") {
            return { bg: "#E8F5E9", text: "#2E7D32", label: "Completed" };
        }
        return { bg: "#FFF9C4", text: "#F59E0B", label: status };
    };

    const pendingCount = bookingData.filter(
        (b) => b.status === "pending",
    ).length;

    return (
        <BaseMain>
            {/* Header */}
            <TabTopBar title="Bookings"  rightElement={<Ionicons name="calendar-outline" size={24} color="white" />} />

            {/* Tab Row */}
            <View
                className="flex-row px-4"
                style={{ gap: s(8), marginBottom: s(16) }}
            >
                {["Incoming request", "Active schedule", "Completed"].map(
                    (tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 items-center justify-center border ${
                                    isActive
                                        ? "bg-white border-white"
                                        : "bg-transparent border-white/30"
                                }`}
                                style={{
                                    paddingVertical: s(8),
                                    borderRadius: s(20),
                                }}
                            >
                                <Text
                                    className={`text-xs font-semibold ${isActive ? "text-brand-navy" : "text-white/80"}`}
                                >
                                    {tab}
                                    {tab === "Incoming request" &&
                                    pendingCount > 0
                                        ? ` (${pendingCount})`
                                        : ""}
                                </Text>
                            </TouchableOpacity>
                        );
                    },
                )}
            </View>

            {/* Booking List */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: s(16),
                    paddingTop: s(10),
                    paddingBottom: s(40),
                }}
            >
                {bookingData
                    .filter((item) => {
                        if (activeTab === "Active schedule") {
                            return (
                                item.status !== "pending" &&
                                item.status !== "completed"
                            );
                        } else if (activeTab === "Incoming request") {
                            return item.status === "pending";
                        } else {
                            return item.status === "completed";
                        }
                    })
                    .map((item) => {
                        const statusConfig = getStatusStyle(item.status);

                        return (
                            <View
                                key={item.id}
                                className="bg-white border border-[#F0F2F5] shadow-sm"
                                style={{
                                    borderRadius: s(8),
                                    padding: s(10),
                                    marginBottom: s(8),
                                }}
                            >
                                {/* Top Row: Client Meta & Status */}
                                <View
                                    className="flex-row justify-between items-start"
                                    style={{ marginBottom: s(6) }}
                                >
                                    <View
                                        className="flex-row items-center flex-1"
                                        style={{ gap: s(8) }}
                                    >
                                        <View
                                            className="bg-[#F0F2F5] justify-center items-center"
                                            style={{
                                                width: s(24),
                                                height: s(24),
                                                borderRadius: s(12),
                                            }}
                                        >
                                            <Text
                                                className="font-bold text-[#0056D2]"
                                                style={{ fontSize: s(10) }}
                                            >
                                                {(
                                                    item.client ||
                                                    item.name ||
                                                    "C"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                className="font-bold text-brand-navy tracking-[-0.3px]"
                                                style={{ fontSize: s(12) }}
                                            >
                                                {item.client || item.name}
                                            </Text>
                                            <Text
                                                className="font-medium text-[#64748B] mt-0.5"
                                                style={{ fontSize: s(11) }}
                                            >
                                                {item.title || "Service"}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        className="justify-center items-center"
                                        style={{
                                            paddingHorizontal: s(8),
                                            paddingVertical: s(2),
                                            borderRadius: s(8),
                                            backgroundColor: statusConfig.bg,
                                        }}
                                    >
                                        <Text
                                            className="font-bold tracking-[0.1px]"
                                            style={{
                                                fontSize: s(10),
                                                color: statusConfig.text,
                                            }}
                                        >
                                            {statusConfig.label}
                                        </Text>
                                    </View>
                                </View>

                                {/* Footer: Compressed pricing and button layout */}
                                <View
                                    className="flex-row justify-between items-center border-t border-t-[#F1F5F9]"
                                    style={{ paddingTop: s(6) }}
                                >
                                    <View className="flex-row items-baseline">
                                        <Text
                                            className="text-[#94A3B8] font-medium"
                                            style={{ fontSize: s(10) }}
                                        >
                                            Total:{" "}
                                        </Text>
                                        <Text
                                            className="font-bold text-[#0F172A]"
                                            style={{ fontSize: s(12) }}
                                        >
                                            ₱{item.price.toFixed(2)}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        className="flex-row items-center gap-[2px] bg-[#0056D2]"
                                        style={{
                                            paddingHorizontal: s(10),
                                            paddingVertical: s(4),
                                            borderRadius: s(12),
                                        }}
                                        onPress={() => {
                                            const targetPath =
                                                item.status !== "pending"
                                                    ? "/booking/StartJob"
                                                    : "/booking/JobOverview";
                                            router.push({
                                                pathname: targetPath,
                                                params: {
                                                    id: item.id,
                                                    title: item.title,
                                                    client: item.client,
                                                    address: item.address,
                                                    status: item.status,
                                                    price: item.price.toString(),
                                                    propertySize:
                                                        item.propertySize,
                                                    rate: item.rate,
                                                    example: item.example,
                                                    schedule: item.schedule,
                                                    contact: item.contact,
                                                    tasks: item.tasks
                                                        ? JSON.stringify(
                                                              item.tasks,
                                                          )
                                                        : undefined,
                                                    activeTab: activeTab,
                                                },
                                            });
                                        }}
                                    >
                                        <Text className="text-white text-[11px] font-semibold">
                                            Details
                                        </Text>
                                        <Ionicons
                                            name="chevron-forward"
                                            size={11}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
            </ScrollView>
        </BaseMain>
    );
}
