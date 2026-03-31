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
    <View className="flex-1 bg-screen-bg">
      <DarkHeader
        onMenuPress={() => router.push('/(drawer)/personal')}
        showStatus={false}
        rightIcons={[]}
      />
      
      <View className="flex-1 items-center justify-center px-8 pb-10">
        <View className="w-32 h-32 bg-gray-200 rounded-full items-center justify-center mb-6 shadow-sm">
          <Ionicons name="pie-chart-outline" size={56} color={Colors.textMuted} />
        </View>
        <Text className="text-2xl font-bold text-text-primary tracking-tight mb-3">Statistics</Text>
        <Text className="text-text-secondary text-base text-center leading-relaxed max-w-[280px]">
          Earnings charts and delivery performance will be available in our next update.
        </Text>
      </View>
    </View>
  );
}
