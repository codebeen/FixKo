import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import TopBar from "@/components/ui/top-bar";

interface ButtonProps {
    title: string;
    onPress: () => void;
    bg: string;
    color: string;
}

import Stepper from '@/modules/worker/components/stepper/Stepper';

export default function UploadProofView() {
    const [images, setImages] = useState<string[]>([]);
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection: true,
            quality: 1,
        });
        if (!result.canceled) {
            const newUris = result.assets.map((asset) => asset.uri);
            setImages((prev) => [...prev, ...newUris]);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const Button = ({ title, onPress, bg, color }: ButtonProps) => (
        <TouchableOpacity
            onPress={onPress}
            style={{ backgroundColor: bg }}
            className="w-full p-4 rounded-full items-center my-2"
        >
            <Text style={{ color }} className="font-semibold">
                {title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <BaseMain theme="navy" scrollable={false}>
            <TopBar title="Upload Photo" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    alignItems: "center",
                    paddingHorizontal: 20,
                    paddingBottom: 40,
                }}
            >
                <Stepper currentStep={4} />

                {images.length > 0 ? (
                    <View className="w-full h-[160px] mb-[30px]">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                alignItems: "center",
                                gap: 12,
                                flexDirection: "row",
                            }}
                        >
                            {images.map((uri, idx) => (
                                <View
                                    key={idx}
                                    className="w-[110px] h-[140px] rounded-xl overflow-visible relative"
                                >
                                    <Image
                                        source={{ uri }}
                                        className="w-full h-full rounded-xl"
                                    />
                                    <TouchableOpacity
                                        className="absolute -top-1.5 -right-1.5 bg-[#FF3B30] w-[22px] h-[22px] rounded-full justify-center items-center shadow-sm"
                                        onPress={() => removeImage(idx)}
                                    >
                                        <Ionicons
                                            name="close"
                                            size={14}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity
                                className="w-[110px] h-[140px] rounded-xl border-[1.5px] border-dashed border-white/30 bg-white/[0.03] justify-center items-center"
                                onPress={pickImage}
                            >
                                <Ionicons name="add" size={28} color="white" />
                                <Text className="text-white/70 text-xs mt-1 font-semibold">
                                    Add More
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                ) : (
                    <TouchableOpacity
                        className="w-full h-[200px] border-[1.5px] border-dashed border-white/30 rounded-[15px] justify-center items-center mb-[30px] bg-white/[0.03]"
                        onPress={pickImage}
                    >
                        <Ionicons
                            name="images-outline"
                            size={50}
                            color="white"
                            style={{ marginBottom: 12 }}
                        />
                        <Text className="text-white text-base font-semibold mb-1">
                            Select Proof Photos
                        </Text>
                        <Text className="text-white/50 text-xs">
                            Tap to pick multiple images
                        </Text>
                    </TouchableOpacity>
                )}

                <Button
                    title="Select Photos"
                    onPress={pickImage}
                    bg="white"
                    color="#001233"
                />
                <View style={{ height: 40 }} />

                <TouchableOpacity
                    className={`w-full p-4 rounded-full items-center my-2 ${
                        images.length === 0 ? "bg-white/10" : "bg-[#5df260]"
                    }`}
                    disabled={images.length === 0}
                    onPress={() =>
                        router.push({
                            pathname: "/booking/Payment",
                            params: {
                                title: title || "",
                                client: client || "",
                                address: address || "",
                                propertySize: propertySize || "",
                                rate: rate || "",
                                example: example || "",
                                schedule: schedule || "",
                                contact: contact || "",
                                tasks: tasks || "",
                                status: status || "",
                                activeTab: activeTab || "",
                            },
                        })
                    }
                    activeOpacity={images.length > 0 ? 0.8 : 1}
                >
                    <Text
                        className={`font-bold text-base ${
                            images.length === 0
                                ? "text-white/30"
                                : "text-[#001a4d]"
                        }`}
                    >
                        Mark as Completed
                    </Text>
                </TouchableOpacity>
            </ScrollView>   
        </BaseMain>
    );
}
