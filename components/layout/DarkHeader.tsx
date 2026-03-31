import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
      className="bg-header-bg"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={onMenuPress} className="p-2">
          <Ionicons name="menu" size={24} color={Colors.headerText} />
        </TouchableOpacity>

        {showStatus && (
          <TouchableOpacity
            onPress={() => setIsOnline(!isOnline)}
            className="flex-row items-center"
          >
            <View
              className={`w-3 h-3 rounded-full mr-2 ${
                isOnline ? 'bg-status-online' : 'bg-status-offline'
              }`}
            />
            <Text className="text-white font-medium">
              {isOnline ? 'Online' : 'Offline'}
            </Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={Colors.headerText}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        )}

        <View className="flex-row items-center">
          {rightIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={icon.onPress}
              className="p-2 ml-2"
            >
              <Ionicons name={icon.name} size={22} color={Colors.headerText} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};
