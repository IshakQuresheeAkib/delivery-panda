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
        style={{ height: screenHeight * 0.55, backgroundColor: '#E8E8E8' }}
        className="items-center justify-center"
      >
        <Ionicons name="map-outline" size={64} color={Colors.textMuted} />
        <Text className="text-text-secondary mt-4 text-center px-4">
          Map view is only available on mobile devices.
        </Text>
        <Text className="text-text-muted mt-2 text-sm">
          Please use Expo Go on your phone to see the map.
        </Text>

        <View className="absolute bottom-4 left-4 bg-white w-12 h-12 rounded-full items-center justify-center shadow-md">
          <Ionicons name="globe-outline" size={24} color={Colors.textPrimary} />
        </View>

        <View className="absolute bottom-4 right-4 bg-white w-12 h-12 rounded-full items-center justify-center shadow-md">
          <Ionicons name="refresh" size={24} color={Colors.textPrimary} />
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
