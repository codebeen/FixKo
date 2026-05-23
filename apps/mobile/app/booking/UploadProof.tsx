import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BaseMain from '@/components/layout/(base-main)/BaseMain';

interface ButtonProps {
    title: string;
    onPress: () => void;
    bg: string;
    color: string;
}

export default function UploadProof() {
    const [images, setImages] = useState<string[]>([]);
    const router = useRouter();
    const { 
        title, client, address, propertySize, rate, 
        example, schedule, contact, tasks, status, activeTab 
    } = useLocalSearchParams();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ 
            allowsMultipleSelection: true,
            quality: 1
        });
        if (!result.canceled) {
            const newUris = result.assets.map(asset => asset.uri);
            setImages(prev => [...prev, ...newUris]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const Button = ({ title, onPress, bg, color }: ButtonProps) => (
        <TouchableOpacity onPress={onPress} style={[styles.btn, { backgroundColor: bg }]}>
            <Text style={{ color, fontWeight: '600' }}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <BaseMain theme="navy" scrollable={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Upload Photo</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
                <Text style={[styles.whiteText, styles.title]}>Upload Proof</Text>

                {images.length > 0 ? (
                    <View style={styles.imageGrid}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageScroll}>
                            {images.map((uri, idx) => (
                                <View key={idx} style={styles.imageWrapper}>
                                    <Image source={{ uri }} style={styles.thumbnail} />
                                    <TouchableOpacity style={styles.removeBadge} onPress={() => removeImage(idx)}>
                                        <Ionicons name="close" size={14} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity style={styles.addMoreCard} onPress={pickImage}>
                                <Ionicons name="add" size={28} color="white" />
                                <Text style={styles.addMoreText}>Add More</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.dropzone} onPress={pickImage}>
                        <Ionicons name="images-outline" size={50} color="white" style={{ marginBottom: 12 }} />
                        <Text style={styles.dropzoneText}>Select Proof Photos</Text>
                        <Text style={styles.dropzoneSubtext}>Tap to pick multiple images</Text>
                    </TouchableOpacity>
                )}

                <Button title="Select Photos" onPress={pickImage} bg="white" color="#001233" />
                <View style={{ height: 40 }} />
                
                <TouchableOpacity 
                    style={[styles.completeBtn, images.length === 0 && styles.disabledCompleteBtn]} 
                    disabled={images.length === 0}
                    onPress={() => router.push({
                        pathname: '/booking/JobCompleted',
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
                    })}
                    activeOpacity={images.length > 0 ? 0.8 : 1}
                >
                    <Text style={[styles.completeBtnText, images.length === 0 && styles.disabledCompleteBtnText]}>
                        Mark as Completed
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </BaseMain>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, alignItems: 'center' },
    backButton: { padding: 4 },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: '700' },
    body: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 40 },
    whiteText: { color: 'white', fontSize: 16 },
    title: { fontSize: 22, fontWeight: 'bold', marginVertical: 30, color: 'white' },
    dropzone: { 
        width: '100%', 
        height: 200, 
        borderWidth: 1.5, 
        borderStyle: 'dashed',
        borderColor: 'rgba(255,255,255,0.3)', 
        borderRadius: 15, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 30,
        backgroundColor: 'rgba(255,255,255,0.03)'
    },
    dropzoneText: { color: 'white', fontSize: 16, fontWeight: '600', marginBottom: 4 },
    dropzoneSubtext: { color: 'rgba(255,255,255,0.5)', fontSize: 12 },
    imageGrid: { width: '100%', height: 160, marginBottom: 30 },
    imageScroll: { alignItems: 'center', gap: 12, flexDirection: 'row' },
    imageWrapper: { width: 110, height: 140, borderRadius: 12, overflow: 'visible', position: 'relative' },
    thumbnail: { width: '100%', height: '100%', borderRadius: 12 },
    removeBadge: { 
        position: 'absolute', 
        top: -6, 
        right: -6, 
        backgroundColor: '#FF3B30', 
        width: 22, 
        height: 22, 
        borderRadius: 11, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3
    },
    addMoreCard: { 
        width: 110, 
        height: 140, 
        borderRadius: 12, 
        borderWidth: 1.5, 
        borderStyle: 'dashed',
        borderColor: 'rgba(255,255,255,0.3)', 
        backgroundColor: 'rgba(255,255,255,0.03)',
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    addMoreText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4, fontWeight: '600' },
    btn: { width: '100%', padding: 16, borderRadius: 30, alignItems: 'center', marginVertical: 8 },
    completeBtn: {
        backgroundColor: '#5df260',
        width: '100%',
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 8
    },
    disabledCompleteBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    completeBtnText: {
        color: '#001a4d',
        fontWeight: 'bold',
        fontSize: 16
    },
    disabledCompleteBtnText: {
        color: 'rgba(255, 255, 255, 0.3)'
    }
});