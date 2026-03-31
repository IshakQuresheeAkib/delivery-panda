import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-screen-bg">
      <View className="px-6 pt-6">
        <View className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-border-soft items-center justify-center">
          <Text className="text-2xl">🐼</Text>
        </View>
      </View>

      <View className="flex-1 px-6 pt-10">
        <Text className="text-3xl font-bold tracking-tight text-text-primary leading-tight mb-3">
          Welcome to the{'\n'}PandaDriver App
        </Text>
        <Text className="text-base font-normal text-text-secondary leading-tight">
          Join our delivery network and start earning today.
        </Text>

        <View className="flex-1 items-center justify-center">
          <View className="w-80 h-80 items-center justify-center relative">
            <View className="absolute top-0 left-8 w-8 h-6 bg-gray-300 rounded opacity-50" />
            <View className="absolute top-16 right-4 w-8 h-6 bg-gray-300 rounded opacity-50" />
            <View className="absolute bottom-24 right-4 w-8 h-6 bg-gray-300 rounded opacity-50" />
            
            <View className="absolute top-8 left-16 shadow-sm">
              <View className="w-8 h-8 bg-primary-dark rounded-full items-center justify-center">
                <Text className="text-xs font-bold text-white">$</Text>
              </View>
            </View>
            <View className="absolute top-8 right-16 shadow-sm">
              <View className="w-8 h-8 bg-status-online rounded-full items-center justify-center">
                <Text className="text-xs font-bold text-white">✓</Text>
              </View>
            </View>

            <View className="w-64 h-48 bg-primary/10 border border-primary/20 rounded-3xl items-center justify-center shadow-lg">
              <View className="bg-primary w-20 h-24 rounded-2xl items-center justify-center mb-4 shadow-sm border border-primary-dark/20">
                <Text className="text-4xl">🐼</Text>
              </View>
              <View className="w-32 h-20 bg-card-bg rounded-2xl shadow-sm border border-border-soft" />
            </View>
          </View>
        </View>
      </View>

      <View className="px-6 pb-10 gap-4 mt-auto">
        <Button
          title="Login"
          onPress={() => router.push('/(auth)/login')}
          variant="primary"
          style={{ height: 56 }}
        />
        {/* Placeholder for future registration */}
        <Button
          title="Become a Rider"
          onPress={() => {}}
          variant="outlined"
          style={{ height: 56 }}
        />
      </View>
    </SafeAreaView>
  );
}
