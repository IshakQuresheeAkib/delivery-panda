import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Button } from '@/components/ui';
import { mockRider } from '@/mock/rider';

const { height: screenHeight } = Dimensions.get('window');

interface OfflineViewProps {
  onGoOnline: () => void;
}

export const OfflineView: React.FC<OfflineViewProps> = ({ onGoOnline }) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation({ latitude: 51.5074, longitude: -0.1278 });
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const defaultRegion = {
    latitude: location?.latitude ?? 51.5074,
    longitude: location?.longitude ?? -0.1278,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View className="flex-1">
      <View style={{ height: screenHeight * 0.55 }}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={StyleSheet.absoluteFillObject}
          region={defaultRegion}
          showsUserLocation={false}
          showsMyLocationButton={false}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
            >
              <View className="bg-primary p-2 rounded-full">
                <Ionicons name="location" size={24} color={Colors.textPrimary} />
              </View>
            </Marker>
          )}
        </MapView>

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
