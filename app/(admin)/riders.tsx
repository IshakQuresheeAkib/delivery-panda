import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface Rider {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'online' | 'offline' | 'offloaded';
  todayDeliveries: number;
  vehicleType: string;
  joinDate: string;
}

const mockRiders: Rider[] = [
  {
    id: '1',
    name: 'Abdullah Panda',
    phone: '+44 7417415857',
    email: 'abdullah@example.com',
    status: 'online',
    todayDeliveries: 12,
    vehicleType: 'Bicycle',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'James Chen',
    phone: '+44 7891234567',
    email: 'james.chen@example.com',
    status: 'online',
    todayDeliveries: 8,
    vehicleType: 'Motorcycle',
    joinDate: '2024-02-20',
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    phone: '+44 7654321098',
    email: 'sarah.w@example.com',
    status: 'offline',
    todayDeliveries: 0,
    vehicleType: 'Feet',
    joinDate: '2024-03-01',
  },
  {
    id: '4',
    name: 'Michael Brown',
    phone: '+44 7111222333',
    email: 'michael.b@example.com',
    status: 'online',
    todayDeliveries: 15,
    vehicleType: 'Car',
    joinDate: '2023-11-10',
  },
  {
    id: '5',
    name: 'Emily Zhang',
    phone: '+44 7444555666',
    email: 'emily.z@example.com',
    status: 'offloaded',
    todayDeliveries: 5,
    vehicleType: 'Bicycle',
    joinDate: '2024-01-25',
  },
  {
    id: '6',
    name: 'David Lee',
    phone: '+44 7777888999',
    email: 'david.lee@example.com',
    status: 'online',
    todayDeliveries: 9,
    vehicleType: 'Motorcycle',
    joinDate: '2024-02-05',
  },
];

const StatusBadge: React.FC<{ status: Rider['status'] }> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'online':
        return { bg: 'bg-green-100', text: 'text-green-600', label: 'Online' };
      case 'offline':
        return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Offline' };
      case 'offloaded':
        return { bg: 'bg-orange-100', text: 'text-orange-600', label: 'Offloaded' };
    }
  };

  const style = getStatusStyle();

  return (
    <View className={`${style.bg} px-2 py-1 rounded-full`}>
      <Text className={`${style.text} text-xs font-medium`}>{style.label}</Text>
    </View>
  );
};

export default function RiderManagementScreen() {
  const router = useRouter();
  const [riders, setRiders] = useState<Rider[]>(mockRiders);
  const [expandedRider, setExpandedRider] = useState<string | null>(null);

  const handleOffload = (riderId: string) => {
    setRiders((prev) =>
      prev.map((r) =>
        r.id === riderId
          ? { ...r, status: r.status === 'offloaded' ? 'online' : 'offloaded' }
          : r
      )
    );
  };

  const handleDeactivate = (riderId: string) => {
    Alert.alert(
      'Deactivate Rider',
      'Are you sure you want to deactivate this rider account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: () => {
            setRiders((prev) => prev.filter((r) => r.id !== riderId));
          },
        },
      ]
    );
  };

  const toggleExpand = (riderId: string) => {
    setExpandedRider((prev) => (prev === riderId ? null : riderId));
  };

  return (
    <SafeAreaView className="flex-1 bg-header-bg">
      <View className="bg-header-bg px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
            <Ionicons name="arrow-back" size={24} color={Colors.headerText} />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold flex-1">
            Rider Management
          </Text>
          <View className="bg-primary/20 px-3 py-1 rounded-full">
            <Text className="text-primary font-medium">{riders.length} Riders</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 bg-screen-bg">
        {riders.map((rider) => (
          <View key={rider.id} className="mx-4 mt-4">
            <TouchableOpacity
              onPress={() => toggleExpand(rider.id)}
              className="bg-card-bg rounded-xl p-4"
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3">
                  <Ionicons name="person" size={24} color={Colors.textMuted} />
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-bold text-base">
                    {rider.name}
                  </Text>
                  <Text className="text-text-secondary text-sm">
                    {rider.todayDeliveries} deliveries today
                  </Text>
                </View>
                <StatusBadge status={rider.status} />
                <Ionicons
                  name={expandedRider === rider.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={Colors.textMuted}
                  style={{ marginLeft: 8 }}
                />
              </View>

              {expandedRider === rider.id && (
                <View className="mt-4 pt-4 border-t border-gray-100">
                  <View className="flex-row mb-2">
                    <Text className="text-text-secondary w-24">Phone:</Text>
                    <Text className="text-text-primary flex-1">{rider.phone}</Text>
                  </View>
                  <View className="flex-row mb-2">
                    <Text className="text-text-secondary w-24">Email:</Text>
                    <Text className="text-text-primary flex-1">{rider.email}</Text>
                  </View>
                  <View className="flex-row mb-2">
                    <Text className="text-text-secondary w-24">Vehicle:</Text>
                    <Text className="text-text-primary flex-1">{rider.vehicleType}</Text>
                  </View>
                  <View className="flex-row mb-4">
                    <Text className="text-text-secondary w-24">Joined:</Text>
                    <Text className="text-text-primary flex-1">{rider.joinDate}</Text>
                  </View>

                  <View className="flex-row">
                    <TouchableOpacity
                      onPress={() => handleOffload(rider.id)}
                      className={`flex-1 py-3 rounded-lg mr-2 items-center ${
                        rider.status === 'offloaded' ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                    >
                      <Text className="text-white font-bold">
                        {rider.status === 'offloaded' ? 'Restore' : 'Offload'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeactivate(rider.id)}
                      className="flex-1 bg-error py-3 rounded-lg items-center"
                    >
                      <Text className="text-white font-bold">Deactivate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
