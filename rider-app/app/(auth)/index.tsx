import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { languages } from '@/constants/colors';

export default function WelcomeScreen() {
  const router = useRouter();
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <SafeAreaView className="flex-1 bg-screen-bg">
      <View className="flex-row justify-between items-center px-4 pt-4">
        <View className="w-12 h-12 items-center justify-center">
          <Text className="text-2xl">🐼</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowLanguages(true)}
          className="flex-row items-center bg-white px-4 py-2 rounded-full border border-gray-200"
        >
          <Text className="text-text-primary mr-1">{selectedLanguage}</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.textPrimary} />
        </TouchableOpacity>
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
        <View className="h-4" />
        <Button
          title="Register as a rider"
          onPress={() => router.push('/(auth)/register')}
          variant="outlined"
        />
      </View>

      <Modal
        visible={showLanguages}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLanguages(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <SafeAreaView className="bg-white rounded-t-3xl">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-text-primary">
                Select Language
              </Text>
              <TouchableOpacity onPress={() => setShowLanguages(false)}>
                <Ionicons name="close" size={24} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedLanguage(item.name);
                    setShowLanguages(false);
                  }}
                  className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${
                    selectedLanguage === item.name ? 'bg-primary/10' : ''
                  }`}
                >
                  <Text className="text-text-primary text-base">{item.name}</Text>
                  {selectedLanguage === item.name && (
                    <Ionicons name="checkmark" size={20} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
