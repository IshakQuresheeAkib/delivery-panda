import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';

interface ToastProps {
  visible: boolean;
  message: string;
  duration?: number;
  onHide?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  duration = 3000,
  onHide,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide?.();
      });
    }
  }, [visible, duration, onHide, opacity]);

  if (!visible) return null;

  return (
    <View className="absolute bottom-24 left-4 right-4 items-center z-50">
      <Animated.View
        style={{ opacity }}
        className="bg-toast-bg px-6 py-3 rounded-full"
      >
        <Text className="text-white text-center text-sm">{message}</Text>
      </Animated.View>
    </View>
  );
};
