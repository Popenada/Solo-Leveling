import { useColorScheme } from '@/hooks/use-color-scheme';
import { useQuestStore } from '@/store/useQuestStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import "../global.css";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const checkAndReset = useQuestStore(s => s.checkAndReset)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    // give store time to initialize
    setTimeout(() => setReady(true), 100)
    checkAndReset()
  }, [])
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        <Stack.Screen name="workout/[id]" options={{ presentation: "modal", headerShown: false }} />
      </Stack>
        <StatusBar style="auto" />
    </ThemeProvider>
  );
}
