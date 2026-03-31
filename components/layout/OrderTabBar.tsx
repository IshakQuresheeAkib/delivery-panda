import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';

export type OrderTab = 'new' | 'pickup' | 'delivering';

interface OrderTabBarProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
}

export const OrderTabBar: React.FC<OrderTabBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { key: OrderTab; label: string }[] = [
    { key: 'new', label: 'New Order' },
    { key: 'pickup', label: 'Pick Up' },
    { key: 'delivering', label: 'Delivering' },
  ];

  return (
    <View className="bg-header-bg flex-row">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onTabChange(tab.key)}
          className="flex-1 py-3 items-center"
        >
          <Text
            className={`text-sm font-medium ${
              activeTab === tab.key ? 'text-white' : 'text-text-secondary'
            }`}
          >
            {tab.label}
          </Text>
          {activeTab === tab.key && (
            <View
              className="absolute bottom-0 w-8 h-1 bg-primary rounded-t"
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
