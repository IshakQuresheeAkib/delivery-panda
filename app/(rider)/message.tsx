/**
 * Message/Chat Screen for Rider
 * Real-time chat with customers using Socket.io
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  AppState,
  AppStateStatus,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useChatStore } from '@/store/chatStore';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import type { Message } from '@/constants/chatTypes';

export default function MessageScreen() {
  const router = useRouter();
  const { orderId: orderIdParam } = useLocalSearchParams<{
    orderId?: string | string[];
  }>();
  const flatListRef = useRef<FlatList>(null);

  // Chat store state and actions
  const {
    isConnected,
    connectionError,
    customerInfo,
    messages,
    connect,
    disconnect,
    sendMessage,
  } = useChatStore();

  const routeOrderId = Array.isArray(orderIdParam) ? orderIdParam[0] : orderIdParam;
  conAppState management to reconnect on foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && !isConnected) {
        console.log('[MessageScreen] App came to foreground, reconnecting...');
        connect(activeOrderId);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isConnected, activeOrderId, connect]);

  // st activeOrderId = routeOrderId ?? 'ORDER_001';

  // Connect to chat when component mounts
  useEffect(() => {
    console.log('[MessageScreen] Connecting to chat for order:', activeOrderId);
    connect(activeOrderId);

    // Cleanup: disconnect when component unmounts
    return () => {
      console.log('[MessageScreen] Disconnecting from chat');
      disconnect();
    };
  }, [activeOrderId, connect, disconnect]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
      // Small delay to ensure FlatList has rendered
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    sendMessage(text);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6">
      <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
        <Ionicons name="chatbubbles-outline" size={40} color={Colors.textMuted} />
      </View>
      <Text className="text-text-primary text-lg font-bold mb-2">
        Start a conversation
      </Text>
      <Text className="text-text-secondary text-center text-sm">
        Send a message to the customer about their delivery
      </Text>
    </View>
  );

  const renderConnectionError = () => (
    <View className="bg-error-bg border-l-4 border-error px-4 py-3 mx-4 my-2 rounded">
      <View className="flex-row items-center">
        <Ionicons name="alert-circle" size={20} color={Colors.error} />
        <Text className="text-error text-sm font-medium ml-2 flex-1">
          {connectionError || 'Unable to connect to chat server'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-screen-bg" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-card-bg shadow-sm z-10">
        <Pressable
          onPress={() => router.back()}
          className="p-3 -ml-3 active:opacity-60 min-h-[48px] min-w-[48px] items-center justify-center"
        >
          <Ionicons name="arrow-back" size={28} color={Colors.textPrimary} />
        </Pressable>

        {/* Customer info */}
        <View className="flex-1 items-center">
          {customerInfo ? (
            <View className="items-center">
              <Text className="text-lg font-bold tracking-tight text-text-primary">
                {customerInfo.customerName}
              </Text>
              <View className="flex-row items-center mt-0.5">
                <View
                  className={`w-2 h-2 rounded-full mr-1.5 ${
                    isConnected ? 'bg-online' : 'bg-offline'
                  }`}
                />
                <Text className="text-xs text-text-secondary">
                  {isConnected ? 'Connected' : 'Connecting...'}
                </Text>
              </View>
            </View>
          ) : (
            <Text className="text-xl font-bold tracking-tight text-text-primary">
              Customer Chat
            </Text>
          )}
        </View>

        <Pressable
          className="p-3 -mr-3 active:opacity-60 min-h-[48px] min-w-[48px] items-center justify-center"
          onPress={() => {
            /* Add call functionality */
          }}
        >
          <Ionicons name="call-outline" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      {/* Connection error banner */}
      {connectionError && renderConnectionError()}

      {/* Customer delivery address */}
      {customerInfo && (
        <View className="bg-primary/10 px-4 py-3 border-b border-border-soft">
          <View className="flex-row items-center">
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text className="text-text-secondary text-sm ml-2 flex-1">
              {customerInfo.deliveryAddress}
            </Text>
          </View>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        className="flex-1"
      >
        {/* initialNumToRender={15}
            maxToRenderPerBatch={10}
            Messages List */}
        {!isConnected && messages.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text className="text-text-secondary text-sm mt-3">
              Connecting to chat...
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingTop: 16,
              paddingBottom: 16,
              flexGrow: 1,
            }}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
          />
        )}

        {/* Chat Input */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={!isConnected}
          placeholder={
            isConnected
              ? 'Type a message...'
              : 'Connecting to chat...'
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
