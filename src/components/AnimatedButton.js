// src/components/AnimatedButton.js
import React from 'react';
import { Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedButton = ({ title, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => {
        scale.value = withSpring(1);
        onPress && onPress();
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: '#4CAF50',
            padding: 16,
            borderRadius: 8,
            marginTop: 20,
          },
          animatedStyle,
        ]}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default AnimatedButton;
