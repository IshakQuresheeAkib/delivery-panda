import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import '../global.css';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, role } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inRiderGroup = segments[0] === '(rider)';
    const inAdminGroup = segments[0] === '(admin)';
    const inDrawerGroup = segments[0] === '(drawer)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)');
    } else if (isAuthenticated) {
      if (inAuthGroup) {
        if (role === 'admin') {
          router.replace('/(admin)');
        } else {
          router.replace('/(rider)/delivery-orders');
        }
      }
    }
  }, [isAuthenticated, segments, role, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(rider)" />
            <Stack.Screen name="(drawer)" />
            <Stack.Screen name="(admin)" />
          </Stack>
        </AuthGuard>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
