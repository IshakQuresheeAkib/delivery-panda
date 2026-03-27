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
import { Button, Input, Toast, CountryPicker } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { countries } from '@/constants/colors';

export default function RegisterScreen() {
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [invitationCode, setInvitationCode] = useState('');
  const [agreeContract, setAgreeContract] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '' });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validatePassword = (pwd: string) => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasUppercase = /[A-Z]/.test(pwd);
    const isLongEnough = pwd.length >= 8 && pwd.length <= 20;
    return hasLetter && hasNumber && hasUppercase && isLongEnough;
  };

  const handleGetCode = () => {
    if (!phone.trim()) {
      setToast({ visible: true, message: 'Please enter phone number first' });
      return;
    }
    setCountdown(60);
    setToast({ visible: true, message: 'Verification code sent!' });
  };

  const canProceed = agreeContract && agreePrivacy;

  const handleNext = () => {
    if (!canProceed) return;
    
    if (!validatePassword(password)) {
      setToast({ visible: true, message: 'Password does not meet requirements' });
      return;
    }

    setToast({ visible: true, message: 'Registration successful!' });
    router.push('/(auth)/login');
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

          <View className="bg-primary/20 mx-6 p-4 rounded-lg mb-6 items-center">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mb-2">
              <Ionicons name="cash-outline" size={32} color={Colors.textPrimary} />
            </View>
            <Text className="text-text-primary text-center font-medium">
              Take orders easily, work more, get more
            </Text>
          </View>

          <View className="px-6">
            <View className="flex-row mb-4">
              <TouchableOpacity
                onPress={() => setShowCountryPicker(true)}
                className="flex-1 flex-row items-center justify-between bg-input-bg rounded-lg px-4 py-4 mr-2"
              >
                <Text className="text-text-primary">{selectedCountry.name}</Text>
                <Ionicons name="chevron-down" size={16} color={Colors.textPrimary} />
              </TouchableOpacity>
              
              <View className="flex-1 bg-input-bg rounded-lg px-4 py-4">
                <Text
                  className={city ? 'text-text-primary' : 'text-text-muted'}
                  onPress={() => setCity('London')}
                >
                  {city || 'City'}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center bg-input-bg rounded-lg mb-4">
              <TouchableOpacity
                onPress={() => setShowCountryPicker(true)}
                className="flex-row items-center px-4 py-4 border-r border-gray-300"
              >
                <Text className="text-text-primary mr-1">{selectedCountry.dial}</Text>
                <Ionicons name="caret-down" size={12} color={Colors.textPrimary} />
              </TouchableOpacity>
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
                  {countdown > 0 ? `${countdown}s` : 'Get code'}
                </Text>
              </TouchableOpacity>
            </View>

            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              isPassword
              error={password && !validatePassword(password) ? 'Invalid password format' : undefined}
            />
            <Text className="text-text-secondary text-xs mb-4 -mt-2">
              *Eg:Ab234567, More than 8 digits, capital letter and lowercase + numbers
            </Text>

            <Input
              label="Invitation code (optional)"
              placeholder="Enter invitation code"
              value={invitationCode}
              onChangeText={setInvitationCode}
              showClear
              onClear={() => setInvitationCode('')}
            />

            <TouchableOpacity
              onPress={() => setAgreeContract(!agreeContract)}
              className="flex-row items-center mb-3"
            >
              <View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                  agreeContract ? 'bg-primary border-primary' : 'border-gray-300'
                }`}
              >
                {agreeContract && (
                  <Ionicons name="checkmark" size={16} color={Colors.textPrimary} />
                )}
              </View>
              <Text className="text-text-primary flex-1">
                I agree to the{' '}
                <Text className="underline">Independent Contractor Agreement</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAgreePrivacy(!agreePrivacy)}
              className="flex-row items-center mb-6"
            >
              <View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                  agreePrivacy ? 'bg-primary border-primary' : 'border-gray-300'
                }`}
              >
                {agreePrivacy && (
                  <Ionicons name="checkmark" size={16} color={Colors.textPrimary} />
                )}
              </View>
              <Text className="text-text-primary flex-1">
                I agree to the{' '}
                <Text className="underline">Independent Contractor Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            <Button
              title="Next"
              onPress={handleNext}
              disabled={!canProceed}
            />

            <View className="h-8" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CountryPicker
        visible={showCountryPicker}
        onClose={() => setShowCountryPicker(false)}
        onSelect={setSelectedCountry}
        selectedCode={selectedCountry.code}
      />

      <Toast
        visible={toast.visible}
        message={toast.message}
        onHide={() => setToast({ visible: false, message: '' })}
      />
    </SafeAreaView>
  );
}
