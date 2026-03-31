import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

interface FloatingChatButtonProps {
  onPress?: () => void;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute right-4 bottom-24 w-12 h-12 bg-floating-btn rounded-full items-center justify-center shadow-lg z-40"
      style={{
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View className="flex-row">
        <View className="w-1.5 h-1.5 bg-white rounded-full mx-0.5" />
        <View className="w-1.5 h-1.5 bg-white rounded-full mx-0.5" />
        <View className="w-1.5 h-1.5 bg-white rounded-full mx-0.5" />
      </View>
    </TouchableOpacity>
  );
};
