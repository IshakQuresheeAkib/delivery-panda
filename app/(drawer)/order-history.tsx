import { Redirect } from 'expo-router';

// This route has been removed - redirect to my-activity
export default function OrderHistoryRedirect() {
  return <Redirect href="/(drawer)/my-activity" />;
}
