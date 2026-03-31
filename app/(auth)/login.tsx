import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
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
    <SafeAreaView className="flex-1 bg-screen-bg">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <Pressable
            onPress={() => router.back()}
            className="p-4 ml-2 mt-2 self-start rounded-full active:bg-gray-200 transition-colors"
          >
            <Ionicons name="arrow-back" size={26} color={Colors.textPrimary} />
          </Pressable>

          <View className="px-6 pt-6 flex-1">
            <View className="mb-10">
              <Text className="text-3xl font-bold tracking-tight text-text-primary mb-2">
                Welcome back
              </Text>
              <Text className="text-base font-normal text-text-secondary">
                Login to your account to continue
              </Text>
            </View>

            <View className="gap-2">
              <Input
                placeholder="Enter your cell number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                showClear
                onClear={() => setPhone('')}
                leftSlot={
                  <View className="pr-3 mr-1 border-r border-border-soft flex-row items-center">
                    <Text className="text-text-primary font-semibold text-base">+44</Text>
                  </View>
                }
              />

              <View>
                <Input
                  placeholder="Please enter password"
                  value={password}
                  onChangeText={setPassword}
                  isPassword
                />
                
                <Pressable
                  onPress={() => router.push('/(auth)/forgot-password')}
                  className="self-end py-2 px-1 -mt-2 active:opacity-70"
                >
                  <Text className="text-primary-dark font-semibold text-sm">
                    Forgot Password?
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="mt-auto mb-10 pt-10">
              <Button
                title="Login"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={{ height: 56 }}
              />
            </View>
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