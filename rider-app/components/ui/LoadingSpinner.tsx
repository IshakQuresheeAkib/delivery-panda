import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Colors } from '@/constants/colors';

interface LoadingSpinnerProps {
  visible: boolean;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  visible,
  message,
}) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/50 justify-center items-center z-50">
      <View className="bg-white rounded-2xl p-6 items-center">
        <ActivityIndicator size="large" color={Colors.primary} />
        {message && (
          <Text className="mt-3 text-text-primary font-medium">{message}</Text>
        )}
      </View>
    </View>
  );
};
