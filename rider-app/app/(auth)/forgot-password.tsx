import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
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
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} className="p-4">
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View className="px-6 pt-2">
            <Text className="text-3xl font-bold text-text-primary mb-8">
              Forgotten Password
            </Text>

            <View className="flex-row items-center bg-input-bg rounded-lg mb-4">
              <View className="px-4 py-4 border-r border-gray-300">
                <Text className="text-text-primary font-medium">+44</Text>
              </View>
              <Input
                placeholder="Phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={{ flex: 1, marginBottom: 0 }}
              />
            </View>

            <View className="flex-row items-center bg-input-bg rounded-lg mb-4">
              <Input
                placeholder="Verification code"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                style={{ flex: 1, marginBottom: 0 }}
              />
              <TouchableOpacity
                onPress={handleGetCode}
                disabled={countdown > 0}
                className="px-4"
              >
                <Text className={countdown > 0 ? 'text-text-muted' : 'text-primary font-medium'}>
                  {countdown > 0 ? `${countdown}s` : 'Get verification code'}
                </Text>
              </TouchableOpacity>
            </View>

            <Input
              placeholder="New password"
              value={newPassword}
              onChangeText={setNewPassword}
              isPassword
            />
            <Text className="text-text-secondary text-xs mb-6 -mt-2">
              Password length 8–20 characters
            </Text>

            <Button
              title="reset"
              onPress={handleReset}
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
