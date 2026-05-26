import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import TopBar from "@/components/ui/top-bar";

const PAYMENT_METHODS = [
    {
        id: "credit_card",
        label: "Credit Card",
        icon: "credit-card",
        iconColor: "#FF5F00",
        iconBg: "#FFF0E6",
    },
    {
        id: "apple_pay",
        label: "Apple Pay",
        icon: "apple",
        iconColor: "#000000",
        iconBg: "#F3F4F6",
    },
    {
        id: "gcash",
        label: "Gcash",
        icon: "wallet",
        iconColor: "#005CEE",
        iconBg: "#E6F0FD",
    },
    {
        id: "maya",
        label: "Maya",
        icon: "money-bill-wave",
        iconColor: "#00D16B",
        iconBg: "#E6FBF0",
    },
    {
        id: "bpi",
        label: "BPI",
        icon: "university",
        iconColor: "#B11216",
        iconBg: "#FCE7E7",
    },
    {
        id: "cash",
        label: "Pay with Cash",
        icon: "coins",
        iconColor: "#FBBF24",
        iconBg: "#FEF9C3",
    },
];

export default function PaymentMethodView() {
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState("credit_card");

    const handleConfirm = () => {
        router.push("/(client)/payment/PaymentConfirmationPage" as any);
    };

    return (
        <BaseMain>
            <TopBar title="Payment Method" />

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: 10,
                    paddingBottom: 40,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-6">
                    <Text className="text-white text-[22px] font-bold mb-1.5">
                        Choose Payment Option
                    </Text>
                    <Text className="text-white text-sm opacity-85">
                        Select a payment option for your completed service
                        request.
                    </Text>
                </View>

                {PAYMENT_METHODS.map((method) => {
                    const isSelected = selectedMethod === method.id;

                    return (
                        <TouchableOpacity
                            key={method.id}
                            className={`bg-white flex-row items-center py-3.5 px-4 rounded-2xl mb-3 shadow border-[1.5px] ${
                                isSelected
                                    ? "border-[#0037B7]"
                                    : "border-transparent"
                            }`}
                            activeOpacity={0.8}
                            onPress={() => setSelectedMethod(method.id)}
                        >
                            <View
                                style={{ backgroundColor: method.iconBg }}
                                className="w-10 h-10 rounded-xl justify-center items-center mr-4"
                            >
                                <FontAwesome5
                                    name={method.icon}
                                    size={18}
                                    color={method.iconColor}
                                />
                            </View>

                            <Text className="flex-1 text-[#111827] text-[15px] font-semibold">
                                {method.label}
                            </Text>

                            <View
                                className={`w-[22px] h-[22px] rounded-full border-2 justify-center items-center ${
                                    isSelected
                                        ? "border-[#0037B7]"
                                        : "border-[#D1D5DB]"
                                }`}
                            >
                                {isSelected && (
                                    <View className="w-3 h-3 rounded-full bg-[#0037B7]" />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <View className="px-6 pb-[30px] pt-2.5">
                <TouchableOpacity
                    className="bg-[#4ade80] rounded-full py-4 items-center justify-center w-full"
                    activeOpacity={0.8}
                    onPress={handleConfirm}
                >
                    <Text className="text-[#001851] text-base font-bold">
                        Confirm Payment
                    </Text>
                </TouchableOpacity>
            </View>
        </BaseMain>
    );
}
