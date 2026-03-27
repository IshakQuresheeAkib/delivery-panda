import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function AdminDashboard() {
  return (
    <SafeAreaView className="flex-1 bg-screen-bg">
      <View className="bg-header-bg px-4 py-4">
        <Text className="text-white text-xl font-bold">Admin Dashboard</Text>
      </View>
      
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-6">
          <Ionicons name="settings-outline" size={48} color={Colors.textMuted} />
        </View>
        <Text className="text-xl font-bold text-text-primary mb-2">Admin Panel</Text>
        <Text className="text-text-secondary text-center">
          Admin dashboard will be available in v2.{'\n'}
          To preview this screen, set role to 'admin' in Zustand store.
        </Text>
      </View>
    </SafeAreaView>
  );
}
