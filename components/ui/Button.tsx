import React, { useState } from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
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
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getButtonStyle = () => {
    // 44px min-h touch target, safe padding, modern xl rounding
    const base = 'w-full min-h-[48px] py-3.5 px-4 rounded-xl items-center justify-center flex-row gap-2 transition-all';
    
    if (disabled || loading) {
      if (variant === 'text') return `${base} opacity-50`;
      return `${base} bg-gray-200 border border-gray-200`;
    }
    
    switch (variant) {
      case 'primary':
        return `${base} ${isPressed ? 'bg-[#E0AA00]' : 'bg-primary'} border border-transparent shadow-sm`;
      case 'outlined':
        return `${base} bg-transparent border border-border-soft ${isPressed ? 'bg-gray-50' : ''}`;
      case 'text':
        return `${base} bg-transparent border border-transparent ${isPressed ? 'bg-gray-100' : ''}`;
      default:
        return `${base} bg-primary`;
    }
  };

  const getTextStyle = () => {
    // Better hierarchy and weight mapping
    const base = 'text-base font-semibold tracking-tight';
    
    if (disabled || loading) {
      if (variant === 'text') return `${base} text-gray-400`;
      return `${base} text-gray-400`;
    }
    
    switch (variant) {
      case 'primary':
        return `${base} text-text-primary`;
      case 'outlined':
        return `${base} text-text-primary`;
      case 'text':
        return `${base} text-text-primary`; // Standardized instead of error red
      default:
        return `${base} text-text-primary`;
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={getButtonStyle()}
      style={style}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.textPrimary : Colors.primary} size="small" />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {icon}
          <Text className={getTextStyle()} style={textStyle}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};
