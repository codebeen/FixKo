import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    FlatList,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import { useUserRole } from "../hooks/useUserRole";
import TabTopBar from "@/components/ui/TabTopBar";

interface WorkerToReview {
    id: string;
    name: string;
    service: string;
    date: string;
}

export default function ReviewsView() {
    const role = useUserRole();
    const router = useRouter();

    // Client states
    const [selectedWorker, setSelectedWorker] = useState<WorkerToReview | null>(
        null,
    );
    const [rating, setRating] = useState(5);
    const [reviewTitle, setReviewTitle] = useState("");
    const [comment, setComment] = useState("");
    const [submittedReviews, setSubmittedReviews] = useState<any[]>([]);

    const workersToReview: WorkerToReview[] = [
        {
            id: "1",
            name: "Tessa Cruz",
            service: "Deep Home Cleaning",
            date: "May 24, 2026",
        },
        {
            id: "2",
            name: "Nadine A. Borja",
            service: "Plumbing Repair",
            date: "May 20, 2026",
        },
    ];

    // Worker static reviews data
    const workerReviews = [
        {
            id: "1",
            user: "Darben Client",
            title: "Highly professional work",
            comment:
                "Very meticulous cleaning. Arrived on time and completed the entire checklist correctly. Highly recommended!",
            rating: 5,
            status: "Excellent",
            date: "May 26, 2026",
        },
        {
            id: "2",
            user: "N Nadine",
            title: "Extremely polite & helpful",
            comment:
                "Super helper, cleaned up my kitchen. Very friendly and helpful.",
            rating: 5,
            status: "Excellent",
            date: "May 24, 2026",
        },
        {
            id: "3",
            user: "Anonymous",
            title: "Good work",
            comment:
                "Good cleaning, though they took a bit longer than expected.",
            rating: 4,
            status: "Good",
            date: "May 18, 2026",
        },
    ];

    const handleReviewSubmit = () => {
        if (!selectedWorker) return;

        const newReview = {
            id: Math.random().toString(),
            workerName: selectedWorker.name,
            service: selectedWorker.service,
            title: reviewTitle || "Excellent Service",
            comment: comment,
            rating: rating,
            date: "Today",
        };

        setSubmittedReviews((prev) => [newReview, ...prev]);
        setSelectedWorker(null);
        setReviewTitle("");
        setComment("");
        setRating(5);
    };

    const renderClientReviewsFlow = () => {
        if (selectedWorker) {
            return (
                <ScrollView
                    className="flex-1 mt-2"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Back button */}
                    <TouchableOpacity
                        onPress={() => setSelectedWorker(null)}
                        className="flex-row items-center mb-5 gap-1"
                    >
                        <Ionicons name="arrow-back" size={16} color="#7EB1F1" />
                        <Text className="text-[#7EB1F1] text-sm font-semibold">
                            Back to Workers
                        </Text>
                    </TouchableOpacity>

                    <View className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                        <Text className="text-white text-lg font-bold">
                            Write a Review for
                        </Text>
                        <Text className="text-brand-yellow text-xl font-extrabold mt-1">
                            {selectedWorker.name}
                        </Text>
                        <Text className="text-brand-grey-light text-xs mt-0.5">
                            {selectedWorker.service} • Hired on{" "}
                            {selectedWorker.date}
                        </Text>
                    </View>

                    {/* Rating input */}
                    <Text className="text-white text-sm font-bold mb-2">
                        Rate Service
                    </Text>
                    <View className="flex-row gap-2.5 mb-6 bg-white/5 border border-white/10 p-4 rounded-xl justify-center">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <TouchableOpacity
                                key={num}
                                onPress={() => setRating(num)}
                            >
                                <Ionicons
                                    name="star"
                                    size={32}
                                    color={num <= rating ? "#FFE600" : "#444"}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Review Title */}
                    <Text className="text-white text-sm font-bold mb-2">
                        Review Title
                    </Text>
                    <TextInput
                        placeholder="e.g. Amazing helper, fast worker!"
                        placeholderTextColor="#666"
                        value={reviewTitle}
                        onChangeText={setReviewTitle}
                        className="bg-white/5 border border-white/10 text-white text-sm p-4 rounded-xl mb-4 outline-none"
                    />

                    {/* Comments */}
                    <Text className="text-white text-sm font-bold mb-2">
                        Detailed Feedback
                    </Text>
                    <TextInput
                        placeholder="Describe your experience with the worker..."
                        placeholderTextColor="#666"
                        multiline
                        numberOfLines={4}
                        value={comment}
                        onChangeText={setComment}
                        className="bg-white/5 border border-white/10 text-white text-sm p-4 rounded-xl mb-6 outline-none h-28"
                        style={{ textAlignVertical: "top" }}
                    />

                    {/* Submit CTA */}
                    <TouchableOpacity
                        onPress={handleReviewSubmit}
                        className="bg-brand-blue rounded-full py-4 items-center mb-10"
                    >
                        <Text className="text-[#001449] font-bold text-base">
                            Submit Review
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        }

        return (
            <View className="flex-1 mt-2">
                <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3">
                    Workers Pending Review
                </Text>

                {workersToReview.map((worker) => (
                    <TouchableOpacity
                        key={worker.id}
                        onPress={() => setSelectedWorker(worker)}
                        className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 flex-row justify-between items-center"
                    >
                        <View className="flex-1 mr-4">
                            <Text className="text-white text-base font-bold">
                                {worker.name}
                            </Text>
                            <Text className="text-[#AAB8C2] text-xs mt-0.5">
                                {worker.service}
                            </Text>
                            <Text className="text-brand-grey-light text-[10px] mt-1">
                                Completed: {worker.date}
                            </Text>
                        </View>
                        <View className="bg-brand-blue px-4 py-2 rounded-full">
                            <Text className="text-[#001449] font-bold text-xs">
                                Review
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                {submittedReviews.length > 0 && (
                    <View className="mt-6">
                        <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-3">
                            Reviews You Left
                        </Text>
                        {submittedReviews.map((rev) => (
                            <View
                                key={rev.id}
                                className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-3"
                            >
                                <Text className="text-brand-yellow text-sm font-bold">
                                    {rev.workerName}
                                </Text>
                                <View className="flex-row items-center gap-1 my-1">
                                    {[...Array(rev.rating)].map((_, i) => (
                                        <Ionicons
                                            key={i}
                                            name="star"
                                            size={12}
                                            color="#FFE600"
                                        />
                                    ))}
                                </View>
                                <Text className="text-white text-xs font-bold mt-1">
                                    {rev.title}
                                </Text>
                                <Text className="text-brand-grey-light text-[11px] mt-0.5">
                                    {rev.comment}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const renderWorkerReviews = () => {
        return (
            <ScrollView
                className="flex-1 mt-2"
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Rating Summary Card */}
                <View className="bg-white rounded-3xl p-6 items-center mb-6">
                    <View className="w-14 h-14 rounded-full bg-brand-navy-deep justify-center items-center mb-3">
                        <FontAwesome5 name="user-alt" size={24} color="#FFF" />
                    </View>
                    <Text className="text-[#001449] text-lg font-bold">
                        Shanella Cagulang
                    </Text>
                    <Text className="text-[#4B5563] text-xs">
                        Cleaning Helper • Rodriguez, Rizal
                    </Text>
                    <Text className="text-[#4B5563] text-[10px] italic mt-1 font-semibold">
                        87% of clients recommend Shanella
                    </Text>

                    <View className="flex-row items-center mt-4 gap-2">
                        <View className="bg-[#FFD700] rounded-xl px-2.5 py-1">
                            <Text className="text-black text-xs font-extrabold">
                                5.0 Rating
                            </Text>
                        </View>
                        <View className="flex-row gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Ionicons
                                    key={s}
                                    name="star"
                                    size={16}
                                    color="#FFD700"
                                />
                            ))}
                        </View>
                    </View>
                </View>

                {/* Reviews List */}
                <Text className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-4">
                    Client Feedback ({workerReviews.length})
                </Text>

                {workerReviews.map((item) => (
                    <View
                        key={item.id}
                        className="bg-white/10 border border-white/10 rounded-2xl p-4 mb-4"
                    >
                        <View className="flex-row justify-between items-start mb-2">
                            <View>
                                <Text className="text-white text-sm font-bold">
                                    {item.user}
                                </Text>
                                <Text className="text-brand-grey-light text-[10px]">
                                    {item.date}
                                </Text>
                            </View>
                            <View className="flex-row gap-0.5">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Ionicons
                                        key={i}
                                        name="star"
                                        size={12}
                                        color="#FFE600"
                                    />
                                ))}
                            </View>
                        </View>
                        <Text className="text-brand-yellow text-xs font-bold mt-1">
                            {item.title}
                        </Text>
                        <Text className="text-brand-grey-light text-xs mt-1 leading-4">
                            {item.comment}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        );
    };

    return (
        <BaseMain>
            {/* Header */}
            <TabTopBar
                title="Reviews & Ratings"
                rightElement={
                    <View className="bg-brand-blue/15 px-3 py-1 rounded-full border border-brand-blue/20">
                        <Text className="text-[#7EB1F1] text-[10px] font-bold uppercase tracking-wider">
                            {role === "worker" ? "Worker View" : "Client View"}
                        </Text>
                    </View>
                }
            />
            <View className="flex-1 px-5">
                {role === "worker"
                    ? renderWorkerReviews()
                    : renderClientReviewsFlow()}
            </View>
        </BaseMain>
    );
}
