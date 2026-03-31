import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Toast, LoadingSpinner } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
  };

  const handleLogin = async () => {
    if (!phone.trim()) {
      showToast('Enter your cell number, please.');
      return;
    }

    if (phone.length < 8) {
      showToast('Wrong format of phone number');
      return;
    }

    if (!password.trim()) {
      showToast('Please enter password');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    login('rider');
    router.replace('/(rider)/delivery-orders');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-4"
          >
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View className="px-6 pt-2">
            <Text className="text-3xl font-bold text-text-primary mb-8">
              Login
            </Text>

            <View className="flex-row items-center bg-input-bg rounded-lg mb-4">
              <View className="px-4 py-4 border-r border-gray-300">
                <Text className="text-text-primary font-medium">+44</Text>
              </View>
              <Input
                placeholder="Enter your cell number, ple..."
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                showClear
                onClear={() => setPhone('')}
                style={{ flex: 1, marginBottom: 0 }}
              />
            </View>

            <Input
              placeholder="Please enter password"
              value={password}
              onChangeText={setPassword}
              isPassword
            />

            <TouchableOpacity
              onPress={() => router.push('/(auth)/forgot-password')}
              className="self-end mb-6"
            >
              <Text className="text-text-primary underline">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast
        visible={toast.visible}
        message={toast.message}
        onHide={() => setToast({ visible: false, message: '' })}
      />

      <LoadingSpinner visible={loading} />
    </SafeAreaView>
  );
}