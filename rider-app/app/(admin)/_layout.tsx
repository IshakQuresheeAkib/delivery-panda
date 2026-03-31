import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function AdminLayout() {
  const router = useRouter();
  const { role, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)');
    } else if (role !== 'admin') {
      router.replace('/(rider)/delivery-orders');
    }
  }, [role, isAuthenticated, router]);

  if (role !== 'admin') {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="riders" />
      <Stack.Screen name="orders" />
    </Stack>
  );
}
