import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
    <View className="bg-white rounded-[20px] mx-4 mb-4 p-5 shadow-sm relative">
      {/* Header Info */}
      <View className="flex-row justify-between items-center pb-3 border-b border-gray-100 mb-4">
        <Text className="text-gray-500 text-base font-normal">
          Delivered in <Text className="text-black font-bold text-lg">{order.deliveryTime}mins</Text>
        </Text>
        <Text className="text-gray-500 font-medium">
          {order.foodReady ? 'Food is ready' : 'Preparing'}
        </Text>
      </View>

      {/* Locations */}
      <View className="gap-5">
        {/* Pickup */}
        <View className="flex-row items-start gap-4 pr-6">
          <Ionicons name="storefront-outline" size={20} color="black" className="mt-0.5" />
          <View className="flex-1">
            <Text className="text-black font-bold text-lg leading-tight">
              {order.restaurantName}
            </Text>
            <Text className="text-gray-500 text-sm font-normal leading-tight mt-1">
              {order.restaurantAddress}
            </Text>
          </View>
        </View>

        {/* Dropoff */}
        <View className="flex-row items-start gap-4 pr-6">
          <Ionicons name="person-outline" size={20} color="black" className="mt-0.5" />
          <View className="flex-1">
            <Text className="text-black font-bold text-lg leading-tight">
              {order.customerAddress}
            </Text>
            
            {/* Incentive Badge inline beneath Customer Address */}
            {order.incentive && (
              <View className="bg-[#ccf5e3] px-3 py-1 rounded mt-2 self-start">
                <Text className="text-[#10b981] font-medium text-sm">
                  {order.incentive.type === 'platform' ? 'Platform Incentive' : 'Deadline Incentive'} £ {order.incentive.amount.toFixed(2)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Timestamp */}
      <View className="flex-row items-center gap-2 mt-4">
        <Ionicons name="time-outline" size={18} color="black" />
        <Text className="text-black font-medium text-[15px]">
          Merchant orders {order.merchantOrderTime || '03-27 19:06'}
        </Text>
      </View>

      {/* Action Footer */}
      <View className="flex-row mt-4 items-center justify-between gap-3 mb-1">
        {/* Price Block */}
        <View className="bg-gray-100 rounded-xl px-4 py-3 min-w-[80px] items-center justify-center">
          <Text className="text-black text-lg font-bold">
            £ {order.price.toFixed(2)}
          </Text>
        </View>

        {/* Grab Orders Button */}
        <Pressable 
          onPress={() => onGrab(order.id)}
          className="flex-1 bg-[#fcd303] rounded-xl flex-row items-center p-1.5"
        >
          {/* Inner Animated Arrow Block */}
          <View className="bg-[#deb802] rounded-lg px-2 py-3 items-center justify-center" style={{ width: 50 }}>
            <Animated.View style={{ transform: [{ translateX }] }}>
               <Text className="text-white font-bold opacity-90 tracking-widest text-xs">
                 {`>>>`}
               </Text>
            </Animated.View>
          </View>

          {/* Grab Label */}
          <Text className="flex-1 text-center text-black font-bold text-[16px] pr-8">
            Grab orders
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
