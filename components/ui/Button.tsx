import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outlined' | 'text';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const base = 'w-full py-4 rounded-lg items-center justify-center flex-row';
    
    if (disabled || loading) {
      return `${base} bg-gray-300`;
    }
    
    switch (variant) {
      case 'primary':
        return `${base} bg-primary`;
      case 'outlined':
        return `${base} bg-white border-2 border-text-primary`;
      case 'text':
        return `${base} bg-transparent`;
      default:
        return `${base} bg-primary`;
    }
  };

  const getTextStyle = () => {
    const base = 'text-base font-bold';
    
    if (disabled || loading) {
      return `${base} text-gray-500`;
    }
    
    switch (variant) {
      case 'primary':
        return `${base} text-text-primary`;
      case 'outlined':
        return `${base} text-text-primary`;
      case 'text':
        return `${base} text-error`;
      default:
        return `${base} text-text-primary`;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={getButtonStyle()}
      style={style}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textPrimary} />
      ) : (
        <Text className={getTextStyle()} style={textStyle}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
