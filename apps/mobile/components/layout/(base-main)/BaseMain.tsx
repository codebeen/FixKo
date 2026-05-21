import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import NavigationMenu from './NavigationMenu';
import { Ionicons } from '@expo/vector-icons';

// BaseMain acts as a wrapper for each screen, rendering the navigation menu at the bottom.
export default function BaseMain({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../../assets/FixKoLogo.png')} style={styles.logo} />
        <TouchableOpacity>
          <Ionicons name="notifications" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      {/* Main content */}
      <View style={styles.content}>{children}</View>
      {/* Navigation bar */}
      <NavigationMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
});
