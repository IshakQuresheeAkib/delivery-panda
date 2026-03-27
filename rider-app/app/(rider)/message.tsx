import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { mockMessages, mockNoticeCount } from '@/mock/messages';

export default function MessageScreen() {
  const router = useRouter();

  const shortcuts = [
    { icon: 'pricetag-outline' as const, label: 'Event News', badge: 0 },
    { icon: 'document-text-outline' as const, label: 'Notice', badge: mockNoticeCount },
    { icon: 'book-outline' as const, label: 'knowledge base', badge: 0 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.push('/(drawer)/personal')} className="p-2">
          <Ionicons name="menu" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-primary">Message Center</Text>
        <TouchableOpacity className="p-2">
          <Ionicons name="call-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-around py-4 border-b border-gray-100">
        {shortcuts.map((item, index) => (
          <TouchableOpacity key={index} className="items-center">
            <View className="relative">
              <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
                <Ionicons name={item.icon} size={22} color={Colors.textPrimary} />
              </View>
              {item.badge > 0 && (
                <View className="absolute -top-1 -right-1 bg-badge-red rounded-full min-w-5 h-5 items-center justify-center px-1">
                  <Text className="text-white text-xs font-bold">{item.badge}</Text>
                </View>
              )}
            </View>
            <Text className="text-text-primary text-xs mt-2">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity className="flex-row items-center bg-help-center-bg px-4 py-4">
        <View className="w-10 h-10 bg-primary rounded-full items-center justify-center mr-3">
          <Ionicons name="headset-outline" size={20} color={Colors.textPrimary} />
        </View>
        <Text className="text-text-primary font-medium">help center</Text>
      </TouchableOpacity>

      <ScrollView className="flex-1">
        {mockMessages.map((message) => (
          <TouchableOpacity
            key={message.id}
            className="flex-row items-center px-4 py-4 border-b border-gray-100"
          >
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center overflow-hidden">
              {message.senderAvatar ? (
                <Image
                  source={{ uri: message.senderAvatar }}
                  className="w-full h-full"
                />
              ) : (
                <Ionicons name="person" size={24} color={Colors.textSecondary} />
              )}
            </View>
            <View className="flex-1 ml-3">
              {message.senderName && (
                <Text className="text-text-primary font-bold mb-1">
                  {message.senderName}
                </Text>
              )}
              <Text
                className="text-text-secondary text-sm"
                numberOfLines={1}
              >
                {message.preview}
              </Text>
            </View>
            <Text className="text-text-muted text-xs">{message.timestamp}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
