import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';

interface DottedGridBackgroundProps {
  color?: string;
  dotColor?: string;
  dotOpacity?: number;
}

export default function DottedGridBackground({
  color = '#12357F',
  dotColor = '#FFFFFF',
  dotOpacity = 0.08,
}: DottedGridBackgroundProps) {
  return (
    <Svg
      pointerEvents="none"
      style={StyleSheet.absoluteFillObject}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <Defs>
        <Pattern id="dottedGrid" width="28" height="28" patternUnits="userSpaceOnUse">
          <Circle cx="2" cy="2" r="1" fill={dotColor} opacity={dotOpacity} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill={color} />
      <Rect width="100%" height="100%" fill="url(#dottedGrid)" />
    </Svg>
  );
}
