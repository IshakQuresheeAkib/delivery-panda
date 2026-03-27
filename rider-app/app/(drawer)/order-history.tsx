import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

const mockOrderHistory = [
  {
    id: '1',
    restaurant: 'YOMI CAKE',
    date: '2024-03-27',
    status: 'Completed',
    earnings: 7.61,
  },
  {
    id: '2',
    restaurant: 'heytea (Mayfair)',
    date: '2024-03-27',
    status: 'Completed',
    earnings: 7.02,
  },
  {
    id: '3',
    restaurant: 'Fan Northeast Traditional Bento',
    date: '2024-03-26',
    status: 'Completed',
    earnings: 7.48,
  },
];

export default function OrderHistoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-screen-bg">
      <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-primary">Order History</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 p-4">
        {mockOrderHistory.map((order) => (
          <View
            key={order.id}
            className="bg-white rounded-lg p-4 mb-3 shadow-sm"
          >
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-text-primary font-bold text-base">
                {order.restaurant}
              </Text>
              <Text className="text-certified text-sm">{order.status}</Text>
            </View>
            <Text className="text-text-secondary text-sm mb-2">{order.date}</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-text-secondary text-sm">Earnings</Text>
              <Text className="text-text-primary font-bold">
                £{order.earnings.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
