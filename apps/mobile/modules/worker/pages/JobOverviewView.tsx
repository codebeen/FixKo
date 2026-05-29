import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';
import BaseModal from '@/components/ui/modal/BaseModal';
import TopBar from '@/components/ui/top-bar';
import ClientName from '@/modules/worker/components/bookingheader/ClientName';


const { width } = Dimensions.get('window');

interface InfoItemProps {
    icon: string;
    text: string;
    isBold?: boolean;
    iconFamily?: any;
}

const InfoItem = ({ icon, text, isBold = false, iconFamily: IconFam = MaterialCommunityIcons }: InfoItemProps) => (
    <View className="flex-row items-center mb-3.5">
        <IconFam name={icon} size={20} color="white" className="w-[30px]" />
        <Text className={`text-white text-sm flex-1 ${isBold ? 'font-bold text-[15px]' : ''}`}>{text}</Text>
    </View>
);

export default function JobOverviewView() {
    const {
        title, client, address, status, propertySize,
        rate, example, schedule, contact, tasks, activeTab
    } = useLocalSearchParams();

    const [successModalVisible, setSuccessModalVisible] = React.useState(false);

    const handleAcceptBooking = () => {
        setSuccessModalVisible(true);
        setTimeout(() => {
            setSuccessModalVisible(false);
            router.push({
                pathname: '/booking/ArrivedWorker',
                params: {
                    title: title || '',
                    client: client || '',
                    address: address || '',
                    propertySize: propertySize || '',
                    rate: rate || '',
                    example: example || '',
                    schedule: schedule || '',
                    contact: contact || '',
                    tasks: tasks || '',
                    status: status || '',
                    activeTab: activeTab || ''
                }
            });
        }, 1000);
    };

    const parsedTasks = React.useMemo(() => {
        if (!tasks) return [];
        if (Array.isArray(tasks)) return tasks;
        if (typeof tasks === 'string') {
            try {
                const parsed = JSON.parse(tasks);
                if (Array.isArray(parsed)) return parsed;
            } catch {
                return tasks.split(',').map(t => t.trim());
            }
        }
        return [];
    }, [tasks]);


    return (
        <BaseMain theme="navy" scrollable={false}>
            <TopBar title="Job Overview" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center' }}>

                {/* Client Section */}
                <ClientName disableMessage />

                {/* Main Info Card */}
                <View className="w-full border border-white/30 rounded-[15px] p-5 mb-3.75 bg-white/[0.03]">
                    {title && <InfoItem icon="vacuum" text={`Service: ${title}`} isBold={true} />}
                    {address && <InfoItem icon="location-on" text={`Location: ${address}`} iconFamily={MaterialIcons} />}
                    {propertySize && <InfoItem icon="arrow-expand-all" text={`Property Size: ${propertySize}`} />}
                    {rate && <InfoItem icon="currency-php" text={`Rate: ${rate}`} />}

                    <InfoItem icon="calculator" text="Estimated Total: (auto-calculated)" />
                    {example && <Text className="text-brand-grey-light text-xs ml-[30px] mb-3 mt-[-8px]">{`Example: ${example}`}</Text>}

                    {schedule && <InfoItem icon="clock-outline" text={`Schedule: ${schedule}`} />}
                    {contact && <InfoItem icon="phone" text={`Contact: ${contact}`} />}
                    {status && <InfoItem icon="information-outline" text={`Status: ${status}`} />}
                </View>

                {/* Task Container List Section */}
                {parsedTasks.length > 0 && (
                    <View className="w-full mt-5 my-3.75">
                        <Text className="text-white text-sm font-semibold mb-2">Available Tasks</Text>
                        <View className="bg-white/8 rounded-xl border border-white/20 overflow-hidden">
                            {parsedTasks.map((task, index) => (
                                <View
                                    key={index}
                                    className={`flex-row justify-between items-center py-3.5 px-4 ${index !== parsedTasks.length - 1 ? 'border-b border-b-white/10' : ''
                                        }`}
                                >
                                    <Text className="text-white text-sm flex-1 mr-2.5">{task}</Text>
                                    <Ionicons name="radio-button-on" size={16} color="rgba(255,255,255,0.4)" />
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Map Section */}
                {address && (
                    <View className="w-full rounded-[15px] mt-5 overflow-hidden h-[150px] mb-6 border border-white/15 bg-[#0D1F3C]">
                        <View className="flex-1 justify-center items-center gap-2">
                            <View className="w-10 h-10 rounded-full bg-[#66EE66]/15 justify-center items-center">
                                <Ionicons name="location" size={22} color="#66EE66" />
                            </View>
                            <Text className="text-white font-semibold text-sm">{address}</Text>
                            <Text className="text-white/40 text-xs">Job Location</Text>
                        </View>
                    </View>
                )}


                {status !== 'completed' && (
                    <View className="w-full px-5 items-center justify-center">
                        <TouchableOpacity
                            className="bg-[#66EE66] h-[50px] rounded-[25px] items-center justify-center shadow-md"
                            style={{ width: width > 500 ? '60%' : '85%' }}
                            onPress={handleAcceptBooking}
                            activeOpacity={0.8}
                        >
                            <Text className="text-[#001540] font-bold text-base">
                                Accept Booking
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* Success Sileo Alert Modal */}
            <BaseModal
                visible={successModalVisible}
                onClose={() => setSuccessModalVisible(false)}
                autoDismiss={1000}
                overlayClassName="absolute inset-0 bg-black/45"
                cardClassName="absolute top-[60px] right-5 bg-brand-navy-dark rounded-2xl border border-white/15 w-[320px] max-w-full px-5 py-[18px] shadow-2xl"
            >
                <View className="flex-row items-center">
                    <View className="w-11 h-11 rounded-full bg-[#66EE66]/15 justify-center items-center mr-4">
                        <Ionicons name="checkmark" size={24} color="#66EE66" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-white text-base font-bold tracking-[0.3px]">Booking Accepted!</Text>
                        <Text className="text-white/95 text-xs mt-0.5 leading-[17px]">
                            You have successfully accepted the booking. Let&apos;s get started!
                        </Text>
                    </View>
                </View>
            </BaseModal>

        </BaseMain>
    );
}
