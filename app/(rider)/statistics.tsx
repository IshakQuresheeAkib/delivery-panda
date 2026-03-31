import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DarkHeader } from '@/components/layout';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function StatisticsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-screen-bg">
      <DarkHeader
        onMenuPress={() => router.push('/(drawer)/personal')}
        showStatus={false}
        rightIcons={[]}
      />
      
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-6">
          <Ionicons name="pie-chart-outline" size={48} color={Colors.textMuted} />
        </View>
        <Text className="text-xl font-bold text-text-primary mb-2">Statistics</Text>
        <Text className="text-text-secondary text-center">
          Earnings charts and delivery performance will be available in v2
        </Text>
      </View>
    </SafeAreaView>
  );
}
