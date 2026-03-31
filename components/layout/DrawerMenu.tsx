import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { mockRider } from '@/mock/rider';

interface DrawerMenuProps {
  onClose: () => void;
}

interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
}

const menuItems: MenuItem[] = [
  { icon: 'gift-outline', label: 'My Activity', route: '/(drawer)/my-activity' },
  { icon: 'card-outline', label: 'Account', route: '/(drawer)/account' },
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ onClose }) => {
  const router = useRouter();

  const navigateTo = (route: string) => {
    onClose();
    router.push(route as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-header-bg px-4 py-6">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color={Colors.headerText} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigateTo('/(drawer)/settings')}
            className="p-2"
          >
            <Ionicons name="settings-outline" size={24} color={Colors.headerText} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          onPress={() => navigateTo('/(drawer)/personal')}
          className="flex-row items-center mt-4"
        >
          <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center overflow-hidden">
            {mockRider.avatar ? (
              <Image
                source={{ uri: mockRider.avatar }}
                className="w-full h-full"
              />
            ) : (
              <Ionicons name="person" size={32} color={Colors.textMuted} />
            )}
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-white font-bold text-lg" numberOfLines={1}>
              {mockRider.displayName}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.headerText} />
        </TouchableOpacity>
      </View>

      <View className="bg-primary mx-4 my-4 rounded-lg p-4">
        <Text className="text-text-primary font-bold">Integrity Reporting</Text>
        <Text className="text-text-primary text-sm mt-1">
          report@hungrypandagroup.com
        </Text>
      </View>

      <ScrollView className="flex-1">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigateTo(item.route)}
            className="flex-row items-center px-4 py-4 border-b border-gray-100"
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={Colors.textPrimary}
            />
            <Text className="text-text-primary text-base ml-4 flex-1">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
