// src/animations/useFadeIn.js
import { useSharedValue, withTiming } from 'react-native-reanimated';

export const useFadeIn = () => {
  const opacity = useSharedValue(0);

  const startFadeIn = () => {
    opacity.value = withTiming(1, { duration: 800 });
  };

  return { opacity, startFadeIn };
};
