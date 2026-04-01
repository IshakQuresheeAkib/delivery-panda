import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, Pressable, Platform, Animated as RNAnimated, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
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
  
  const destination = useMemo<Coordinates>(() => order.restaurantCoordinates || {
    latitude: 24.8988,
    longitude: 91.8706,
  }, [order]);

  const initialOrigin = useMemo<Coordinates>(() => ({
    latitude: destination.latitude + RIDER_START_OFFSET.latitude,
    longitude: destination.longitude + RIDER_START_OFFSET.longitude,
  }), [destination]);

  // Use AnimatedRegion to prevent map re-renders on coordinate updates
  const riderLocation = useRef(new AnimatedRegion({
    latitude: initialOrigin.latitude,
    longitude: initialOrigin.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  })).current;

  const [hasArrived, setHasArrived] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>(initialOrigin);

  useEffect(() => {
    if (hasArrived) return;

    let locationSubscription: Location.LocationSubscription | null = null;

    const startTracking = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Please grant location permissions to track the order.');
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 2000,
            distanceInterval: 5,
          },
          (location) => {
            const { latitude, longitude } = location.coords;

            // Update route origin
            setCurrentLocation({ latitude, longitude });

            // Check arrival (basic distance check)
            const latDiff = destination.latitude - latitude;
            const lngDiff = destination.longitude - longitude;
            const distance = Math.sqrt(latDiff ** 2 + lngDiff ** 2);
            
            if (distance < 0.0005) {
              setHasArrived(true);
            }

            // Animate Marker smoothly
            (riderLocation.timing as any)({
              latitude,
              longitude,
              duration: 1500,
              useNativeDriver: false,
            }).start();
          }
        );
      } catch (error) {
        console.error('Error tracking location:', error);
      }
    };

    startTracking();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [hasArrived, destination, riderLocation]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [currentLocation, destination],
        {
          edgePadding: { top: 100, right: 50, bottom: 400, left: 50 },
          animated: true,
        }
      );
    }
  }, [currentLocation, destination]);

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
          latitude: (initialOrigin.latitude + destination.latitude) / 2,
          longitude: (initialOrigin.longitude + destination.longitude) / 2,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {/* Route Directions - Updated to use live currentLocation */}
        <MapViewDirections
          origin={currentLocation}
          destination={destination}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={4}
          strokeColor="#3b82f6"
          mode="DRIVING"
          onError={(error) => console.log('Directions error:', error)}
        />

        {/* Restaurant Marker */}
        <Marker
          coordinate={destination}
          title={order.restaurantName}
          description={order.restaurantAddress}
        >
          <View className="bg-white p-1 rounded-full shadow-lg border border-gray-200">
            <View className="bg-black w-6 h-6 rounded-full items-center justify-center">
              <Ionicons name="storefront" size={12} color="white" />
            </View>
          </View>
        </Marker>

        {/* Animated Rider Marker */}
        <Marker.Animated
          coordinate={riderLocation as any}
          title="Your Location"
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View className="bg-black p-2 rounded-full border-2 border-white shadow-lg">
            <Ionicons name="bicycle" size={20} color="#fcd303" />
          </View>
        </Marker.Animated>
      </MapView>

      {/* Floating Back Button */}
      <Pressable
        onPress={handleBackPress}
        style={{ top: insets.top + 10 }}
        className="absolute left-4 bg-white w-10 h-10 rounded-full items-center justify-center shadow-lg z-10"
      >
        <Ionicons name="arrow-back" size={22} color="black" />
      </Pressable>

      {/* Toggles (Distance first / Time first) */}
      <View style={{ top: insets.top + 10 }} className="absolute left-[70px] right-4 flex-row gap-2 z-10">
        <Pressable className="flex-1 bg-white rounded-xl py-2.5 items-center justify-center flex-row gap-2 shadow-sm">
          <Ionicons name="location-outline" size={18} color="black" />
          <Text className="text-black font-semibold text-[15px]">Distance first</Text>
        </Pressable>
        <Pressable className="flex-1 bg-white rounded-xl py-2.5 items-center justify-center flex-row gap-2 shadow-sm">
          <Ionicons name="time-outline" size={18} color="black" />
          <Text className="text-black font-semibold text-[15px]">Time first</Text>
        </Pressable>
      </View>

      {/* Bottom Sheet Overlay matching image exactly */}
      <View 
        className="absolute left-0 right-0 bottom-0 bg-[#f5f5f5] rounded-t-3xl shadow-2xl pt-3 pb-6 px-4"
        style={{ paddingBottom: Math.max(insets.bottom + 16, 24) }}
      >
        <View className="bg-white rounded-[20px] p-5">
          {/* Row 1: Times */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-500 font-medium">
              Arrive at the store in <Text className="text-black font-bold text-lg">9mins</Text>
            </Text>
            <Text className="text-gray-500 font-medium">
              Delivered in <Text className="text-black font-bold text-lg">14mins</Text>
            </Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-gray-100 mb-4" />

          {/* Row 2: Order Number */}
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-black text-[22px] font-bold tracking-tight">#{order.id === '1' || order.id.startsWith('p') ? '77831618' : order.id}</Text>
            <Text className="text-black font-bold text-sm">Help</Text>
          </View>

          {/* Row 3: Store Info */}
          <View className="relative mb-5">
            <View className="flex-row items-start gap-3">
              <Ionicons name="storefront-outline" size={20} color="black" className="mt-0.5" />
              <View className="flex-1">
                <Text className="text-black font-bold text-[19px] mb-2">{order.restaurantName}</Text>
                <View className="bg-gray-100 self-start px-3 py-1 rounded-full mb-3">
                  <Text className="text-black text-sm font-bold">Dishes * 3  {'>'}</Text>
                </View>
                <Text className="text-gray-500 text-[15px] leading-relaxed pr-10">
                  {order.restaurantAddress}
                </Text>
              </View>
            </View>
            <View className="absolute right-0 top-1 bg-gray-100 h-10 w-10 rounded-full items-center justify-center">
              <Ionicons name="navigate" size={18} color="black" style={{ transform: [{ rotate: '45deg' }] }} />
            </View>
          </View>

          {/* Row 4: Customer Info */}
          <View className="flex-row items-start gap-3 mb-5">
            <Ionicons name="person-outline" size={20} color="black" className="mt-0.5" />
            <View className="flex-1">
              <Text className="text-black font-bold text-[17px] leading-tight mb-2">
                {order.customerAddress}
              </Text>
              <View className="bg-[#ccf5e3] px-3 py-1 rounded-md self-start">
                <Text className="text-[#10b981] font-medium text-[13px]">Special Promotion £ 0.3</Text>
              </View>
            </View>
          </View>

          {/* Row 5: Timestamp */}
          <View className="flex-row items-center gap-2 mb-4 ml-1">
            <Ionicons name="time-outline" size={18} color="black" />
            <Text className="text-black font-bold text-[14px]">
              Merchant orders {order.merchantOrderTime || '03-16 20:22'}
            </Text>
          </View>

          {/* Row 6: Action Button */}
          <Pressable
            onPress={handleArrivedPress}
            className={`py-3.5 rounded-xl items-center justify-center mt-1 ${
              hasArrived ? 'bg-green-500' : 'bg-[#fcd303]'
            }`}
          >
            <Text className={`font-bold text-[17px] ${hasArrived ? 'text-white' : 'text-black'}`}>
              {hasArrived ? 'Confirm & Pick Up' : 'Arrived at Shop'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
