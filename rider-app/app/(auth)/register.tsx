import { Redirect } from 'expo-router';

// This route has been removed - redirect to login
export default function RegisterRedirect() {
  return <Redirect href="/(auth)/login" />;
}
