import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { mockSettings, appVersion } from '@/mock/rider';
import { useAuthStore } from '@/store/authStore';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const [settings, setSettings] = useState(mockSettings);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)');
          },
        },
      ]
    );
  };

  const toggleRows = [
    {
      label: 'Allow reminder',
      key: 'allowReminder' as const,
      value: settings.allowReminder,
    },
    {
      label: 'App Snapshot Feedback',
      key: 'appSnapshotFeedback' as const,
      value: settings.appSnapshotFeedback,
    },
    {
      label: 'Vibration',
      key: 'vibration' as const,
      value: settings.vibration,
    },
  ];

  const selectorRows = [
    { label: 'Navigation settings', value: settings.navigationSettings },
    { label: 'Dark Mode', value: settings.darkMode === 'always_off' ? 'Always Off' : settings.darkMode },
    { label: 'Map Call Settings', value: 'Latitude and Longitude', hasInfo: true },
  ];

  const infoRows = [
    { label: 'Version', value: appVersion },
    { label: 'Languages', value: settings.language },
  ];

  const actionRows = [
    { label: 'Account cancellation' },
    { label: 'About' },
    { label: 'Device Management' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-text-primary">Settings</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        {toggleRows.map((row, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <Text className="text-text-primary">{row.label}</Text>
            <Switch
              value={row.value}
              onValueChange={(value) =>
                setSettings({ ...settings, [row.key]: value })
              }
              trackColor={{ false: Colors.textMuted, true: Colors.online }}
              thumbColor={Colors.white}
            />
          </View>
        ))}

        <View className="px-4 py-4 border-b border-gray-100">
          <Text className="text-text-primary mb-3">Volume</Text>
          <View className="flex-row items-center">
            <Ionicons name="volume-low" size={20} color={Colors.textSecondary} />
            <View className="flex-1 mx-3 h-2 bg-gray-200 rounded-full">
              <View
                className="h-full bg-blue-400 rounded-full"
                style={{ width: `${settings.volume * 100}%` }}
              />
            </View>
            <Ionicons name="volume-high" size={20} color={Colors.textSecondary} />
          </View>
        </View>

        {selectorRows.map((row, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Text className="text-text-primary">{row.label}</Text>
              {row.hasInfo && (
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={Colors.textMuted}
                  style={{ marginLeft: 4 }}
                />
              )}
            </View>
            <View className="flex-row items-center">
              <Text className="text-text-secondary mr-2">{row.value}</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
            </View>
          </TouchableOpacity>
        ))}

        {infoRows.map((row, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <Text className="text-text-primary">{row.label}</Text>
            <Text className="text-text-secondary">{row.value}</Text>
          </View>
        ))}

        {actionRows.map((row, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <Text className="text-text-primary">{row.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}

        <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
          <View className="flex-row items-center">
            <Text className="text-text-primary">Order Accepting Setting</Text>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={Colors.textMuted}
              style={{ marginLeft: 4 }}
            />
          </View>
          <Switch
            value={settings.orderAcceptingSetting}
            onValueChange={(value) =>
              setSettings({ ...settings, orderAcceptingSetting: value })
            }
            trackColor={{ false: Colors.textMuted, true: Colors.online }}
            thumbColor={Colors.white}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="py-6 items-center"
        >
          <Text className="text-error font-medium text-base">Logout</Text>
        </TouchableOpacity>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
