import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  Switch,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DarkHeader, OrderTabBar, OrderTab } from '@/components/layout';
import { OrderCard, PickupOrderCard } from '@/components/order';
import { OfflineView } from '@/components/home';
import { Toast } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { mockOrders, mockPickupOrders, mockDeliveringOrders } from '@/mock/orders';
import { Colors } from '@/constants/colors';

export default function DeliveryOrdersScreen() {
  const router = useRouter();
  const { isOnline, setIsOnline } = useAuthStore();
  const [activeTab, setActiveTab] = useState<OrderTab>('new');
  const [showStatusSheet, setShowStatusSheet] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const getOrdersForTab = () => {
    switch (activeTab) {
      case 'new':
        return mockOrders;
      case 'pickup':
        return mockPickupOrders;
      case 'delivering':
        return mockDeliveringOrders;
      default:
        return [];
    }
  };

  const handleGrabOrder = (orderId: string) => {
    setToast({ visible: true, message: `Order ${orderId} grabbed!` });
  };

  const handleMenuPress = () => {
    router.push('/(drawer)/personal');
  };

  const orders = getOrdersForTab();

  if (!isOnline) {
    return (
      <View className="flex-1 bg-screen-bg">
        <DarkHeader
          onMenuPress={handleMenuPress}
          rightIcons={[
            { name: 'refresh', onPress: () => {} },
            { name: 'location-outline', onPress: () => {} },
          ]}
        />
        <OfflineView onGoOnline={() => setIsOnline(true)} />

        <Modal
          visible={showStatusSheet}
          animationType="slide"
          transparent
          onRequestClose={() => setShowStatusSheet(false)}
        >
          <Pressable
            onPress={() => setShowStatusSheet(false)}
            className="flex-1 bg-black/60 justify-end"
          >
            <View className="bg-card-bg rounded-t-3xl px-6 py-8 shadow-lg">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className="w-3.5 h-3.5 rounded-full bg-status-offline shadow-status-offline/50 shadow-sm" />
                  <Text className="text-text-primary text-xl font-bold tracking-tight">Offline</Text>
                </View>
                <Switch
                  value={isOnline}
                  onValueChange={setIsOnline}
                  trackColor={{ false: '#E5E7EB', true: Colors.statusOnline }}
                  thumbColor={Colors.white}
                  style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                />
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-screen-bg">
      <DarkHeader
        onMenuPress={handleMenuPress}
        rightIcons={[
          { name: 'refresh', onPress: () => {} },
          { name: 'location-outline', onPress: () => {} },
        ]}
      />
      <OrderTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {orders.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-40 h-40 bg-gray-200 rounded-3xl items-center justify-center mb-6 opacity-60 shadow-sm">
            <Ionicons name="cube-outline" size={72} color={Colors.textMuted} />
          </View>
          <Text className="text-text-primary font-semibold text-lg text-center mb-2">
            Looking for orders...
          </Text>
          <Text className="text-text-secondary text-center text-sm leading-relaxed">
            We are searching for the best orders.{'\n'}
            Please go near the merchants in your area.
          </Text>
        </View>
      ) : (
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {orders.map((order) => (
            activeTab === 'pickup' ? (
              <PickupOrderCard 
                key={order.id} 
                order={order} 
                onArrivedAtShop={(id) => setToast({ visible: true, message: `Arrived at shop for order ${id}` })}
              />
            ) : (
              <OrderCard key={order.id} order={order} onGrab={handleGrabOrder} />
            )
          ))}
        </ScrollView>
      )}

      <Toast
        visible={toast.visible}
        message={toast.message}
        onHide={() => setToast({ visible: false, message: '' })}
      />
    </View>
  );
}
