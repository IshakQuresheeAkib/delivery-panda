import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { mockRider } from '@/mock/rider';

export default function PersonalScreen() {
  const router = useRouter();

  const infoRows = [
    {
      label: 'Vehicle Type',
      value: mockRider.vehicleType === 'feet' ? 'Feet' : mockRider.vehicleType,
      icon: 'walk-outline' as const,
      showChevron: false,
    },
    {
      label: 'HungryPanda driver certification',
      value: '',
      showChevron: true,
    },
    {
      label: 'Phone number',
      value: mockRider.phone,
      showChevron: true,
    },
    {
      label: 'Email',
      value: mockRider.email,
      showChevron: false,
    },
    {
      label: 'Identification',
      value: mockRider.identificationStatus === 'verified' ? 'Certified' : 'Pending',
      valueColor: mockRider.identificationStatus === 'verified' ? Colors.certified : Colors.textSecondary,
      showChevron: true,
    },
    {
      label: 'Account',
      value: '',
      showChevron: true,
    },
    {
      label: 'My Contract',
      value: mockRider.contract,
      showChevron: false,
    },
    {
      label: 'Emergency Contacts',
      value: '',
      showChevron: true,
    },
    {
      label: 'Account cancellation',
      value: 'Cannot be restored after logout, please be cautious',
      showChevron: true,
      valueSmall: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-primary">Personal</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        <View className="items-center py-6 border-b border-gray-100">
          <View className="relative">
            <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center overflow-hidden">
              {mockRider.avatar ? (
                <Image source={{ uri: mockRider.avatar }} className="w-full h-full" />
              ) : (
                <Text className="text-4xl">🐼</Text>
              )}
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-200 items-center justify-center">
              <Ionicons name="camera-outline" size={16} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center mt-3">
            <Text className="text-xl font-bold text-text-primary mr-2">
              {mockRider.name}
            </Text>
            {mockRider.certified && (
              <View className="bg-certified/20 px-2 py-1 rounded">
                <Text className="text-certified text-xs font-medium">Certified</Text>
              </View>
            )}
            <TouchableOpacity className="ml-2">
              <Ionicons name="document-text-outline" size={18} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
          <View>
            <Text className="text-text-primary font-medium">
              {mockRider.vehicleType === 'feet' ? 'Feet' : mockRider.vehicleType}
            </Text>
            <Text className="text-text-secondary text-sm">Vehicle Type</Text>
          </View>
          <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center">
            <Ionicons name="walk" size={24} color={Colors.incentive} />
          </View>
        </View>

        {infoRows.slice(1).map((row, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
            disabled={!row.showChevron}
          >
            <Text className="text-text-primary flex-1">{row.label}</Text>
            <View className="flex-row items-center">
              <Text
                className={`mr-2 ${
                  row.valueSmall ? 'text-xs text-text-secondary max-w-[180px]' : 'text-text-secondary'
                }`}
                style={row.valueColor ? { color: row.valueColor } : undefined}
                numberOfLines={2}
              >
                {row.value}
              </Text>
              {row.showChevron && (
                <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
