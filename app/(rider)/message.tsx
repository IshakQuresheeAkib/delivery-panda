import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView className="flex-1 bg-screen-bg" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 py-3 bg-card-bg shadow-sm z-10">
        <Pressable 
          onPress={() => router.push('/(drawer)/personal')}
          className="p-3 -ml-3 active:opacity-60 min-h-[48px] min-w-[48px] items-center justify-center"
        >
          <Ionicons name="menu" size={28} color={Colors.textPrimary} />
        </Pressable>
        <Text className="text-xl font-bold tracking-tight text-text-primary">Messages</Text>
        <Pressable className="p-3 -mr-3 active:opacity-60 min-h-[48px] min-w-[48px] items-center justify-center">
          <Ionicons name="call-outline" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <View className="flex-row justify-around py-5 bg-card-bg mb-2">
        {shortcuts.map((item, index) => (
          <Pressable 
            key={index} 
            className="items-center active:opacity-60"
            style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          >
            <View className="relative mb-2">
              <View className="w-14 h-14 bg-blue-50/50 rounded-2xl items-center justify-center border border-blue-100/50">
                <Ionicons name={item.icon} size={28} color={Colors.primary} />
              </View>
              {item.badge > 0 && (
                <View className="absolute -top-1.5 -right-1.5 bg-badge-red rounded-full min-w-[22px] h-[22px] items-center justify-center px-1.5 border-2 border-card-bg">
                  <Text className="text-white text-[10px] font-bold">{item.badge}</Text>
                </View>
              )}
            </View>
            <Text className="text-text-secondary text-sm font-medium">{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable 
          className="flex-row items-center bg-white mx-4 mt-2 px-4 py-4 rounded-2xl shadow-sm border border-border-soft mb-6 active:bg-gray-50"
        >
          <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mr-4">
            <Ionicons name="headset" size={24} color={Colors.cardBg} />
          </View>
          <View className="flex-1">
            <Text className="text-text-primary font-bold text-base mb-0.5">Help Center</Text>
            <Text className="text-text-muted text-sm">Get immediate assistance</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </Pressable>

        <View className="px-4 mb-3">
          <Text className="text-text-primary text-lg font-bold tracking-tight">Recent</Text>
        </View>

        <View className="bg-card-bg border-y border-border-soft">
          {mockMessages.map((message, idx) => (
            <Pressable
              key={message.id}
              className={`flex-row items-center px-4 py-4 active:bg-gray-50 ${
                idx !== mockMessages.length - 1 ? 'border-b border-border-soft' : ''
              }`}
            >
              <View className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center overflow-hidden border border-border-soft">
                {message.senderAvatar ? (
                  <Image
                    source={{ uri: message.senderAvatar }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="person" size={24} color={Colors.textMuted} />
                )}
              </View>
              <View className="flex-1 ml-4 justify-center">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-text-primary font-bold text-base tracking-tight truncate flex-1 pr-2">
                    {message.senderName || 'System Message'}
                  </Text>
                  <Text className="text-text-muted text-xs font-medium shrink-0">
                    {message.timestamp}
                  </Text>
                </View>
                <Text
                  className="text-text-secondary text-sm leading-relaxed pr-2"
                  numberOfLines={2}
                >
                  {message.preview}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
