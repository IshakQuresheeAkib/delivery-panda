import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { FloatingChatButton } from '@/components/layout';
import { useAuthStore } from '@/store/authStore';

export default function RiderLayout() {
  const { hasSeenNewTerms, setHasSeenNewTerms } = useAuthStore();
  const [showNewTermsModal, setShowNewTermsModal] = useState(!hasSeenNewTerms);

  const handleDismissTerms = () => {
    setShowNewTermsModal(false);
    setHasSeenNewTerms(true);
  };

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarStyle: {
            backgroundColor: Colors.white,
            borderTopColor: Colors.border,
            paddingTop: 8,
            height: 80,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            marginTop: 4,
          },
        }}
      >
        <Tabs.Screen
          name="delivery-orders"
          options={{
            title: 'Delivery orders',
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
                <Ionicons name="chatbubble-outline" size={size} color={color} />
                <View className="absolute -top-1 -right-2 bg-badge-red rounded-full w-4 h-4 items-center justify-center">
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
            title: 'Statistics',
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
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl px-6 py-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-xl font-bold text-text-primary">
                New Terms
              </Text>
              <TouchableOpacity onPress={handleDismissTerms}>
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <Text className="text-text-primary mb-6 leading-6">
              For your best safety and interest, please set up an emergency contact{' '}
              <Text className="font-bold">
                (Please do not set any staff of HungryPanda as your emergency contact)
              </Text>
              . This contact will only be used in case of emergency and will not be used for other purposes.
              Your personal information and that of your emergency contact will be protected by the Privacy Policy.
            </Text>
            <TouchableOpacity
              onPress={handleDismissTerms}
              className="bg-primary py-4 rounded-lg items-center"
            >
              <Text className="text-text-primary font-bold text-base">Fill in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
