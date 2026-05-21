import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
  Text as SvgText,
  Polygon,
} from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G) as any;

export default function LogoAnimation() {
  // Gear rotation/rock animation
  const gearAnim = useRef(new Animated.Value(0)).current;
  // Wrench swing animation
  const wrenchAnim = useRef(new Animated.Value(0)).current;
  
  // House Sparkles twinkle
  const sparkle1Anim = useRef(new Animated.Value(0)).current;
  const sparkle2Anim = useRef(new Animated.Value(0)).current;
  const sparkle3Anim = useRef(new Animated.Value(0)).current;
  
  // Text Sparkles twinkle
  const sparkleText1Anim = useRef(new Animated.Value(0)).current;
  const sparkleText2Anim = useRef(new Animated.Value(0)).current;
  const sparkleText3Anim = useRef(new Animated.Value(0)).current;
  
  // Text float and scaling animations
  const textFloat1Anim = useRef(new Animated.Value(0)).current;
  const textFloat2Anim = useRef(new Animated.Value(0)).current;
  const phPulseAnim = useRef(new Animated.Value(0)).current;
  const sunWaggleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Gear rocking loop
    const gearLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(gearAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(gearAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // 2. Wrench swing loop
    const wrenchLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(wrenchAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(wrenchAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    // Helper for sparkle loop with stagger/delay
    const startSparkle = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Helper for floating text
    const startFloat = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    // 5. PH pulse loop
    const phLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(phPulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(phPulseAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // 6. Sun waggle loop
    const sunLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(sunWaggleAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(sunWaggleAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const s1 = startSparkle(sparkle1Anim, 0);
    const s2 = startSparkle(sparkle2Anim, 300);
    const s3 = startSparkle(sparkle3Anim, 600);
    
    const st1 = startSparkle(sparkleText1Anim, 150);
    const st2 = startSparkle(sparkleText2Anim, 450);
    const st3 = startSparkle(sparkleText3Anim, 750);

    const f1 = startFloat(textFloat1Anim, 0);
    const f2 = startFloat(textFloat2Anim, 500);

    // Start all animations parallelly
    Animated.parallel([
      gearLoop,
      wrenchLoop,
      s1, s2, s3,
      st1, st2, st3,
      f1, f2,
      phLoop,
      sunLoop,
    ]).start();

    return () => {
      gearLoop.stop();
      wrenchLoop.stop();
      s1.stop(); s2.stop(); s3.stop();
      st1.stop(); st2.stop(); st3.stop();
      f1.stop(); f2.stop();
      phLoop.stop();
      sunLoop.stop();
    };
  }, []);

  // Interpolate Gear Rocking
  const gearRotation = gearAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-12deg', '12deg'],
  });

  // Interpolate Wrench Swing
  const wrenchRotation = wrenchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '25deg'],
  });

  // Sparkles Interpolations
  const getSparkleStyle = (anim: Animated.Value, tx: number, ty: number, baseScale: number = 1.0) => {
    return {
      opacity: anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
      }),
      transform: [
        { translateX: tx },
        { translateY: ty },
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 * baseScale, 1.3 * baseScale],
          }),
        },
        {
          rotate: anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['-20deg', '45deg'],
          }),
        },
      ],
    };
  };

  // Text Floating
  const textFloat1 = textFloat1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, -3],
  });
  const textFloat2 = textFloat2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, -3],
  });

  // PH pulse
  const phScale = phPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.08],
  });
  const phRotate = phPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '4deg'],
  });

  // Sun waggle
  const sunRotation = sunWaggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-8deg', '8deg'],
  });

  return (
    <View style={styles.container}>
      <Svg
        viewBox="0 0 600 480"
        style={styles.svg}
      >
        <Defs>
          <SvgLinearGradient id="primaryGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#003B9F" />
            <Stop offset="100%" stopColor="#DBA92E" />
          </SvgLinearGradient>
          <SvgLinearGradient id="wrenchGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#003B9F" />
            <Stop offset="50%" stopColor="#556b82" />
            <Stop offset="100%" stopColor="#DBA92E" />
          </SvgLinearGradient>
          <SvgLinearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#003B9F" />
            <Stop offset="100%" stopColor="#2C3E50" />
          </SvgLinearGradient>
          <SvgLinearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#93C5FD" />
            <Stop offset="100%" stopColor="#2563EB" />
          </SvgLinearGradient>
          <SvgLinearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FCA5A5" />
            <Stop offset="100%" stopColor="#DC2626" />
          </SvgLinearGradient>
        </Defs>

        {/* HOUSE AND SPARKLES GROUP */}
        <G transform="translate(120, 10)">
          {/* Twinkling Sparkles (Left, Top Right, Bottom Right) */}
          <AnimatedG style={getSparkleStyle(sparkle1Anim, 60, 40, 1.0)}>
            <Path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#DBA92E" />
          </AnimatedG>

          <AnimatedG style={getSparkleStyle(sparkle2Anim, 320, 60, 0.7)}>
            <Path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#DBA92E" />
          </AnimatedG>

          <AnimatedG style={getSparkleStyle(sparkle3Anim, 340, 180, 0.5)}>
            <Path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#DBA92E" />
          </AnimatedG>

          {/* Gear Outline with dynamic rocking */}
          <AnimatedG
            style={{
              transform: [
                { rotate: gearRotation }
              ]
            }}
            originX={180}
            originY={180}
          >
            <Path
              d="M 230 50 L 245 30 L 275 50 L 260 75 A 110 110 0 0 1 285 110 L 315 105 L 325 135 L 295 145 A 110 110 0 0 1 290 190 L 315 210 L 295 240 L 265 220 A 110 110 0 0 1 220 255 L 220 285 L 190 285 L 195 255"
              fill="none"
              stroke="#DBA92E"
              strokeWidth="8"
              strokeLinejoin="round"
            />
          </AnimatedG>

          {/* Roof Fill */}
          <Path d="M 110 140 C 80 140 80 130 100 110 L 180 20 L 260 110 C 280 130 280 140 250 140 Z" fill="white" />
          {/* Roof Outline */}
          <Path d="M 110 140 C 80 140 80 130 100 110 L 180 20 L 260 110 C 280 130 280 140 250 140" fill="none" stroke="url(#primaryGrad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Base Box Fill & Outline */}
          <Rect x="80" y="160" width="200" height="120" fill="white" stroke="url(#primaryGrad)" strokeWidth="8" strokeLinejoin="round" />

          {/* Inner Blocks */}
          <G>
            <Rect x="110" y="180" width="55" height="40" fill="#003B9F" />
            <Rect x="195" y="180" width="55" height="40" fill="url(#blockGrad)" />
            <Rect x="110" y="235" width="55" height="41" fill="#003B9F" />
          </G>

          {/* Wrench Overlay with dynamic swinging */}
          <AnimatedG
            style={{
              transform: [
                { rotate: wrenchRotation }
              ]
            }}
            originX={120}
            originY={80}
          >
            <G transform="translate(120, 80) rotate(35)">
              <Rect x="-30" y="-10" width="60" height="20" fill="url(#wrenchGrad)" />
              {/* Left Head */}
              <Path d="M -40 -20 A 22 22 0 1 0 -40 20 L -20 20 L -20 8 L -45 8 L -45 -8 L -20 -8 L -20 -20 Z" fill="#003B9F" />
              {/* Right Head */}
              <Path d="M 40 -20 A 22 22 0 1 1 40 20 L 20 20 L 20 8 L 45 8 L 45 -8 L 20 -8 L 20 -20 Z" fill="#DBA92E" />
            </G>
          </AnimatedG>
        </G>

        {/* TEXT GRAPHIC GROUP */}
        <G transform="translate(15, 290)">
          {/* Animated floating "Fix" */}
          <AnimatedG
            style={{
              transform: [
                { translateY: textFloat1 }
              ]
            }}
          >
            <SvgText
              x="30"
              y="150"
              fontFamily="System"
              fontWeight="900"
              fontStyle="italic"
              fontSize="130"
              fill="url(#blueGrad)"
            >
              Fix
            </SvgText>
          </AnimatedG>

          {/* Animated floating "Ko" */}
          <AnimatedG
            style={{
              transform: [
                { translateY: textFloat2 }
              ]
            }}
          >
            <SvgText
              x="220"
              y="150"
              fontFamily="System"
              fontWeight="900"
              fontStyle="italic"
              fontSize="130"
              fill="url(#redGrad)"
            >
              Ko
            </SvgText>
          </AnimatedG>

          {/* Animated pulsing "PH" */}
          <AnimatedG
            style={{
              transform: [
                { scale: phScale },
                { rotate: phRotate }
              ]
            }}
            originX={485}
            originY={90}
          >
            <SvgText
              x="400"
              y="110"
              fontFamily="System"
              fontWeight="900"
              fontStyle="italic"
              fontSize="55"
              fill="#FACC15"
            >
              PH
            </SvgText>
          </AnimatedG>

          {/* Waggling Half Sun */}
          <AnimatedG
            style={{
              transform: [
                { rotate: sunRotation }
              ]
            }}
            originX={490}
            originY={50}
          >
            <G transform="translate(490, 50)">
              <Path d="M -30 0 A 30 30 0 0 1 30 0 Z" fill="#FACC15" />
              {[-70, -45, -20, 0, 20, 45, 70].map((angle, i) => (
                <Polygon
                  key={i}
                  points="-4,-35 4,-35 0,-48"
                  transform={`rotate(${angle} 0 0)`}
                  fill="#FACC15"
                />
              ))}
            </G>
          </AnimatedG>

          {/* Animated Text Sparkles */}
          <AnimatedG style={getSparkleStyle(sparkleText1Anim, 180, 40, 1.0)}>
            <Path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#FEF08A" />
          </AnimatedG>

          <AnimatedG style={getSparkleStyle(sparkleText2Anim, 560, 30, 0.7)}>
            <Path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#FEF08A" />
          </AnimatedG>

          <AnimatedG style={getSparkleStyle(sparkleText3Anim, 580, 60, 0.5)}>
            <Path d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z" fill="#FEF08A" />
          </AnimatedG>
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 380,
    aspectRatio: 600 / 480,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    alignSelf: 'center',
  },
  svg: {
    width: '100%',
    height: '100%',
    overflow: 'visible',
  },
});
