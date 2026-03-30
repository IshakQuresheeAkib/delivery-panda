import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <View className="bg-card-bg rounded-xl p-4 flex-1 mx-2 mb-4">
    <View className="flex-row items-center mb-2">
      <View
        style={{ backgroundColor: color }}
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
      >
        <Ionicons name={icon} size={20} color={Colors.headerText} />
      </View>
      <Text className="text-text-secondary text-sm flex-1">{title}</Text>
    </View>
    <Text className="text-text-primary text-3xl font-bold">{value}</Text>
  </View>
);

const mockAdminStats = {
  onlineRiders: 24,
  activeDeliveries: 47,
  ordersToday: 312,
};

export default function AdminDashboard() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView className="flex-1 bg-header-bg">
      <View className="bg-header-bg px-4 py-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-xl font-bold">Admin Dashboard</Text>
          <TouchableOpacity onPress={handleLogout} className="p-2">
            <Ionicons name="log-out-outline" size={24} color={Colors.headerText} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView className="flex-1 bg-screen-bg">
        <View className="px-2 pt-4">
          <View className="flex-row">
            <StatCard
              title="Online Riders"
              value={mockAdminStats.onlineRiders}
              icon="people"
              color={Colors.online}
            />
            <StatCard
              title="Active Deliveries"
              value={mockAdminStats.activeDeliveries}
              icon="bicycle"
              color={Colors.primary}
            />
          </View>
          <View className="flex-row">
            <StatCard
              title="Orders Today"
              value={mockAdminStats.ordersToday}
              icon="receipt"
              color={Colors.incentive}
            />
            <View className="flex-1 mx-2" />
          </View>
        </View>

        <View className="px-4 mt-4">
          <Text className="text-text-primary font-bold text-lg mb-4">Quick Actions</Text>
          
          <TouchableOpacity
            onPress={() => router.push('/(admin)/riders')}
            className="bg-card-bg rounded-xl p-4 flex-row items-center mb-3"
          >
            <View className="bg-header-bg w-12 h-12 rounded-full items-center justify-center mr-4">
              <Ionicons name="people" size={24} color={Colors.headerText} />
            </View>
            <View className="flex-1">
              <Text className="text-text-primary font-bold text-base">Rider Management</Text>
              <Text className="text-text-secondary text-sm">View and manage all riders</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(admin)/orders')}
            className="bg-card-bg rounded-xl p-4 flex-row items-center mb-3"
          >
            <View className="bg-header-bg w-12 h-12 rounded-full items-center justify-center mr-4">
              <Ionicons name="receipt" size={24} color={Colors.headerText} />
            </View>
            <View className="flex-1">
              <Text className="text-text-primary font-bold text-base">Order Management</Text>
              <Text className="text-text-secondary text-sm">View and reassign orders</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
