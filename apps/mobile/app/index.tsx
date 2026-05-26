import React from "react";
import { Text, View, Pressable, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import BaseLayout from "@/components/layout/(base-auth)/BaseLayout";
import LogoAnimation from "@/components/layout/(base-auth)/LogoAnimation";

export default function App() {
    const router = useRouter();
    const { width: screenWidth } = useWindowDimensions();

    const isSmallScreen = screenWidth < 380;
    const isTabletOrWeb = screenWidth > 768;

    const containerMaxWidth = isTabletOrWeb ? 420 : 340;
    const titleClassName = isSmallScreen ? "text-[19px]" : "text-[23px]";
    const subtitleClassName = isSmallScreen ? "text-[15px]" : "text-[18px]";
    const descClassName = isSmallScreen ? "text-[12px]" : "text-[13.5px]";
    const buttonSpacingClass = isSmallScreen ? "mt-10" : "mt-[60px]";

    return (
        <BaseLayout
            align="center"
            contentContainerStyle={{ justifyContent: "center" }}
        >
            <View
                className="w-full items-center px-2.5"
                style={{ maxWidth: containerMaxWidth }}
            >
                <LogoAnimation />

                <Text
                    className={`${titleClassName} text-white font-bold text-center mt-2.5`}
                >
                    Supporting Filipino Workers,{"\n"}
                    <Text
                        className={`${subtitleClassName} font-normal italic text-[#CCC]`}
                    >
                        Serving Every Home.
                    </Text>
                </Text>

                <Text
                    className={`${descClassName} text-[#BBB] text-center mt-3 leading-[18px]`}
                >
                    Empowering the hands that build our nation. We bridge the
                    gap between the hardworking Filipino and the homes that need
                    them most.
                </Text>

                <View
                    className={`w-full items-center gap-4 ${buttonSpacingClass}`}
                >
                    <Pressable
                        className="w-full rounded-[30px] bg-[#7EB1F1] items-center py-4"
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.85 : 1 },
                        ]}
                        onPress={() => router.push("/(auth)/User-Type" as any)}
                    >
                        <Text className="text-[#001449] font-bold text-[16px]">
                            Get Started
                        </Text>
                    </Pressable>

                    <Pressable
                        className="py-2"
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.7 : 1 },
                        ]}
                        onPress={() => router.push("/(auth)/login" as any)}
                    >
                        <Text className="text-white font-semibold text-[14.5px]">
                            I Already have an Account
                        </Text>
                    </Pressable>
                </View>
            </View>
        </BaseLayout>
    );
}
