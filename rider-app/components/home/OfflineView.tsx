import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/ui';
import { mockRider } from '@/mock/rider';

const { height: screenHeight } = Dimensions.get('window');

interface OfflineViewProps {
  onGoOnline: () => void;
}

export const OfflineView: React.FC<OfflineViewProps> = ({ onGoOnline }) => {
  return (
    <View className="flex-1">
      <View
        className="bg-blue-100 relative"
        style={{ height: screenHeight * 0.5 }}
      >
        <View className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-md">
          <Text className="font-bold text-sm text-text-primary">Very busy</Text>
          <View className="flex-row items-center mt-2">
            <View className="w-4 h-8 bg-red-600 rounded mr-2" />
            <View className="flex-1">
              <View className="h-2 bg-red-400 rounded mb-1" />
              <Text className="text-xs text-text-secondary">Busy</Text>
            </View>
          </View>
        </View>

        <View className="absolute bottom-16 left-4 bg-header-bg/90 rounded-lg px-4 py-2 max-w-[80%]">
          <View className="flex-row items-center">
            <Text className="text-white text-xs flex-1">
              Click to toggle the multiplier graph to view the activity
            </Text>
            <Ionicons name="close" size={16} color={Colors.headerText} style={{ marginLeft: 8 }} />
          </View>
        </View>

        <View className="absolute bottom-4 left-4 bg-white w-12 h-12 rounded-full items-center justify-center shadow-md">
          <Ionicons name="globe-outline" size={24} color={Colors.textPrimary} />
        </View>

        <View className="absolute bottom-4 right-4 bg-white w-12 h-12 rounded-full items-center justify-center shadow-md">
          <Ionicons name="refresh" size={24} color={Colors.textPrimary} />
        </View>

        <View className="absolute top-4 right-24 bg-white w-10 h-10 rounded-full items-center justify-center shadow-md">
          <Ionicons name="help" size={20} color={Colors.textPrimary} />
        </View>

        <View className="flex-1 items-center justify-center">
          <View className="w-24 h-24 bg-blue-200 rounded-full items-center justify-center">
            <Text className="text-4xl">🐼</Text>
          </View>
        </View>
      </View>

      <View className="flex-1 bg-white px-4 py-6">
        <View className="flex-row items-center mb-2">
          <Text className="text-2xl mr-2">🐼</Text>
          <Text className="text-text-primary text-lg">
            Hi, <Text className="font-bold">{mockRider.name}</Text>
          </Text>
        </View>
        <Text className="text-text-primary font-bold text-xl mb-6">
          Wasting time is robbing yourself.
        </Text>
        <Button title="Go Online" onPress={onGoOnline} variant="primary" />
      </View>
    </View>
  );
};
