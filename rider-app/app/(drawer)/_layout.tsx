import { Stack } from 'expo-router';

export default function DrawerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="personal" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="my-activity" />
      <Stack.Screen name="account" />
    </Stack>
  );
}
