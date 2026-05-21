import React, { useRef, useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Pressable, Animated, Easing, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
const logo = require("../../assets/FixKoLogo.png");
import IndexTile from '../data/IndexTile.json';
import BaseLayout from '@/components/layout/BaseLayout';

interface Tag {
  label: string;
  type: string;
  title: string;
  desc: string;
  icon: string;
}

// Distribute the 7 tags into 3 rows as requested:
const row1Tags = [IndexTile[0], IndexTile[1], IndexTile[2]];
const row2Tags = [IndexTile[3], IndexTile[4]];
const row3Tags = [IndexTile[5], IndexTile[6]];

interface MarqueeRowProps {
  tags: Tag[];
  direction: 'left' | 'right';
  speed: number;
  onTagPress: (tag: Tag) => void;
  activeTag: string | null;
}

const MarqueeRow = ({
  tags,
  direction,
  speed,
  onTagPress,
  activeTag,
}: MarqueeRowProps) => {
  const [width, setWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // We duplicate the tag array a constant 5 times to form a natural, staggered continuous strip
  const strip = [...tags, ...tags, ...tags, ...tags, ...tags];

  useEffect(() => {
    if (width === 0) return;

    // Fade in when measured
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Reset initial translation value
    if (direction === 'right') {
      translateX.setValue(-width);
    } else {
      translateX.setValue(0);
    }

    const animation = Animated.loop(
      Animated.timing(translateX, {
        toValue: direction === 'left' ? -width : 0,
        duration: speed,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [width, direction, speed]);

  return (
    <Animated.View style={{ width: '100%', overflow: 'hidden', paddingVertical: 4, opacity }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          transform: [{ translateX }],
        }}
      >
        {/* First copy: this will be measured */}
        <View
          onLayout={(e) => {
            const measuredWidth = e.nativeEvent.layout.width;
            if (measuredWidth > 0 && width === 0) {
              setWidth(measuredWidth);
            }
          }}
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingRight: 10,
          }}
        >
          {strip.map((tag, i) => {
            const isActive = activeTag === tag.label;
            return (
              <TouchableOpacity
                key={`first-${tag.label}-${i}`}
                activeOpacity={0.7}
                onPress={() => onTagPress(tag)}
                style={[
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  },
                  tag.type === 'dashed'
                    ? { borderWidth: 1, borderColor: '#FFF', borderStyle: 'dashed' }
                    : { backgroundColor: '#FFF' },
                  isActive && { backgroundColor: '#7EB1F1', borderColor: '#7EB1F1' },
                ]}
              >
                <Text
                  style={[
                    { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
                    tag.type === 'solid' && { color: '#001449' },
                    isActive && { color: '#001449' },
                  ]}
                >
                  {tag.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Second copy: exact replica for seamless looping */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            paddingRight: 10,
          }}
        >
          {strip.map((tag, i) => {
            const isActive = activeTag === tag.label;
            return (
              <TouchableOpacity
                key={`second-${tag.label}-${i}`}
                activeOpacity={0.7}
                onPress={() => onTagPress(tag)}
                style={[
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'transparent',
                  },
                  tag.type === 'dashed'
                    ? { borderWidth: 1, borderColor: '#FFF', borderStyle: 'dashed' }
                    : { backgroundColor: '#FFF' },
                  isActive && { backgroundColor: '#7EB1F1', borderColor: '#7EB1F1' },
                ]}
              >
                <Text
                  style={[
                    { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
                    tag.type === 'solid' && { color: '#001449' },
                    isActive && { color: '#001449' },
                  ]}
                >
                  {tag.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [displayedTag, setDisplayedTag] = useState<string | null>(null);

  const infoOpacity = useRef(new Animated.Value(1)).current;
  const infoTranslateY = useRef(new Animated.Value(0)).current;

  const handleTagPress = (tag: Tag) => {
    if (activeTag === tag.label) {
      setActiveTag(null);
    } else {
      setActiveTag(tag.label);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(infoOpacity, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(infoTranslateY, { toValue: 8, duration: 120, useNativeDriver: true })
    ]).start(() => {
      setDisplayedTag(activeTag);
      Animated.parallel([
        Animated.timing(infoOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(infoTranslateY, { toValue: 0, duration: 250, useNativeDriver: true })
      ]).start();
    });
  }, [activeTag]);

  const currentInfo = displayedTag ? IndexTile.find(tag => tag.label === displayedTag) : null;

  return (
    <BaseLayout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Image
          source={logo}
          style={{ width: 90, height: 90, resizeMode: 'contain' }}
        />

        <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 5 }}>Supporting Filipino Workers,{'\n'}
          <Text style={{ fontSize: 18, fontWeight: 'normal', fontStyle: 'italic', color: '#CCC' }}>Serving Every Home.</Text>
        </Text>
        <Text style={{ color: '#BBB', textAlign: 'center', fontSize: 13, marginTop: 15, paddingHorizontal: 10 }}>
          Empowering the hands that build our nation. We bridge the gap between
          the hardworking Filipino and the homes that need them most.
        </Text>

        <View style={{ width: Dimensions.get('window').width, marginTop: 45, marginBottom: 25, gap: 12 }}>
          <MarqueeRow
            tags={row1Tags}
            direction="left"
            speed={18000}
            onTagPress={handleTagPress}
            activeTag={activeTag}
          />
          <MarqueeRow
            tags={row2Tags}
            direction="right"
            speed={22000}
            onTagPress={handleTagPress}
            activeTag={activeTag}
          />
          <MarqueeRow
            tags={row3Tags}
            direction="left"
            speed={16000}
            onTagPress={handleTagPress}
            activeTag={activeTag}
          />
        </View>

        {/* Interactive Information Card */}
        <Animated.View
          style={[
            {
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 16,
              padding: 16,
              width: '100%',
              marginTop: 15,
              minHeight: 85,
              justifyContent: 'center',
            },
            {
              opacity: infoOpacity,
              transform: [{ translateY: infoTranslateY }],
            },
          ]}
        >
          {currentInfo ? (
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Text style={{ fontSize: 18 }}>{currentInfo.icon}</Text>
                <Text style={{ color: '#7EB1F1', fontWeight: 'bold', fontSize: 15 }}>{currentInfo.title}</Text>
              </View>
              <Text style={{ color: '#EEE', fontSize: 13.5, lineHeight: 18 }}>{currentInfo.desc}</Text>
            </View>
          ) : (
            <Text style={{ color: '#CCC', fontSize: 13, fontStyle: 'italic', textAlign: 'center' }}>
              💡 Tap any core value above to learn more
            </Text>
          )}
        </Animated.View>
      </View>

      <View style={{ gap: 20, alignItems: 'center', marginBottom: 60 }}>
        <Pressable
          style={({ hovered, pressed }) => ({
            backgroundColor: hovered ? '#5898E5' : '#7EB1F1',
            width: '60%',
            padding: 16,
            borderRadius: 30,
            alignItems: 'center',
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: hovered ? 1.03 : 1 }],
          })}
          onPress={() => router.push('/(auth)/register/page')}
        >
          <Text style={{ color: '#001449', fontWeight: 'bold', fontSize: 16 }}>Get Started</Text>
        </Pressable>
        <Pressable
          style={({ hovered, pressed }) => ({
            opacity: pressed ? 0.7 : (hovered ? 0.8 : 1),
          })}
          onPress={() => router.push('/(auth)/login/page')}
        >
          <Text style={{ color: '#FFF', fontWeight: '600' }}>I Already have an Account</Text>
        </Pressable>
      </View>
    </BaseLayout>
  );
}