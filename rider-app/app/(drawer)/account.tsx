import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function AccountScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-primary">Account</Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-6">
          <Ionicons name="card-outline" size={48} color={Colors.textMuted} />
        </View>
        <Text className="text-xl font-bold text-text-primary mb-2">Account</Text>
        <Text className="text-text-secondary text-center">
          Manage your payment methods and bank details
        </Text>
      </View>
    </SafeAreaView>
  );
}
