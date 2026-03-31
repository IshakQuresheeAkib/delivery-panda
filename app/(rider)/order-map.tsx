import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Platform, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE, type LatLng } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import { mockPickupOrders, type Coordinates } from '@/mock/orders';

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey || '';

const RIDER_START_OFFSET = {
  latitude: -0.008,
  longitude: -0.005,
};

export default function OrderMapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const order = mockPickupOrders.find((o) => o.id === id) || mockPickupOrders[0];
  
  const restaurantCoords: Coordinates = order.restaurantCoordinates || {
    latitude: 24.8988,
    longitude: 91.8706,
  };

  const initialRiderLat = restaurantCoords.latitude + RIDER_START_OFFSET.latitude;
  const initialRiderLng = restaurantCoords.longitude + RIDER_START_OFFSET.longitude;

  const [currentRiderCoords, setCurrentRiderCoords] = useState<Coordinates>({
    latitude: initialRiderLat,
    longitude: initialRiderLng,
  });

  const animatedLat = useRef(new Animated.Value(initialRiderLat)).current;
  const animatedLng = useRef(new Animated.Value(initialRiderLng)).current;

  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    if (hasArrived) return;

    const interval = setInterval(() => {
      setCurrentRiderCoords((prev) => {
        const latDiff = restaurantCoords.latitude - prev.latitude;
        const lngDiff = restaurantCoords.longitude - prev.longitude;

        const distance = Math.sqrt(latDiff ** 2 + lngDiff ** 2);
        if (distance < 0.0005) {
          setHasArrived(true);
          clearInterval(interval);
          return restaurantCoords;
        }

        const step = 0.0008;
        const newLat = prev.latitude + (latDiff > 0 ? Math.min(step, latDiff) : Math.max(-step, latDiff));
        const newLng = prev.longitude + (lngDiff > 0 ? Math.min(step, lngDiff) : Math.max(-step, lngDiff));

        Animated.parallel([
          Animated.timing(animatedLat, {
            toValue: newLat,
            duration: 1400,
            useNativeDriver: false,
          }),
          Animated.timing(animatedLng, {
            toValue: newLng,
            duration: 1400,
            useNativeDriver: false,
          }),
        ]).start();

        return {
          latitude: newLat,
          longitude: newLng,
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [hasArrived, restaurantCoords, animatedLat, animatedLng]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [currentRiderCoords, restaurantCoords],
        {
          edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
          animated: true,
        }
      );
    }
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const handleArrivedPress = () => {
    setHasArrived(true);
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Map View */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: (currentRiderCoords.latitude + restaurantCoords.latitude) / 2,
          longitude: (currentRiderCoords.longitude + restaurantCoords.longitude) / 2,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {/* Restaurant Marker */}
        <Marker
          coordinate={restaurantCoords}
          title={order.restaurantName}
          description={order.restaurantAddress}
        >
          <View className="bg-[#fcd303] p-2 rounded-full border-2 border-white shadow-lg">
            <Ionicons name="storefront" size={20} color="black" />
          </View>
        </Marker>

        {/* Rider Marker */}
        <Marker
          coordinate={currentRiderCoords}
          title="Your Location"
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View className="bg-black p-2 rounded-full border-2 border-white shadow-lg">
            <Ionicons name="bicycle" size={20} color="#fcd303" />
          </View>
        </Marker>

        {/* Route Directions */}
        <MapViewDirections
          origin={currentRiderCoords}
          destination={restaurantCoords}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={4}
          strokeColor="#3b82f6"
          mode="DRIVING"
          onError={(error) => {
            console.log('Directions error:', error);
          }}
        />
      </MapView>

      {/* Floating Back Button */}
      <Pressable
        onPress={handleBackPress}
        style={{ top: insets.top + 10 }}
        className="absolute left-4 bg-white w-10 h-10 rounded-full items-center justify-center shadow-lg z-10"
      >
        <Ionicons name="arrow-back" size={22} color="black" />
      </Pressable>

      {/* Bottom Sheet Overlay */}
      <View 
        className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl shadow-2xl"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="p-5">
          {/* Handle Bar */}
          <View className="w-10 h-1 bg-gray-300 rounded-full self-center mb-4" />

          {/* Store Info */}
          <View className="flex-row items-start gap-3 mb-4">
            <View className="bg-[#fcd303] p-2 rounded-full">
              <Ionicons name="storefront" size={20} color="black" />
            </View>
            <View className="flex-1">
              <Text className="text-black font-bold text-lg">
                {order.restaurantName}
              </Text>
              <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
                {order.restaurantAddress}
              </Text>
            </View>
          </View>

          {/* Order Details Row */}
          <View className="flex-row justify-between items-center py-3 border-t border-gray-100">
            <View className="flex-row items-center gap-2">
              <Ionicons name="receipt-outline" size={18} color="#666" />
              <Text className="text-gray-600 text-sm">
                Order {order.orderNo || `#${order.id}`}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="restaurant-outline" size={18} color="#666" />
              <Text className="text-gray-600 text-sm">
                {order.dishesCount || 1} items
              </Text>
            </View>
          </View>

          {/* Status Indicator */}
          {hasArrived && (
            <View className="bg-green-100 px-4 py-2 rounded-lg mb-4 flex-row items-center gap-2">
              <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
              <Text className="text-green-700 font-medium">
                You have arrived at the restaurant!
              </Text>
            </View>
          )}

          {/* Action Button */}
          <Pressable
            onPress={handleArrivedPress}
            className={`py-4 rounded-xl items-center justify-center active:opacity-80 ${
              hasArrived ? 'bg-green-500' : 'bg-[#fcd303]'
            }`}
          >
            <Text className={`font-bold text-base ${hasArrived ? 'text-white' : 'text-black'}`}>
              {hasArrived ? 'Confirm & Pick Up Order' : 'Arrived at Shop'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
