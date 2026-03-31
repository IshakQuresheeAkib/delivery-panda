import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
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
    outputRange: [0, 6],
  });

  return (
    <View className="bg-card-bg rounded-2xl mx-4 mb-4 p-5 shadow-sm border border-border-soft">
      {/* Header Info */}
      <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-border-soft">
        <View className="flex-row items-center gap-2">
          <Ionicons name="time" size={18} color={Colors.textPrimary} />
          <Text className="text-text-primary text-base font-normal">
            Delivered in <Text className="font-bold">{order.deliveryTime}mins</Text>
          </Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${order.foodReady ? 'bg-success-bg' : 'bg-gray-100'}`}>
          <Text className={`text-xs font-semibold ${order.foodReady ? 'text-status-online' : 'text-text-secondary'}`}>
            {order.foodReady ? 'Food Ready' : 'Preparing'}
          </Text>
        </View>
      </View>

      {/* Locations */}
      <View className="gap-5 mb-5 relative">
        {/* Connection Line */}
        <View className="absolute left-2.5 top-6 bottom-6 w-0.5 bg-gray-200" />
        
        {/* Pickup */}
        <View className="flex-row items-start gap-4">
          <View className="bg-primary/20 w-6 h-6 rounded-full items-center justify-center -ml-0.5 mt-0.5 z-10">
            <Ionicons name="storefront" size={12} color={Colors.primaryDark || Colors.primary} />
          </View>
          <View className="flex-1">
            <Text className="text-text-primary font-bold text-lg leading-tight mb-1">
              {order.restaurantName}
            </Text>
            <Text className="text-text-secondary text-sm font-normal leading-tight">
              {order.restaurantAddress}
            </Text>
          </View>
        </View>

        {/* Dropoff */}
        <View className="flex-row items-start gap-4">
          <View className="bg-gray-200 w-6 h-6 rounded-full items-center justify-center -ml-0.5 mt-0.5 z-10">
            <Ionicons name="location" size={14} color={Colors.textSecondary} />
          </View>
          <View className="flex-1">
            <Text className="text-text-primary font-bold text-lg leading-tight">
              {order.customerAddress}
            </Text>
          </View>
        </View>
      </View>

      {/* Incentive Badges */}
      {order.incentive && (
        <View
          className={`rounded-xl px-4 py-3 mb-5 flex-row items-center gap-2 border ${
            order.incentive.type === 'platform' 
              ? 'bg-success-bg border-status-online/20' 
              : 'bg-error-bg border-error/20'
          }`}
        >
          <Ionicons 
            name={order.incentive.type === 'platform' ? 'cash-outline' : 'flame-outline'} 
            size={18} 
            color={order.incentive.type === 'platform' ? Colors.statusOnline : Colors.error} 
          />
          <Text
            className={`text-sm font-medium flex-1 ${
              order.incentive.type === 'platform' ? 'text-status-online' : 'text-error'
            }`}
          >
            {order.incentive.type === 'platform'
              ? `Platform Incentive £${order.incentive.amount.toFixed(2)}`
              : `Finish before ${order.incentive.deadline} for £${order.incentive.amount} extra!`}
          </Text>
        </View>
      )}

      {/* Footer Info / Time */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="receipt-outline" size={16} color={Colors.textSecondary} />
          <Text className="text-text-secondary text-sm font-medium">
            Merchant ordered at {order.merchantOrderTime}
          </Text>
        </View>
      </View>

      {/* CTA */}
      <Pressable
        onPress={() => onGrab(order.id)}
        className="w-full bg-primary active:bg-[#E0AA00] transition-colors rounded-xl min-h-[52px] flex-row items-center justify-center shadow-sm"
      >
        <Animated.View
          style={{ transform: [{ translateX }] }}
          className="flex-row items-center mr-2"
        >
          <Ionicons name="chevron-forward" size={20} color={Colors.textPrimary} style={{ marginRight: -12 }} />
          <Ionicons name="chevron-forward" size={20} color={Colors.textPrimary} style={{ marginRight: -12 }} />
          <Ionicons name="chevron-forward" size={20} color={Colors.textPrimary} />
        </Animated.View>
        <Text className="text-text-primary font-bold text-lg tracking-tight ml-2">
          Grab order
        </Text>
      </Pressable>
    </View>
  );
};
