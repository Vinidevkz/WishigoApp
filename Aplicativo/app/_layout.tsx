import { Stack } from "expo-router";
import { UserProvider } from "../src/contexts/context";


export default function Layout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
    </UserProvider>

  );
}