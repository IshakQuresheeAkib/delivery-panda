import React, { useState } from 'react';
import { View, Modal, Text, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { FloatingChatButton } from '@/components/layout';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';

export default function RiderLayout() {
  const { hasSeenNewTerms, setHasSeenNewTerms } = useAuthStore();
  const [showNewTermsModal, setShowNewTermsModal] = useState(!hasSeenNewTerms);
  const insets = useSafeAreaInsets();

  const handleDismissTerms = () => {
    setShowNewTermsModal(false);
    setHasSeenNewTerms(true);
  };

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primaryDark || Colors.primary,
          tabBarInactiveTintColor: Colors.textMuted,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB', // border-soft
            borderTopWidth: 1,
            paddingTop: 8,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom || 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="delivery-orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="receipt-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            title: 'Message',
            tabBarIcon: ({ color, size }) => (
              <View>
                <Ionicons name="chatbubbles-outline" size={size} color={color} />
                <View className="absolute -top-1.5 -right-2 bg-error rounded-full min-w-[18px] h-[18px] items-center justify-center px-1 border-2 border-white">
                  <Text className="text-white text-[10px] font-bold">9</Text>
                </View>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="plan"
          options={{
            title: 'Plan',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            title: 'Stats',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pie-chart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <FloatingChatButton onPress={() => console.log('Chat pressed')} />

      {/* New Terms Modal */}
      <Modal
        visible={showNewTermsModal}
        animationType="slide"
        transparent
        onRequestClose={handleDismissTerms}
      >
        <View className="flex-1 bg-black/60 justify-end">
          <View className="bg-card-bg rounded-t-3xl px-6 py-6 pb-12 shadow-lg">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold tracking-tight text-text-primary">
                Important Update
              </Text>
              <Pressable onPress={handleDismissTerms} className="p-2 -mr-2 rounded-full active:bg-gray-100">
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </Pressable>
            </View>
            <View className="bg-help-center-bg p-4 rounded-xl mb-6 border border-primary/20">
              <Text className="text-text-primary text-base leading-relaxed">
                For your best safety and interest, please set up an emergency contact{' '}
                <Text className="font-bold">
                  (Please do not set any staff of Delivery Panda as your emergency contact)
                </Text>
                . 
              </Text>
              <Text className="text-text-secondary text-sm mt-3 leading-snug">
                This contact will only be used in case of emergency and will not be used for other purposes. 
                Protected by Privacy Policy.
              </Text>
            </View>
            <Button
              title="Set Up Contact Now"
              onPress={handleDismissTerms}
              variant="primary"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
