import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface AdminOrder {
  id: string;
  restaurantName: string;
  riderName: string | null;
  status: 'pending' | 'active' | 'completed';
  customerAddress: string;
  createdAt: string;
}

const mockAdminOrders: AdminOrder[] = [
  {
    id: 'ORD-001',
    restaurantName: 'YOMI CAKE',
    riderName: 'Abdullah Panda',
    status: 'active',
    customerAddress: '44 Newnton Close, Hackney',
    createdAt: '16:33',
  },
  {
    id: 'ORD-002',
    restaurantName: 'heytea (Mayfair)',
    riderName: 'James Chen',
    status: 'active',
    customerAddress: 'London E1W 2AH',
    createdAt: '17:32',
  },
  {
    id: 'ORD-003',
    restaurantName: 'Fan Northeast Bento',
    riderName: null,
    status: 'pending',
    customerAddress: '84 Alie Street, Tower Hamlets',
    createdAt: '19:06',
  },
  {
    id: 'ORD-004',
    restaurantName: 'Golden Dragon',
    riderName: 'Michael Brown',
    status: 'completed',
    customerAddress: '12 King Street, Westminster',
    createdAt: '14:20',
  },
  {
    id: 'ORD-005',
    restaurantName: 'Sushi Express',
    riderName: 'Sarah Wilson',
    status: 'completed',
    customerAddress: '56 Oxford Road, Camden',
    createdAt: '13:45',
  },
  {
    id: 'ORD-006',
    restaurantName: 'Pizza Palace',
    riderName: 'Emily Zhang',
    status: 'active',
    customerAddress: '78 Baker Street',
    createdAt: '18:15',
  },
  {
    id: 'ORD-007',
    restaurantName: 'Thai Orchid',
    riderName: null,
    status: 'pending',
    customerAddress: '23 Victoria Lane',
    createdAt: '18:45',
  },
  {
    id: 'ORD-008',
    restaurantName: 'Burger Hub',
    riderName: 'David Lee',
    status: 'completed',
    customerAddress: '90 High Street, Kensington',
    createdAt: '12:30',
  },
];

type FilterTab = 'all' | 'active' | 'completed';

const StatusBadge: React.FC<{ status: AdminOrder['status'] }> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'pending':
        return { bg: 'bg-orange-100', text: 'text-orange-600', label: 'Pending' };
      case 'active':
        return { bg: 'bg-blue-100', text: 'text-blue-600', label: 'Active' };
      case 'completed':
        return { bg: 'bg-green-100', text: 'text-green-600', label: 'Completed' };
    }
  };

  const style = getStatusStyle();

  return (
    <View className={`${style.bg} px-2 py-1 rounded-full`}>
      <Text className={`${style.text} text-xs font-medium`}>{style.label}</Text>
    </View>
  );
};

export default function OrderManagementScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrder[]>(mockAdminOrders);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return order.status === 'active' || order.status === 'pending';
    return order.status === 'completed';
  });

  const handleReassign = (orderId: string) => {
    Alert.alert(
      'Reassign Order',
      'Select an available rider to reassign this order.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Abdullah Panda',
          onPress: () => {
            setOrders((prev) =>
              prev.map((o) =>
                o.id === orderId ? { ...o, riderName: 'Abdullah Panda' } : o
              )
            );
          },
        },
        {
          text: 'James Chen',
          onPress: () => {
            setOrders((prev) =>
              prev.map((o) =>
                o.id === orderId ? { ...o, riderName: 'James Chen' } : o
              )
            );
          },
        },
      ]
    );
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-header-bg">
      <View className="bg-header-bg px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
            <Ionicons name="arrow-back" size={24} color={Colors.headerText} />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold flex-1">
            Order Management
          </Text>
        </View>
      </View>

      <View className="bg-header-bg px-4 pb-4">
        <View className="flex-row bg-gray-800 rounded-lg p-1">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveFilter(tab.key)}
              className={`flex-1 py-2 rounded-md items-center ${
                activeFilter === tab.key ? 'bg-primary' : ''
              }`}
            >
              <Text
                className={`font-medium ${
                  activeFilter === tab.key ? 'text-text-primary' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 bg-screen-bg">
        <View className="px-4 py-2">
          <View className="flex-row py-2 border-b border-gray-200 bg-gray-100 rounded-t-lg px-2">
            <Text className="flex-1 text-text-secondary text-xs font-medium">ORDER ID</Text>
            <Text className="flex-1 text-text-secondary text-xs font-medium">RESTAURANT</Text>
            <Text className="flex-1 text-text-secondary text-xs font-medium">RIDER</Text>
            <Text className="w-20 text-text-secondary text-xs font-medium text-center">STATUS</Text>
          </View>

          {filteredOrders.map((order) => (
            <View
              key={order.id}
              className="bg-card-bg border-b border-gray-100 px-2 py-3"
            >
              <View className="flex-row items-center">
                <Text className="flex-1 text-text-primary text-sm font-medium">
                  {order.id}
                </Text>
                <Text className="flex-1 text-text-primary text-sm" numberOfLines={1}>
                  {order.restaurantName}
                </Text>
                <Text
                  className={`flex-1 text-sm ${
                    order.riderName ? 'text-text-primary' : 'text-text-muted italic'
                  }`}
                  numberOfLines={1}
                >
                  {order.riderName || 'Unassigned'}
                </Text>
                <View className="w-20 items-center">
                  <StatusBadge status={order.status} />
                </View>
              </View>

              <View className="flex-row items-center mt-2 pt-2 border-t border-gray-50">
                <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
                <Text className="text-text-secondary text-xs ml-1 flex-1" numberOfLines={1}>
                  {order.customerAddress}
                </Text>
                <Text className="text-text-muted text-xs mr-2">{order.createdAt}</Text>
                {order.status !== 'completed' && (
                  <TouchableOpacity
                    onPress={() => handleReassign(order.id)}
                    className="bg-primary px-3 py-1 rounded"
                  >
                    <Text className="text-text-primary text-xs font-medium">Reassign</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
