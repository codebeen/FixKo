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
            onRequestClose={onClose} // Handles hardware back button on Android
        >
            {/* The active overlay closes the modal when tapping outside the white box */}
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                
                {/* This prevents taps inside the white box from closing the modal */}
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
        // Uses your app's dark blue theme color with 60% opacity for the backdrop
        backgroundColor: 'rgba(0, 24, 81, 0.6)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 36, // Very round corners to match the mockup
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
});