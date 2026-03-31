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

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-text-primary text-sm mb-2 font-medium">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center bg-input-bg rounded-lg px-4 ${
          error ? 'border border-error' : ''
        }`}
      >
        {leftSlot}
        <TextInput
          className="flex-1 py-4 text-text-primary text-base"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          value={value}
          {...props}
        />
        {showClear && value && (
          <TouchableOpacity onPress={onClear} className="p-1">
            <Ionicons name="close-circle" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="p-1"
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={Colors.textMuted}
            />
          </TouchableOpacity>
        )}
        {rightSlot}
      </View>
      {error && <Text className="text-error text-xs mt-1">{error}</Text>}
    </View>
  );
};
