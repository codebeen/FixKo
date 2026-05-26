import React from "react";
import { Text, View, Pressable, useWindowDimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/layout/(base-auth)/BaseLayout";

type RoleType = "client" | "worker";

export default function UserTypeView() {
    const router = useRouter();
    const { width: screenWidth } = useWindowDimensions();

    const isSmallScreen = screenWidth < 380;
    const isTabletOrWeb = screenWidth > 768;
    const isRowLayout = screenWidth > 640;

    const handleRolePress = (role: RoleType) => {
        router.push({
            pathname: "/(auth)/register",
            params: { role },
        } as any);
    };

    return (
        <BaseLayout
            align="center"
            contentContainerStyle={{ justifyContent: "center" }}
        >
            <View
                className="w-full items-center px-3"
                style={{
                    maxWidth: isTabletOrWeb ? 720 : isRowLayout ? 600 : 360,
                }}
            >
                <View className="items-center mb-[30px]">
                    <Text
                        className={`text-white font-bold text-center ${isSmallScreen ? "text-[23px]" : "text-[26px]"}`}
                    >
                        Join <Text className="text-brand-yellow">FixKo PH</Text>
                    </Text>
                    <Text
                        className={`text-brand-grey-light text-center mt-2 leading-5 px-[15px] ${isSmallScreen ? "text-[13px]" : "text-[14px]"}`}
                    >
                        Choose how you want to join our community today.
                    </Text>
                </View>

                <View
                    className="w-full gap-5 mb-[35px]"
                    style={{ flexDirection: isRowLayout ? "row" : "column" }}
                >
                    {/* CLIENT TILE */}
                    <Pressable
                        className="w-full rounded-2xl p-5 border-[1.5px] bg-white/5 border-white/10 active:bg-[#DBA92E]/10 active:border-brand-yellow-gold"
                        style={({ pressed }) => [
                            {
                                flex: isRowLayout ? 1 : undefined,
                                width: isRowLayout ? undefined : "100%",
                            },
                            { transform: [{ scale: pressed ? 0.98 : 1 }] },
                        ]}
                        onPress={() => handleRolePress("client")}
                    >
                        <View className="flex-row justify-between items-center mb-3">
                            <View className="w-12 h-12 rounded-full justify-center items-center bg-white/10">
                                <MaterialCommunityIcons
                                    name="account-search"
                                    size={isSmallScreen ? 24 : 28}
                                    color="rgba(255,255,255,0.6)"
                                />
                            </View>

                            <View className="w-8 h-8 rounded-full bg-brand-yellow-gold justify-center items-center">
                                <MaterialCommunityIcons
                                    name="arrow-right"
                                    size={18}
                                    color="#001449"
                                />
                            </View>
                        </View>

                        <Text className="text-white text-lg font-bold mb-1">
                            I want to Hire
                        </Text>
                        <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-2 font-semibold">
                            Client Mode
                        </Text>
                        <Text className="text-white/60 text-[12.5px] leading-[18px]">
                            Find and book reliable local workers for home
                            repairs, plumbing, cleaning, electrical work, and
                            more.
                        </Text>
                    </Pressable>

                    {/* WORKER TILE */}
                    <Pressable
                        className="w-full rounded-2xl p-5 border-[1.5px] bg-white/5 border-white/10 active:bg-[#DBA92E]/10 active:border-brand-yellow-gold"
                        style={({ pressed }) => [
                            {
                                flex: isRowLayout ? 1 : undefined,
                                width: isRowLayout ? undefined : "100%",
                            },
                            { transform: [{ scale: pressed ? 0.98 : 1 }] },
                        ]}
                        onPress={() => handleRolePress("worker")}
                    >
                        <View className="flex-row justify-between items-center mb-3">
                            <View className="w-12 h-12 rounded-full justify-center items-center bg-white/10">
                                <MaterialCommunityIcons
                                    name="hammer-wrench"
                                    size={isSmallScreen ? 24 : 28}
                                    color="rgba(255,255,255,0.6)"
                                />
                            </View>

                            <View className="w-8 h-8 rounded-full bg-brand-yellow-gold justify-center items-center">
                                <MaterialCommunityIcons
                                    name="arrow-right"
                                    size={18}
                                    color="#001449"
                                />
                            </View>
                        </View>

                        <Text className="text-white text-lg font-bold mb-1">
                            I want to Work
                        </Text>
                        <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-2 font-semibold">
                            Worker Mode
                        </Text>
                        <Text className="text-white/60 text-[12.5px] leading-[18px]">
                            Offer your professional skills, complete service
                            requests in your area, and earn extra income.
                        </Text>
                    </Pressable>
                </View>
            </View>
        </BaseLayout>
    );
}
