import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-screen-bg">
      <View className="px-4 pt-4">
        <View className="w-12 h-12 items-center justify-center">
          <Text className="text-2xl">🐼</Text>
        </View>
      </View>

      <View className="flex-1 px-6 pt-8">
        <Text className="text-3xl font-bold text-text-primary leading-tight">
          Welcome to the{'\n'}PandaDriver App
        </Text>

        <View className="flex-1 items-center justify-center">
          <View className="w-80 h-80 items-center justify-center relative">
            <View className="absolute top-0 left-8 w-8 h-6 bg-gray-300 rounded opacity-50" />
            <View className="absolute top-16 right-4 w-8 h-6 bg-gray-300 rounded opacity-50" />
            <View className="absolute bottom-24 right-4 w-8 h-6 bg-gray-300 rounded opacity-50" />
            
            <View className="absolute top-8 left-16">
              <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                <Text className="text-xs">$</Text>
              </View>
            </View>
            <View className="absolute top-8 right-16">
              <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                <Text className="text-xs">$</Text>
              </View>
            </View>

            <View className="w-64 h-48 bg-primary/20 rounded-lg items-center justify-center">
              <View className="bg-primary w-20 h-24 rounded-lg items-center justify-center mb-2">
                <Text className="text-3xl">🐼</Text>
              </View>
              <View className="w-32 h-20 bg-gray-400 rounded-lg" />
            </View>
          </View>
        </View>
      </View>

      <View className="px-6 pb-8">
        <Button
          title="Login"
          onPress={() => router.push('/(auth)/login')}
          variant="primary"
        />
      </View>
    </SafeAreaView>
  );
}
