import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { countries } from '@/constants/colors';

interface CountryPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: { code: string; name: string; dial: string }) => void;
  selectedCode?: string;
}

export const CountryPicker: React.FC<CountryPickerProps> = ({
  visible,
  onClose,
  onSelect,
  selectedCode,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <SafeAreaView className="bg-white rounded-t-3xl max-h-[70%]">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
            <Text className="text-lg font-bold text-text-primary">
              Select Country
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={countries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                className={`flex-row items-center justify-between p-4 border-b border-gray-100 ${
                  selectedCode === item.code ? 'bg-primary/10' : ''
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-text-primary text-base mr-2">
                    {item.name}
                  </Text>
                  <Text className="text-text-secondary text-sm">
                    {item.dial}
                  </Text>
                </View>
                {selectedCode === item.code && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={Colors.primary}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};
