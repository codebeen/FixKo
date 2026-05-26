import React from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

type BaseModalProps = {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function BaseModal({ visible, onClose, children }: BaseModalProps) {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose} 
        >
            <TouchableOpacity className="flex-1 bg-[#001851]/60 justify-center items-center" activeOpacity={1} onPress={onClose}>
                <TouchableWithoutFeedback>
                    <View className="w-[90%] bg-white rounded-[20px] p-6 shadow-2xl">
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}