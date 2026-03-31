import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DarkHeader, OrderTabBar, OrderTab } from '@/components/layout';
import { OrderCard } from '@/components/order';
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowStatusSheet(false)}
            className="flex-1 bg-black/50 justify-end"
          >
            <View className="bg-white rounded-t-3xl px-6 py-6">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full bg-status-offline mr-2" />
                  <Text className="text-text-primary text-base">Offline</Text>
                </View>
                <Switch
                  value={isOnline}
                  onValueChange={setIsOnline}
                  trackColor={{ false: Colors.textMuted, true: Colors.online }}
                  thumbColor={Colors.white}
                />
              </View>
            </View>
          </TouchableOpacity>
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
          <View className="w-40 h-40 bg-gray-200 rounded-lg items-center justify-center mb-6 opacity-50">
            <Ionicons name="cube-outline" size={64} color={Colors.textMuted} />
          </View>
          <Text className="text-text-secondary text-center text-base leading-6">
            We are searching for the best orders~{'\n'}
            Please go near the merchants in your area.{'\n'}
            More orders are on the way~
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 pt-2">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onGrab={handleGrabOrder} />
          ))}
          <View className="h-4" />
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
