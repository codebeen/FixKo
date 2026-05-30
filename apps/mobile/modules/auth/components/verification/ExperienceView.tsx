import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import BaseLayout from "@/components/layout/(base-auth)/BaseLayout";
import { useVerification } from "../../context/VerificationContext";
import Stepper from "../Stepper";
import FixKoLogo from "@/constants/logo";

export default function ExperienceView() {
    const router = useRouter();
    const { experience, setExperience } = useVerification();

    const [workExperience, setWorkExperience] = useState(
        experience.workExperience,
    );
    const [certification, setCertification] = useState<string | null>(
        experience.certification,
    );
    const [imagesProof, setImagesProof] = useState<string[]>(
        experience.imagesProof,
    );

    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const requestPermissionAndPickImage = async (
        onPick: (uri: string) => void,
    ) => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                "Sorry, we need camera roll permissions to upload images.",
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            onPick(result.assets[0].uri);
        }
    };

    const handlePickCertification = () => {
        Alert.alert("Select file type", "Choose image or PDF", [
            {
                text: "Image",
                onPress: () => {
                    requestPermissionAndPickImage((uri) => {
                        setCertification(uri);
                        setErrors((prev) => ({ ...prev, certification: null }));
                    });
                },
            },
            {
                text: "PDF",
                onPress: async () => {
                    try {
                        const result = await DocumentPicker.getDocumentAsync({
                            type: "application/pdf",
                            copyToCacheDirectory: true,
                        });
                        if (result.assets && result.assets.length > 0) {
                            setCertification(result.assets[0].uri);
                            setErrors((prev) => ({
                                ...prev,
                                certification: null,
                            }));
                        }
                    } catch (err) {
                        Alert.alert("Error", "Failed to pick document");
                    }
                },
            },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const handlePickProofImage = () => {
        requestPermissionAndPickImage((uri) => {
            setImagesProof((prev) => [...prev, uri]);
            setErrors((prev) => ({ ...prev, imagesProof: null }));
        });
    };

    const removeProofImage = (indexToRemove: number) => {
        setImagesProof((prev) =>
            prev.filter((_, index) => index !== indexToRemove),
        );
    };

    const handleContinue = (shouldSkip: boolean = false) => {
        if (shouldSkip) {
            setExperience({
                workExperience: "",
                certification: null,
                imagesProof: [],
                skipped: true,
            });
            router.push("/(auth)/verification/IdentityVerification" as any);
            return;
        }

        let hasError = false;
        const newErrors: Record<string, string | null> = {};

        if (!workExperience.trim()) {
            newErrors.workExperience =
                "Work experience description or years is required";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setExperience({
            workExperience,
            certification,
            imagesProof,
            skipped: false,
        });
        router.push("/(auth)/verification/IdentityVerification" as any);
    };

    return (
        <BaseLayout align="center">
            <View className="w-full max-w-[340px]">
                <View className="items-center mb-3 -mt-2.5">
                    <Image
                        source={FixKoLogo}
                        style={{ width: 180, height: 90 }}
                        resizeMode="contain"
                    />
                </View>

                <Stepper currentStep={2} />

                <View className="mb-5">
                    <Text className="text-[22px] font-bold text-white mb-1.5">
                        Experience & Work Proof
                    </Text>
                    <Text className="text-[13px] text-white/60 leading-[18px]">
                        Showcase your professional experience, qualifications,
                        and past works.
                    </Text>
                </View>

                <View className="mb-4 w-full">
                    <Text className="text-[12.5px] font-semibold text-white mb-1.5">
                        Years of Experience / Description
                    </Text>
                    <View
                        className={`flex-row items-start bg-white/5 border border-white rounded-lg px-3.5 h-[100px] py-2.5 ${
                            errors.workExperience ? "border-[#EF4444]" : ""
                        }`}
                    >
                        <Ionicons
                            name="briefcase-outline"
                            size={18}
                            color="rgba(255, 255, 255, 0.4)"
                            className="mt-0.5"
                        />
                        <TextInput
                            className="flex-1 text-[13.5px] text-white py-1 h-full"
                            style={[
                                { outlineStyle: "none" } as any,
                                { textAlignVertical: "top" },
                            ]}
                            placeholder={
                                "e.g. 5 Years in plumbing\nCommercial & residential installations\nSpecialize in pipe fitting"
                            }
                            placeholderTextColor="rgba(255, 255, 255, 0.3)"
                            value={workExperience}
                            onChangeText={setWorkExperience}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                    {errors.workExperience && (
                        <Text className="text-[#EF4444] text-[11px] mt-1 font-medium">
                            {errors.workExperience}
                        </Text>
                    )}
                </View>

                <View className="mb-4 w-full">
                    <Text className="text-[12.5px] font-semibold text-white mb-1.5">
                        Certification (Optional)
                    </Text>
                    {certification ? (
                        <View className="h-[120px] rounded-xl overflow-hidden relative border border-white/15">
                            {certification.toLowerCase().endsWith(".pdf") ? (
                                <View className="flex-1 justify-center items-center bg-brand-navy-dark rounded-xl h-full">
                                    <Ionicons
                                        name="document-outline"
                                        size={48}
                                        color="#FFF"
                                    />
                                    <Text className="text-white mt-1 text-[12px]">
                                        PDF Document
                                    </Text>
                                </View>
                            ) : (
                                <Image
                                    source={{ uri: certification }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            )}
                            <TouchableOpacity
                                className="absolute top-2 right-2 bg-black/60 w-6 h-6 rounded-full justify-center items-center"
                                onPress={() => setCertification(null)}
                            >
                                <Ionicons name="close" size={16} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            className="h-[110px] bg-white/2 border-[1.5px] border-dashed border-white rounded-xl justify-center items-center gap-1"
                            onPress={handlePickCertification}
                        >
                            <Ionicons
                                name="document-attach-outline"
                                size={26}
                                color="#DBA92E"
                            />
                            <Text className="text-white text-[13px] font-semibold">
                                Upload Certificate or License
                            </Text>
                            <Text className="text-white/40 text-[11px]">
                                Supports JPG, PNG, PDF (Max 5MB)
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View className="mb-4 w-full">
                    <Text className="text-[12.5px] font-semibold text-white mb-1.5">
                        Past Work Images Proof (Optional)
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexDirection: "row",
                            gap: 12,
                            paddingVertical: 4,
                        }}
                    >
                        {imagesProof.map((uri, index) => (
                            <View
                                key={index}
                                className="w-20 h-20 rounded-lg overflow-hidden relative border border-white/15"
                            >
                                <Image
                                    source={{ uri }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    className="absolute top-2 right-2 bg-black/60 w-6 h-6 rounded-full justify-center items-center"
                                    onPress={() => removeProofImage(index)}
                                >
                                    <Ionicons
                                        name="trash-outline"
                                        size={14}
                                        color="#FFF"
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity
                            className="w-20 h-20 rounded-lg border-[1.5px] border-dashed border-white bg-white/2 justify-center items-center gap-1"
                            onPress={handlePickProofImage}
                        >
                            <Ionicons
                                name="add-circle-outline"
                                size={24}
                                color="#7EB1F1"
                            />
                            <Text className="text-brand-blue text-[11px] font-bold">
                                Add Photo
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <TouchableOpacity
                    className="self-center my-3 p-2"
                    onPress={() => handleContinue(true)}
                >
                    <Text className="text-brand-yellow-gold font-semibold text-[13px] underline">
                        Skip this step for now
                    </Text>
                </TouchableOpacity>

                <View className="flex-row justify-between mt-4 mb-10 gap-3">
                    <TouchableOpacity
                        className="flex-1 h-[46px] rounded-[23px] border-[1.5px] border-white/20 justify-center items-center"
                        onPress={() =>
                            router.push(
                                "/(auth)/verification/PersonalInfo" as any,
                            )
                        }
                    >
                        <Text className="text-white text-[14px] font-bold">
                            Back
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-[2] h-[46px] rounded-[23px] bg-brand-blue justify-center items-center shadow-md shadow-brand-blue/20 elevation-3"
                        onPress={() => handleContinue(false)}
                    >
                        <Text className="text-brand-navy text-[14px] font-bold">
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BaseLayout>
    );
}
