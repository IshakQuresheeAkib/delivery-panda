/**
 * ChatInput Component
 * Provides text input and send button for composing messages
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View
      className="bg-card-bg border-t border-border-soft px-4 py-3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 5,
      }}
    >
      <View className="flex-row items-center gap-2">
        {/* Text Input */}
        <View className="flex-1 bg-input-bg rounded-full px-4 py-2 flex-row items-center border border-border-soft">
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={placeholder}
            placeholderTextColor={Colors.textMuted}
            editable={!disabled}
            multiline
            maxLength={500}
            className="flex-1 text-base text-text-primary py-1.5"
            style={{
              maxHeight: 100,
              minHeight: 40,
            }}
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={handleSend}
          />

          {/* Character count (optional) */}
          {text.length > 400 && (
            <View className="ml-2">
              <Ionicons
                name="warning-outline"
                size={16}
                color={text.length >= 500 ? Colors.error : Colors.textMuted}
              />
            </View>
          )}
        </View>

        {/* Send Button */}
        <Pressable
          onPress={handleSend}
          disabled={!text.trim() || disabled}
          className={`w-12 h-12 rounded-full items-center justify-center ${
            text.trim() && !disabled
              ? 'bg-primary active:bg-primary-dark'
              : 'bg-gray-200'
          }`}
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed && text.trim() ? 0.95 : 1 }],
            },
          ]}
        >
          <Ionicons
            name="send"
            size={20}
            color={text.trim() && !disabled ? Colors.textPrimary : Colors.textMuted}
          />
        </Pressable>
      </View>
    </View>
  );
};
