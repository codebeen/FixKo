import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const ICON_SIZE = 28;
const ACTIVE_COLOR = '#ff7e5f'; // vibrant gradient start
const INACTIVE_COLOR = '#555';

export default function NavigationMenu() {
  const router = useRouter();
  const [active, setActive] = React.useState<'home' | 'booking' | 'reviews' | 'settings'>('home');
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const onPress = (route: string, name: typeof active) => {
    setActive(name);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.85, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    router.push(route);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress('/home', 'home')} style={styles.item}>
        <Animated.View style={{ transform: [{ scale: active === 'home' ? scaleAnim : 1 }] }}>
          <Ionicons name="home" size={ICON_SIZE} color={active === 'home' ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress('/booking', 'booking')} style={styles.item}>
        <Animated.View style={{ transform: [{ scale: active === 'booking' ? scaleAnim : 1 }] }}>
          <MaterialIcons name="calendar-today" size={ICON_SIZE} color={active === 'booking' ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress('/reviews', 'reviews')} style={styles.item}>
        <Animated.View style={{ transform: [{ scale: active === 'reviews' ? scaleAnim : 1 }] }}>
          <MaterialIcons name="rate-review" size={ICON_SIZE} color={active === 'reviews' ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress('/settings', 'settings')} style={styles.item}>
        <Animated.View style={{ transform: [{ scale: active === 'settings' ? scaleAnim : 1 }] }}>
          <Ionicons name="settings" size={ICON_SIZE} color={active === 'settings' ? ACTIVE_COLOR : INACTIVE_COLOR} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
});
