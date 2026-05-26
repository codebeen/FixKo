import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import BaseMain from "@/components/layout/(base-main)/BaseMain";
import TopBar from "@/components/ui/top-bar";

const THEME = {
    bg: "#001540",
    accent: "#5CF263",
    blue: "#0047FF",
    border: "rgba(255,255,255,0.5)",
};

interface TaskRowProps {
    label: string;
    isChecked: boolean;
    onToggle: () => void;
}

const TaskRow = ({ label, isChecked, onToggle }: TaskRowProps) => (
    <TouchableOpacity
        className="flex-row justify-between p-[15px] border border-white/50 rounded-lg mb-2.5"
        onPress={onToggle}
    >
        <Text className="text-white">{label}</Text>
        <View
            className={`w-[22px] h-[22px] border rounded justify-center items-center ${isChecked ? "bg-[#0047FF] border-[#0047FF]" : "border-white"}`}
        >
            {isChecked && <Feather name="check" color="white" size={14} />}
        </View>
    </TouchableOpacity>
);

interface TaskItem {
    id: string;
    text: string;
    done: boolean;
}

export default function TimerView() {
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
        tasks: tasksParam,
        status,
        activeTab,
    } = useLocalSearchParams();
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (tasksParam) {
            let list: string[] = [];
            if (Array.isArray(tasksParam)) {
                list = tasksParam;
            } else if (typeof tasksParam === "string") {
                try {
                    const parsed = JSON.parse(tasksParam);
                    if (Array.isArray(parsed)) {
                        list = parsed;
                    }
                } catch {
                    list = tasksParam.split(",").map((t) => t.trim());
                }
            }
            setTasks(
                list.map((t, index) => ({
                    id: `${index}-${t}`,
                    text: t,
                    done: false,
                })),
            );
        } else {
            setTasks(
                [
                    "Sweep & mop floors",
                    "Clean bathroom",
                    "Wipe surfaces",
                    "Dispose trash",
                ].map((t, index) => ({
                    id: `${index}-${t}`,
                    text: t,
                    done: false,
                })),
            );
        }
    }, [tasksParam]);

    useEffect(() => {
        let interval: any = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    const formatTime = (totalSeconds: number) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${hrs} : ${pad(mins)} : ${pad(secs)}`;
    };

    const allTasksChecked = tasks.every((task) => task.done);

    return (
        <BaseMain theme="navy" scrollable={false}>
            <TopBar title="Job Overview" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 30,
                }}
            >
                <View className="items-center">
                    <Text className="text-white text-2xl font-bold">
                        Working Hours
                    </Text>
                    <Text className="text-[#aaa] text-[13px] my-1.25">
                        Track your time while working on this job.
                    </Text>

                    <View className="w-full border border-white/50 rounded-[15px] p-[30px] items-center mt-5">
                        <Text className="text-white text-[50px] font-semibold">
                            {formatTime(seconds)}
                        </Text>
                        <View className="absolute -bottom-[25px] bg-white rounded-full flex-row items-center px-[15px] gap-[15px] h-[50px]">
                            <TouchableOpacity
                                onPress={() => setIsRunning(true)}
                                activeOpacity={0.7}
                                className="p-1 justify-center items-center"
                            >
                                <Feather
                                    name="play"
                                    color={isRunning ? "#ccc" : THEME.blue}
                                    size={20}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setIsRunning(false)}
                                activeOpacity={0.7}
                                className="p-1 justify-center items-center"
                            >
                                <View
                                    className={`p-2 rounded-full ${isRunning ? "bg-[#0047FF]" : "bg-[#ccc]"}`}
                                >
                                    <Feather
                                        name="pause"
                                        color="white"
                                        size={20}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setIsRunning(false);
                                    setSeconds(0);
                                }}
                                activeOpacity={0.7}
                                className="p-1 justify-center items-center"
                            >
                                <Feather
                                    name="square"
                                    color={THEME.blue}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text className="text-white text-xl font-bold mt-[50px]">
                    Task Checklist
                </Text>
                <View className="mt-2.5">
                    {tasks.map((item, i) => (
                        <TaskRow
                            key={item.id}
                            label={item.text}
                            isChecked={item.done}
                            onToggle={() => {
                                const newTasks = [...tasks];
                                newTasks[i].done = !newTasks[i].done;
                                setTasks(newTasks);
                            }}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Sticky Footer */}
            <View className="w-full px-5 py-3.75  items-center justify-center">
                <TouchableOpacity
                    className={`p-4 rounded-full items-center w-[90%] ${
                        allTasksChecked ? "bg-[#5CF263]" : "bg-white/10"
                    }`}
                    disabled={!allTasksChecked}
                    onPress={() =>
                        router.push({
                            pathname: "/booking/UploadProof",
                            params: {
                                title: title || "",
                                client: client || "",
                                address: address || "",
                                propertySize: propertySize || "",
                                rate: rate || "",
                                example: example || "",
                                schedule: schedule || "",
                                contact: contact || "",
                                tasks: tasksParam || "",
                                status: status || "",
                                activeTab: activeTab || "",
                            },
                        })
                    }
                    activeOpacity={allTasksChecked ? 0.8 : 1}
                >
                    <Text
                        className={`font-bold text-base ${
                            allTasksChecked ? "text-[#001540]" : "text-white/30"
                        }`}
                    >
                        Mark as Completed
                    </Text>
                </TouchableOpacity>
            </View>
        </BaseMain>
    );
}
