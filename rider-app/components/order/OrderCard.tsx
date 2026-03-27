import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import type { Order } from '@/mock/orders';

interface OrderCardProps {
  order: Order;
  onGrab: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onGrab }) => {
  const arrowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [arrowAnim]);

  const translateX = arrowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 8],
  });

  return (
    <View className="bg-white rounded-xl mx-4 my-2 p-4 shadow-sm">
      <View className="flex-row justify-between mb-3">
        <Text className="text-text-primary">
          Delivered in <Text className="font-bold">{order.deliveryTime}mins</Text>
        </Text>
        <Text className="text-text-secondary text-sm">
          {order.foodReady ? 'Food is ready' : 'Preparing'}
        </Text>
      </View>

      <View className="flex-row items-start mb-2">
        <Ionicons name="storefront-outline" size={18} color={Colors.textPrimary} />
        <View className="ml-2 flex-1">
          <Text className="text-text-primary font-bold text-lg">
            {order.restaurantName}
          </Text>
          <Text className="text-text-secondary text-sm mt-1">
            {order.restaurantAddress}
          </Text>
        </View>
      </View>

      <View className="flex-row items-start mb-3">
        <Ionicons name="person-outline" size={18} color={Colors.textPrimary} />
        <Text className="ml-2 flex-1 text-text-primary font-bold">
          {order.customerAddress}
        </Text>
      </View>

      {order.incentive && (
        <View
          className={`rounded-lg px-3 py-2 mb-3 ${
            order.incentive.type === 'platform' ? 'bg-incentive/10' : 'bg-error-bg'
          }`}
        >
          <Text
            className={`text-sm ${
              order.incentive.type === 'platform' ? 'text-incentive' : 'text-error'
            }`}
          >
            {order.incentive.type === 'platform'
              ? `Platform Incentive £${order.incentive.amount.toFixed(2)}`
              : `Finish before ${order.incentive.deadline} and enjoy a £${order.incentive.amount} incentive!`}
          </Text>
        </View>
      )}

      <View className="flex-row items-center mb-4">
        <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
        <Text className="text-text-secondary text-sm ml-1">
          Merchant orders {order.merchantOrderTime}
        </Text>
      </View>

      <View className="flex-row items-center">
        <View className="bg-input-bg rounded-lg px-4 py-3 mr-2">
          <Text className="text-text-primary font-bold text-lg">
            £{order.earnings.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onGrab(order.id)}
          className="flex-1 bg-primary rounded-lg py-3 flex-row items-center justify-center"
        >
          <Animated.View
            style={{ transform: [{ translateX }] }}
            className="flex-row mr-2"
          >
            <Text className="text-text-primary font-bold">›</Text>
            <Text className="text-text-primary font-bold">›</Text>
            <Text className="text-text-primary font-bold">›</Text>
          </Animated.View>
          <Text className="text-text-primary font-bold text-base">
            Grab orders
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
