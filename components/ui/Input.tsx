import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  showClear?: boolean;
  onClear?: () => void;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftSlot,
  rightSlot,
  showClear,
  onClear,
  isPassword,
  value,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full mb-5">
      {label && (
        <Text className="text-text-primary text-sm mb-1.5 font-medium ml-1">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center bg-input-bg rounded-xl px-4 min-h-[52px] border ${
          error 
            ? 'border-error bg-error-bg/50' 
            : isFocused 
              ? 'border-primary bg-card-bg' 
              : 'border-transparent' // Subtle border when unfocused is transparent against input-bg
        } transition-colors gap-2`}
      >
        {leftSlot && <View className="mr-1">{leftSlot}</View>}
        <TextInput
          className="flex-1 py-3 text-text-primary text-base font-normal leading-tight h-full"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {showClear && value && (
          <TouchableOpacity 
            onPress={onClear} 
            className="p-2 -mr-2" // 44px min touch target offset logic
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="p-2 -mr-2" // 44px min touch target offset logic
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={isFocused ? Colors.textPrimary : Colors.textMuted}
            />
          </TouchableOpacity>
        )}
        {rightSlot && <View className="ml-1">{rightSlot}</View>}
      </View>
      {error && <Text className="text-error text-sm mt-1.5 ml-1">{error}</Text>}
    </View>
  );
};
