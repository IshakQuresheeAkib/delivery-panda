import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

interface DarkHeaderProps {
  onMenuPress?: () => void;
  showStatus?: boolean;
  rightIcons?: Array<{
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  }>;
}

export const DarkHeader: React.FC<DarkHeaderProps> = ({
  onMenuPress,
  showStatus = true,
  rightIcons = [],
}) => {
  const insets = useSafeAreaInsets();
  const { isOnline, setIsOnline } = useAuthStore();

  return (
    <View
      className="bg-header-bg shadow-sm"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center justify-between px-4 py-3 min-h-[60px]">
        {onMenuPress ? (
          <Pressable 
            onPress={onMenuPress} 
            className="p-3 -ml-3 rounded-full active:bg-white/10 transition-colors"
          >
            <Ionicons name="menu" size={26} color={Colors.headerText} />
          </Pressable>
        ) : (
          <View className="w-10" />
        )}

        {showStatus ? (
          <Pressable
            onPress={() => setIsOnline(!isOnline)}
            className="flex-row items-center justify-center bg-white/10 px-4 py-2 rounded-full active:bg-white/20 transition-colors"
          >
            <View
              className={`w-2.5 h-2.5 rounded-full mr-2 shadow-sm ${
                isOnline ? 'bg-status-online shadow-status-online/50' : 'bg-status-offline shadow-status-offline/50'
              }`}
            />
            <Text className="text-white text-base font-semibold tracking-tight">
              {isOnline ? 'Online' : 'Offline'}
            </Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color={Colors.headerText}
              style={{ marginLeft: 6 }}
            />
          </Pressable>
        ) : (
          <Text className="text-white text-lg font-bold tracking-tight">Delivery Panda</Text>
        )}

        <View className="flex-row items-center gap-1">
          {rightIcons.map((icon, index) => (
            <Pressable
              key={index}
              onPress={icon.onPress}
              className="p-3 -mr-1 rounded-full active:bg-white/10 transition-colors"
            >
              <Ionicons name={icon.name} size={24} color={Colors.headerText} />
            </Pressable>
          ))}
          {rightIcons.length === 0 && <View className="w-10" />}
        </View>
      </View>
    </View>
  );
};
