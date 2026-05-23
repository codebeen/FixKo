// components/BaseModal.tsx
import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

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
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 24, 81, 0.6)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%', // Slightly wider to fit the columns
        backgroundColor: 'white',
        borderRadius: 20, // Adjusted to match the inspo's squarer corners
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
});