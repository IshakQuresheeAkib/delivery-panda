import React, { useState, useEffect } from 'react';
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

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const handleGetCode = () => {
    if (!phone.trim()) {
      setToast({ visible: true, message: 'Please enter phone number first' });
      return;
    }
    setCountdown(60);
    setToast({ visible: true, message: 'Verification code sent!' });
  };

  const handleReset = async () => {
    if (!phone.trim()) {
      setToast({ visible: true, message: 'Please enter phone number' });
      return;
    }
    if (!verificationCode.trim()) {
      setToast({ visible: true, message: 'Please enter verification code' });
      return;
    }
    if (newPassword.length < 8 || newPassword.length > 20) {
      setToast({ visible: true, message: 'Password length must be 8-20 characters' });
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    
    setToast({ visible: true, message: 'Password reset successful!' });
    setTimeout(() => router.back(), 1500);
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
                Reset Password
              </Text>
              <Text className="text-base font-normal text-text-secondary">
                Enter your phone number to receive a temporary verification code
              </Text>
            </View>

            <View className="gap-2">
              <Input
                placeholder="Phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                leftSlot={
                  <View className="pr-3 mr-1 border-r border-border-soft flex-row items-center">
                    <Text className="text-text-primary font-semibold text-base">+44</Text>
                  </View>
                }
              />

              <Input
                placeholder="Verification code"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                rightSlot={
                  <Pressable
                    onPress={handleGetCode}
                    disabled={countdown > 0}
                    className={`px-3 py-2 rounded-lg ml-1 ${countdown > 0 ? 'bg-gray-100' : 'bg-primary/10 active:bg-primary/20'}`}
                  >
                    <Text className={countdown > 0 ? 'text-text-muted font-medium' : 'text-primary-dark font-semibold'}>
                      {countdown > 0 ? `${countdown}s` : 'Get code'}
                    </Text>
                  </Pressable>
                }
              />

              <View>
                <Input
                  placeholder="New password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  isPassword
                />
                <Text className="text-text-secondary text-sm font-medium mt-1 mb-8 ml-1">
                  Password length must be 8–20 characters
                </Text>
              </View>
            </View>

            <View className="mt-auto mb-10 pt-10">
              <Button
                title="Reset Password"
                onPress={handleReset}
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
