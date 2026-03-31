import React from 'react';
import { View, Text, Pressable } from 'react-native';
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
    <View className="bg-header-bg flex-row shadow-sm z-10 elevation-3">
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          onPress={() => onTabChange(tab.key)}
          className="flex-1 py-4 items-center justify-center min-h-[48px] active:bg-white/5 transition-colors"
        >
          <Text
            className={`text-base tracking-tight ${
              activeTab === tab.key 
                ? 'font-bold text-white' 
                : 'font-normal text-text-secondary'
            }`}
          >
            {tab.label}
          </Text>
          {activeTab === tab.key && (
            <View
              className="absolute bottom-0 w-12 h-[3px] bg-primary rounded-t-full"
            />
          )}
        </Pressable>
      ))}
    </View>
  );
};
