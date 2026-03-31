import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { Order } from '@/mock/orders';

interface PickupOrderCardProps {
  order: Order;
  onArrivedAtShop?: (orderId: string) => void;
}

export const PickupOrderCard: React.FC<PickupOrderCardProps> = ({ order, onArrivedAtShop }) => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push(`/(rider)/order-map?id=${order.id}`);
  };

  const handleArrivedPress = () => {
    onArrivedAtShop?.(order.id);
  };

  const getIncentiveLabel = () => {
    if (!order.incentive) return null;
    switch (order.incentive.type) {
      case 'special':
        return `Special Promotion £ ${order.incentive.amount.toFixed(2)}`;
      case 'platform':
        return `Platform Incentive £ ${order.incentive.amount.toFixed(2)}`;
      case 'deadline':
        return `Deadline Bonus £ ${order.incentive.amount.toFixed(2)}`;
      default:
        return null;
    }
  };

  return (
    <Pressable onPress={handleCardPress} className="mx-4 mb-4">
      <View className="bg-white rounded-[20px] overflow-hidden shadow-sm">
        {/* Top Header - Time Estimates */}
        <View className="bg-gray-50 px-5 py-3 flex-row justify-between items-center">
          <Text className="text-gray-500 text-sm">
            Arrive at the store in{' '}
            <Text className="text-black font-semibold">{order.arriveAtStoreTime || 9}mins</Text>
          </Text>
          <Text className="text-gray-500 text-sm">
            Delivered in{' '}
            <Text className="text-black font-semibold">{order.deliveryTime}mins</Text>
          </Text>
        </View>

        {/* Card Content */}
        <View className="p-5">
          {/* Order Number Row */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-black font-bold text-xl">
              {order.orderNo || `#${order.id}`}
            </Text>
            <Pressable className="flex-row items-center gap-1">
              <Ionicons name="help-circle-outline" size={16} color="#888" />
              <Text className="text-gray-500 text-sm">Help</Text>
            </Pressable>
          </View>

          {/* Restaurant Row */}
          <View className="flex-row items-start justify-between mb-4">
            <View className="flex-row flex-1 gap-3">
              <Ionicons name="storefront-outline" size={22} color="black" className="mt-1" />
              <View className="flex-1">
                <Text className="text-black font-bold text-lg leading-tight">
                  {order.restaurantName}
                </Text>
                {/* Dishes Badge */}
                {order.dishesCount && (
                  <View className="bg-gray-100 rounded-full px-3 py-1 mt-2 self-start flex-row items-center">
                    <Text className="text-gray-600 text-sm">
                      Dishes * {order.dishesCount}{' '}
                      <Text className="text-gray-400">&gt;</Text>
                    </Text>
                  </View>
                )}
                <Text className="text-gray-500 text-sm mt-2 leading-relaxed">
                  {order.restaurantAddress}
                </Text>
              </View>
            </View>
            {/* Navigation Button */}
            <Pressable 
              className="bg-gray-200 p-3 rounded-full ml-3"
              onPress={handleCardPress}
            >
              <Ionicons name="navigate" size={20} color="#333" />
            </Pressable>
          </View>

          {/* Customer Row */}
          <View className="flex-row items-start gap-3 mb-4">
            <Ionicons name="person-outline" size={22} color="black" className="mt-1" />
            <View className="flex-1">
              <Text className="text-black font-bold text-base leading-tight">
                {order.customerName || 'Customer'}
              </Text>
              <Text className="text-gray-500 text-sm mt-1 leading-relaxed">
                {order.customerAddress}
              </Text>
            </View>
          </View>

          {/* Badges & Timestamp */}
          <View className="mb-4">
            {order.incentive && (
              <View className="bg-[#ccf5e3] px-3 py-1.5 rounded self-start mb-2">
                <Text className="text-[#10b981] font-medium text-sm">
                  {getIncentiveLabel()}
                </Text>
              </View>
            )}
            <View className="flex-row items-center gap-2">
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text className="text-gray-600 text-sm">
                Merchant orders {order.merchantOrderTime}
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <Pressable
            onPress={handleArrivedPress}
            className="bg-[#fcd303] py-4 rounded-xl items-center justify-center active:opacity-80"
          >
            <Text className="text-black font-bold text-base">
              Arrived at Shop
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};
