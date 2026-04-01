/**
 * MessageBubble Component
 * Displays individual chat messages with different styles for rider and customer
 */

import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Message } from '@/constants/chatTypes';
import { Colors } from '@/constants/colors';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = memo(({ message }) => {
  const isRider = message.sender === 'rider';
  const isCustomer = message.sender === 'customer';

  // Format timestamp to show time only
  const formatTime = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return '';
    }
  };

  // Get status icon for rider messages
  const getStatusIcon = () => {
    if (!isRider) return null;

    switch (message.status) {
      case 'sending':
        return <Ionicons name="time-outline" size={14} color={Colors.textMuted} />;
      case 'sent':
        return <Ionicons name="checkmark" size={14} color={Colors.textMuted} />;
      case 'delivered':
        return <Ionicons name="checkmark-done" size={14} color={Colors.primary} />;
      case 'failed':
        return <Ionicons name="alert-circle-outline" size={14} color={Colors.error} />;
      default:
        return null;
    }
  };

  return (
    <View
      className={`mb-3 px-4 flex-row ${
        isRider ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Customer avatar placeholder */}
      {isCustomer && (
        <View className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center mr-2 mt-1">
          <Ionicons name="person" size={16} color={Colors.textMuted} />
        </View>
      )}

      <View
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isRider
            ? 'bg-primary rounded-tr-sm'
            : 'bg-card-bg border border-border-soft rounded-tl-sm'
        }`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        {/* Message text */}
        <Text
          className={`text-base leading-relaxed ${
            isRider ? 'text-text-primary' : 'text-text-primary'
          }`}
        >
          {message.text}
        </Text>

        {/* Timestamp and status */}
        <View className="flex-row items-center justify-end mt-1.5 gap-1">
          <Text
            className={`text-xs ${
              isRider ? 'text-gray-700' : 'text-text-muted'
            }`}
          >
            {formatTime(message.timestamp)}
          </Text>
          {getStatusIcon()}
        </View>
      </View>

      {/* Rider avatar placeholder (optional) */}
      {isRider && (
        <View className="w-8 h-8 bg-primary/20 rounded-full items-center justify-center ml-2 mt-1">
          <Ionicons name="bicycle" size={16} color={Colors.primary} />
        </View>
      )}
    </View>
  );
};
