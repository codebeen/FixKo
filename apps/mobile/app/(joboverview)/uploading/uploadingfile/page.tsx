import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

interface ButtonProps {
  title: string;
  onPress: () => void;
  bg: string;
  color: string;
}

export default function SimplifiedUpload() {
  const [image, setImage] = useState(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 3] });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const Button = ({ title, onPress, bg, color }: ButtonProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.btn, { backgroundColor: bg }]}>
      <Text style={{ color, fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text style={styles.whiteText}>Upload Photo</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.body}>
        <Text style={[styles.whiteText, styles.title]}>Upload Proof</Text>

        <TouchableOpacity style={styles.dropzone} onPress={pickImage}>
          {image ? <Image source={{ uri: image }} style={styles.img} /> : <Ionicons name="image-outline" size={60} color="white" />}
        </TouchableOpacity>

        <Button title="Upload" onPress={pickImage} bg="white" color="#001233" />
        <View style={{ height: 100 }} />
        <Button title="Mark as Completed" onPress={() => router.push('/(joboverview)/jobcomplete/complete/page' as any)} bg="#5df260" color="black" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#001233' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  body: { flex: 1, alignItems: 'center', paddingHorizontal: 30 },
  whiteText: { color: 'white', fontSize: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 40 },
  dropzone: { width: '100%', height: 200, borderWidth: 1, borderColor: '#444', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  img: { width: '100%', height: '100%', borderRadius: 15 },
  btn: { width: '100%', padding: 16, borderRadius: 30, alignItems: 'center', marginVertical: 8 }
});