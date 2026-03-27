import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function Index() {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  if (role === 'admin') {
    return <Redirect href="/(admin)" />;
  }

  return <Redirect href="/(rider)/delivery-orders" />;
}
