import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import "../global.css";
import LevelUpEffect from '@/components/effects/LevelUp';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setTimeout(() => setReady(true), 100)
  }, [])
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
      <LevelUpEffect />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
